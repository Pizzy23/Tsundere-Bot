const { DiceTexts } = require("../util/texts/diceTexts");

class Dice {
  _separator(input) {
    try {
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
  _throwDice(dice) {
    let dices = [];
    for (let i = 0; i < dice.numDice; i++) {
      let numberByThrow = 0;
      numberByThrow = Math.random() * dice.numSides + 1;
      numberByThrow = parseInt(numberByThrow);

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
    numberByThrow = 0;
    numberByThrow = Math.random() * dice.numSides + 1;
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
      const dice = this._separator(message.content);
      const throwDice = this._throwDice(dice);
      const resultDices = this._resultDices(dice, throwDice);
      const author = message.author;
      return text.diceOutput(dice, throwDice, resultDices, author);
    } catch (error) {
      return error.message;
    }
  }
}

module.exports = { Dice };
