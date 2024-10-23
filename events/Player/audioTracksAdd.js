const { EmbedBuilder } = require('discord.js');

module.exports = async (queue, track) => {
    if (!client.config.app.ExtraMessages) return

    const audioTracksAdd = new EmbedBuilder()
    .setAuthor({name: `Semua lagu di playlist ditambahkan ke antrean ✅`})
    .setColor('#2f3136')

    // queue.metadata.send({ embeds: [audioTracksAdd] })
    const message = await queue.metadata.send({ embeds: [audioTracksAdd] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000

}
