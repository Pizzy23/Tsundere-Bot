const {
  EmbedBuilder,
  ApplicationCommandType,
  WebhookClient,
} = require("discord.js");
const { EmbedPlayer } = require("../util/embed/embedPlayer");
const embed = new EmbedPlayer();

module.exports = {
  name: "loop",
  aliases: ["l"],
  description: "Loop the current song.",
  usage: "/loop [type]" || "loop", // usage of the cmd
  category: "Music", // cmd category
  type: ApplicationCommandType.ChatInput,
  cooldown: 3000, // cooldown of the commands
  default_member_permissions: "SendMessages", // discord perms user to see the cmd
  inVoiceChannel: true,
  sameVoice: true,

  async execute(client, message, args) {
    try {
      const { member, guildId, guild } = message;
      const loop = args[0];
      const queue = client.distube.getQueue(message);
      if (!queue) {
        return embed.notSongForLoop(message);
      }
      if (loop) {
        let mode = null;
        switch (loop) {
          case "off":
            mode = 0;
            break;
          case "one":
            mode = 1;
            break;
          case "all":
            mode = 2;
            break;
        }
        mode = queue.setRepeatMode(mode);
        mode = mode ? (mode === 2 ? "Repeat queue" : "Repeat song") : "Off";
        return embed.loopSucceeded(message, mode);
      } else {
        return embed.ifNotRecevingLoopCommand(message);
      }
    } catch (e) {}
  },
};
