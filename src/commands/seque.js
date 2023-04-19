const { Sequencer } = require("../services/sequencer");
const sequencer = new Sequencer();
const Discord = require("discord.js");

module.exports = {
  name: "sequence",
  aliases: ["se"],
  description: "Sequencial Dices",
  usage: "sequence",
  options: [],

  async execute(client, message, args) {
    let output = await sequencer.instance(message, args);
    if (output == undefined) {
      output = "Você fez algo errado idiota.";
      return message.channel.send(output);
    }
    let string = "";
    output.forEach((item, index) => {
      string = string + `\n${item}`;
    });
    const embed = new Discord.EmbedBuilder()
      .setColor("800080")
      .setTitle("Roll")
      .setDescription(string)
      .setTimestamp();
    return message
      .reply({
        embeds: [embed],
        allowedMentions: { repliedUser: false },
      })
      .catch(console.error);
  },
};
