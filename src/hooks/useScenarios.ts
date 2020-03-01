import { useState } from "react";
import { CoalPowerStation } from "../scenarios/CoalPowerStation";
import { Scenario } from "../scenarios/Scenario";

export const useScenarios = () => {
    const start: Array<Scenario> = [];
    const [scenarios, setScenarios] = useState(start);

    const [timing, setTiming] = useState(0);

    return [
        scenarios, setScenarios, timing, setTiming
    ] as const;
};
