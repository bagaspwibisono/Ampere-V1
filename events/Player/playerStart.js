const { ActionRowBuilder, ButtonBuilder, EmbedBuilder } = require('discord.js');

module.exports = (queue, track) => {


    const methods = ['disabled', 'track', 'queue'];
    const timestamp = track.duration;
    const trackDuration = timestamp.progress == 'Infinity' ? 'infinity (live)' : track.duration;

    if (!client.config.app.loopMessage && queue.repeatMode !== 0) return;
        const embed = new EmbedBuilder()
        .setAuthor({name: `Media player memutar lagu di channel ${queue.channel.name} 🎧`})
        .addFields(
            { name: ':hourglass: Durasi:', value: `\`${trackDuration}\``, inline: true },
            { name: ':microphone: Penyanyi:', value: `\`${track.author}\``, inline: true },
            { name: ':page_facing_up: Judul :', value: `\`${track.title}\``, inline: true },
            { name: ':speaker: Volume :', value: `\`${queue.node.volume}\`%`, inline: true },
            { name: ':repeat: Loop Mode :', value: `\`${methods[queue.repeatMode]}\``, inline: true },
            { name: ':speech_balloon: Request dari :', value: `${track.requestedBy}`, inline: true }
        )
        .setThumbnail(track.thumbnail)
        .setTimestamp()
        .setFooter({ text: 'Voltz - Ampere Project⚡'})
        
        const back = new ButtonBuilder()
        .setLabel('back')
        .setEmoji('1108035865969705051')
        .setCustomId('back')
        .setStyle('Secondary')
        
        const resumepause = new ButtonBuilder()
        .setLabel('Play / Pause')
        .setEmoji('1189215825186537574')
        .setCustomId('resume&pause')
        .setStyle('Success')
        
        const skip = new ButtonBuilder()
        .setLabel('Skip')
        .setEmoji('1108036462437478460')
        .setCustomId('skip')
        .setStyle('Secondary')
        
        const stop = new ButtonBuilder()
        .setLabel('Stop')
        .setEmoji('1107897594291691541')
        .setCustomId('stop')
        .setStyle('Danger')        
        
        const loop = new ButtonBuilder()
        .setLabel('Loop')
        .setEmoji('1107897548406009867')
        .setCustomId('loop')
        .setStyle('Secondary')
        
        const shuffle = new ButtonBuilder()
        .setLabel('Shuffle')
        .setEmoji('1107897567594942525')
        .setCustomId('shuffle')
        .setStyle('Secondary')
        
        const volumedown = new ButtonBuilder()
        .setLabel('Vol -')
        .setEmoji('1107897605574361108')
        .setCustomId('volumedown')
        .setStyle('Secondary')
        
        const volumeup = new ButtonBuilder()
        .setLabel('Vol +')
        .setEmoji('1107897611635134545')
        .setCustomId('volumeup')
        .setStyle('Secondary')
    
        const lyrics = new ButtonBuilder()
        .setLabel('Lirik')
        .setEmoji('1107897508312657930')
        .setCustomId('lyrics')
        .setStyle('Secondary')

        const save = new ButtonBuilder()
        .setLabel('💾 Save')
        .setCustomId('savetrack')
        .setStyle('Secondary')


        const row1 = new ActionRowBuilder().addComponents(back, resumepause, skip, loop, stop)
        const row2 = new ActionRowBuilder().addComponents(shuffle, volumedown, volumeup, save, lyrics)
        // const row3 = new ActionRowBuilder().addComponents()
        queue.metadata.send({ embeds: [embed], components: [row1, row2] }).then((msg) => removeMessageOnSong(msg, track));
            if (track.playlist) {
        console.log(`\x1b[34m ==========User ${track.requestedBy} / Server  ================ \n\x1b[34m Mulai memutar playlist "${track.playlist.title}" oleh ${track.playlist.author.name}. \n\x1b[34m URL: ${track.playlist.url} \n\x1b[34m ==========================`);
        } else {
        console.log(`\x1b[34m ==========User ${track.requestedBy} / Server  ================ \n\x1b[34m Mulai memutar lagu "${track.title}" oleh ${track.author}. \n\x1b[34m Durasi: ${track.duration}. \n\x1b[34m URL: ${track.url} \n\x1b[34m ==========================`);
        }
    }

        // queue.metadata.send({ embeds: [embed], components: [row1, row2] })
        // inter.editReply({ embeds: [embed], components: [row1, row2, row3] })
        function removeMessageOnSong(msg, track) {
            setTimeout(() => {
                msg.delete();
            }, track.durationMS);
        }

