const { EmbedBuilder, InteractionType } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = async (client, inter) => {
    await inter.deferReply({ ephemeral: true });
    if (inter.type === InteractionType.ApplicationCommand) {
        const DJ = client.config.opt.DJ;
        const command = client.commands.get(inter.commandName);

        const errorEmbed = new EmbedBuilder().setColor('#ff0000');

        if (!command) {
            errorEmbed.setDescription('❌ | Error! Tolong hubungi @voltac!');
            inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            return client.slash.delete(inter.commandName);
        }

        if (command.permissions && !inter.member.permissions.has(command.permissions)) {
            errorEmbed.setDescription(`❌ | Anda perlu memiliki akses yang untuk menjalankan perintah ini`);
            return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (DJ.enabled && DJ.commands.includes(command) && !inter.member._roles.includes(inter.guild.roles.cache.find(x => x.name === DJ.roleName).id)) {
            errorEmbed.setDescription(`❌ | Perintah ini diperuntukkan bagi anggota dengan role \`${DJ.roleName}\` `);
            return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
        }

        if (command.voiceChannel) {
            if (!inter.member.voice.channel) {
                errorEmbed.setDescription(`❌ | Anda tidak berada di Saluran Suara`);
                return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }

            if (inter.guild.members.me.voice.channel && inter.member.voice.channel.id !== inter.guild.members.me.voice.channel.id) {
                errorEmbed.setDescription(`❌ | Anda tidak berada di Saluran Suara yang sama`);
                return inter.editReply({ embeds: [errorEmbed], ephemeral: true });
            }
        }

        command.execute({ inter, client });
    } else if (inter.type === InteractionType.MessageComponent) {
        const customId = inter.customId;
        if (!customId) return;

        const queue = useQueue(inter.guild);
        const path = `../../buttons/${customId}.js`;

        delete require.cache[require.resolve(path)];
        const button = require(path);
        if (button) return button({ client, inter, customId, queue });
    }
}