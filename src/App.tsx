import React from 'react';
import styled from "styled-components";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import './App.css';

import { Marker as CustomMarker } from './utils/types';
import { useInterval } from './hooks/useInterval';
import { useGameState } from './hooks/useGameState';
import { useScenarios } from './hooks/useScenarios';
import { useContinents } from './hooks/useContinents';
import { Scenario } from './scenarios/Scenario';
import { Continent } from './models/Continent';

import Win from './components/Win';
import { tempToColor, getRandomInt, getAllScenarios, formatNumber } from './utils/utils';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const StyledMap = styled.div`
  width: 50%;
  height: auto;
`;

let TICK_INTERVAL: number | null = null; // 100 milliseconds

function App() {
  const [
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
  ] = useGameState();

  const [continentTemps, setContinentTemps] = useContinents();
  const [
    scenarios,
    setScenarios,
    timing,
    setTiming,
    selectedScenario,
    setSelectedScenario,
    selectedContinent,
    setSelectedContinent
  ] = useScenarios();

  console.log("re-render");

  const startGame = () => {
    let now = Date.now();

    TICK_INTERVAL = 100;
    setTimeElapsed(now);
    setMoney(1000000.0);
    setGlobalTemperature(0.0);
    setPublicOpinion(0.0);
    setTiming(0);
    setContinentTemps({
      "Europe": 1.4,
      "Asia": 1.8,
      "Oceania": 1.8,
      "Africa": 1.0,
      "South America": 1.4,
      "North America": 1.8
    })

    console.log(money);
  };

  useInterval(() => {
    tick();
  }, TICK_INTERVAL || 999999999) // 11 days lol

  /// Update the game state
  function tick() {
    setTimeElapsed(timeElapsed => timeElapsed + (TICK_INTERVAL || 0));
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

    let today = new Date(date);
    let next = new Date();
    next.setTime(today.getTime() + 86400000);
    setDate(next.toString());

    if (globalTemperature >= 100 || publicOpinion >= 100 || money < -250000) TICK_INTERVAL = 999999999;
  }

  function createButton() {
    setTiming(timing => timing === 59 ? timing = 0 : timing + 1);
    if (timing === 40) {
      let index = getRandomInt(0, 2);
      setSelectedScenario(index);
      setSelectedContinent(Continent.getRandom());
    }
  }


  // Randomly choose between scenarios for a continent
  const possibleScenarios = getAllScenarios(selectedContinent);
  let scenario: Scenario = possibleScenarios[selectedScenario];

  let markers: Array<CustomMarker> = [
    {
      markerOffset: -30,
      name: scenario ? scenario.name : "",
      coordinates: scenario ? scenario.continent.coordinates : [0, 0]
    },
  ];

  function createScenario() {
    setMoney(money => money - scenario.cost);
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
    setTiming(0);
  }

  return (
    <div className="App">
      Everything Burns
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
          <span>Money: ${formatNumber(money)}</span>
          <br />
          <div>{`Date: ${date}`}</div>
          <br />
        </div>
      </div>

      {
        globalTemperature >= 100 ? <Win duration={`You destroyed the world on ${date}`} /> : ""
      }

      {
        publicOpinion >= 100 ? <Win duration={`The public ruined your plan on ${date}`} /> : ""
      }

      {
        money < -250000 ? <Win duration={"You have too much debt. Game over."} /> : ""
      }

    </div>
  );
}

export default App;
