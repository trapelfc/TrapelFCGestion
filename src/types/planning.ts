// src/types/planning.ts

export interface PlannableUnit {
  headerName: string;
  id: string;
}

export interface FieldDefinition {
  name: string;
  units: PlannableUnit[];
  colspan: number;
  id: string;
}

export interface CommuneDefinition {
  name: string;
  fields: FieldDefinition[];
  colspan: number;
  id: string;
}

export interface PlanningEvent {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  stadeUnitId: string; // ID of PlannableUnit or FieldDefinition if it's a full field booking
  categoryName: string;
  type: 'entrainement' | 'match';
  isRecurrent?: boolean;
  endDate?: string | null; // YYYY-MM-DD or null
  recurrenceId?: string; // ID linking recurrent events
  recurrenceType?: 'weekly' | 'biweekly';
  typePlateauCriterium?: 'plateau' | 'criterium' | null;
  plateauCriteriumNumber?: number;
  matchId?: string; // ID to link all units of a single match booked on a full field
}

export interface AnnexeDefinition {
  id: string;
  village: string;
  lieu: string;
}

export interface AnnexeEvent {
  id: string;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:MM
  endTime: string; // HH:MM
  annexeId: string; // ID de l'AnnexeDefinition
  village: string; 
  lieu: string;   
  eventName: string;
}
