import { useState } from "react";

export const useGameState = () => {
  const [date, setDate] = useState("01 March, 2020");
  const [timeElapsed, setTimeElapsed] = useState(0); // milliseconds
  const [globalTemperature, setGlobalTemperature] = useState(0);
  const [money, setMoney] = useState(0);
  const [publicOpinion, setPublicOpinion] = useState(0);

  return [
    date,
    setDate,
    timeElapsed,
    setTimeElapsed,
    globalTemperature,
    setGlobalTemperature,
    money,
    setMoney,
    publicOpinion,
    setPublicOpinion
  ] as const;
};
