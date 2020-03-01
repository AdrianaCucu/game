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

const Map = ({ continentTemps, displayMarker }: { continentTemps: ContinentTemps, displayMarker: boolean }) => {

  const [scenarios, setScenarios] = useScenarios();

  let scenario: Scenario = new CoalPowerStation();

  let markers: Array<Marker> = [{
    markerOffset: -30,
    name: scenario ? scenario.name : "",
    coordinates: [10, 10]
  }];

  function createScenario() {
    setScenarios((scenarios: Scenario[]) => [...scenarios, scenario]);
  }

  return (
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
