import { useLogs } from './hooks/useLogs';
import { LogList } from './components/LogList';
import { SearchFilter } from './components/SearchFilter';
import { LogForm } from './components/LogForm';

// App.tsx ne gere que l'affichage et non la logiquew

function App() {
  const { logs, loading, error, searchLogs, addLog } = useLogs(); //hook personnalise, on extrait plusieurs valeurs d'un seul objet

  return (
    <div className="min-h-screen bg-gray-50"> {/* layout */}
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Gestion des Logs
        </h1>
        
        {/* Recherche et filtres */}
        <SearchFilter     // je passe les donnees du parent vers l'enfant avec props
          onSearch={searchLogs} //callback pour activer l.a recherche
          loading={loading} //etat pour desactive le boutton
        />
        
        {/* Liste des logs */}
        <LogList  //assemblage de plusieurs composants pour creer l'interface
          logs={logs}
          loading={loading}
          error={error}
        />
        
        {/* Formulaire d'ajout */}
        <LogForm 
          onLogCreated={addLog}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default App;