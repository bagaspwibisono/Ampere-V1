const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'shuffle',
    description: 'Mengacak trek lagu',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member} ❌` });

        if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Tidak ada musik setelah antrian ini ${inter.member} ❌` });

        queue.tracks.shuffle();

        const ShuffleEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({name: `Antrian diacak ${queue.tracks.size} song(s)! ✅` })


        return inter.editReply({ embeds: [ShuffleEmbed] });

    },
};