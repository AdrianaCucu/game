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
