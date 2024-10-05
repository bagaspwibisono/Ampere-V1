const { ApplicationCommandOptionType, ActionRowBuilder, ButtonBuilder, EmbedBuilder, PermissionsBitField } = require('discord.js');

module.exports = {
    name: 'controller',
    description: "atur controller channel ",
    voiceChannel: false,
    permissions: PermissionsBitField.Flags.ManageMessages,
    options: [
        {
            name: 'channel',
            description: 'channel tujuan yang ingin dikirim',
            type: ApplicationCommandOptionType.Channel,
            required: true,
        }
    ],
    async execute({ inter }) { 
        let Channel = inter.options.getChannel('channel');
        if (Channel.type !== 0) return inter.editReply({ content: `Anda harus mengirimkannya ke Text Channel.. ❌`, ephemeral: true})

    
        const embed = new EmbedBuilder()
            .setTitle('💽 Kontrol panel media player')
            .setImage('https://i.gifer.com/76Ov.gif')
            // .setImage(inter.guild.iconURL({ size: 4096, dynamic: true }))
            .setColor('#2f3136')
            .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })})

        inter.editReply({ content: `Membuat controller ke ${Channel}... ✅`, ephemeral: true})

        const back = new ButtonBuilder()
            .setLabel('⏮️ Mundur')
            .setCustomId(JSON.stringify({ffb: 'back'}))
            .setStyle('Secondary')

        const skip = new ButtonBuilder()
            .setLabel('⏭️ Selanjutnya')
            .setCustomId(JSON.stringify({ffb: 'skip'}))
            .setStyle('Secondary')

        const resumepause = new ButtonBuilder()
            .setLabel('⏯️ Putar/Jeda')
            .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
            .setStyle('Secondary')


        const save = new ButtonBuilder()
            .setLabel('💾 Simpan Lagu')
            .setCustomId(JSON.stringify({ffb: 'savetrack'}))
            .setStyle('Success')

        const volumeup = new ButtonBuilder()
            .setLabel('🔊 Volume Naik')
            .setCustomId(JSON.stringify({ffb: 'volumeup'}))
            .setStyle('Secondary')

        const volumedown = new ButtonBuilder()
            .setLabel('🔉 Volume Turun')
            .setCustomId(JSON.stringify({ffb: 'volumedown'}))
            .setStyle('Secondary')

        const loop = new ButtonBuilder()
            .setLabel('🔁 Ulangi')
            .setCustomId(JSON.stringify({ffb: 'loop'}))
            .setStyle('Secondary')

        const np = new ButtonBuilder()
            .setLabel('💿 Sedang Diputar')
            .setCustomId(JSON.stringify({ffb: 'nowplaying'}))
            .setStyle('Secondary')
        
        const queuebutton = new ButtonBuilder()
            .setLabel('🔜 Antiran Lagu')
            .setCustomId(JSON.stringify({ffb: 'queue'}))
            .setStyle('Secondary')

        const lyrics = new ButtonBuilder()
            .setLabel('📜 Lirik')
            .setCustomId(JSON.stringify({ffb: 'lyrics'}))
            .setStyle('Secondary')

        const shuffle = new ButtonBuilder()
            .setLabel('🔀 Acak')
            .setCustomId(JSON.stringify({ffb: 'shuffle'}))
            .setStyle('Secondary')

        const stop = new ButtonBuilder()
            .setLabel('⏹️ Stop')
            .setCustomId(JSON.stringify({ffb: 'stop'}))
            .setStyle('Danger')


        const row1 = new ActionRowBuilder().addComponents(back, resumepause, skip, stop)
        const row2 = new ActionRowBuilder().addComponents(loop, shuffle, volumedown, volumeup)
        const row3 = new ActionRowBuilder().addComponents(lyrics, save, queuebutton, np)


        Channel.send({ embeds: [embed], components: [row1, row2, row3] })

    },
}
