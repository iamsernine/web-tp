import { useEffect, useState } from 'react'
import Entete from './components/Entete.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'

function App() {
  const [taches, setTaches] = useState([])
  const [filtre, setFiltre] = useState('toutes')
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  useEffect(() => {
    let annule = false
    fetch('/taches.json')
      .then(reponse => {
        if (!reponse.ok) throw new Error(`Erreur HTTP ${reponse.status}`)
        return reponse.json()
      })
      .then(donnees => { if (!annule) setTaches(donnees) })
      .catch(err => { if (!annule) setErreur(err.message) })
      .finally(() => { if (!annule) setChargement(false) })
    return () => { annule = true }
  }, [])

  const restantes = taches.filter(tache => !tache.terminee).length
  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  function basculerTache(id) {
    setTaches(ancien => ancien.map(tache => tache.id === id ? { ...tache, terminee: !tache.terminee } : tache))
  }
  function supprimerTache(id) {
    setTaches(ancien => ancien.filter(tache => tache.id !== id))
  }
  function ajouterTache(titre) {
    setTaches(ancien => [...ancien, { id: Date.now(), titre, terminee: false }])
  }
  const tachesVisibles = taches.filter(tache => filtre === 'toutes' || (filtre === 'actives' && !tache.terminee) || (filtre === 'terminees' && tache.terminee))

  return <div className="app">
    <Entete titre="Mes tâches" sousTitre="Mon premier projet React" />
    <Carte titre="Heure actuelle"><Horloge /></Carte>
    <Carte titre="Compteur"><Compteur /></Carte>
    <Carte titre="Nouvelle tâche"><FormulaireAjout onAjouter={ajouterTache} /></Carte>
    <Carte titre="Ma liste">
      <Filtres filtre={filtre} onChanger={setFiltre} />
      {chargement ? <p className="vide">Chargement des tâches…</p> : erreur ? <p className="erreur">{erreur}</p> : <ListeTaches taches={tachesVisibles} onBasculer={basculerTache} onSupprimer={supprimerTache} />}
    </Carte>
    <Carte titre="Statistiques"><Statistiques taches={taches} /></Carte>
    <Pied auteur="Med Benyamna" />
  </div>
}
export default App
