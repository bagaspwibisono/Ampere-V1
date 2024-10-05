const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'clear',
    description: 'hapus semua musik dalam antrian',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan ${inter.member}... coba lagi ? ❌`, ephemeral: true });

        if (!queue.tracks.toArray()[1]) return inter.editReply({ content: `Tidak ada musik dalam antrian ini ${inter.member}... coba lagi ? ❌`, ephemeral: true });

        await queue.tracks.clear();

        const ClearEmbed = new EmbedBuilder()
            .setAuthor({name: `Antrian telah dibersihkan 🗑️`})
            .setColor('#2f3136')
        
        // inter.editReply({ embeds: [ClearEmbed] });
        inter.editReply({ embeds: [ClearEmbed] });


    },
};