type ConfigProps = {
  max: number;
  attempts: number;
};

const getRandom = (max: number) => {
  return Math.floor(Math.random() * max);
};
const betterMessage = (message: string) => {
  if (message === "Hot") return "Hotter";
  if (message === "Warm") return "Warmer";
  if (message === "Cold") return "Cold";
  if (message === "Bingo") return "Bingo";
  return "";
};

export class Brain {
  config: ConfigProps;
  private pickedNumber: number | null = null;
  private maxAttempts: number = 0;
  private attemptsUsed: number = 0;
  private lastDiff: number = 0;
  private started: boolean = false;

  checkNumber(input: number) {
    if (!this.started) return "Start game!";

    if (this.maxAttempts - this.attemptsUsed <= 0) {
      return `Game Over !
      No more moves.`;
    }
    this.attemptsUsed++;
    console.log(
      `${this.pickedNumber} - ${input} : ${Math.abs(
        (this.pickedNumber || 0) - Number(input)
      )}`
    );
    const diff: number = Math.abs((this.pickedNumber || 0) - Number(input));
    let message: string = "";
    switch (true) {
      case diff === 0:
        message = "Bingo";
        break;
      case diff <= 10:
        message = "Hot";
        break;
      case diff <= 20:
        message = "Warm";
        break;
      default:
        message = "Cold";
        break;
    }
    message = this.lastDiff < diff ? message : betterMessage(message);
    this.lastDiff = Math.abs((this.pickedNumber || 0) - Number(input));
    return message;
  }


  getPickedNumber() {
    return this.pickedNumber;
  }

  start() {
    this.pickedNumber = getRandom(this.config.max);
    this.maxAttempts = this.config.attempts;
    this.started = true;
    console.log(`Game started!`);
  }

  isStarted() {
    return this.started;
  }

  getAttemptsLeft() {
    return this.maxAttempts - this.attemptsUsed;
  }

  gameOver() {
    this.started = false;
  }

  constructor(config: ConfigProps) {
    console.log(`Constructing new Brain: ${JSON.stringify(config)}`);
    this.config = config;
  }
}
