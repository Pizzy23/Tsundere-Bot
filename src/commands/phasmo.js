const { Phasmo } = require("../services/phasmo");
const { EmbedClass } = require("../util/embed/embedBase");
const { ClearStringClass } = require("../util/clearString");

const phasmo = new Phasmo();
module.exports = {
  name: "phasmo",
  aliases: ["ph", "g"],
  description: "GET THE GHOST",
  usage: "Ghost",
  options: [],

  async execute(client, message, args) {
    const embed = new EmbedClass();
    if (
      client.config.serverPermissions[2] == message.guild.id ||
      client.config.serverPermissions[1] == message.guild.id
    ) {
      return phasmo.calls(client, message);
    }
    return embed.noPermission(message);
  },
};
