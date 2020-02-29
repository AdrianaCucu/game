import React from "react";
import styled from "styled-components";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/deldersveld/topojson/master/world-continents.json";

const StyledMap = styled.div`
  width: 70%;
  height: auto;
`;

const Map = () => {
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
              geographies.map(geo => (
                <Geography
                  key={geo.rsmKey}
                  onClick={handleClick(geo)}
                  geography={geo}
                  style={{
                    default: {
                      fill: "green",
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
              ))
            }
          </Geographies>
        </ComposableMap>
      </StyledMap>
    </div>
  );
};

export default Map;
