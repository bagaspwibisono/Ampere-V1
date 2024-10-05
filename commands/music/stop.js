const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'stop',
    description: 'menghentikan trek lagu',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content:`Tidak ada musik yang sedang diputar ${inter.member} ❌` });

        queue.delete();

        const StopEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({name: `Musik berhenti di server ini, memasuki mode standby! ✅` })

        // return inter.editReply({ embeds: [StopEmbed] });
        return inter.editReply({ embeds: [StopEmbed] });

    },
};