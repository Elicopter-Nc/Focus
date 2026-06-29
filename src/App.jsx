import { useState } from 'react'
import Agenda from './Agenda'

function App() {
  const [ongletActif, setOngletActif] = useState('agenda')

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
        {ongletActif === 'pomodoro' && <p>Onglet Pomodoro</p>}
        {ongletActif === 'notes' && <p>Onglet Notes</p>}
      </main>
    </div>
  )
}

export default App