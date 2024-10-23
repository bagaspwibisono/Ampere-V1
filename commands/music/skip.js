const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'skip',
    description: 'Skip lagi saat ini',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content:`Tidak ada musik yang sedang diputar ${inter.member} ❌` });

        const success = queue.node.skip();

        const SkipEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({name: success ? `Lagu ${queue.currentTrack.title} telah dilewati ✅` : `Terjadi kesalahan ${inter.member}... coba lagi ? ❌` })


    //    return inter.editReply({ embeds: [SkipEmbed] });
        return inter.editReply({ embeds: [SkipEmbed] });         
    },
};