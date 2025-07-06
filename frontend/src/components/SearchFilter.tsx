import React, { useState } from 'react';
import { SearchFilters } from '../types/log.types';

//typage des props
interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void; 
  loading: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, loading }) => {
  // etats pour chaque filtre
  const [query, setQuery] = useState<string>(''); // <string> precise que cet etat contiendra une string
  const [level, setLevel] = useState<string>('');
  const [service, setService] = useState<string>('');

  // déclencher la recherche
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // empeche le comportement par defaut du formulaire qui est de recharger la page, primordial pour le projet !!
    onSearch({ // appelle une fonction lors de la soumission d'une recherche
      q: query || undefined, // ternaire, si query n'est pas vide utiliser query, sinon, utiliser undefined car l'API attends ?q=recherche ou rien
      level: level || undefined,
      service: service || undefined
    });
  };
  return (
    <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3">
      <div className="flex">
        <input 
          type="text" 
          placeholder="Search logs"
          value={query} // affiche la valeur de l'etat React, qui d'ailleurs controle la valeur mais pas le DOM
          onChange={(e) => setQuery(e.target.value)} // evenement de changement, on ajoute la valeur
          className="w-full md:w-80 px-3 h-10 rounded-l border-2 border-sky-500 focus:outline-none focus:border-sky-500"
        />
        <button 
        type="submit" 
        disabled={loading} // pour empecher de multiples soumissions
        className="bg-sky-500 text-white rounded-r px-2 md:px-3 py-0 md:py-1 disabled:opacity-50 disabled:cursor-not-allowed"> 
          {loading ? 'Recherche...' : 'Search'} 
        </button>
      </div>
      {/* {loading ? 'Recherche...' : 'Search'} = expression conditionelle */}
      <select 
        value={level}
        onChange={(e) => setLevel(e.target.value)}
        className="w-full h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
      >
        <option value="">Tous les niveaux</option>
        <option value="INFO">INFO</option>
        <option value="WARNING">WARNING</option>
        <option value="ERROR">ERROR</option>
        <option value="DEBUG">DEBUG</option>
      </select>
      
      <select 
        value={service}
        onChange={(e) => setService(e.target.value)}
        className="h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
      >
        <option value="">Tous les services</option>
        <option value="api-gateway">api-gateway</option>
        <option value="user-service">user-service</option>
        <option value="payment-service">payment-service</option>
        <option value="background-worker">background-worker</option>
      </select>
    </form>
  );
};

// form trouve puis modifie sur "https://tailwindflex.com/@piet-vriend/search-bar-with-filter-options", libre de droits !