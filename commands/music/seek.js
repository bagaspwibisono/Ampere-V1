const ms = require('ms');
const {  ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'seek',
    description: 'melompat mundur atau maju dalam sebuah lagu',
    voiceChannel: true,
    options: [
    {
        name: 'time',
        description: 'waktu yang ingin Anda lewati',
        type: ApplicationCommandOptionType.String,
        required: true,
    }
    ],
    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.editReply} ❌`, ephemeral: true });

        const timeToMS = ms(inter.options.getString('time'));
        if (timeToMS >= queue.currentTrack.durationMS) {
            return inter.editReply({ content:`Waktu yang ditunjukkan lebih tinggi dari total waktu lagu saat ini ${inter.member}... try again ? ❌\n*Coba misalnya waktu yang valid seperti **5s, 10s, 20 detik, 1m**...*`, ephemeral: true });
        }

        await queue.node.seek(timeToMS);

        const SeekEmbed = new EmbedBuilder()
            .setColor('#2f3136')
            .setAuthor({name: `Setel waktu pada lagu saat ini **${ms(timeToMS, { long: true })}** ✅`})


        return inter.editReply({ embeds: [SeekEmbed] });

    },
};