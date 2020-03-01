import { useState } from "react";

export const useContinents = () => {
  const [temperature, setTemperature] = useState(0);

  return [temperature, setTemperature] as const;
};
