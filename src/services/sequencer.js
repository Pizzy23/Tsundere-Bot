const { Dice } = require("../services/dice");

class Sequencer extends Dice {
  error;
  dice;
  array = [];
  maxDices = 30;
  send = false;

  async instance(message, args) {
    try {
      this.array = [];
      this._setSeparator(message.content);
      const validation = this.validation(this.slice);
      this.diceObj = this._objCreate(this.slice);
      if (validation === true) {
        if (this.diceObj.numDice > this.maxDices) {
          return this.setError(
            "Você achas que tenho 30 dados para jogar aqui? Me compra antes de reclamar."
          );
        }

        for (let i = 0; i < this.diceObj.numDice; i++) {
          if (this.send == false) {
            this.send = true;
          }
          if (this.diceObj.modifier) {
            this.signalDice();
          }
          this.throwDice();
          //const resultDices = this.resultDices();
          if (!this.diceObj.modifier) {
            this.diceObj.line =
              `Roll: ` +
              "`" +
              "[" +
              this.diceObj.nobuff +
              "]" +
              "`" +
              " Result: " +
              "`" +
              "[" +
              this.diceObj.nobuff +
              "]" +
              "`";
            this.array[i] = this.diceObj.line;
          } else {
            this.setTotal();
            this.diceObj.line =
              `Roll: ` +
              "`" +
              "[" +
              this.diceObj.nobuff +
              "]" +
              "`" +
              " Result: " +
              "`" +
              "[" +
              this.diceObj.diceTotal +
              "]" +
              "`";
            this.array[i] = this.diceObj.line;
          }
          if (i === this.diceObj.numDice) {
            break;
          }
        }
        return this.array;
      } else {
        return validation;
      }
    } catch (e) {
      return this.setError(e.message);
    }
  }
  throwDice() {
    this.dice = Math.random() * this.diceObj.numSides + 1;
    this.dice = parseInt(this.dice);
    if (this.dice == 0) {
      this.dice = this.zeroNumber();
    }
    this.diceObj.nobuff = this.dice;
    if (!this.diceObj.modifier == 0) {
      this.throwDiceModifier();
    }

    return this.nobuff;
  }
  signalDice() {
    if (!this.diceObj.modifier == 0) {
      const a = this.diceObj.modifier.split("");
      this.signal = a[0];
      this.diceObj.numModifier = a[1] + a[2];
      this.diceObj.numModifier = parseInt(this.diceObj.numModifier);
    }
  }

  zeroNumber() {
    this.dice = Math.random() * this.diceObj.numSides;
    this.dice = parseInt(this.dice);
    if (this.dice == 0) {
      this.zeroNumber(this.dice);
    }
    if (this.dice !== 0) {
      return this.dice;
    }
  }
  throwDiceModifier() {
    if (this.signal === "+") {
      this.dice = 0;
      this.dice = Math.random() * this.diceObj.numSides;
      this.dice = parseInt(this.dice);
      if (this.dice == 0) {
        this.dice = this.zeroNumber();
      }
      this.diceObj.nobuff = this.dice;
      const buff = this.dice + this.diceObj.numModifier;
      return (this.dice = buff);
    }
    if (this.signal === "-") {
      this.dice = 0;
      this.dice = Math.random() * this.diceObj.numSides;
      this.dice = parseInt(this.dice);
      if (this.dice == 0) {
        this.dice = this.zeroNumber();
      }
      this.diceObj.nobuff = this.dice;
      const nerf = this.dice - this.diceObj.numModifier;
      return (this.dice = nerf);
    }
    return this.dice;
  }

  _setSeparator(input) {
    try {
      const separator = this.sliceInput(input);
      if (separator) this.slice = separator;
    } catch (e) {
      return this.setError(e.message);
    }
  }

  setError(error) {
    console.log(error);
    return (this.error = error);
  }
  setTotal() {
    this.diceObj.diceTotal = this.dice;
  }
}

module.exports = { Sequencer };
