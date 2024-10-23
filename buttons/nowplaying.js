const { EmbedBuilder } = require('discord.js');

module.exports = async ({ client, inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar... try again ? ❌` });

    const track = queue.currentTrack;
    const methods = ['disabled', 'track', 'queue'];
    const timestamp = track.duration;
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
    const progress = queue.node.createProgressBar();

    const embed = new EmbedBuilder()
        .setAuthor({ name: track.title, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setThumbnail(track.thumbnail)
        .addFields(
            { name: ':hourglass: Durasi:', value: `\`${trackDuration}\``, inline: true },
            { name: ':speaker: Volume :', value: `\`${queue.node.volume}\`%`, inline: true },
            { name: ':repeat: Loop Mode :', value: `\`${methods[queue.repeatMode]}\``, inline: true },
            { name: ':speech_balloon: Request dari :', value: `${track.requestedBy}`, inline: true }
        )
        // .setDescription(`Volume **${queue.node.volume}**%\nDurasi **${trackDuration}**\nProgress ${progress}\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`)
        .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true }) })
        .setColor('#fafafa')
        .setTimestamp();

        inter.editReply({ embeds: [embed] });
}
