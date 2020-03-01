import React from "react";
import styled from "styled-components";
import { useGameState } from "../hooks/useGameState";

const StyledClock = styled.div``;

const Hud = () => {
  const [
    timeElapsed,
    globalTemperature,
    money,
    publicOpinion,
  ] = useGameState();


  console.log(`hud found money: ${money}`);
  return (
    <div>
      <div>hello world</div>
      <div>{`Date: ${timeElapsed}`}</div>
      <div>{`Money: ${money}`}</div>
      <div>{`Temperature: ${globalTemperature}`}</div>
    </div>
  );
};


export default Hud;
