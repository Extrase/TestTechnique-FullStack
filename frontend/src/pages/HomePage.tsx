import React from 'react';
import { SearchFilter } from '../components/SearchFilter';
import { LogList } from '../components/LogList';
import { useLogContext } from '../contexts/LogContext';

export const HomePage: React.FC = () => {
  const { logs, loading, error, searchLogs } = useLogContext(); // recupere les donnees depuis le contexte au lieu de les passer en props

  return (
    <div className="space-y-6"> {/* espacement automatique entre les sections */}
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Consultation des Logs
        </h2>
        <p className="text-gray-600">
          Recherchez et filtrez vos logs pour analyser les événements de votre système.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Recherche et Filtres
        </h3>
        <SearchFilter 
          onSearch={searchLogs} // passe la fonction de recherche au composant
          loading={loading}
        />
      </div>

      {/* Results */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Résultats
          </h3>
          <div className="text-sm text-gray-500">
            {!loading && logs.length > 0 && `${logs.length} log(s) trouvé(s)`} {/* affiche le nombre de resultats seulement si pas en chargement */}
          </div>
        </div>
        
        <LogList 
          logs={logs} // passe la liste des logs recuperee du contexte
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
};

export default HomePage;