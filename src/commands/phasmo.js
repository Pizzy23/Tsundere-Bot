
module.exports = {
  name: "cabaco",
  aliases: ["c"],
  description: "Cabaço count",
  usage: "cabacice",
  options: [],

  async execute(client, message, args) {
    if (
      client.config.serverPermissions[0] == message.guild.id ||
      client.config.serverPermissions[1] == message.guild.id
    ) {
    }
  },
};
