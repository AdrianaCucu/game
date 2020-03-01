import React from 'react';
import styled from "styled-components";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import './App.css';

import { useInterval } from './hooks/useInterval';
import { useGameState } from './hooks/useGameState';
import { useScenarios } from './hooks/useScenarios';
import { CoalPowerStation } from './scenarios/CoalPowerStation';
import { Scenario } from './scenarios/Scenario';
import { europe, asia, oceania, nAmerica, africa, sAmerica } from './models/Continent';

import Win from './components/Win';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const StyledMap = styled.div`
  width: 70%;
  height: auto;
`;

interface ContinentTemps {
  [key: string]: number;
}

const COLORS = {
  darkBlue: "#2e86de",
  lightBlue: "#48dbfb",
  lightOrange: "#feca57",
  orange: "#ff9f43",
  lightRed: "#ff6b6b",
  red: "#ee5253",
  darkRed: "#b33939",
  gray: "gray"
}

function tempToColor(continentTemps: ContinentTemps, continent: string): String {
  if (continentTemps[continent] != null) {
    const temp = continentTemps[continent];

    if (temp <= 0.0) {
      return COLORS.darkBlue;
    } else if (temp > 0 && temp <= 0.6) {
      return COLORS.lightBlue;
    } else if (temp > 0.6 && temp <= 1.0) {
      return COLORS.lightOrange;
    } else if (temp > 1.0 && temp <= 1.4) {
      return COLORS.orange;
    } else if (temp > 1.4 && temp <= 1.8) {
      return COLORS.lightRed;
    } else if (temp > 1.8 && temp <= 2.4) {
      return COLORS.red;
    } else if (temp > 2.4 && temp <= 3.0) {
      return COLORS.darkRed;
    } else {
      return COLORS.gray;
    }
  }
  return COLORS.gray;
}

interface Marker {
  markerOffset: number;
  name: String;
  coordinates: [number, number]
};

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
    let globalTempChange = 0;
    let publicOpinionChange = 0;
    let moneyChange = 0;
    for (let scenario of scenarios) {
      const [globalTemp, pubOpinion, tMoney] = scenario.update(timeElapsed, globalTemperature, publicOpinion, money) ;
      globalTempChange += globalTemp;
      publicOpinionChange += pubOpinion;
      moneyChange += tMoney;
    }
    setGlobalTemperature(globalTemperature => globalTemperature + globalTempChange);
    setMoney(money => money + moneyChange);
    setPublicOpinion(publicOpinion => publicOpinion + publicOpinionChange);
  }

  function createButton() {
    console.log(scenarios)
    setTiming(timing => timing === 49 ? timing = 0 : timing + 1);
  }

  const continentTemps = {
    "Europe": 2.5,
    "Asia": 1.5,
    "Oceania": 1.0,
    "Africa": 1.4,
    "South America": 1.8,
    "North America": 2.4,
  }

  // Should have the computer randomly choose between scenarios.
  let scenario: Scenario = new CoalPowerStation();

  let markers: Array<Marker> = [
    {
      markerOffset: -30,
      name: scenario ? scenario.name : "",
      coordinates: africa.coordinates
    },
  ];

  function createScenario() {
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
  }

  return (
    <div className="App">
      Big Foil
      <div style={{ display: "flex", justifyContent: "center" }}>
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
                          fill: "gray",
                          stroke: "black",
                          strokeWidth: 1.0,
                          outline: "none"
                        },
                        pressed: {
                          fill: "gray",
                          stroke: "black",
                          strokeWidth: 1.25,
                          outline: "none"
                        }
                      }}
                    />
                  )
                })
              }
            </Geographies>

            {(timing === 0) ?
              markers.map(({ name, coordinates, markerOffset }) => (
                <Marker onClick={createScenario} coordinates={coordinates}>
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
      </div>

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

      {
        false ? <Win duration={timeElapsed} /> : ""
      }

    </div>
  );
}

export default App;
