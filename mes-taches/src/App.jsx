import { useState } from 'react'
import Entete from './components/Entete.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]
function App() {
 const [taches,setTaches] = useState(TACHES_INITIALES)
 const [filtre,setFiltre] = useState('toutes')
 function basculerTache(id) { setTaches(ancien => ancien.map(t => t.id === id ? {...t, terminee: !t.terminee} : t)) }
 function supprimerTache(id) { setTaches(ancien => ancien.filter(t => t.id !== id)) }
 function ajouterTache(titre) { setTaches(ancien => [...ancien,{id: Date.now(),titre,terminee:false}]) }
 const tachesVisibles = taches.filter(t => filtre === 'toutes' || (filtre === 'actives' && !t.terminee) || (filtre === 'terminees' && t.terminee))
 return <div className="app"><Entete titre="Mes tâches" sousTitre="Mon premier projet React" /><Carte titre="Compteur"><Compteur /></Carte><Carte titre="Nouvelle tâche"><FormulaireAjout onAjouter={ajouterTache} /></Carte><Carte titre="Ma liste"><Filtres filtre={filtre} onChanger={setFiltre} /><ListeTaches taches={tachesVisibles} onBasculer={basculerTache} onSupprimer={supprimerTache} /></Carte><Carte titre="Statistiques"><Statistiques taches={taches} /></Carte><Pied auteur="Med Benyamna" /></div>
}
export default App
