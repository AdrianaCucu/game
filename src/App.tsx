import React from 'react';
import './App.css';

import Map from './components/Map';
import { useInterval } from './hooks/useInterval';
import { useGameState } from './hooks/useGameState';
import { useScenarios } from './hooks/useScenarios'
import { CoalPowerStation } from './scenarios/CoalPowerStation';
import { Scenario } from './scenarios/Scenario';

let TICK_INTERVAL: number | null = null; // 100 milliseconds

function App() {
  const [
    timeElapsed,
    setTimeElapsed,
    globalTemperature,
    setGlobalTemperature,
    money,
    setMoney,
    publicOpinion,
    setPublicOpinion
  ] = useGameState();

  const [scenarios, setScenarios, timing, setTiming] = useScenarios();

  console.log("re-render");

  const startGame = () => {
    TICK_INTERVAL = 100;
    setTimeElapsed(0.0);
    setMoney(1000000.0);
    setGlobalTemperature(25.0);
    setPublicOpinion(0.0);
    setScenarios([]);
    setTiming(0);

    console.log(money);
  };

  useInterval(() => {
    tick();
  }, TICK_INTERVAL || 999999999) // 11 days lol

  /// Update the game state
  function tick() {
    setTimeElapsed(timeElapsed => timeElapsed + (TICK_INTERVAL || 0));
    setGlobalTemperature(globalTemperature => globalTemperature + 0.1);
    setMoney(money => money + 100);
    setPublicOpinion(0);
    createButton();
  }

  function createButton() {
    setTiming(timing => timing === 49 ? timing = 0 : timing + 1);
  }

  function createScenario() {
    const scenario = new CoalPowerStation();
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
    console.log(scenarios);
  }

  return (
    <div className="App">
      Big Foil
      <Map displayMarker={(timing > 20) ? true : false} />
      <div>
        Your resources:
        <ul>
          {scenarios.map((scenario: Scenario) =>
            <li>
              {scenario.name}
            </li>
          )}
        </ul>
      </div>
      <span>Moneys: {money}</span>
      <div>{`Date: ${timeElapsed}`}</div>
      <div>{`Temperature: ${globalTemperature}`}</div>
      {(timeElapsed === 0) ?
        <button onClick={startGame}>start</button> : ""
      }
    </div>
  );
}

export default App;
