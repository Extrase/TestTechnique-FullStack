import React from 'react';
import type { Log } from '../types/log.types';
import { LoadingSpinner } from './LoadingSpinner';

interface LogListProps {
  logs: Log[]; // liste des logs
  loading: boolean; // etat de chargement
  error: string | null; // etat de l'erreur (existante ou non)
}

const readableTime = (timestamp: string) => { // transforme le temps de maniere habituellement lisble pour un etre humain 
  const time = new Date(timestamp).toLocaleString("fr-FR",{ // j'ai choisi fr-FR car nous sommes en France !!
    year: 'numeric', // permets de montrer la date plus specifiquement
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  }

  );
  return time;
}

const changeLevelColor = (level: string) => { // selon le niveau je change la couleur du text, dynamiquement !
  if (level === 'INFO') return ("bg-blue-100 text-blue-700");
  if (level === 'WARNING') return ("bg-rose-100 text-rose-700"); // j'aime bien cette couleur :)
  if (level === 'ERROR') return ("bg-orange-100 text-orange-600");
  if (level === 'DEBUG') return ("bg-zinc-100 text-zinc-700");

  return ("bg-violet-100 text-violet-600") // si jamais il n'y a pas de level meme si c'est normalement impossible, c'est toujours + safe
};

export const LogList: React.FC<LogListProps> = ({logs, loading, error}) => {
  if (loading) return <LoadingSpinner />; // si loading = true on appelle la "fonction" LoadingSpinner
  if (error) return <div>Erreur : {error}</div>; // si error n'est pas null
  if (logs.length === 0) return (
  <div className="bg-white p-8 rounded-lg shadow border text-center">
    <div className="text-gray-400 mb-4">
      <span className="text-4xl">📝</span>
    </div>
    <h3 className="text-lg font-medium text-gray-700 mb-2">
      Aucun log trouvé
    </h3>
    <p className="text-gray-500">
      Modifiez vos critères de recherche ou ajoutez votre premier log
    </p>
  </div>
); // si il n'y a aucun log
  
  return (
  <div className="space-y-4"> 
    {logs.map(log => (
      <div key={log.id} className="bg-white p-4 rounded-lg shadow border">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            {readableTime(log.timestamp)}
          </span>
          <span className={`px-2 py-1 rounded ${changeLevelColor(log.level)}`}>
            {log.level}
          </span>
        </div>
        <p className="text-sm text-gray-600">Service: {log.service}</p>
        <p className="text-gray-900 mb-2">{log.message}</p>
      </div>
    ))}
  </div>
  // spacing auto, flex layout, cards avec ombre
);
}