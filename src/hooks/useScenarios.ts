import { useState } from "react";
import { CoalPowerStation } from "../scenarios/CoalPowerStation";
import { Scenario } from "../scenarios/Scenario";

export const useScenarios = () => {
    const start: Array<Scenario> = [];
    const [scenarios, setScenarios] = useState(start);
    const [selectedScenario, setSelectedScenario] = useState(0); // scenario index

    const [timing, setTiming] = useState(0);

    return [
        scenarios, 
        setScenarios, 
        timing, 
        setTiming, 
        selectedScenario, 
        setSelectedScenario
    ] as const;
};
