const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'help',
    description: "Semua perintah yang dimiliki bot ini!",
    showHelp: false,

    execute({ client, inter }) {
        const commands = client.commands.filter(x => x.showHelp !== false);

        const embed = new EmbedBuilder()
        .setColor('#ff0000')
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true }) })
        .setDescription('Upgradean versi V3 => V4 Voltz | Jika menemukan error harap laporkan kepada @voltac.')
        .addFields([ { name: `Modul Tersedia - ${commands.size}`, value: commands.map(x => `\`${x.name}\``).join(' | ') } ])
        .setTimestamp()
        .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })});

        inter.editReply({ embeds: [embed] });
    }
};