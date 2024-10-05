const { EmbedBuilder } = require('discord.js')

module.exports = async ({ inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });

    inter.member.send({
        embeds: [
            new EmbedBuilder()
                .setColor('Red')
                .setTitle(`:arrow_forward: ${queue.currentTrack.title}`)
                .setURL(queue.currentTrack.url)
                .addFields(
                    { name: ':hourglass: Duration:', value: `\`${queue.currentTrack.duration}\``, inline: true },
                    { name: 'Song by:', value: `\`${queue.currentTrack.author}\``, inline: true },
                    { name: 'Views :eyes:', value: `\`${Number(queue.currentTrack.views).toLocaleString()}\``, inline: true },
                    { name: 'Song URL:', value: `\`${queue.currentTrack.url}\`` }
                )
                .setThumbnail(queue.currentTrack.thumbnail)
                .setFooter({ text: `Dari server ${inter.member.guild.name}`, iconURL: inter.member.guild.iconURL({ dynamic: false }) })
        ]
    }).then(() => {
        return inter.editReply({ content: `Judul musik telah dikirmkan melalui pesan pribadi ✅`, ephemeral: true });
    }).catch(error => {
        return inter.editReply({ content: `Tidak dapat mengirimi Anda pesan pribadi... coba lagi ? ❌`, ephemeral: true });
    });


}
