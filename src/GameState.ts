import { Tweet } from "./models/Tweet";

interface GameState {
  timeElapsed: number;
  globalTemperature: number;
  money: number;
  publicOpinion: number;
  tweets: Tweet[];
}

const state: GameState = {
  timeElapsed: 0, // milliseconds
  globalTemperature: 36.0, // max of 40
  money: 1000000,
  publicOpinion: 0, // max of 100
  tweets: [],
};

export default state;
