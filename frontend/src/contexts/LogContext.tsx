import React, { createContext, useContext } from 'react';
import type { ReactNode } from 'react';
import { useLogs } from '../hooks/useLogs';
import type { Log, SearchFilters } from '../types/log.types';

interface LogContextType { // type du contexte pour definir ce qui sera partage
  logs: Log[];
  loading: boolean;
  error: string | null;
  searchLogs: (filters: SearchFilters) => Promise<void>;
  addLog: (log: Omit<Log, 'id'>) => Promise<void>;
  loadLogs: () => Promise<void>;
}

const LogContext = createContext<LogContextType | undefined>(undefined); // création du contexte avec TypeScript

export const LogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const logHook = useLogs(); // utilise le hook personnalise pour recuperer toutes les fonctions
  
  return (
    <LogContext.Provider value={logHook}> {/* fournit toutes les donnees du hook aux composants enfants */}
      {children}
    </LogContext.Provider>
  );
};


export const useLogContext = () => { // hook pour utiliser le contexte de maniere securisee
  const context = useContext(LogContext);
  if (!context) {
    throw new Error('useLogContext must be used within a LogProvider'); // erreur si utilise en dehors du provider
  }
  return context;
};