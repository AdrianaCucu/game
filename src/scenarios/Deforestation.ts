import { State } from "./State";
import { Scenario } from "./Scenario";

export class Deforestation extends Scenario {
  public name: string = "Deforestation";

  // EUROPE, ASIA, OCEANIA, AFRICA, SOUTH AMERICA, NORTH AMERICA
  public static creationProbabilities: number[] = [
    0.2,
    0.4,
    0.1,
    0.6,
    0.9,
    0.2
  ];
  public static cost: number = 100000;
  protected startingState: number = 0; // the state we should start on

  protected currentState: number; // the current state the power station is in

  // the coal power station only has a single state
  protected states: State[] = [
    new State(
      0, // this state has an ID of 0
      100, // this state should update every 10 seconds
      0.1, // increase the temperature by 0.1 on each update
      0.03, // increase the public opinion by 0.03 on each update
      0, // no money earned from burning forests
      this.state0UpdateFunc, // run this to determine the new state
      ["Farmers reportedly burning forests to expand farmland"]
    ),
    new State(
      1, // this state has an ID of 1
      100, // this state should update every 10 seconds
      0.2, // increase the temperature by 0.2 on each update
      0.4, // increase the public opinion by 0.2 on each update
      -100, // lose money on an out-of-control fire
      this.state12UpdateFunc, // run this to determine the new state
      [
        // tweets from the out-of-control fire
        "BREAKING: Major environmental disaster with huge out-of-control wildfire",
        "BREAKING: Wildfire believed to be responsible for the extinction of several endangered species"
      ]
    ),
    new State(
      2, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0.04, // increase the temperature by 0.04 on each update
      0.01, // increase the public opinion by 0.01 on each update
      100, // increase the money by 100 on each update
      this.state12UpdateFunc, // run this to determine the new state
      []
    )
  ];

  private state0UpdateFunc(tempChange: number, opinionChange: number): number {
    let randProb = Math.random();
    if (randProb < 0.2) return 1; // 20% likely to go out of control
    if (randProb < 0.6) return 0;
    // 40% likely to stay burning
    else return 2; // 40% likely to finish burn and start farming
  }

  private state12UpdateFunc(tempChange: number, opinionChange: number): number {
    return 2;
  }

  // ensure the current state is set to the starting state
  constructor() {
    super();
    this.currentState = this.startingState;
  }
}
