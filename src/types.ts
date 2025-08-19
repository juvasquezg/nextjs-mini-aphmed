export interface AmbulanceInfo {
  id: number;
  name: string;
  licensePlate: string;
}

export interface AmbulanceItem extends AmbulanceInfo {
  onClickAmbulance: (id: number) => void;
  active: boolean;
}

export interface Crew {
  crewMember1: string;
  crewMember2: string;
}

export type Ambulance = Omit<AmbulanceItem, "onClickAmbulance">;

export type AmbulanceModel = AmbulanceInfo & Crew;
