const { EmbedBuilder } = require('discord.js');
module.exports = async ({ client, inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });

    queue.delete();

        const StopEmbed = new EmbedBuilder()
        .setColor('#2f3136')
        .setAuthor({name: `Musik berhenti di server ini, memasuki mode standby! ✅` })


        // return inter.editReply({ embeds: [StopEmbed], ephemeral: true });
        inter.editReply({ embeds: [StopEmbed], ephemeral: true }).then((message) => {
            setTimeout(() => {
                message.delete();
            }, 5000);
        });
}