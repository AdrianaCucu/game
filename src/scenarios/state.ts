export class State {
  public id: number;
  public updateTime: number;
  public updatePollution: number;
  public updateOpinion: number;
  public updateFunc: () => number;
  public newsAlerts: string[];
  
  private lastUpdateTime: number;
  
  constructor(theId: number,
              theUpdateTime: number,
              theUpdatePollution: number,
              theUpdateOpinion: number,
              theUpdateFunc: () => number,
              theNewsAlerts: string[]) {
    this.id = theId;
    this.updateTime = theUpdateTime;
    this.updatePollution = theUpdatePollution;
    this.updateOpinion = theUpdateOpinion;
    this.updateFunc = theUpdateFunc;
    this.newsAlerts = theNewsAlerts;
    
    this.lastUpdateTime = 10; //TODO: update from global state getCurrentTime()
  }
  
  public update() {
    let theLastUpdateTime = this.lastUpdateTime;
    this.lastUpdateTime = 10; //TODO: update from global state getCurrentTime()
    console.log("increase the pollution by this much: " + this.updatePollution);
    console.log("increase the opinion by this much: " + this.updateOpinion);
    if (this.lastUpdateTime - theLastUpdateTime > this.updateTime) {
      return this.updateFunc();
    }
    return this.id;
  }
}