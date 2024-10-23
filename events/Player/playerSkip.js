const { EmbedBuilder } = require('discord.js');

module.exports = async (queue, track) => {

    const playerSkip = new EmbedBuilder()
    .setAuthor({name: `Melewati **${track.title}** ❌`, iconURL: track.thumbnail})
    .setColor('#EE4B2B')

    // queue.metadata.send({ embeds: [playerSkip] })
    const message = await queue.metadata.send({ embeds: [playerSkip] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000


}
