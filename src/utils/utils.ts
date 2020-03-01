import { ContinentTemps } from "./types";
import { COLORS } from "./constants";

export function tempToColor(
  continentTemps: ContinentTemps,
  continent: string
): String {
  if (continentTemps[continent] != null) {
    const temp = continentTemps[continent];

    if (temp <= 0.0) {
      return COLORS.darkBlue;
    } else if (temp > 0 && temp <= 0.6) {
      return COLORS.lightBlue;
    } else if (temp > 0.6 && temp <= 1.0) {
      return COLORS.lightOrange;
    } else if (temp > 1.0 && temp <= 1.4) {
      return COLORS.orange;
    } else if (temp > 1.4 && temp <= 1.8) {
      return COLORS.lightRed;
    } else if (temp > 1.8 && temp <= 2.4) {
      return COLORS.red;
    } else if (temp > 2.4 && temp <= 3.0) {
      return COLORS.darkRed;
    } else {
      return COLORS.gray;
    }
  }
  return COLORS.gray;
}

export function timeElapsedToGameTime(milliseconds: number) {
  // TODO: implement
  return new Date();
}

/**
 * Get a random floating point number between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random floating point number
 */
export function getRandomFloat(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

/**
 * Get a random integer between `min` and `max`.
 *
 * @param {number} min - min number
 * @param {number} max - max number
 * @return {number} a random integer
 */
export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get a random boolean value.
 *
 * @return {boolean} a random true/false
 */
export function getRandomBool() {
  return Math.random() >= 0.5;
}

export function getMean(array: number[]) {
  let sum = 0;

  for (let i = 0; i < array.length; i++) {
    sum += array[i];
  }

  const avg = sum / array.length;
  return avg;
}
