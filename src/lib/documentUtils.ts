// src/lib/documentUtils.ts
'use client';

import type { ReferencedDocument } from '@/types/documents';
import { REFERENCED_DOCUMENTS_STORAGE_KEY } from '@/config/document-constants';

export const getReferencedDocuments = (): ReferencedDocument[] => {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(REFERENCED_DOCUMENTS_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

export const saveReferencedDocuments = (documents: ReferencedDocument[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(REFERENCED_DOCUMENTS_STORAGE_KEY, JSON.stringify(documents));
  window.dispatchEvent(new StorageEvent('storage', { key: REFERENCED_DOCUMENTS_STORAGE_KEY }));
};
