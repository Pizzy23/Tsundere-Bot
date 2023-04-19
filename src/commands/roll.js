const { Dice } = require("../services/dice");
const dice = new Dice();

module.exports = {
  name: "roll",
  aliases: ["r"],
  description: "Roll dice",
  usage: "roll",
  options: [],

  async execute(client, message, args) {
    let output = dice.instance(message, args);
    if (output == undefined) {
      output = "Você fez algo errado idiota.";
      return message.reply(output);
    }
    return message.reply(output);
  },
};
