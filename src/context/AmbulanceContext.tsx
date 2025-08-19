// TODO: Comment this out to learn React 19
/* eslint-disable react-x/no-context-provider */
/* eslint-disable react-x/no-use-context */

// Use 'use client' to avoid this error: You're importing a component that needs `createContext`. This React Hook only works in a Client Component. To fix, mark the file (or its parent) with the `"use client"` directive.
"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { Ambulance, AmbulanceModel } from "@/types";
import { AmbulanceRepository } from "@/lib/repositories";

interface AmbulanceContextData {
  ambulances: (AmbulanceModel & Ambulance)[];
  fetchAmbulances: () => Promise<void>;
  clickAmbulance: (id: number) => void;
}

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type AmbulanceProviderProps = {
  children: React.ReactNode;
};

type AmbulanceState = Omit<
  AmbulanceContextData,
  "fetchAmbulances" | "clickAmbulance"
>;

/** ----- Initial State: Included 'fetchAmbulances' ----- **/
// Include 'fetchAmbulances' in the initial state to maintain type consistency.
// The 'fetchAmbulances' method will be called from a React Component, if it is not in the initial state, this lead to potential runtime errors - (Context).undefined
// Without including fetchAmbulances in the initial state, you're technically creating a context that initially doesn't match its own type definition
const initialState: AmbulanceContextData = {
  ambulances: [],
  fetchAmbulances: async (): Promise<void> => {
    console.error("fetchAmbulances called before provider initialization");
    return Promise.reject(
      new Error("fetchAmbulances must be used within AmbulanceProvider")
    );
  },
  clickAmbulance: (): void => {
    console.error("clickAmbulance called before provider initialization");
  },
};

const AmbulanceContext = createContext<AmbulanceContextData>(initialState);

export const useAmbulanceContext = (): AmbulanceContextData => {
  const ambulanceData = useContext(AmbulanceContext);

  return ambulanceData;
};

export const AmbulanceProvider = ({
  children,
}: Readonly<AmbulanceProviderProps>): React.JSX.Element => {
  const [ambulanceData, setAmbulanceData] = useState<AmbulanceState>({
    ambulances: initialState.ambulances,
  });

  /* ----- useCallback ----- */
  // Memoized Function: Using useCallback to stabilize the fetchAmbulances function
  // Function is memoized and doesn't recreate on every render
  /*
   * Why useCallback helps performance:
   * Dependency array
   * [] // Empty
   *
   * 1. Stable Function Identity:
   * - Without useCallback, React creates a NEW function instance on every render
   * - With useCallback, React returns the SAME function instance across renders
   *
   * 2. Prevents Unnecessary Re-renders:
   * - When this function is passed to child components via props/context,
   *   they won't re-render unnecessarily since the function reference stays the same
   *
   * 3. Optimization for Dependency Arrays:
   * - When this function is used in other hooks' dependency arrays (like useEffect),
   *   the stable reference prevents those hooks from re-running unnecessarily
   *
   * 4. Empty Dependency Array:
   * - The empty [] means this callback never needs to be recreated
   * - It can safely reference values from initial render via closure
   *   (like setAmbulanceData which is stable from useState)
   */
  const fetchAmbulances = useCallback(async (): Promise<void> => {
    // TODO: fetch the endpoint instead of calling the server repository here
    const ambulanceFound = await AmbulanceRepository.getAmbulances();
    const ambulanceList = ambulanceFound.map(
      (ambulance): Ambulance & AmbulanceModel => ({
        ...ambulance,
        active: false,
      })
    );
    setAmbulanceData({ ambulances: ambulanceList });
  }, []);

  /* ----- useCallback ----- */
  // Function is memoized and doesn't recreate on every render
  const clickAmbulance = useCallback((id: number): void => {
    setAmbulanceData(
      (prev): AmbulanceState => ({
        ...prev,
        ambulances: prev.ambulances.map(
          (ambulance): Ambulance & AmbulanceModel =>
            ambulance.id === id
              ? { ...ambulance, active: true }
              : { ...ambulance, active: false }
        ),
      })
    );
  }, []);

  /* ----- useMemo ----- */
  /*
   * Why useMemo helps performance:
   * Dependency array
   * [ambulanceData.ambulances, fetchAmbulances]
   *
   * 1. Stable Object Reference:
   * - Without useMemo, a NEW object is created on every render
   * - With useMemo, the SAME object reference is returned when dependencies don't change
   *
   * 2. Context Optimization:
   * - React Context triggers re-renders in consumers when the context value reference changes
   * - Memoization prevents unnecessary re-renders when the actual data hasn't changed
   *
   * 3. Dependency Tracking:
   * - Only recreates the object when either:
   *   a) ambulances array changes (new data fetched)
   *   b) fetchAmbulances function changes (though it's stable due to useCallback)
   *
   * 4. Memory Efficiency:
   * - Avoids creating temporary objects that need garbage collection
   * - Reuses the same object reference between renders
   *
   * 5. Combined with useCallback:
   * - fetchAmbulances is already memoized, so it won't trigger recreations
   * - Only ambulanceData.ambulances changes will trigger a new context value
   */
  const value = useMemo(
    // The function that returns the context value object
    (): AmbulanceContextData => ({
      ambulances: ambulanceData.ambulances,
      fetchAmbulances,
      clickAmbulance,
    }),
    [ambulanceData.ambulances, fetchAmbulances, clickAmbulance]
  );

  return (
    <AmbulanceContext.Provider value={value}>
      {children}
    </AmbulanceContext.Provider>
  );
};
