import React from "react";
import { clsx } from "clsx";
import { AmbulanceItem } from "@/types";

/**
 * React.memo is a higher-order component (HOC) that wraps your functional component and tells React:

    > “Only re-render this component if its props actually change.”
  
  Normally in React:

  - If a parent re-renders → all children re-render (even if their props are identical).
  - With React.memo, React does a shallow comparison of props. If nothing changed → it skips re-rendering the child.

  🚑 Why it matters in your Ambulance feature

  Right now:
    - AmbulanceList consumes the context and maps over ambulances.
    - When you click one ambulance:
      - Context updates (ambulances array changes because of the new active state).
      - AmbulanceList re-renders.
      - All Ambulance components re-render, even though only 1 changed (active toggled).
  
  👉 If you wrap Ambulance in React.memo, React checks:
    - Did id, name, licensePlate, active, or onClickAmbulance change?
    - If no, skip rendering.
    - Only the clicked ambulance (where active flipped) will re-render.
 */
const Ambulance = React.memo(function Ambulance({
  id,
  name,
  licensePlate,
  active,
  onClickAmbulance,
}: AmbulanceItem): React.ReactNode {
  console.log("Render ambulance:", id); // 👀 Debug: see when it renders
  return (
    <div
      className={clsx(
        "cursor-pointer w-1/2 border-2 border-amber-400 flex justify-center p-1.5",
        { "bg-gray-500": active }
      )}
      onClick={(): void => {
        onClickAmbulance(id);
      }}
    >
      {`(${licensePlate}) ${name}`}
    </div>
  );
});
export default Ambulance;
