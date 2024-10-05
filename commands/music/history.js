const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'history',
    description: 'Lihat riwayat antrian',
    voiceChannel: false,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);

        if (!queue || queue.history.tracks.toArray().length == 0) return inter.editReply({ content: `Belum ada musik yang diputar` });

        const tracks = queue.history.tracks.toArray();
        console.log(tracks)
        let description = tracks
            .slice(0, 20)
            .map((track, index) => { return `**${index + 1}.** [${track.title}](${track.url}) by ${track.author}` })
            .join('\r\n\r\n');

        let HistoryEmbed = new EmbedBuilder()
            .setTitle(`History`)
            .setDescription(description)
            .setColor('#2f3136')
            .setTimestamp()
            .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })})


        // inter.editReply({ embeds: [HistoryEmbed] });
        return inter.editReply({ embeds: [HistoryEmbed] });
        


    },
};