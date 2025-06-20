'use client';

import { ARTICLE_DEFINITIONS_STORAGE_KEY } from './page-constants';
import { INITIAL_STOCK_EQUIPEMENTS, type ItemCategoryChoice, APPAREL_SIZES, SOCK_SIZES, FOOD_LOCATIONS, SPORTIF_LOCATIONS } from '@/config/stock-constants';
import type { EquipementItem } from './page';

const getDynamicSizesOrLocations = (category: ItemCategoryChoice | undefined): readonly string[] => {
  if (category === 'apparel') return APPAREL_SIZES;
  if (category === 'socks') return SOCK_SIZES;
  if (category === 'food') return FOOD_LOCATIONS;
  if (category === 'sportif') return SPORTIF_LOCATIONS;
  return [];
};

export const getStoredArticleDefinitions = (): EquipementItem[] => {
  if (typeof window === 'undefined') {
    return [...INITIAL_STOCK_EQUIPEMENTS].map(def => ({
      id: def.id || crypto.randomUUID(),
      name: def.name,
      itemCategory: def.itemCategory,
      hasSizeVariants: def.hasSizeVariants,
      availableSizes: def.availableSizes || getDynamicSizesOrLocations(def.itemCategory),
      supplier: def.supplier,
      standardItemDesignatedSection: def.standardItemDesignatedSection,
    })).sort((a, b) => a.name.localeCompare(b.name));
  }
  const stored = localStorage.getItem(ARTICLE_DEFINITIONS_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored) as EquipementItem[];
      if (Array.isArray(parsed) && parsed.every(item => item.id && item.name)) {
        return parsed.map(p => ({
          ...p,
          availableSizes: p.availableSizes || getDynamicSizesOrLocations(p.itemCategory)
        })).sort((a, b) => a.name.localeCompare(b.name));
      }
    } catch (e) {
      console.error("Failed to parse article definitions from localStorage", e);
    }
  }
  const initialDefinitions = [...INITIAL_STOCK_EQUIPEMENTS].map(def => ({
    id: def.id || crypto.randomUUID(),
    name: def.name,
    itemCategory: def.itemCategory,
    hasSizeVariants: def.hasSizeVariants,
    availableSizes: def.availableSizes || getDynamicSizesOrLocations(def.itemCategory),
    supplier: def.supplier,
    standardItemDesignatedSection: def.standardItemDesignatedSection,
  })).sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem(ARTICLE_DEFINITIONS_STORAGE_KEY, JSON.stringify(initialDefinitions));
  return initialDefinitions;
};

export const saveStoredArticleDefinitions = (definitions: EquipementItem[]) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(ARTICLE_DEFINITIONS_STORAGE_KEY, JSON.stringify(definitions));
  window.dispatchEvent(new StorageEvent('storage', { key: ARTICLE_DEFINITIONS_STORAGE_KEY }));
};
