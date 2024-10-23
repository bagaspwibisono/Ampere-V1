const { EmbedBuilder } = require('discord.js');
module.exports = async (queue) => {
    const emptyQueue = new EmbedBuilder()
    .setAuthor({name: `Tidak ada lagi lagu dalam antrian! ❌`})
    .setColor('#2f3136')

    // queue.metadata.send({ embeds: [emptyQueue] })
    const message = await queue.metadata.send({ embeds: [emptyQueue] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000 ms > 5 detik
}
