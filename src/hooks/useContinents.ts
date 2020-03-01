import { useState } from "react";

export const useContinents = () => {
  const [temperature, setTemperature] = useState({
    "Europe": 0,
    "Asia": 0,
    "Oceania": 0,
    "Africa": 0,
    "South America": 0,
    "North America": 0,
  });

  return [temperature, setTemperature] as const;
};
