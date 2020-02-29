export class Tweet {
  timestamp: Date;
  body: string;

  constructor(body: string) {
    this.timestamp = new Date();
    this.body = body;
  }
}