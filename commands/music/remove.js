const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'remove',
    description: "menghapus lagu dari antrian",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'nama/url trek yang ingin Anda hapus',
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
        if (!queue?.isPlaying()) return inter.editReply({ content: `TIdak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        const number =  inter.options.getNumber('number')
        const track = inter.options.getString('song');
        if (!track && !number) inter.editReply({ content: `Anda harus menggunakan salah satu opsi untuk menghapus lagu ${inter.member} ❌`, ephemeral: true });

        let trackName;

        if (track) {
            const toRemove = queue.tracks.toArray().find((t) => t.title === track || t.url === track);
            if (!toRemove) return inter.editReply({ content: `Tidak dapat menemukan ${track} ${inter.member}... coba gunakan URL atau judul full lagu beserta artis tersebut ? ❌` });

            queue.removeTrack(toRemove);
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: `Judul lagu ini sepertinya tidak ada ${inter.member}... coba lagi ?❌` });

            queue.removeTrack(index);

            trackName = name;
        }
        
        const RemoveEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({ name: `Menghapus lagu ${trackName} dari antrian ✅` });

            // return inter.editReply({ embeds: [BaseEmbed] });
            await inter.editReply({ embeds: [RemoveEmbed] });
                
    }
}
