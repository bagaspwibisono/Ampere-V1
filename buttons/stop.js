const { EmbedBuilder } = require('discord.js');

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });

    queue.delete();

    const embed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({ name: `Musik dihentikan di server ini, Adios... ✅` });

    return inter.editReply({ embeds: [embed] });

}