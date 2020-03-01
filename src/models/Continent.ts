export class Continent {
  coordinates: [number, number];

  constructor(coordinates: [number, number]) {
    this.coordinates = coordinates;
  }
}

export const europe = new Continent([32, 48]);

export const asia = new Continent([100, 40]);

export const oceania = new Continent([137, -32]);

export const africa = new Continent([10, 10]);

export const sAmerica = new Continent([-65, -10]);

export const nAmerica = new Continent([-100, 40]);
