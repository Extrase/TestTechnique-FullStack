import React, { useState, useEffect } from 'react';
import type { SearchFilters } from '../types/log.types';

//typage des props
interface SearchFilterProps {
  onSearch: (filters: SearchFilters) => void; 
  loading: boolean;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, loading: _ }) => {
  // etats pour chaque filtre
  const [query, setQuery] = useState<string>(''); // <string> precise que cet etat contiendra une string
  const [level, setLevel] = useState<string>('');
  const [service, setService] = useState<string>('');


  // recherche textuelle (avec délai pour eviter les appels api incessants)
  useEffect(() => {
    if (!query) return; // ne pas chercher si vide
    
    const timeoutId = setTimeout(() => {
      onSearch({
        q: query || undefined,
        level: level || undefined,
        service: service || undefined
      });
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  // Pour les filtres (immédiat)
  useEffect(() => {
    onSearch({
      q: query || undefined,
      level: level || undefined,
      service: service || undefined
    });
  }, [level, service]);

  return (
    <div className="flex flex-col md:flex-row gap-3">
      <div className='mx-auto'>
        <input 
          type="text" 
          placeholder="Search logs"
          value={query} // affiche la valeur de l'etat React, qui d'ailleurs controle la valeur mais pas le DOM
          onChange={(e) => setQuery(e.target.value)} // evenement de changement, on ajoute la valeur
          className="w-full md:w-80 px-3 h-10 rounded border-2 border-sky-500 focus:outline-none focus:border-sky-500"
        />
        
        <select 
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className="h-10 border-2 border-sky-500 focus:outline-none focus:border-sky-500 text-sky-500 rounded px-2 md:px-3 py-0 md:py-1 tracking-wider"
        >
          <option value="">Tous les level</option>
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
      </div>
    </div>
  );
};

// form trouve puis modifie sur "https://tailwindflex.com/@piet-vriend/search-bar-with-filter-options", libre de droits !