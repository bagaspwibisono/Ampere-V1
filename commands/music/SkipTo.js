const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'skipto',
    description: "melompat ke trek tertentu dalam antrian",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'nama/url trek yang ingin Anda lewati',
            type: ApplicationCommandOptionType.String,
            required: false,
        },
        {
            name: 'number',
            description: 'tempat dalam antrian lagu tersebut berada',
            type: ApplicationCommandOptionType.Number,
            required: false,
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        const track = inter.options.getString('song');
        const number = inter.options.getNumber('number')
        if (!track && !number) return inter.editReply({ content: `Anda harus menggunakan salah satu opsi untuk melompat ke sebuah lagu ${inter.member}... coba lagi ? ❌` });

        let trackName;

        if (track) {
            const skipTo = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
            if (!skipTo) return inter.editReply({ content: `Could not find ${track} ${inter.member}... try using the url or the full name of the song ? ❌` });

            trackName = skipTo.title;

            queue.node.skipTo(skipTo);
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: `This track does not seem to exist ${inter.member}...  try again ?❌` });

            trackName = name;

            queue.node.skipTo(index);
        }

        const skipToEmbed = new EmbedBuilder()
            .setAuthor({name: `Track di lewati...\nMemutar ${trackName} ✅`})
            .setColor('#2f3136')
        
        // inter.editReply({ embeds: [skipToEmbed] });
        inter.editReply({ embeds: [skipToEmbed] });
    }

}
