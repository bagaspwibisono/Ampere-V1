const { EmbedBuilder } = require('discord.js');
module.exports = async (queue) => {

    const emptyChannel = new EmbedBuilder()
    .setAuthor({name: `Tidak ada orang di Voice channel, meninggalkan Voice channel!  ❌`})
    .setColor('#2f3136')

    // queue.metadata.send({ embeds: [emptyChannel] })
    const message = queue.metadata.send({ embeds: [emptyChannel] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000
}
