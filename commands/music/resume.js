const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'resume',
    description: 'memutar trek kembali',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member} ❌` });
        
        if(queue.node.isPlaying()) return inter.editReply({content: `Lagu sudah dimainkan, ${inter.member} ❌` })

        const success = queue.node.resume();
        
        const ResumeEmbed = new EmbedBuilder()
        .setAuthor({name: success ? `Musik saat ini ${queue.currentTrack.title} dilanjutkan ✅` : `Ada yang salah ${inter.member}... coba lagi ? ❌` })
        .setColor('#2f3136')
        
        // return inter.editReply({ embeds: [ResumeEmbed] });
        return inter.editReply({ embeds: [ResumeEmbed] });

    },
};
