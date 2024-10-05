const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik sedang dimainkan... coba lagi ? ❌` });

    const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
        .setURL(queue.currentTrack.url)
        .addFields(
            { name: ':hourglass: Durasi:', value: `\`${queue.currentTrack.duration}\``, inline: true },
            { name: ':microphone: Penyanyi:', value: `\`${queue.currentTrack.author}\``, inline: true },
            { name: ':eyes: Views:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
            { name: ':link: URL Lagu:', value: `\`${queue.currentTrack.url}\`` }
        )
        .setThumbnail(queue.currentTrack.thumbnail)
        .setFooter({ text: `Dari server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) });

    return inter.member.send({ embeds: [embed] })
        .then(() => {
            return inter.editReply({ content: `Judul musik telah dikirmkan melalui pesan pribadi ✅` });
        }).catch(error => {
            return inter.editReply({ content: `Tidak dapat mengirimi Anda pesan pribadi... coba lagi ? ❌` });
        });

}
