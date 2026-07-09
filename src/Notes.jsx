import { useState, useEffect } from 'react'
import './Notes.css'
import ReactMarkdown from 'react-markdown'
import markdownGuide from './markdownGuide'

function Notes() {
  const [dossiers, setDossiers] = useState(() => {
    const data = localStorage.getItem('notes-dossiers')
    if (data) return JSON.parse(data)
    return [{
      id: '0',
      nom: 'Guide',
      notes: [{
        id: '0-1',
        titre: 'Markdown : les bases',
        contenu: markdownGuide
      }]
    }]
  })

  const [noteActive, setNoteActive] = useState(null)
  const [modePreview, setModePreview] = useState(true)
  const [dossiersOuverts, setDossiersOuverts] = useState({})

  useEffect(() => {
    localStorage.setItem('notes-dossiers', JSON.stringify(dossiers))
  }, [dossiers])

  function creerDossier() {
    const nom = prompt('Nom du dossier :')
    if (!nom) return
    const nouveau = { id: Date.now().toString(), nom, notes: [] }
    setDossiers([...dossiers, nouveau])
  }

  function creerNote(dossierId) {
    const titre = prompt('Titre de la note :')
    if (!titre) return
    const nouvelleNote = { id: Date.now().toString(), titre, contenu: '' }
    setDossiers(dossiers.map(d =>
      d.id === dossierId
        ? { ...d, notes: [...d.notes, nouvelleNote] }
        : d
    ))
  }

  function toggleDossier(id) {
    setDossiersOuverts(o => ({ ...o, [id]: !o[id] }))
  }

  function modifierNote(contenu) {
    setDossiers(dossiers.map(d => ({
      ...d,
      notes: d.notes.map(n =>
        n.id === noteActive.id ? { ...n, contenu } : n
      )
    })))
    setNoteActive({ ...noteActive, contenu })
  }

  function supprimerDossier(dossierId){
    setDossiers(dossiers.filter(d => d.id !== dossierId))
  }

  function supprimerNote(dossierId, noteId) {
    setDossiers(dossiers.map(d =>
      d.id === dossierId
      ? { ...d, notes: d.notes.filter(n => n.id !== noteId)}
      : d
    ))
  }




  return (
    <div className="notes">
      <div className="notes-sidebar">
        <div className="sidebar-header">
          <span>Dossier</span>
          <button className="btn-nouveau" onClick={creerDossier}>+</button>
        </div>

        <div className="sidebar-liste">
          {dossiers.map(dossier => (
            <div key={dossier.id} className="dossier">
              <div className="dossier-header" onClick={() => toggleDossier(dossier.id)}>
                <span>
                  <span className="dossier-icone">{dossiersOuverts[dossier.id] ? '▾' : '▸'}</span>
                  {dossier.nom}
                </span>

                <div className="dossier-actions">
                  <button className="btn-note" onClick={e => {
                    e.stopPropagation()
                    creerNote(dossier.id)
                  }}>+</button>

                  <button className="btn-supprimer-dossier" onClick={e => {
                    e.stopPropagation()
                    supprimerDossier(dossier.id)
                  }}>×</button>
                </div>
              </div>
              {dossiersOuverts[dossier.id] && (
                <div className="notes-liste">
                  {dossier.notes.map(note => (
                    <div
                      key={note.id}
                      className={`note-item ${noteActive?.id === note.id ? 'active' : ''}`}
                      onClick={() => {
                        setNoteActive(note)
                        setModePreview(true)
                      }}
                    >
                      {note.titre}
                      <button className="btn-supprimer-note" onClick={e => {
                        e.stopPropagation()
                        supprimerNote(dossier.id, note.id)
                      }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="notes-editeur">
        {noteActive ? (
          <div className="editeur-container">
            <div className="editeur-header">
              <span className="editeur-titre">{noteActive.titre}</span>
              <button
                className="btn-preview"
                onClick={() => setModePreview(p => !p)}
              >
                {modePreview ? 'Éditer' : 'Preview'}
              </button>
            </div>

            {modePreview ? (
              <div className="markdown-preview">
                <ReactMarkdown>{noteActive.contenu}</ReactMarkdown>
              </div>
            ) : (
              <textarea
                className="editeur-textarea"
                value={noteActive.contenu}
                onChange={e => modifierNote(e.target.value)}
                placeholder="Écris ta note en markdown..."
              />
            )}
          </div>
        ) : (
          <p className="notes-vide">Sélectionne une note</p>
        )}
      </div>
    </div>
  )
}

export default Notes