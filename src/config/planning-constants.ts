// src/config/planning-constants.ts
import type { CommuneDefinition, AnnexeDefinition } from '@/types/planning';

export const STADES_CONFIG_STORAGE_KEY = 'TRAPEL_FC_STADES_CONFIG_DATA';
export const PLANNING_EVENTS_STORAGE_KEY = 'TRAPEL_FC_PLANNING_EVENTS_DATA';
export const ANNEXE_EVENTS_STORAGE_KEY = 'TRAPEL_FC_ANNEXE_EVENTS_DATA';
export const ANNEXE_DEFINITIONS_STORAGE_KEY = 'TRAPEL_FC_ANNEXE_DEFINITIONS_DATA';


export const DEFAULT_STADES_CONFIG: CommuneDefinition[] = [
  {
    id: "commune_villemoustoussou",
    name: "Villemoustoussou",
    fields: [
      {
        id: "field_vm_honneur",
        name: "Terrain Honneur",
        units: [
          { headerName: "Zone Fond", id: "unit_vm_honneur_fond" },
          { headerName: "Zone terrain haut", id: "unit_vm_honneur_haut" },
        ],
        colspan: 2,
      },
      {
        id: "field_vm_haut",
        name: "Terrain du haut",
        units: [
          { headerName: "Terrain du haut", id: "unit_vm_terrain_haut_unite" },
        ],
        colspan: 1,
      },
    ],
    colspan: 3,
  },
  {
    id: "commune_pennautier",
    name: "Pennautier",
    fields: [
      {
        id: "field_pen_honneur",
        name: "Terrain Honneur",
        units: [
          { headerName: "Zone Gauche", id: "unit_pen_honneur_gauche" },
          { headerName: "Zone Maison", id: "unit_pen_honneur_maison" },
        ],
        colspan: 2
      },
      {
        id: "field_pen_stab",
        name: "Terrain stabilisé",
        units: [{ headerName: "Terrain stabilisé", id: "unit_pen_stabilise" }],
        colspan: 1
      },
    ],
    colspan: 3,
  },
  {
    id: "commune_villegailhenc",
    name: "Villegailhenc",
    fields: [
       {
        id: "field_ville_entrainement",
        name: "Terrain d'entrainement",
        units: [
          { headerName: "Zone Maison", id: "unit_ville_ent_maison" },
          { headerName: "Zone Riviere", id: "unit_ville_ent_riviere" },
        ],
        colspan: 2
      },
      {
        id: "field_ville_a8",
        name: "Terrain à 8",
        units: [
          { headerName: "Terrain à 8", id: "unit_ville_terrain_a_8" },
        ],
        colspan: 1,
      },
      {
        id: "field_ville_honneur_main_new",
        name: "Terrain Honneur",
        units: [
          { headerName: "Terrain Honneur", id: "unit_ville_honneur_main_new_unit" }
        ],
        colspan: 1,
      }
    ],
    colspan: 4,
  },
  {
    id: "commune_malves",
    name: "Malves",
    fields: [
      {
        id: "field_malves_honneur",
        name: "Terrain d'honneur",
        units: [
          { headerName: "Zone Entrée", id: "unit_malves_honneur_entree" },
          { headerName: "Zone Fond", id: "unit_malves_honneur_fond" },
        ],
        colspan: 2
      },
    ],
    colspan: 2,
  },
];

export const INITIAL_ANNEXE_DEFINITIONS: AnnexeDefinition[] = [
  { id: 'salle_reunion_vm', village: 'Villemoustoussou', lieu: 'Salle de Réunion' },
  { id: 'club_house_vm', village: 'Villemoustoussou', lieu: 'Club House' },
  { id: 'bureau_principal_vm', village: 'Villemoustoussou', lieu: 'Bureau Principal' },
];
