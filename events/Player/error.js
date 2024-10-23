const { EmbedBuilder } = require('discord.js');

module.exports = async (queue, error) => {
    
    const ErrorEmbed = new EmbedBuilder()
    .setAuthor({name: `Bot had an unexpected error, please check the console imminently!`, iconURL: track.thumbnail})
    .setColor('#EE4B2B')
    
    queue.metadata.send({ embeds: [ErrorEmbed] })
    const message = await queue.metadata.send({ embeds: [ErrorEmbed] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000

console.log(`Kesalahan dikeluarkan dari Bot ${error.message}`);
}
