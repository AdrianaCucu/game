import { useState, useEffect, useCallback } from "react";

export const useGameState = () => {
  const [timeElapsed, setTimeElapsed] = useState(0); // milliseconds
  const [globalTemperature, setGlobalTemperature] = useState(0);
  const [money, setMoney] = useState(0);
  const [publicOpinion, setPublicOpinion] = useState(0);

  // const calcValues = useCallback(() => {
  //   setMoney(money => money + 20);
  // }, [money]);

  // useEffect(() => {
  //   calcValues();
  // }, [calcValues]);

  return [
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
