const { EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'nowplaying',
    description: 'melihat apa yang sedang diputar!',
    voiceChannel: true,

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        const track = queue.currentTrack;
        const methods = ['disabled', 'track', 'queue'];
        const timestamp = track.duration;
        const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;
        const progress = queue.node.createProgressBar();
        

        const NowplayEmbed = new EmbedBuilder()
        .setAuthor({ name: track.title,  iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
        .setThumbnail(track.thumbnail)
        .setDescription(`Volume **${queue.node.volume}**%\nDuration **${trackDuration}**\nProgress ${progress}\nLoop mode **${methods[queue.repeatMode]}**\nRequested by ${track.requestedBy}`)
        .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })})
        .setColor('#2f3136')
        .setTimestamp()

        // const save = new ButtonBuilder()
        // .setLabel('Save')
        // .setCustomId(JSON.stringify({ffb: 'savetrack'}))
        // .setStyle('Secondary')

        // const volumedown = new ButtonBuilder()
        // .setLabel('Vol -')
        // .setEmoji('1107897605574361108')
        // .setCustomId(JSON.stringify({ffb: 'volumedown'}))
        // .setStyle('Secondary')

        // const volumeup = new ButtonBuilder()
        // .setLabel('Vol +')
        // .setEmoji('1107897611635134545')
        // .setCustomId(JSON.stringify({ffb: 'volumeup'}))
        // .setStyle('Secondary')

        // const loop = new ButtonBuilder()
        // .setLabel('Loop')
        // .setEmoji('1107897548406009867')
        // .setCustomId(JSON.stringify({ffb: 'loop'}))
        // .setStyle('Secondary')

        // const resumepause = new ButtonBuilder()
        // .setLabel('Play / Pause')
        // .setEmoji('1189215825186537574')
        // .setCustomId(JSON.stringify({ffb: 'resume&pause'}))
        // .setStyle('Success')


        // const row = new ActionRowBuilder().addComponents(volumedown, save, resumepause, loop, volumeup)

        // inter.editReply({ embeds: [embed], components: [row] })
        // inter.editReply({ embeds: [embed] })
        return inter.editReply({ embeds: [NowplayEmbed] });
        
    },
};
