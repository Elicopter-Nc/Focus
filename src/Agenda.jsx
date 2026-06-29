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
            ...rappels,  // copie tous les rappels existants
            [jourSelectionne]: texteRappel  // ajoute/écrase celui du jour sélectionné
        })
        setTexteRappel('')
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
                    className={`jour ${jourSelectionne === jour ? 'actif' : ''} ${rappels[jour] ? 'a-rappel' : ''}`}
                    onClick={() => {
                        setJourSelectionne(jour)
                        setTexteRappel(rappels[jour] || '')
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
                    <button onClick={sauvegarderRappel}>Sauvegarder</button>
                </div>
            )}

            <div>
                <div className='separation'></div>
                <h2>Rappel de {nomsMois[moisActuel]} {anneeActuelle}</h2>
                
            </div>
        </div>
    )
}

export default Agenda