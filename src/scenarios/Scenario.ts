import { State } from "./state";

export abstract class Scenario {
  // public static creationProbabilities: number[] = [0.5, 0.5, 0.5, 0.5, 0.5];
  public abstract name: string;
  protected abstract startingState: number;
  protected abstract endingState: number;

  protected abstract currentState: number;
  protected abstract states: State[];

  // run the state update function
  public update() {
    this.currentState = this.states[this.currentState].update();
  }
}
