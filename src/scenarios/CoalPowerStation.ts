export {};
import { State } from "./state";

class CoalPowerStation {
  // fixed constants for the coal power station
  public name: string = "Coal-fired power station";
  public static creationProbabilities: number[] = [0.5, 0.5, 0.5, 0.5, 0.5]; 
  private startingState: number = 0; // the state we should start on
  private endingState: number = -1; // no ending state, so use -1 as there will never be a -1 state
  
  private currentState: number; // the current state the power station is in
  
  // every time the coal power station should update state, it should remain in
  // its current state of zero, as the coal power station only has one state
  private coalPowerStationStateUpdateFunc(): number {
    return 0;
  }
  
  // the coal power station only has a single state
  private states: State[] = [
    new State(
      0, // this state has an ID of 0
      100, // this state should update every 100 time units
      5, // increase the pollution level by 5 on each update
      5, // increase the public opinion by 5 on each update
      this.coalPowerStationStateUpdateFunc, // run this to determine the new state
      ["SAMPLE TWEET FROM POWER STATION"] // tweets from the power station
    )
  ]
  
  // run the state update function
  public update() {
    this.currentState = this.states[this.currentState].update();
  }
  
  // ensure the current state is set to the starting state
  constructor(startingState: number) {
    this.currentState = this.startingState;
  }
}