import { SearchFilters, Log } from './../types/log.types';
import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json'
    }
});

// fonction de recherche
export const searchLogs = async (filters: SearchFilters): Promise<Log[]> => {
    const response = await instance.get("logs/search", {
        params: {
        q: filters.q,
        level: filters.level,
        service: filters.service
        }
    })
  return response.data
};

// fonction de création
export const createLog = async (log: Omit<Log, 'id'>): Promise<Log> => { // Omit permet de construire un model sans le keyword specifie
  const response = await instance.post("/logs", log) // timestamp, service etc mais sans id
  return response.data
};