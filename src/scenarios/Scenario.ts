import { State } from "./State";
import { Continent } from "../models/Continent";

export abstract class Scenario {
  // public static creationProbabilities: number[] = [0.5, 0.5, 0.5, 0.5, 0.5];
  public continent: Continent;
  public abstract name: string;
  public cost: number = 1000000;
  protected abstract startingState: number;

  protected abstract currentState: number;
  protected abstract states: State[];

  // run the state update function
  public update(
    timeElapsed: number,
    globalTemperature: number,
    publicOpinion: number,
    money: number
  ) {
    const state = this.states[this.currentState];
    const [newState, newTemp, newOpinion, newMoney] = state.update(
      timeElapsed,
      globalTemperature,
      publicOpinion,
      money
    );

    this.currentState = newState;
    return [newTemp, newOpinion, newMoney];
  }

  constructor(continent: Continent) {
    this.continent = continent;
  }
}
