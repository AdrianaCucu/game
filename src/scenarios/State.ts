export class State {
  public id: number;
  public updateTime: number;
  
  public updateTemp: number;
  public updateOpinion: number;
  public updateMoney: number;
  
  public updateFunc: (tempChange: number, opinionChange: number) => number;
  public newsAlerts: string[];
  
  private lastUpdateTime: number;
  private lastUpdateTemp: number;
  private lastUpdateOpinion: number;
  private lastUpdateMoney: number;
  
  constructor(theId: number,
              theUpdateTime: number,
              theUpdateTemp: number,
              theUpdateOpinion: number,
              theUpdateMoney: number,
              theUpdateFunc: (tempChange: number, opinionChange: number) => number,
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
    this.lastUpdateTemp = -1;
    this.lastUpdateOpinion = -1;
    this.lastUpdateMoney = -1;
  }
  
  public update(timeElapsed: number, globalTemperature: number, publicOpinion: number, money: number) : [number, number, number, number] {
    
    let theLastUpdateTime = this.lastUpdateTime;
    let theLastUpdateTemp = this.lastUpdateTemp;
    let theLastUpdateOpinion = this.lastUpdateOpinion;
    let theLastUpdateMoney = this.lastUpdateMoney;
    this.lastUpdateTime = timeElapsed;
    this.lastUpdateTemp = globalTemperature;
    this.lastUpdateOpinion = publicOpinion;
    this.lastUpdateMoney = money;
    
    if (theLastUpdateTime < 0) theLastUpdateTime = this.lastUpdateTime;
    if (theLastUpdateTemp < 0) theLastUpdateTemp = this.lastUpdateTemp;
    if (theLastUpdateOpinion < 0) theLastUpdateOpinion = this.lastUpdateOpinion;
    if (theLastUpdateMoney < 0) theLastUpdateMoney = this.lastUpdateMoney;
    
    let newId = this.id;
    if (this.lastUpdateTime - theLastUpdateTime > this.updateTime) {
      newId = this.updateFunc(
        globalTemperature - theLastUpdateTemp,
        publicOpinion - theLastUpdateOpinion
      );
    }
    return [newId, this.updateTemp, this.updateOpinion, this.updateMoney];
  }
}