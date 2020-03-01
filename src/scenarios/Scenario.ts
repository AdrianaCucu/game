import { State } from "./State";

export abstract class Scenario {
  // public static creationProbabilities: number[] = [0.5, 0.5, 0.5, 0.5, 0.5];
  public abstract name: string;
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
    const [newState, newTemp, newOpinion, newMoney] = this.states[
      this.currentState
    ].update(timeElapsed, globalTemperature, publicOpinion, money);
    this.currentState = newState;
    return [newTemp, newOpinion, newMoney];
  }
}
