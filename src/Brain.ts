type ConfigProps = {
  start: number;
  end: number;
  attempts: number;
};
function getRandomNr(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is inclusive and the minimum is inclusive
}

export class Brain {
  config: ConfigProps;
  private pickedNumber: number | null = null;
  private remainingAttempts: number = 0;

  constructor(config: ConfigProps) {
    this.config = config;
    this.pickedNumber = getRandomNr(this.config.start, this.config.end);
    this.remainingAttempts = this.config.attempts;
    console.log("contructed:", JSON.stringify(this));
  }
  checkNumber(input: number) {
    if (this.remainingAttempts === 0) return;
    this.remainingAttempts--;
    console.log(`${this.pickedNumber} - ${input}`);
    return Math.abs((this.pickedNumber || 0) - Number(input));
  }
  getPickedNumber() {
    return this.pickedNumber;
  }
}
