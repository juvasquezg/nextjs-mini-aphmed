import React from "react";

const DispatchForm = (): React.ReactNode => {
  return (
    <div className="flex justify-start flex-col items-center">
      <div>
        <label htmlFor="crew1">Crew1: </label>
        <input
          className="border-black border"
          id="crew1"
          type="text"
          value="Carlos Aguilar"
          readOnly
        />
      </div>
      <div>
        <label htmlFor="crew2">Crew2: </label>
        <input
          className="border-black border"
          id="crew2"
          type="text"
          value="Esteban Mejía"
          readOnly
        />
      </div>
    </div>
  );
};
export default DispatchForm;
