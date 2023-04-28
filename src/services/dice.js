class Dice {
  error;
  diceTotal = 0;
  nobuff = 0;
  numDice;
  numSides;
  numModifier;
  signal;
  dices = [];
  dice;
  diceObj = {};

  separator(input) {
    try {
      const pieces = this.sliceInput(input);
      if (!pieces) {
        return this.setError("Você esta errando, to chateada com você.");
      }
      const validation = this.validation(pieces);
      if (validation === true) {
        this.diceObj = this.objCreate(pieces);
        if (!this.diceObj.modifier == undefined) {
          const a = this.diceObj.modifier.split("");
          this.signal = a[0];
          let num = this.diceObj.modifier;
          this.diceObj.numModifier = parseInt(num.replace(/[-]/, ""));
        }
      }
      return this.error;
    } catch (e) {
      return this.setError(e.message);
    }
  }

  throwDice() {
    for (let i = 0; i < this.diceObj.numDice; i++) {
      this.dice = 0;
      this.dice = Math.random() * this.diceObj.numSides + 1;
      this.dice = parseInt(this.dice);

      if (this.dice == 0) {
        this.dice = this.zeroNumber();
      }
      this.diceObj.nobuff = this.dice;
      if (!this.diceObj.modifier == 0) {
        this.throwDiceModifier();
      }
      this.dices[i] = this.dice;
      if (i === this.diceObj.numDice) {
        break;
      }
    }
    return this.dices;
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
  resultDices() {
    for (let i = 0; i < this.diceObj.numDice; i++) {
      this.diceObj.diceTotal += this.dices[i];
    }
    if (this.signal === "-") {
      return this.diceObj.diceTotal - this.diceObj.numModifier;
    }
    if (this.signal === "+") {
      return this.diceObj.diceTotal + this.diceObj.numModifier;
    }
    return this.diceObj.diceTotal;
  }
  resetVariables() {
    this.diceTotal = 0;
    this.nobuff = 0;
    this.numDice = 0;
    this.numSides = 0;
    this.numModifier = "";
    this.signal = "";
    this.dices = [];
    this.dice = 0;
    this.error = undefined;
  }
  instance(message, args) {
    this.resetVariables();
    const separator = this.separator(message.content);
    if (this.error !== undefined) {
      return this.error;
    }
    const throwDice = this.throwDice();
    const resultDices = this.resultDices();
    const author = message.author;
    if (this.diceObj.numDice !== 1) {
      return (
        `${author} Roll: ` +
        "`" +
        "[" +
        throwDice +
        "]" +
        "`" +
        " Result: " +
        "`" +
        "[" +
        resultDices +
        "]" +
        "`"
      );
    }
    if (!this.diceObj.numModifier == 0) {
      return (
        `${author} Roll: ` +
        "`" +
        "[" +
        this.diceObj.nobuff +
        "]" +
        "`" +
        " Result: " +
        "`" +
        "[" +
        throwDice +
        "]" +
        "`"
      );
    }

    return (
      `${author} Roll: ` +
      "`" +
      "[" +
      throwDice +
      "]" +
      "`" +
      " Result: " +
      "`" +
      "[" +
      throwDice +
      "]" +
      "`"
    );
  }
  setError(error) {
    console.log(error);
    return (this.error = error);
  }
  sliceInput(input) {
    const slice = input.split("");
    if (slice[1] == "r") {
      const removeRoll = input.replace(/[&roll]/g, "");
      const noSpace = removeRoll.replace(/\s/g, "");
      return noSpace.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i);
    }
    if (slice[1] == "s") {
      const removeSeque = input.replace(/[*seque]/g, "");
      const noSpace = removeSeque.replace(/\s/g, "");
      return noSpace.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i);
    }
  }
  objCreate(pieces) {
    const numDice = pieces[1] - 0 || 1;
    const numSides = pieces[2] - 0;
    const numModifier = pieces[3] - 0 || 0;
    const modifier = pieces[3];
    const nobuffer = 0;
    const diceTotal = 0;
    return {
      numDice: numDice,
      numSides: numSides,
      numModifier: numModifier,
      modifier: modifier,
      diceTotal: diceTotal,
      nobuff: nobuffer,
    };
  }
  validation(pieces) {
    if (pieces[2] < 1) {
      return this.setError(`Quer que eu role um dado? para ser idiota.`);
    }
    if (pieces[1] > 100) {
      return this.setError(`Não existe possibilidade de eu ter 30 dados.`);
    }
    if (pieces[2] > 99999) {
      return this.setError(
        `Como se quer que eu tenha mais de 99999 lados em um dado?`
      );
    }
    return true;
  }
}

module.exports = { Dice };
