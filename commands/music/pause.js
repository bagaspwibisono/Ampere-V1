const { EmbedBuilder } = require('discord.js');
const { useQueue  } = require('discord-player');

module.exports = {
    name: 'pause',
    description: 'jeda trek lagu',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}❌` });
        
        if (queue.node.isPaused()) return inter.editReply({content: `Lagu saat ini sedang dijeda, ${inter.member} ❌` })

        const success = queue.node.setPaused(true);
        const PauseEmbed = new EmbedBuilder()
            .setAuthor({name: success ? `Musik saat ini ${queue.currentTrack.title} dijeda ✅` : `Terjadi kesalahan ${inter.member} ❌` })
            .setColor('#2f3136')
        
        // return inter.editReply({ embeds: [PauseEmbed] });
        return inter.editReply({ embeds: [PauseEmbed] });
        
    },
};
// embed update stoped here