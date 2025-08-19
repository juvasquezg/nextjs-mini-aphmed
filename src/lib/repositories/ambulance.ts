import { AmbulanceModel } from "@/types";

// TODO: Query the database to get the ambulances
const ambulances: AmbulanceModel[] = [
  {
    id: 1,
    name: "Ambulance 01",
    licensePlate: "OML340",
    crewMember1: "Esteban Mejía",
    crewMember2: "Andrea Peláez",
  },
  {
    id: 2,
    name: "Ambulance 02",
    licensePlate: "OML341",
    crewMember1: "Jorge Bustamante",
    crewMember2: "",
  },
  {
    id: 3,
    name: "Ambulance 03",
    licensePlate: "OML342",
    crewMember1: "Andrés Pérez",
    crewMember2: "Alejandra Dávila",
  },
];

// This is to simulate the ORM to make database queries.
export const TanchoORM = {
  models: {
    ambulance: {
      findAllAmbulances(): Promise<AmbulanceModel[]> {
        return new Promise((resolve): void => {
          setTimeout((): void => {
            resolve(ambulances);
          }, 2000);
        });
      },
    },
  },
};

const AmbulanceRepository = {
  async getAmbulances(): Promise<AmbulanceModel[]> {
    const { models } = TanchoORM;
    const result = await models.ambulance.findAllAmbulances();
    return result;
  },
};

export default AmbulanceRepository;
