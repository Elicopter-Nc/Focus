import { useState, useEffect } from 'react'
import './Agenda.css'

function Agenda() {
    const aujourdhui = new Date()
    const [moisActuel, setMoisActuel] = useState(aujourdhui.getMonth())
    const [anneeActuelle, setAnneeActuelle] = useState(aujourdhui.getFullYear())
    const [jourSelectionne, setJourSelectionne] = useState(null)

    
    const [rappels, setRappels] = useState(() => {
        const data = localStorage.getItem('rappels')
        return data ? JSON.parse(data) : {}
    })

    const [texteRappel, setTexteRappel] = useState('')

    const [couleurSelectionnee, setCouleurSelectionnee] = useState('#ffffff')
    const [dropdownOuvert, setDropdownOuvert] = useState(false)

    useEffect(() => {
        localStorage.setItem('rappels', JSON.stringify(rappels))
    }, [rappels])

    // Nombre de jours dans le mois
    const nbJours = new Date(anneeActuelle, moisActuel + 1, 0).getDate()

    // Tableau [1, 2, 3, ... nbJours]
    const jours = Array.from({ length: nbJours }, (_, i) => i + 1)

    const nomsMois = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ]

    
function sauvegarderRappel() {
    if (texteRappel.trim() === '') return
    setRappels({
        ...rappels,
        [cleJour(jourSelectionne)]: {
        texte: texteRappel,
        couleur: couleurSelectionnee
        }
    })
    setTexteRappel('')
}

    function cleJour(jour) {
        return `${anneeActuelle}-${moisActuel}-${jour}`
    }


    function supprimerRappel() {
        const { [cleJour(jourSelectionne)]: _, ...reste } = rappels
        setRappels(reste)
        setTexteRappel('')
        setJourSelectionne(null)
    }



    return (
        <div className="agenda">
            <div className="agenda-header">
                <button onClick={() => setMoisActuel(m => m === 0 ? 11 : m - 1)}>←</button>
                <h2>{nomsMois[moisActuel]} {anneeActuelle}</h2>
                <button onClick={() => setMoisActuel(m => m === 11 ? 0 : m + 1)}>→</button>
            </div>

            <div className="calendrier">
                {jours.map(jour => (
                    <button
                    key={jour}
                    className={`jour ${jourSelectionne === jour ? 'actif' : ''}`}
                    style={{
                        borderColor: rappels[cleJour(jour)] ? rappels[cleJour(jour)].couleur : ''
                    }}
                    onClick={() => {
                        setJourSelectionne(jour)
                        const rappel = rappels[cleJour(jour)]
                        setTexteRappel(rappel ? rappel.texte : '')
                        setCouleurSelectionnee(rappel ? rappel.couleur : '#ffffff')
                    }}
                >
                    {jour}
                </button>
                ))}
            </div>

            {jourSelectionne && (
                <div className="rappel-zone">
                    <h3>{jourSelectionne} {nomsMois[moisActuel]}</h3>
                    <textarea placeholder ="Ajouter un rappel ..."
                        value={texteRappel}
                        onChange={e => setTexteRappel(e.target.value)}
                    />
                    <div className='rappel-boutons'>
                        <button onClick={sauvegarderRappel}>Sauvegarder</button>
                        
                        <div className="dropdown">
                            <button 
                                className="btn-couleur"
                                onClick={() => setDropdownOuvert(o => !o)}
                            >
                                Couleur
                            </button>

                            {dropdownOuvert && (
                            <div className="dropdown-menu">
                                {[
                                    { nom: 'Blanc', valeur: '#ffffff' },
                                    { nom: 'Rouge', valeur: '#ff4444' },
                                    { nom: 'Jaune', valeur: '#ffaa00' },
                                    { nom: 'Vert', valeur: '#44ff88' },
                                ].map(c => (
                                <button
                                    key={c.valeur}
                                    className={`dropdown-item ${couleurSelectionnee === c.valeur ? 'selected' : ''}`}
                                    onClick={() => {
                                        setCouleurSelectionnee(c.valeur)
                                        setDropdownOuvert(false)
                                    }}
                                >
                                    <span className="dot" style={{ backgroundColor: c.valeur }} />
                                    {c.nom}
                                </button>
                                ))}
                            </div>
                            )}
                        </div>
                        <button onClick={supprimerRappel} className='btn-supprimer'>Supprimer</button>
                    </div>
                    
                </div>
            )}

            <div className='separation'></div>

            <div>
                <h2>Rappel de {nomsMois[moisActuel]} {anneeActuelle}</h2>

                {Object.entries(rappels)
                    .filter(([cle]) => cle.startsWith(`${anneeActuelle}-${moisActuel}-`)) // garde seulement les clés qui commencent par "anneeActuelle-moisActuel"
                    .sort(([a], [b]) => { //trie les jours dans l'ordre croissant
                        const jourA = parseInt(a.split('-')[2])
                        const jourB = parseInt(b.split('-')[2])
                        return jourA - jourB
                    })
                    .map(([cle, rappel]) => {
                        const jour = cle.split('-')[2] // extrait le numéro du jour
                        return (
                        <div key={cle} className="recap-item" style={{ borderLeft: `3px solid ${rappel.couleur}` }}>
                            <span className="recap-jour">{jour} {nomsMois[moisActuel]}</span>
                            <span className="recap-texte">{rappel.texte}</span>
                        </div>
                        )
                    })
                    }
            </div>
        </div>
    )
}

export default Agenda