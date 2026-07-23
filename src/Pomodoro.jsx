import { useState, useEffect } from 'react'
import './Pomodoro.css'
import temple from './assets/backgrounds/temple.png'      // ← ici
import silver from './assets/backgrounds/silver_star.png'
import blackhole from './assets/backgrounds/blackhole.png'
import firewatch from './assets/backgrounds/firewatch.png'
import fleur from './assets/backgrounds/fleur.png'

function Pomodoro({ secondesRestantes, setSecondesRestantes, estEnCours, setEstEnCours, mode, setMode, pomodorosCompletes }) {

    const heuresTotal = Math.floor((pomodorosCompletes * 25) / 60 )
    const minutesTotal = (pomodorosCompletes * 25) % 60
    const [fond, setFond] = useState(null)
    const [fondDropdownOuvert, setFondDropdownOuvert] = useState(false)

    const fonds = [           
        { nom: 'Aucun', valeur: null },
        { nom: 'Temple', valeur: temple },
        { nom: 'Silver', valeur: silver },
        { nom: 'Blackhole', valeur: blackhole },
        { nom: 'Firewatch', valeur: firewatch },
        { nom: 'Fleur', valeur: fleur },
    ]

    function changerMode(nouveauMode) {
        setEstEnCours(false)
        setMode(nouveauMode)
        if (nouveauMode === 'pomodoro') setSecondesRestantes(25 * 60)
        if (nouveauMode === 'short') setSecondesRestantes(5 * 60)
        if (nouveauMode === 'long') setSecondesRestantes(15 * 60)
    }

    function formaterTemps(secondes) {
        const m = Math.floor(secondes / 60).toString().padStart(2, '0')
        const s = (secondes % 60).toString().padStart(2, '0')
        return `${m}:${s}`
    }

    return (
        <div 
        className="pomodoro"
        style={{
            backgroundImage: fond ? `url(${fond})` : 'none',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
        }}
        >

            <div className={`pomodoro-centre ${fond ? 'avec-fond' : ''}`}>
                <div className="modes">
                    <button
                        className={mode === 'pomodoro' ? 'mode-btn actif' : 'mode-btn'}
                        onClick={() => changerMode('pomodoro')}
                    >
                        Pomodoro
                    </button>
                    <button
                            className={mode === 'short' ? 'mode-btn actif' : 'mode-btn'}
                            onClick={() => changerMode('short')}
                    >
                        Short Break
                    </button>
                    <button
                        className={mode === 'long' ? 'mode-btn actif' : 'mode-btn'}
                        onClick={() => changerMode('long')}
                    >
                        Long Break
                    </button>
                </div>

                <div className={`timer ${estEnCours ? 'en-cours' : 'en-pause'}`}>
                    {formaterTemps(secondesRestantes)}
                </div>

                <div className="pomodoro-boutons">
                    <button onClick={() => setEstEnCours(true)}>Démarrer</button>
                    <button onClick={() => setEstEnCours(false)}>Pause</button>
                    <button onClick={() => {
                        setEstEnCours(false)
                        changerMode(mode)
                    }}>Reset</button>
                </div>
            </div>

            <div className="pomodoro-footer">
                <div className="stat">
                    <span className="stat-nombre">{pomodorosCompletes}</span>
                    <span className="stat-label">Pomodoros</span>
                </div>
                <div className="stat">
                    <span className="stat-nombre">{heuresTotal}h{minutesTotal}m</span>
                    <span className="stat-label">Temps total</span>
                </div>

                <div className="dropdown-fond">
                    <button
                        className="btn-fond"
                        onClick={() => setFondDropdownOuvert(o => !o)}
                    >
                        Fond
                    </button>

                    {fondDropdownOuvert && (
                        <div className="dropdown-fond-menu">
                            {fonds.map(f => (
                            <button
                                key={f.nom}
                                className={`dropdown-fond-item ${fond === f.valeur ? 'selected' : ''}`}
                                onClick={() => {
                                    setFond(f.valeur)
                                    setFondDropdownOuvert(false)
                                }}
                            >
                                {f.valeur && (
                                    <img src={f.valeur} alt={f.nom} className="fond-preview" />
                                )}
                                {f.nom}
                            </button>
                            ))}
                        </div>
                    )}
                </div>



            </div>





        </div>
    )
}

export default Pomodoro