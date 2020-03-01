import React from "react";
import styled from "styled-components";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

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
  darkBlue: "#124e89",
  lightBlue: "#ADF3FF",
  lightOrange: "#F29F81",
  orange: "#FF8B42",
  lightRed: "#be4a2f",
  red: "#a22633",
  darkRed: "#3e2731",
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

const Map = ({ continentTemps }: { continentTemps: ContinentTemps }) => {
  // console.log("hello");

  let handleClick = (geo: any) => () => {
    console.log(geo.properties.continent);
  };

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
                    onClick={handleClick(geo)}
                    geography={geo}
                    style={{
                      default: {
                        fill: `${color}`,
                        stroke: "#607D8B",
                        strokeWidth: 0.75,
                        outline: "none"
                      },
                      hover: {
                        fill: "#CFD8DC",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none"
                      },
                      pressed: {
                        fill: "grey",
                        stroke: "#607D8B",
                        strokeWidth: 1,
                        outline: "none"
                      }
                    }}
                  />
                )
              })
            }
          </Geographies>
        </ComposableMap>
      </StyledMap>
    </div>
  );
};

export default Map;
