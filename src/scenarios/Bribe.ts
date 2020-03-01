import { State } from "./State";
import { Scenario } from "./Scenario";

export class Bribe extends Scenario {
  public name: string = "Bribe";
  
  // EUROPE, ASIA, OCEANIA, AFRICA, SOUTH AMERICA, NORTH AMERICA
  public static creationProbabilities: number[] = [0.5, 0.5, 0.5, 0.5, 0.5, 0.5];
  public static cost: number = 500000;
  protected startingState: number = 0; // the state we should start on

  protected currentState: number; // the current state the power station is in

  // the coal power station only has a single state
  protected states: State[] = [
    new State(
      0, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0.05, // increase the temperature by 0.05 on each update
      -0.1, // decrease the public opinion by -0.1 on each update
      0, // no money earned from bribing
      this.state0UpdateFunc, // run this to determine the new state
      [
        "UN Summit: Leaders decry 'baseless' allegations of bribery"
      ]
    ),
    new State(
      1, // this state has an ID of 1
      50, // this state should update every 5 seconds
      0, // getting caught doesn't change the problem
      -0.5, // decrease the public opinion by -0.5 on each update
      0, // no money lost if caught bribing
      this.state12UpdateFunc, // run this to determine the new state
      [ // tweets from the out-of-control fire
        "BREAKING: World leaders implicated in major bribary scandal by significant polluters",
        "BREAKING: Public backlash against bribery allegations forces resignations"
      ]
    ),
    new State(
      2, // this state has an ID of 0
      50, // this state should update every 5 seconds
      0, // no change in temperature
      0, // no change in public opinion
      0, // no change in money
      this.state12UpdateFunc, // run this to determine the new state
      []
    )
  ];

  private state0UpdateFunc(tempChange: number, opinionChange: number): number {
    let randProb = Math.random();
    if (randProb < 0.2) return 1; // 20% likely to get caught
    if (randProb < 0.6) return 0; // 40% likely to keep bribing
    else return 2; // 40% likely to end bribing
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
