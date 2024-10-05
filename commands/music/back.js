const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'back',
    description: "Kembali ke lagu sebelumnya",
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content:  `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        if (!queue.history.previousTrack) return inter.editReply({ content: `Tidak ada musik yang diputar sebelumnya ${inter.member}... coba lagi ? ❌` });

        await queue.history.back();

        const BackEmbed = new EmbedBuilder()
            .setAuthor({name: `Memutar trek sebelumnya ✅`})
            .setColor('#2f3136')

        // inter.editReply({ embeds: [BackEmbed] });
        inter.editReply({ embeds: [BackEmbed] });
        
    
    },
};