// src/lib/planningUtils.ts
'use client';

import type { PlanningEvent, CommuneDefinition, AnnexeDefinition, AnnexeEvent } from '@/types/planning';
import { 
    STADES_CONFIG_STORAGE_KEY, 
    DEFAULT_STADES_CONFIG,
    PLANNING_EVENTS_STORAGE_KEY,
    ANNEXE_DEFINITIONS_STORAGE_KEY,
    INITIAL_ANNEXE_DEFINITIONS,
    ANNEXE_EVENTS_STORAGE_KEY,
} from '@/config/planning-constants';

export const getStadesConfigFromStorage = (): CommuneDefinition[] => {
  if (typeof window === 'undefined') return [...DEFAULT_STADES_CONFIG];
  const stored = localStorage.getItem(STADES_CONFIG_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as CommuneDefinition[];
      if (Array.isArray(parsed) && parsed.every(c => c.name && Array.isArray(c.fields) && c.id && typeof c.colspan === 'number')) {
        const isValidConfig = parsed.every(commune =>
          commune.fields.every(field =>
            field.name && Array.isArray(field.units) && field.id && typeof field.colspan === 'number' &&
            field.units.every(unit => unit.headerName && unit.id)
          )
        );
        if (isValidConfig) return parsed;
      }
    } catch (e) { console.error("Failed to parse stades config from localStorage", e); }
  }
  const initialConfig = [...DEFAULT_STADES_CONFIG];
  localStorage.setItem(STADES_CONFIG_STORAGE_KEY, JSON.stringify(initialConfig));
  return initialConfig;
};

export const saveStadesConfigToStorage = (config: CommuneDefinition[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STADES_CONFIG_STORAGE_KEY, JSON.stringify(config));
  window.dispatchEvent(new StorageEvent('storage', { key: STADES_CONFIG_STORAGE_KEY }));
};

export const getPlanningEventsFromStorage = (): PlanningEvent[] => {
  if (typeof window === 'undefined') return [];
  const storedData = localStorage.getItem(PLANNING_EVENTS_STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData) as PlanningEvent[];
    } catch (error) {
      console.error("Error parsing planning events from localStorage:", error);
      return [];
    }
  }
  return [];
};

export const savePlanningEventsToStorage = (events: PlanningEvent[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PLANNING_EVENTS_STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new StorageEvent('storage', { key: PLANNING_EVENTS_STORAGE_KEY }));
};


// Annexe Utils
export const getStoredAnnexeDefinitions = (): AnnexeDefinition[] => {
  if (typeof window === 'undefined') return [...INITIAL_ANNEXE_DEFINITIONS];
  const stored = localStorage.getItem(ANNEXE_DEFINITIONS_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as AnnexeDefinition[];
      if (Array.isArray(parsed) && parsed.every(item => item.id && item.village && item.lieu)) {
        return parsed.sort((a, b) => `${a.village} - ${a.lieu}`.localeCompare(`${b.village} - ${b.lieu}`));
      }
    } catch (e) {
      console.error("Failed to parse annexe definitions from localStorage", e);
    }
  }
  localStorage.setItem(ANNEXE_DEFINITIONS_STORAGE_KEY, JSON.stringify(INITIAL_ANNEXE_DEFINITIONS));
  return [...INITIAL_ANNEXE_DEFINITIONS].sort((a, b) => `${a.village} - ${a.lieu}`.localeCompare(`${b.village} - ${b.lieu}`));
};

export const saveStoredAnnexeDefinitions = (definitions: AnnexeDefinition[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ANNEXE_DEFINITIONS_STORAGE_KEY, JSON.stringify(definitions));
  window.dispatchEvent(new StorageEvent('storage', { key: ANNEXE_DEFINITIONS_STORAGE_KEY }));
};

export const getAnnexeEventsFromStorage = (): AnnexeEvent[] => {
  if (typeof window === 'undefined') return [];
  const storedData = localStorage.getItem(ANNEXE_EVENTS_STORAGE_KEY);
  if (storedData) {
    try {
      return JSON.parse(storedData) as AnnexeEvent[];
    } catch (error) {
      console.error("Error parsing annexe events from localStorage:", error);
      return [];
    }
  }
  return [];
};

export const saveAnnexeEventsToStorage = (events: AnnexeEvent[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ANNEXE_EVENTS_STORAGE_KEY, JSON.stringify(events));
  window.dispatchEvent(new StorageEvent('storage', { key: ANNEXE_EVENTS_STORAGE_KEY }));
};

