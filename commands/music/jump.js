const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useQueue } = require('discord-player');

module.exports = {
    name: 'jump',
    description: "Melompat ke trek tertentu dalam antrian",
    voiceChannel: true,
    options: [
        {
            name: 'song',
            description: 'nama/url trek yang ingin Anda lompati',
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
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan ${inter.member}... coba lagi ? ❌` });

        const track = inter.options.getString('song');
        const number =  inter.options.getNumber('number');
        if (!track && !number) inter.editReply({ content: `Gunakan salah satu opsi untuk melompat ke sebuah lagu ${inter.member}... coba lagi ? ❌` });

        let trackName;
        if (track) {
            const toJump = queue.tracks.toArray().find((t) => t.title.toLowerCase() === track.toLowerCase() || t.url === track)
            if (!toJump) return inter.editReply({ content: `tidak bisa menemukan ${track} ${inter.member}... coba pakai url atau nama lengkap lagunya ? ❌` });

            queue.node.jump(toJump);
            trackName = toJump.title;
        } else if (number) {
            const index = number - 1;
            const name = queue.tracks.toArray()[index].title;
            if (!name) return inter.editReply({ content: `This track does not seem to exist ${inter.member}...  try again ? ❌` });

            queue.node.jump(index);
            trackName = name;
        }

        const JumpEmbed = new EmbedBuilder()
            .setAuthor({name: `Melompat ke <${trackname}> ✅`})
            .setColor('#2f3136')
        
        // No return ? entah lah
        inter.editReply({ embeds: [JumpEmbed] });
    
    }
}
