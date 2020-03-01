import React from 'react';
import './App.css';

import Map from './components/Map';
import { useInterval } from './hooks/useInterval';
import { useGameState } from './hooks/useGameState';
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

  console.log("re-render");

  const startGame = () => {
    TICK_INTERVAL = 100;
    setTimeElapsed(0.0);
    setMoney(1000000.0);
    setGlobalTemperature(25.0);
    setPublicOpinion(0.0);

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
  }

  let scenarios: Array<Scenario> = [];

  function createScenario() {
    const scenario = new CoalPowerStation();
    scenarios = [...scenarios, scenario];
    console.log(scenarios)
  }

  const continentTemps = {
    "Europe": 0,
    "Asia": 0.5,
    "Oceania": 1.0,
    "Africa": 1.4,
    "South America": 1.8,
    "North America": 2.4,
  }

  return (
    <div className="App">
      Big Foil
      <Map continentTemps={continentTemps} />
      <button onClick={createScenario}>create coal bois</button>
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
