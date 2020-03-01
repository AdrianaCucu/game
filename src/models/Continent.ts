import { getRandomFloat, getMean } from "../utils";

export class Continent {
  hitbox: number[][];
  // coordinates: [number, number];

  deltaX: number;
  meanX: number;
  deltaY: number;
  meanY: number;

  constructor(hitbox: number[][]) {
    this.hitbox = hitbox;

    const allX = this.hitbox.map((corner: number[]) => corner[0]);
    const maxX = Math.max(...allX);
    const minX = Math.min(...allX);
    this.deltaX = maxX - minX;
    this.meanX = getMean(allX);

    const allY = this.hitbox.map((corner: number[]) => corner[1]);
    const maxY = Math.max(...allY);
    const minY = Math.min(...allY);
    this.deltaY = maxY - minY;
    this.meanY = getMean(allX);
  }

  /**
   * Diff of min and max x
    Random value inside that diff
    Diff of min and max y
    Random value inside that diff
    Get mean x
    Get mean y
    Pos = mean + (random * 0.5)
   */
  getRandomMarker(): [number, number] {
    const randX = getRandomFloat(0.0, this.deltaX);
    let finalX = this.meanX + randX * 0.5;
    finalX = this.meanX < 0 ? finalX * -1 : finalX;

    const randY = getRandomFloat(0.0, this.deltaY);
    let finalY = this.meanY + randY * 0.2;
    finalY = this.meanY < 0 ? finalY * -1 : finalY;

    return [finalX, finalY];
  }
}

export const europe = new Continent([
  [-20, 75],
  [-20, 35],
  [50, 45],
  [60, 75]
]);

export const asia = new Continent([
  [60, 75],
  [60, 20],
  [120, 15],
  [150, 60]
]);

export const oceania = new Continent([
  [100, -20],
  [120, -40],
  [150, -40],
  [140, -20]
]);

export const africa = new Continent([
  [-20, 35],
  [30, 30],
  [30, -30],
  [0, 0]
]);

export const sAmerica = new Continent([
  [-80, 0],
  [-70, 45],
  [60, 45],
  [-40, 15]
]);

export const nAmerica = new Continent([
  [-140, 60],
  [-115, 30],
  [-75, 30],
  [-90, 75]
]);
