import type { LogLevel } from "./logLevel";

export interface Log {
  timestamp: string;
  level: LogLevel;
  message: string;
  service: string;
  id: string;
}

export interface SearchFilters {
  q?: string;   // "?" rends le type optionnel
  level?: string;
  service?: string;
  size?: number;
}

export interface ApiResponse<T> {
    data: T;    // stocker les donnees de maniere flexible avec T (any)
    loading: boolean;   
    error?: string; // "?" rends le type optionnel c'est primordial
}