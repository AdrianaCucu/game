import { useState } from "react";
import { Scenario } from "../scenarios/Scenario";
import { Continent } from "../models/Continent";

export const useScenarios = () => {
  const start: Array<Scenario> = [];
  const [scenarios, setScenarios] = useState(start);
  const [selectedScenario, setSelectedScenario] = useState(0); // scenario index
  const [selectedContinent, setSelectedContinent] = useState(
    new Continent([0, 0])
  );

  const [timing, setTiming] = useState(0);

  return [
    scenarios,
    setScenarios,
    timing,
    setTiming,
    selectedScenario,
    setSelectedScenario,
    selectedContinent,
    setSelectedContinent
  ] as const;
};
