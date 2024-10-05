const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });

    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Tidak ada musik setelah antrian ini ${inter.member}... coba lagi ? ❌`, ephemeral: true });

        await queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Antrian diacak dari ${queue.tracks.size} lagu! ✅` })


       return inter.editReply({ embeds: [ShuffleEmbed], ephemeral: true});
}