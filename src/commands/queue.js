const { EmbedPlayer } = require("../util/embed/embedPlayer");
const embed = new EmbedPlayer();


module.exports = {
    name: 'queue',
    aliases: ['q'],
    description: "Queue Musics", 
    category: "Music", 
    execute: async (client, message) => {
      const queue = client.distube.getQueue(message)
      if (!queue) return message.channel.send(` There is nothing playing!`)
      const q = queue.songs
        .map((song, i) => `${i === 0 ? 'Playing:' : `${i}.`} ${song.name} - \`${song.formattedDuration}\``)
        .join('\n')
      message.channel.send(`**Server Queue**\n${q}`)
    }
  }
  