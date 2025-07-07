import React, { useState } from 'react';
import type { Log } from '../types/log.types';
import type { LogLevel } from "../types/logLevel";

interface LogFormProps {
  onLogCreated: (log: Omit<Log, 'id'>) => void;
  loading: boolean;
}

// vérifier le format ISO 8601
const validateTimestamp = (timestamp: string) => {
  try {
    const date = new Date(timestamp);
    const isoString = date.toISOString().slice(0, 19); // "2025-07-06T14:30:00"
    return timestamp === isoString;
  } catch {
    return false;
  }
};

const generateCurrentTimestamp = () => {
  const now = new Date();
  const frenchTime = new Date(now.toLocaleString("en-US", { timeZone: "Europe/Paris" })); // fuseau horaire francais :)
  
  //mettreformat ISO 8601 sans les millisecondes
  const year = frenchTime.getFullYear();
  const month = String(frenchTime.getMonth() + 1).padStart(2, '0');
  const day = String(frenchTime.getDate()).padStart(2, '0');
  const hours = String(frenchTime.getHours()).padStart(2, '0');
  const minutes = String(frenchTime.getMinutes()).padStart(2, '0');
  const seconds = String(frenchTime.getSeconds()).padStart(2, '0');
  
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};


export const LogForm: React.FC<LogFormProps> = ({ onLogCreated, loading }) => {
  // etats pour chaque filtre
  const [timestamp, setTimestamp] = useState<string>('');
  const [level, setLevel] = useState<string>('');
  const [message, setMessage] = useState<string>(''); // <string> precise que cet etat contiendra une string
  const [service, setService] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

//   const resetForm = () => {
//     setTimestamp('');
//     setLevel('');
//     setMessage('');
//     setService('');
// };

  // déclencher la recherche
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // empeche le comportement par defaut du formulaire qui est de recharger la page, primordial pour le projet !!
    setSuccessMessage('');
    setErrorMessage('');
    if (validateTimestamp(timestamp)) {
        setErrorMessage('Format timestamp invalide (ex: 2025-07-06T14:30:00)');
        return;
    }
    onLogCreated({ // appelle une fonction lors de la soumission d'une recherche
      timestamp: timestamp,
      level: level as LogLevel,
      message: message,
      service: service
    });
  };

  return (
    <div className="bg-white border rounded-lg px-8 py-6 mx-auto my-8 max-w-2xl">
    <h2 className="text-2xl font-medium mb-4">Soumission de log</h2>
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label htmlFor="Timestamp" className="block text-gray-700 font-medium mb-2"> 
                {/* htmlFor permet de connaître et de modifier l'attribut FOR d'une balise HTML */}
                Timestamp
            </label>
            <div className="flex gap-2">
                <input 
                    type="text" 
                    id="Timestamp" 
                    placeholder="2025-07-06T14:30:00"
                    value={timestamp}
                    onChange={(e) => setTimestamp(e.target.value)}
                    className="flex-1 border border-gray-400 p-2 rounded-lg focus:outline-none focus:border-blue-400" 
                    required />
                <button 
                    type="button" // important,  pas "submit" !
                    onClick={() => setTimestamp(generateCurrentTimestamp())}
                    className="flex-1 font-bold text-xl bg-white px-6 py-3 rounded-xl"
                >
                    Generer le timestamp
                </button>
            </div>
        </div>
        <div className="mb-4">
            <label htmlFor="Level" className="block text-gray-700 font-medium mb-2">Level</label>
            <select id="Level" name="Level"
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required> 
                {/* required pour rendre obligatoire ! */}
                <option value="">Select level</option>
                <option value="INFO">INFO</option>
                <option value="WARNING">WARNING</option>
                <option value="ERROR">ERROR</option>
                <option value="DEBUG">DEBUG</option>
            </select>
        </div>
        <div className="mb-4">
            <label htmlFor="Service" className="block text-gray-700 font-medium mb-2">Service</label>
            <select id="Service" name="Service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required>
                <option value="">Select service</option>
                <option value="api-gateway">api-gateway</option>
                <option value="user-service">user-service</option>
                <option value="payment-service">payment-service</option>
                <option value="background-worker">background-worker</option>
            </select>
        </div>
        <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-medium mb-2">Message</label>
            <textarea id="message" name="message" value={message}
            onChange={(e) => setMessage(e.target.value)}
                className="border border-gray-400 p-2 w-full rounded-lg focus:outline-none focus:border-blue-400" required rows={5}></textarea>
        </div>
        <div>
            <button type="submit" 
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}> {loading ? 'Soumission...' : 'Submit'} </button>
            {successMessage && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                {successMessage}
            </div>
            )}

            {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                {errorMessage}
    </div>
)}
        </div>
    </form>
</div>);
};

