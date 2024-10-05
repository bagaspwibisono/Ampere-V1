const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { QueryType, useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'playnext',
    description: "lagu yang ingin Anda mainkan selanjutnya",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'lagu yang ingin Anda mainkan selanjutnya',
            type: ApplicationCommandOptionType.String,
            required: true,
        }
    ],

    async execute({ inter }) {
        const player = useMainPlayer()
        const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        const song = inter.options.getString('song');
        const res = await player.search(song, {
            requestedBy: inter.member,
            searchEngine: QueryType.AUTO
        });

        if (!res?.tracks.length) return inter.editReply({ content: `Tidak ada hasil yang ditemukan ${inter.member}... coba lagi ? ❌` });

        if (res.playlist) return inter.editReply({ content: `Playlist ini tidak mendukung command ${inter.member}... coba lagi ? ❌` });

        queue.insertTrack(res.tracks[0], 0)

        const PlayNextEmbed = new EmbedBuilder()
            .setAuthor({name: `Lagu telah dimasukkan ke dalam antrian... selanjutnya akan diputar  🎧` })
            .setColor('#2f3136')
        
        // await inter.editReply({ embeds: [PlayNextEmbed] });
        return inter.editReply({ embeds: [PlayNextEmbed] });
        

    }
}
