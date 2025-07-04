import { SearchFilters, Log } from './../types/log.types';
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
    }
});

// Fonction de recherche
export const searchLogs = async (filters: SearchFilters): Promise<Log[]> => {
    const response = await instance.get("logs/search", {
        param: {
        q: filters.q,
        level: filters.level,
        service: filters.service
        }
    })
  return response.data
};

// Fonction de création
export const createLog = async (log: Omit<Log, 'id'>): Promise<Log> => { // Omit permet de ne pas recuperer l'id
  // TODO: Appeler POST /logs
  // TODO: Retourner le log avec l'ID
};