const { DiceTexts } = require("../util/texts/diceTexts");

class Dice {
  diceOn = false;
  _separator(input) {
    try {
      if (input.includes("111")) {
        return 'd';
      }
      if (input.includes("troll")) {
        return "troll";
      }
      if (input.includes("on")) {
        this.diceOn = true;
        return "on";
      }
      if (input.includes("off")) {
        this.diceOn = false;
        return "off";
      }
      const pieces = this.sliceInput(input);
      if (!pieces) {
        console.log(pieces);
        throw new Error("Você esta errando, to chateada com você.");
      }
      const validation = this.validation(pieces);
      if (validation === true) {
        const dice = this._objCreate(pieces);
        if (dice.modifier !== undefined) {
          const a = dice.modifier.split("");
          dice.signal = a[0];
          let num = dice.modifier;
          dice.modifier = parseInt(num.replace(/[-+]/, ""));
          return dice;
        }
        return dice;
      }
    } catch (e) {
      throw new Error(e);
    }
  }
  sliceInput(input) {
    const slice = input.split("");
    if (slice[1] == "r") {
      const removeRoll = input.replace(/[*&roll]/g, "");
      const noSpace = removeRoll.replace(/\s/g, "");
      return noSpace.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i);
    }
    if (slice[1] == "s") {
      const removeRoll = input.replace(/[*&seque]/g, "");
      const noSpace = removeRoll.replace(/\s/g, "");
      return noSpace.match(/^([1-9]\d*)?d([1-9]\d*)([+-]\d+)?$/i);
    }
  }
  _throwDice(dice, id) {
    let dices = [];
    for (let i = 0; i < dice.numDice; i++) {
      let numberByThrow = 0;
      if (
        this.diceOn == true &&
        id == "559901601167441920" &&
        dice.numSides == 20
      ) {
        numberByThrow = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
      }
      if (
        this.diceOn == true &&
        id == "229724269150470144" &&
        dice.numSides == 20
      ) {
        numberByThrow = parseInt(
          Math.floor(Math.random() * (20 - 15 + 1)) + 15
        );
      }
      if (
        this.diceOn == true &&
        id == "229724269150470144" &&
        dice.numSides == 30
      ) {
        numberByThrow = 30;
      } else {
        numberByThrow = Math.random() * dice.numSides + 1;
        numberByThrow = parseInt(numberByThrow);
      }
      if (numberByThrow == 0) {
        numberByThrow = this._zeroNumber(numberByThrow, dice);
      }
      dice.nobuff = numberByThrow;
      if (!dice.modifier == 0) {
        dices[i] = this._throwDiceModifier(numberByThrow, dice);
      } else {
        dices[i] = dice.nobuff;
      }
      if (i === dice.numDice) {
        break;
      }
    }
    return dices;
  }
  _zeroNumber(numberByThrow, dice) {
    if (
      this.diceOn == true &&
      id == "559901601167441920" &&
      dice.numSides == 20
    ) {
      numberByThrow = parseInt(Math.floor(Math.random() * (10 - 1 + 1)) + 1);
    }
    if (
      this.diceOn == true &&
      id == "229724269150470144" &&
      dice.numSides == 20
    ) {
      numberByThrow = parseInt(Math.floor(Math.random() * (20 - 15 + 1)) + 15);
    } else {
      numberByThrow = 0;
      numberByThrow = Math.random() * dice.numSides + 1;
    }
    return (numberByThrow = parseInt(numberByThrow));
  }
  _throwDiceModifier(numberByThrow, dice) {
    if (dice.signal == "+") {
      return (dice.diceModifier = numberByThrow + dice.modifier);
    }
    if (dice.signal == "-") {
      return (dice.diceModifier = numberByThrow - dice.modifier);
    }
  }

  _resultDices(dice, allDices) {
    try {
      for (let i = 0; i < dice.numDice; i++) {
        dice.diceTotal += allDices[i];
      }
      return dice.diceTotal;
    } catch (e) {
      throw new Error(e.message);
    }
  }

  _objCreate(pieces) {
    const numDice = pieces[1] - 0 || 1;
    const numSides = pieces[2] - 0;
    const numModifier = pieces[3] || 0;
    const modifier = pieces[3];
    const nobuffer = 0;
    const diceTotal = 0;
    return {
      numDice: numDice,
      numSides: numSides,
      modifier: modifier,
      diceTotal: diceTotal,
      numModifier: numModifier,
      nobuff: nobuffer,
    };
  }
  validation(pieces) {
    if (pieces[2] < 1) {
      throw new Error(`Quer que eu role um dado? para ser idiota.`);
    }
    if (pieces[1] > 100) {
      throw new Error(`Não existe possibilidade de eu ter 30 dados.`);
    }
    if (pieces[2] > 99999) {
      throw new Error(
        `Como se quer que eu tenha mais de 99999 lados em um dado?`
      );
    }
    return true;
  }

  async calls(message, args) {
    const text = new DiceTexts();
    try {
      const author = message.author;
      let throwDice;
      let resultDices;
      const dice = this._separator(message.content);
      if (typeof dice === "object") {
        if (this.diceOn == false) {
          throwDice = this._throwDice(dice);
          resultDices = this._resultDices(dice, throwDice);
        } else if (this.diceOn == true) {
          throwDice = this._throwDice(dice, author.id);
          resultDices = this._resultDices(dice, throwDice);
        }
      }
      if (typeof dice === "string") {
        if (dice.includes("d")) {
          return 30;
        }
        if (dice.includes("troll")) {
          return "ATENÇÃO O LUCAS FOI TROLLADO :)";
        }
        if (dice.includes("on")) {
          return "||J⚍ ᔑᓵℸ ̣ ╎⍊ᔑℸ ̣ ᒷ↸ ᔑ ᓭᒷᓵ∷ᒷℸ ̣  ᒲ𝙹↸ᒷ";
        }
        if (dice.includes("off")) {
          return "||𝙹⚍ ↸╎ᓭᔑʖꖎᒷ↸ ᔑ ᓭᒷᓵ∷ᒷℸ ̣  ᒲ𝙹↸ᒷ";
        }
      }
      return text.diceOutput(dice, throwDice, resultDices, author);
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = { Dice };
