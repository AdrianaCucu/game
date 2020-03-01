import React from "react";
import styled from "styled-components";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";

import { useScenarios } from '../hooks/useScenarios';
import { CoalPowerStation } from '../scenarios/CoalPowerStation';
import { Scenario } from '../scenarios/Scenario';

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const StyledMap = styled.div`
  width: 70%;
  height: auto;
`;

interface Marker {
  markerOffset: number;
  name: String;
  coordinates: [number, number]
};

const Map = ({ displayMarker }: { displayMarker: boolean }) => {

  const [scenarios, setScenarios] = useScenarios();

  let scenario: Scenario = new CoalPowerStation();

  let markers: Array<Marker> = [{
    markerOffset: -30,
    name: scenario ? scenario.name : "",
    coordinates: [-58.3816, -34.6037]
  }];

  function createScenario() {
    console.log(scenario)
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
    console.log(scenarios);
  }

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <StyledMap>
        <ComposableMap>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  style={{
                    default: {
                      fill: "green",
                      stroke: "#607D8B",
                      strokeWidth: 0.75,
                      outline: "none"
                    },
                    hover: {
                      fill: "green",
                      stroke: "black",
                      strokeWidth: 1.25,
                      outline: "none"
                    },
                    pressed: {
                      fill: "green",
                      stroke: "black",
                      strokeWidth: 1.25,
                      outline: "none"
                    }
                  }}
                />
              ))
            }
          </Geographies>

          {(displayMarker === true) ?
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
  );
};

export default Map;
