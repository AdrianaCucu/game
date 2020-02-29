import React from "react";
import styled from "styled-components";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const StyledMap = styled.div`
  width: 70%;
  height: auto;
`;

const Map = () => {
  console.log("hello");

  return (
    <div style={{display: "flex", justifyContent: "center"}}>
      <StyledMap>
        <ComposableMap>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => (
                <Geography key={geo.rsmKey} geography={geo} style={{
                    default: {
                      fill: "#ECEFF1",
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
                      fill: "#FF5722",
                      stroke: "#607D8B",
                      strokeWidth: 1,
                      outline: "none"
                    }
                  }} />
              ))
            }
          </Geographies>
        </ComposableMap>
      </StyledMap>
    </div>
  );
};

export default Map;
