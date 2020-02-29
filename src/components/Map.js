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
                <Geography key={geo.rsmKey} geography={geo} />
              ))
            }
          </Geographies>
        </ComposableMap>
      </StyledMap>
    </div>
  );
};

export default Map;
