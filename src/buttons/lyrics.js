const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });
    
    try {
        const search = await genius.songs.search(queue.currentTrack.title);

        const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
        if (!song) return inter.editReply({ content: `Lirik ${queue.currentTrack.title} tidak ditemukan... coba lagi ? ❌`, ephemeral: true });
        const lyrics = await song.lyrics();
        const embeds = [];
        for (let i = 0; i < lyrics.length; i += 4096) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
            embeds.push(new EmbedBuilder()
                .setTitle(`Lyrics for ${queue.currentTrack.title}`)
                .setDescription(toSend)
                .setColor('#2f3136')
                .setTimestamp()
                .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true }) })
            );
        }
        const messgae = await inter.editReply({ embeds: embeds, ephemeral: true });
        
        setTimeout(() => {
            messgae.delete();
        }, 360000);
    } catch (error) {
        inter.editReply({ content: `Error! DM Voltac! | ❌`, ephemeral: true });
    }
}