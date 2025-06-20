// src/lib/clubUtils.ts
'use client';

import {
  CLUB_PRESIDENT_NAME_STORAGE_KEY,
  CLUB_ADDRESS_STORAGE_KEY,
  CLUB_SIRET_STORAGE_KEY,
  CLUB_EMAIL_STORAGE_KEY,
  CLUB_FFF_AFFILIATION_STORAGE_KEY,
} from '@/config/club-constants';

export const getClubPresidentName = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CLUB_PRESIDENT_NAME_STORAGE_KEY) || '';
};
export const setClubPresidentName = (name: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLUB_PRESIDENT_NAME_STORAGE_KEY, name);
  window.dispatchEvent(new StorageEvent('storage', { key: CLUB_PRESIDENT_NAME_STORAGE_KEY, newValue: name }));
};

export const getClubAddress = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CLUB_ADDRESS_STORAGE_KEY) || 'MAIRIE DE VILLEMOUSTOUSSOU, 1 RUE DE LA MAIRIE, 11620 VILLEMOUSTOUSSOU'; // Default if not set
};
export const setClubAddress = (address: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLUB_ADDRESS_STORAGE_KEY, address);
  window.dispatchEvent(new StorageEvent('storage', { key: CLUB_ADDRESS_STORAGE_KEY, newValue: address }));
};

export const getClubSiret = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CLUB_SIRET_STORAGE_KEY) || 'NON APPLICABLE (Association Loi 1901 non assujettie)'; // Default if not set
};
export const setClubSiret = (siret: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLUB_SIRET_STORAGE_KEY, siret);
  window.dispatchEvent(new StorageEvent('storage', { key: CLUB_SIRET_STORAGE_KEY, newValue: siret }));
};

export const getClubEmail = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CLUB_EMAIL_STORAGE_KEY) || '';
};
export const setClubEmail = (email: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLUB_EMAIL_STORAGE_KEY, email);
  window.dispatchEvent(new StorageEvent('storage', { key: CLUB_EMAIL_STORAGE_KEY, newValue: email }));
};

export const getClubFffAffiliation = (): string => {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(CLUB_FFF_AFFILIATION_STORAGE_KEY) || 'N° Affiliation FFF non renseigné'; // Default if not set
};
export const setClubFffAffiliation = (affiliation: string): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CLUB_FFF_AFFILIATION_STORAGE_KEY, affiliation);
  window.dispatchEvent(new StorageEvent('storage', { key: CLUB_FFF_AFFILIATION_STORAGE_KEY, newValue: affiliation }));
};
