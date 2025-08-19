// Use 'use client' to avoid this error: You're importing a component that needs `useEffect`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the `"use client"` directive.
"use client";

import React, { useEffect } from "react";

import Ambulance from "./Ambulance";
import { useAmbulanceContext } from "@/context/AmbulanceContext";

const AmbulanceList = (): React.ReactNode => {
  const { ambulances, fetchAmbulances, clickAmbulance } = useAmbulanceContext();

  /* useEffect */
  // React Hook that lets you synchronize a component with an external system.
  /*
   * 1. Using an Immediately Invoked Function Expression (IIFE):
    useEffect(() => {
       (async () => {
         const res = await axios.get(APIEndpoints[apiEndpoint]);
         console.log(res);
       })();
    }, []);
    
    
   * 2. Using named async function which can be invoked when needed:
   * async function is defined and immediately called within the useEffect callback.
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await fetch('https://api.example.com/data');
          const data = await response.json();
          // Update state with data
        } catch (error) {
          // Handle error
        }
      };
      // other lines of code
      fetchData();
    }, []); // Empty dependency array means it runs once on mount

   *
   * 3. Defining an async function outside useEffect and calling it inside:
   * Similar to the async function approach, but the async function is declared separately for better readability, especially if it's reused.
   * 
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        return data; // Return the data to be used in useEffect
      } catch (error) {
        throw error; // Propagate the error
      }
    };

    useEffect(() => {
      fetchData()
        .then(data => {
          // Update state with data
        })
        .catch(error => {
          // Handle error
        });
    }, []); 
   */
  useEffect((): void => {
    void fetchAmbulances();
  }, [fetchAmbulances]);

  return (
    <div className="flex justify-center flex-col items-center">
      {ambulances.map(
        (ambulance): React.ReactNode => (
          <Ambulance
            key={ambulance.id}
            onClickAmbulance={clickAmbulance}
            {...ambulance}
          />
        )
      )}
    </div>
  );
};
export default AmbulanceList;
