const { EmbedBuilder } = require('discord.js');

module.exports = async (queue) => {

    const Disconnect = new EmbedBuilder()
        .setAuthor({name: `Terputus dari Voice channel, menghapus antrian! ❌`})
        .setColor('#2f3136')

    // queue.metadata.send({ embeds: [Disconnect] })
    const message = await queue.metadata.send({ embeds: [Disconnect] });

    setTimeout(() => {
      message.delete();
    }, 12000); // 5000
}
