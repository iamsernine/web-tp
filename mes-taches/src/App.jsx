import { useState } from 'react'
import Entete from './components/Entete.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Compteur from './components/Compteur.jsx'
const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]
function App() {
 const [taches,setTaches] = useState(TACHES_INITIALES)
 function basculerTache(id) { setTaches(ancien => ancien.map(t => t.id === id ? {...t, terminee: !t.terminee} : t)) }
 function supprimerTache(id) { setTaches(ancien => ancien.filter(t => t.id !== id)) }
 return <div className="app"><Entete titre="Mes tâches" sousTitre="Mon premier projet React" /><Carte titre="Compteur"><Compteur /></Carte><Carte titre="Ma liste"><ListeTaches taches={taches} onBasculer={basculerTache} onSupprimer={supprimerTache} /></Carte><Pied auteur="Med Benyamna" /></div>
}
export default App
