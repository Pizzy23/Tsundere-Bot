const { EmbedPlayer } = require("../util/embed/embedPlayer");
const embed = new EmbedPlayer();


module.exports = {
  name: "shuffle", 
  description: "Shuffle Musics", 
  aliases: ["shuffle"], 
  category: "Music", 
  execute: async (client, message, args) => {
  const queue = client.distube.getQueue(message)
  if (!queue) return embed.genericError(message)
  queue.shuffle()
  embed.randomMusic(message)
}
}