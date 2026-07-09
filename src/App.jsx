import { useState, useEffect } from 'react'
import Agenda from './Agenda'
import Pomodoro from './Pomodoro'
import Notes from './Notes'

function App() {
  const [ongletActif, setOngletActif] = useState('agenda')
  const [secondesRestantes, setSecondesRestantes] = useState(25 * 60)
  const [estEnCours, setEstEnCours] = useState(false)
  const [mode, setMode] = useState('pomodoro')
  const [pomodorosCompletes, setPomodorosCompletes] = useState(0)

  useEffect(() => {
  if (estEnCours) {
    const interval = setInterval(() => {
      setSecondesRestantes(s => s - 1)
    }, 1000)
    return () => clearInterval(interval)
  }
  }, [estEnCours])

  useEffect(() => {
    if (secondesRestantes === 0) {
      setEstEnCours(false)
      if (mode ==='pomodoro'){
        setPomodorosCompletes(p => p + 1 )
      }
    }
  }, [secondesRestantes])



  return (
    <div className="app">
      <nav className="navbar">
        <h1 className="logo">student hub</h1>
        <div className="tabs">
          <button
            className={ongletActif === 'agenda' ? 'tab active' : 'tab'}
            onClick={() => setOngletActif('agenda')}
          >
            Agenda
          </button>
          <button
            className={ongletActif === 'pomodoro' ? 'tab active' : 'tab'}
            onClick={() => setOngletActif('pomodoro')}
          >
            Pomodoro
          </button>
          <button
            className={ongletActif === 'notes' ? 'tab active' : 'tab'}
            onClick={() => setOngletActif('notes')}
          >
            Notes
          </button>
        </div>
      </nav>

      <main className="content">
        {ongletActif === 'agenda' && <Agenda />}
        {ongletActif === 'pomodoro' && <Pomodoro
          secondesRestantes={secondesRestantes}
          setSecondesRestantes={setSecondesRestantes}
          estEnCours={estEnCours}
          setEstEnCours={setEstEnCours}
          mode={mode}
          setMode={setMode}
          pomodorosCompletes={pomodorosCompletes}
        />}
        {ongletActif === 'notes' && <Notes/>}
      </main>
    </div>
  )
}

export default App