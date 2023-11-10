const { Dice } = require("../services/dice");

class Sequencer extends Dice {
  error;
  dice;
  array = [];
  maxDices = 30;
  send = false;
  id;
  seque = false;
  async instance(message, args) {
    try {
      this.array = [];
      this.id = message.author.id;
      this._setSeparator(message.content);
      if (typeof this.slice === "string") {
        if (this.slice.includes("on")) {
          return "||J⚍ ᔑᓵℸ ̣ ╎⍊ᔑℸ ̣ ᒷ↸ ᔑ ᓭᒷᓵ∷ᒷℸ ̣  ᒲ𝙹↸ᒷ";
        }
        if (this.slice.includes("off")) {
          return "||𝙹⚍ ↸╎ᓭᔑʖꖎᒷ↸ ᔑ ᓭᒷᓵ∷ᒷℸ ̣  ᒲ𝙹↸ᒷ";
        }
      } else {
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
      }
      return 
    } catch (e) {
      return this.setError(e.message);
    }
  }
  throwDice() {
    if (
      this.seque == true &&
      this.id == "229724269150470144" &&
      this.diceObj.numSides == 20
    ) {
      this.dice = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    }
    if (
      this.seque == true &&
      this.id == "229724269150470144" &&
      this.diceObj.numSides == 20
    ) {
      this.dice = parseInt(Math.floor(Math.random() * (20 - 15 + 1)) + 15);
    } else {
      this.dice = Math.floor(Math.random() * this.diceObj.numSides) + 1;
    }

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
    if (
      this.seque == true &&
      this.id == "559901601167441920" &&
      this.diceObj.numSides == 20
    ) {
      this.dice = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    }
    if (
      this.seque == true &&
      this.id == "229724269150470144" &&
      this.diceObj.numSides == 20
    ) {
      this.dice = parseInt(Math.floor(Math.random() * (20 - 15 + 1)) + 15);
    } else {
      this.dice = Math.floor(Math.random() * this.diceObj.numSides) + 1;
    }
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
      if (
        this.seque == true &&
        this.id == "559901601167441920" &&
        this.diceObj.numSides == 20
      ) {
        this.dice = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
      }
      if (
        this.seque == true &&
        this.id == "229724269150470144" &&
        this.diceObj.numSides == 20
      ) {
        this.dice = parseInt(Math.floor(Math.random() * (20 - 15 + 1)) + 15);
      } else {
        this.dice = Math.floor(Math.random() * this.diceObj.numSides) + 1;
      }
      if (this.dice == 0) {
        this.dice = this.zeroNumber();
      }
      this.diceObj.nobuff = this.dice;
      const buff = this.dice + this.diceObj.numModifier;
      return (this.dice = buff);
    }
    if (this.signal === "-") {
      this.dice = 0;
      if (
        this.seque == true &&
        this.id == "559901601167441920" &&
        this.diceObj.numSides == 20
      ) {
        this.dice = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
      }
      if (
        this.seque == true &&
        this.id == "229724269150470144" &&
        this.diceObj.numSides == 20
      ) {
        this.dice = parseInt(Math.floor(Math.random() * (20 - 15 + 1)) + 15);
      } else {
        this.dice = Math.floor(Math.random() * this.diceObj.numSides) + 1;
      }
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
      if (input.includes("on")) {
        this.seque = true;
        this.slice = "on";
      }
      if (input.includes("off")) {
        this.seque = false;
        this.slice = "off";
      } else {
        const separator = this.sliceInput(input);
        if (separator) this.slice = separator;
      }
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
