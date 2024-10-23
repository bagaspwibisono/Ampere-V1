const { EmbedBuilder } = require('discord.js');

module.exports = async (queue, track) => {
    if (!client.config.app.ExtraMessages) return

    const audioTrackAdd = new EmbedBuilder()
    .setAuthor({name: `Trek lagu ${track.title} berhasil ditambahkan dalam antrian ✅`, iconURL: track.thumbnail})
    .setColor('#2f3136')

    // queue.metadata.send({ embeds: [audioTrackAdd] })
    const message = await queue.metadata.send({ embeds: [audioTrackAdd] });

    setTimeout(() => {
        message.delete();
    }, 12000); // 5000

}
