const { EmbedBuilder } = require('discord.js');

module.exports = async ({ client, inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar... coba lagi ? ❌` });
    if (!queue.tracks.toArray()[0]) return inter.editReply({ content: `Tidak ada lagi lain dalam antiran setelah ini ${inter.member}... coba lagi ? ❌` });

    const methods = ['', '🔁', '🔂'];
    const songs = queue.tracks.length;
    const nextSongs = songs > 5 ? `And **${songs - 5}** other song(s)...` : `In the playlist **${songs}** song(s)...`;
    const tracks = queue.tracks.map((track, i) => `**${i + 1}** - ${track.title} | ${track.author} (request dari : ${track.requestedBy ? track.requestedBy.displayName : "unknow"})`);

    const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setThumbnail(inter.guild.iconURL({ size: 2048, dynamic: true }))
        .setAuthor({ name: `Antrian server - ${inter.guild.name} ${methods[queue.repeatMode]}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription(`Current ${queue.currentTrack.title}\n\n${tracks.slice(0, 5).join('\n')}\n\n${nextSongs}`)
        .setTimestamp()
        .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true }) });

    inter.editReply({ embeds: [embed] });


}
