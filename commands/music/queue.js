const { EmbedBuilder } = require('discord.js');
const { useQueue  } = require('discord-player');

module.exports = {
    name: 'queue',
    description: 'Dapatkan list lagu dalam antrian',
    voiceChannel: true,

    async execute({ client, inter }) {
        const queue = useQueue(inter.guild);

        if (!queue) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });
        if (!queue.tracks.toArray()[0]) return  inter.editReply({ content: `Tidak ada musik dalam antrean sekarang ${inter.member}❌` });

        const methods = ['', '🔁', '🔂'];
        const songs = queue.tracks.size;
        const nextSongs = songs > 5 ? `List **${songs - 5}** lagu lainya dalam...` : `antrian playlist **${songs}** lagu...`;
        // const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.requestedBy ? track.requestedBy.displayName : "T"})`);
        const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (Request Dari: ${track.requestedBy ? track.requestedBy.displayName : "unknown"})`);

        const QueueEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
            .setAuthor({name: `Server queue - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
            .setDescription(`Sedang diputar: \n💿${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
            .setTimestamp()
            .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })})

        // inter.editReply({ embeds: [embed] });
        return inter.editReply({ embeds: [QueueEmbed] });

    },
};