const { EmbedPlayer } = require("../util/embed/embedPlayer");
const embed = new EmbedPlayer();

module.exports = {
  name: "skip",
  description: "Skip to the next song",
  aliases: ["next"],
  category: "Music",
  execute: async (client, message, args) => {
    const queue = client.distube.getQueue(message);
    if (!queue) return embed.noSong(message);
    try {
    if(queue.songs.length > 1){
      const song = await queue.skip(message);
      return embed.skipMusic(message,song);
    }
    queue.stop();
    return embed.lastSkipMusic(message)
    return 
} catch (e) {
      return embed.genericError(message);
    }
  },
};
