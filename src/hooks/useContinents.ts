import { useState } from "react";

export const useContinents = () => {
  const [temperature, setTemperature] = useState({
    europe: 0,
    nAmerica: 0,
    sAmerica: 0,
    asia: 0,
    oceania: 0,
    africa: 0
  });

  return [temperature, setTemperature] as const;
};
