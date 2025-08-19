import React from "react";

import { AmbulanceList } from "@/ui/Ambulance";
import { DispatchForm } from "@/ui/Dispatch";
import { AmbulanceProvider } from "@/context/AmbulanceContext";

const Dispatch = (): React.ReactNode => {
  return (
    <div>
      <h2>Dispatch</h2>
      <div className="grid grid-cols-2">
        <AmbulanceProvider>
          <AmbulanceList />
          <DispatchForm />
        </AmbulanceProvider>
      </div>
    </div>
  );
};
export default Dispatch;
