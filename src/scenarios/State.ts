import { useGameState } from '../hooks/useGameState';

export class State {
  public id: number;
  public updateTime: number;
  
  public updateTemp: number;
  public updateOpinion: number;
  public updateMoney: number;
  
  public updateFunc: () => number;
  public newsAlerts: string[];
  
  private lastUpdateTime: number;
  
  constructor(theId: number,
              theUpdateTime: number,
              theUpdateTemp: number,
              theUpdateOpinion: number,
              theUpdateMoney: number,
              theUpdateFunc: () => number,
              theNewsAlerts: string[],
            ) {
    
    this.id = theId;
    this.updateTime = theUpdateTime;
    this.updateTemp = theUpdateTemp;
    this.updateOpinion = theUpdateOpinion;
    this.updateMoney = theUpdateMoney;
    this.updateFunc = theUpdateFunc;
    this.newsAlerts = theNewsAlerts;
    
    this.lastUpdateTime = -1;
  }
  
  public update(timeElapsed: number, globalTemperature: number, publicOpinion: number, money: number) : [number, number, number, number] {
    
    let theLastUpdateTime = this.lastUpdateTime;
    this.lastUpdateTime = timeElapsed;
    if (theLastUpdateTime < 0) theLastUpdateTime = this.lastUpdateTime;
    let newId = this.id;
    if (this.lastUpdateTime - theLastUpdateTime > this.updateTime) {
      let newId = this.updateFunc();
    }
    return [newId, this.updateTemp, this.updateOpinion, this.updateMoney];
  }
}