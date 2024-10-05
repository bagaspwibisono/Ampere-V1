const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer } = require('discord-player');

module.exports = {
    name: 'search',
    description: 'mencari trek lagu',
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'lagu yang ingin Anda cari',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ client, inter }) {
        const player = useMainPlayer()
        const song = inter.options.getString('song');

        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res?.tracks.length) return inter.editReply({ content: `Hasil tidak ditemukan ${inter.member}... coba lagi ? ❌` });

        const queue = await player.nodes.create(inter.guild, {
            metadata: {
                channel: inter.channel
                    },
            spotifyBridge: client.config.opt.spotifyBridge,
            volume: client.config.opt.defaultvolume,
            leaveOnEnd: client.config.opt.leaveOnEnd,
            leaveOnEmpty: client.config.opt.leaveOnEmpty
        });
        const maxTracks = res.tracks.slice(0, 10);

        const embed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Hasil untuk ${song}`, iconURL: client.user.displayAvatarURL({ size: 1024, dynamic: true })})
            .setDescription(`${maxTracks.map((track, i) => `**${i + 1}**. ${track.title} | ${track.author}`).join('\n')}\n\nPilih lagu berikut antara **1** dan **${maxTracks.length}** atau **batalkan** ⬇️`)
            .setTimestamp()
            .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true })})

        await inter.editReply({ embeds: [embed] });

        const collector = inter.channel.createMessageCollector({
            time: 15000,
            max: 1,
            errors: ['time'],
            filter: m => m.author.id === inter.member.id
        });

        collector.on('collect', async (query) => {
            collector.stop();
            if (query.content.toLowerCase() === 'cancel') {
                return inter.followUp({ content: `Pencarian dibatalkan ✅`, ephemeral: true });
            }

            const value = parseInt(query);
            if (!value || value <= 0 || value > maxTracks.length) {
                return inter.followUp({ content: `Tanggapan tidak valid, coba gunakan angka **1** dan **${maxTracks.length}** atau **cancel**... coba lagi ? ❌`, ephemeral: true });
            }

            try {
                if (!queue.connection) await queue.connect(inter.member.voice.channel);
            } catch {
                await player.deleteQueue(inter.guildId);
                return inter.followUp({ content: `Saya tidak bisa join voice channel ${inter.member}... coba lagi ? ❌`, ephemeral: true });
            }

            await inter.followUp(`Memuat pencarian Anda... 🎧`);

            queue.addTrack(res.tracks[query.content - 1]);

            if (!queue.isPlaying()) await queue.node.play();
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time') return inter.followUp({ content:`Waktu pencarian habis ${inter.member}... coba lagi ? ❌`, ephemeral: true })
        });
    },
};
