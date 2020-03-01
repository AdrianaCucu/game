import React from 'react';
import styled from "styled-components";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import './App.css';

import { Marker as CustomMarker } from './utils/types';
import { useInterval } from './hooks/useInterval';
import { useGameState } from './hooks/useGameState';
import { useScenarios } from './hooks/useScenarios';
import { CoalPowerStation } from './scenarios/CoalPowerStation';
import { Deforestation } from './scenarios/Deforestation';
import { Scenario } from './scenarios/Scenario';
import { europe, asia, oceania, nAmerica, africa, sAmerica } from './models/Continent';

import Win from './components/Win';
import { tempToColor, getRandomInt } from './utils/utils';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const StyledMap = styled.div`
  width: 50%;
  height: auto;
`;

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

  const [
    scenarios,
    setScenarios,
    timing,
    setTiming,
    selectedScenario,
    setSelectedScenario
  ] = useScenarios();

  console.log("re-render");

  const startGame = () => {
    TICK_INTERVAL = 100;
    setTimeElapsed(0.0);
    setMoney(1000000.0);
    setGlobalTemperature(0.0);
    setPublicOpinion(0.0);
    setTiming(0);

    console.log(money);
  };

  useInterval(() => {
    tick();
  }, TICK_INTERVAL || 999999999) // 11 days lol

  /// Update the game state
  function tick() {
    setTimeElapsed(timeElapsed => timeElapsed + (TICK_INTERVAL || 0));
    //setGlobalTemperature(globalTemperature => globalTemperature + 0.1);
    //setMoney(money => money + 100);
    //setPublicOpinion(0);
    createButton();
    let globalTempChange = 0;
    let publicOpinionChange = 0;
    let moneyChange = 0;
    for (let scenario of scenarios) {
      const [globalTemp, pubOpinion, tMoney] = scenario.update(timeElapsed, globalTemperature, publicOpinion, money);
      globalTempChange += globalTemp;
      publicOpinionChange += pubOpinion;
      moneyChange += tMoney;
    }
    setGlobalTemperature(globalTemperature => globalTemperature + globalTempChange);
    setMoney(money => money + moneyChange);
    setPublicOpinion(publicOpinion => publicOpinion + publicOpinionChange);

    if (globalTemperature >= 100) TICK_INTERVAL = 999999999;
  }

  function createButton() {
    console.log(scenarios)
    setTiming(timing => timing === 59 ? timing = 0 : timing + 1);
    if (timing === 40) {
      let index = getRandomInt(0, 1);
      setSelectedScenario(index);
    }
  }

  const continentTemps = {
    "Europe": 2.5,
    "Asia": 1.5,
    "Oceania": 1.0,
    "Africa": 1.4,
    "South America": 1.8,
    "North America": 2.4,
  }

  // Randomly choose between scenarios.
  let possibleScenarios = [new CoalPowerStation(), new Deforestation()];
  let scenario: Scenario = possibleScenarios[selectedScenario];

  let markers: Array<CustomMarker> = [
    {
      markerOffset: -30,
      name: scenario ? scenario.name : "",
      coordinates: africa.coordinates
    },
  ];

  function createScenario() {
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
    setTiming(0);
  }

  return (
    <div className="App">
      Big Foil
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div id="opinion">
          <div id="opinionBar" style={{ height: `${publicOpinion}%`, color: "black" }}>Public opinion: {publicOpinion.toFixed(2)}%</div>
        </div>
        <StyledMap>
          <ComposableMap>
            <Geographies geography={geoUrl}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const color = geo.properties.continent ? tempToColor(continentTemps, geo.properties.continent) : "gray";

                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      style={{
                        default: {
                          fill: `${color}`,
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        hover: {
                          fill: `${color}`,
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        },
                        pressed: {
                          fill: `${color}`,
                          stroke: "#607D8B",
                          strokeWidth: 0.75,
                          outline: "none"
                        }
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {(timing > 40) ?
              markers.map(({ name, coordinates, markerOffset }) => (
                <Marker onMouseDown={createScenario} coordinates={coordinates}>
                  <g
                    fill="red"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="translate(-12, -24)"
                  >
                    <circle cx="12" cy="10" r="3" />
                    <path d="M12 21.7C17.3 17 20 13 20 10a8 8 0 1 0-16 0c0 3 2.7 6.9 8 11.7z" />
                  </g>
                  <text
                    textAnchor="middle"
                    y={markerOffset}
                    style={{ fontFamily: "system-ui", fill: "black", color: "black" }}
                  >
                    {name}
                  </text>
                </Marker>
              ))
              : ""}
          </ComposableMap>
        </StyledMap>

        <div id="myProgress">
          <div id="myBar" style={{ height: `${globalTemperature}%`, color: "black" }}>Progress: {globalTemperature.toFixed(2)}%</div>
        </div>
      </div>

      {(timeElapsed === 0) ?
        <button className="button" onClick={startGame}>Start Game</button> : ""
      }

      <div style={{ display: "flex", justifyContent: "center", flexDirection: "row" }}>
        <div style={{ width: "40vw" }}>
          Your resources:
          <ul>
            {scenarios.map((scenario: Scenario) =>
              <li>
                {scenario.name}
              </li>
            )}
          </ul>
        </div>
        <div style={{ width: "40vw" }}>
          <span>Money: {money}</span>
          <br />
          <div>{`Date: ${timeElapsed}`}</div>
          <br />
        </div>
      </div>

      {
        globalTemperature >= 100 ? <Win duration={timeElapsed} /> : ""
      }

    </div>
  );
}

export default App;
