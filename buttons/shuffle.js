const { EmbedBuilder } = require('discord.js');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang di putar... cobaa lagi ? ❌` });
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Tidak ada musik lain dalam antiran ini ${inter.member}... coba lagi ? ❌` });

    await queue.tracks.shuffle();

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Antiran ${queue.tracks.size} lagu telah di acak! ✅` });

    const message = await inter.editReply({ embeds: [embed], ephemeral: true });

    setTimeout(() => {
        message.delete();
    }, 5000);

}