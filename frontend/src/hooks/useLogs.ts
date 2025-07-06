import { useState, useEffect } from 'react';
import { Log, SearchFilters } from '../types/log.types';
import { searchLogs as apiSearchLogs, createLog as apiCreateLog } from '../services/api'; // "as" pour renommer et eviter le conflit de noms de fonctions

export const useLogs = () => { // usestate return un tableau avec 2 items, le current state et la fonction qui permet de changer cet etat
  const [logs, setLogs] = useState<Log[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fonctions à implémenter
  const loadLogs = async () => {
    try { // try essaye les operations
        setLoading(true); // initialisation du chargement
        setError(null); //error set a null pour etre sur de bien gerer les erreurs ensuite
        const actualLogs = await apiSearchLogs({}); // appels API sans les filtres pour tout afficher
        setLogs(actualLogs);
    } catch (error){ // catch une erreur si il y en a
        setError("Erreur lors du chargement des logs");
    }
    finally { // se produit dans tout les cas
        setLoading(false); // chargement termine
    }
  };
  useEffect(() => {
    loadLogs(); // charge les logs 
  }, []) // "[]" a pour effet de ne se produire au'qu demarrage !

  const searchLogs = async (filters: SearchFilters) => {
    try {
        setLoading(true);
        setError(null);
        const searchedLogs = await apiSearchLogs({
            level: filters.level,
            q: filters.q,
            service: filters.service
        });
        setLogs(searchedLogs);
    } catch (error){ // catch une erreur si il y en a
        setError("Erreur lors du chargement des logs");
    }
    finally { // se produit dans tout les cas
        setLoading(false); // chargement termine
    }
  };
  const addLog = async (log: Omit<Log, 'id'>) => { // Omit permet de ne pas avoir d'id necessaire puisque ce sera OpenSearch qui le creera
    try {
        setLoading(true);
        setError(null);
        const addedLog = await apiCreateLog({
            timestamp: log.timestamp,
            level: log.level,
            message: log.message,
            service: log.service
        }); // l'ordre dans setLogs est important car l'on veut ajouter de maniere decroissante!
        setLogs([addedLog, ...logs]); // "..." permet de creer un nouvel array en recuperant tout de l'ancien et en ajoutant ce que l'on veut y ajouter
    } catch (error){ // catch une erreur si il y en a
        setError("Erreur lors du l'ajout du log");
    }
    finally { // se produit dans tout les cas
        setLoading(false); // chargement termine
    }
};
return { logs, loading, error, loadLogs, searchLogs, addLog };}
