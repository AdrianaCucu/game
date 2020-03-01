import { useGameState } from '../hooks/useGameState';

export class State {
  public id: number;
  public updateTime: number;
  public updateTemp: number;
  public updateOpinion: number;
  public updateFunc: () => number;
  public newsAlerts: string[];
  
  private lastUpdateTime: number;
  
  constructor(theId: number,
              theUpdateTime: number,
              theUpdateTemp: number,
              theUpdateOpinion: number,
              theUpdateFunc: () => number,
              theNewsAlerts: string[],
            ) {
    
    this.id = theId;
    this.updateTime = theUpdateTime;
    this.updateTemp = theUpdateTemp;
    this.updateOpinion = theUpdateOpinion;
    this.updateFunc = theUpdateFunc;
    this.newsAlerts = theNewsAlerts;
    
    this.lastUpdateTime = -1;
  }
  
  public update() {
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
    
    let theLastUpdateTime = this.lastUpdateTime;
    this.lastUpdateTime = timeElapsed;
    if (theLastUpdateTime < 0) theLastUpdateTime = this.lastUpdateTime;
    console.log("increase the temperature by this much: " + this.updateTemp);
    setGlobalTemperature(globalTemperature + this.updateTemp);
    console.log("increase the opinion by this much: " + this.updateOpinion);
    setPublicOpinion(publicOpinion + this.updateOpinion);
    if (this.lastUpdateTime - theLastUpdateTime > this.updateTime) {
      return this.updateFunc();
    }
    return this.id;
  }
}