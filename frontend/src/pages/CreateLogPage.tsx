import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogForm } from '../components/LogForm';
import { useLogContext } from '../contexts/LogContext';
import type { Log } from '../types/log.types';

export const CreateLogPage: React.FC = () => {
  const navigate = useNavigate(); // permet de naviguer vers d'autres pages programmatiquement
  const { addLog, loading } = useLogContext(); // recupere la fonction d'ajout depuis le contexte
  const [successMessage, setSuccessMessage] = useState<string>(''); // message de succes local a cette page
  const [errorMessage, setErrorMessage] = useState<string>(''); // message d'erreur local a cette page

  const handleLogCreated = async (log: Omit<Log, 'id'>) => { // fonction appellee quand le formulaire est soumis
    try {
      setSuccessMessage(''); // reset des messages precedents
      setErrorMessage('');
      
      await addLog(log); // appelle la fonction du contexte pour ajouter le log
      
      setSuccessMessage('Log créé avec succès !');
      
      // Redirection après 2 secondes
      setTimeout(() => {
        navigate('/'); // redirection vers la page d'accueil
      }, 2000);
      
    } catch (error) {
      setErrorMessage('Erreur lors de la création du log');
      console.error('Error creating log:', error);
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Créer un Nouveau Log
        </h2>
        <p className="text-gray-600">
          Ajoutez manuellement un nouveau log à votre système de surveillance.
        </p>
      </div>

      {/* Success/Error Messages */}
      {successMessage && ( // affiche le message de succes seulement si il existe
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-green-600 font-medium">
              Log créé avec succès !
            </div>
          </div>
          <p className="text-sm text-green-600 mt-1">
            Redirection vers la liste des logs...
          </p>
        </div>
      )}

      {errorMessage && ( // affiche le message d'erreur seulement si il existe
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="text-red-600 font-medium">
            Erreur lors de la création du log
          </div>
        </div>
      )}

      {/* Form */}
      <div className="bg-white p-6 rounded-lg shadow border">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Informations du Log
        </h3>
        <LogForm 
          onLogCreated={handleLogCreated} // passe la fonction qui gere la creation
          loading={loading}
        />
      </div>

      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-900 mb-2">
          Aide
        </h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• Le timestamp doit être au format ISO 8601 (ex: 2025-07-06T14:30:00)</li>
          <li>• Utilisez le bouton "Générer" pour créer automatiquement le timestamp actuel</li>
          <li>• Le service doit suivre le format "word-word" (ex: user-service)</li>
          <li>• Après création, vous serez redirigé vers la liste des logs</li>
        </ul>
      </div>
    </div>
  );
};

export default CreateLogPage;