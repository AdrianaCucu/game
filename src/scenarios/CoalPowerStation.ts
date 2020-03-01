import { State } from "./State";
import { Scenario } from "./Scenario";

export class CoalPowerStation extends Scenario {
  // fixed constants for the coal power station
  public name: string = "Coal-fired power station";

  // EUROPE, ASIA, OCEANIA, AFRICA, SOUTH AMERICA, NORTH AMERICA
  public static creationProbabilities: number[] = [
    0.2,
    0.7,
    0.5,
    0.9,
    0.6,
    0.3
  ];
  public static cost: number = 250000;
  protected startingState: number = 1; // the state we should start on

  protected currentState: number; // the current state the power station is in

  // the coal power station only has a single state
  protected states: State[] = [
    new State(
      0, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0.01, // increase the temperature by 0.01 on each update
      0.02, // increase the public opinion by 0.02 on each update
      208, // increase the money by 208 on each update
      this.state01UpdateFunc, // run this to determine the new state
      [] // tweets from the power station
    ),
    new State(
      1, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0.02, // increase the temperature by 0.02 on each update
      0.04, // increase the public opinion by 0.04 on each update
      416, // increase the money by 416 on each update
      this.state01UpdateFunc, // run this to determine the new state
      [
        // tweets from the power station
        "Increasing public anger about reliance on coal power"
      ]
    ),
    new State(
      2, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0, // increase the temperature by 0.02 on each update
      0, // increase the public opinion by 0.02 on each update
      0, // increase the money by 416 on each update
      this.state2UpdateFunc, // run this to determine the new state
      [
        // tweets from the power station
        "BREAKING: coal power station forced to close due to public backlash"
      ]
    )
  ];

  private state01UpdateFunc(tempChange: number, opinionChange: number): number {
    if (opinionChange > 5) return 2;
    else if (opinionChange < 3) return 1;
    else return 0;
  }

  private state2UpdateFunc(tempChange: number, opinionChange: number): number {
    // once closed, a coal-fired power station cannot be reopened
    return 2;
  }

  // ensure the current state is set to the starting state
  constructor() {
    super();
    this.currentState = this.startingState;
  }
}
