import { useState } from "react";

export const useGameState = () => {
  const [timeElapsed, setTimeElapsed] = useState(0); // milliseconds
  const [globalTemperature, setGlobalTemperature] = useState(0);
  const [money, setMoney] = useState(0);
  const [publicOpinion, setPublicOpinion] = useState(0);

  return [
    timeElapsed,
    setTimeElapsed,
    globalTemperature,
    setGlobalTemperature,
    money,
    setMoney,
    publicOpinion,
    setPublicOpinion
  ];
};
