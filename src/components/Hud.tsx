import React from "react";
import styled from "styled-components";
import { useGameState } from "../hooks/useGameState";

const StyledClock = styled.div``;

const Hud = () => {
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

  console.log("re-render");

  const startGame = () => {
    setGlobalTemperature(25.0);
  }

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
