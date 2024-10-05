const maxVol = client.config.opt.maxVol;
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

module.exports = {
    name: 'volume',
    description: 'sesuaikan',
    voiceChannel: true,
    options: [
        {
            name: 'volume',
            description: 'sesuaikan volume suara',
            type: ApplicationCommandOptionType.Number,
            required: true,
            minValue: 1,
            maxValue: maxVol
        }
    ],

    async execute({ inter }) {
        const queue = useQueue(inter.guild);
            if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member} ❌` });
        
            const vol = inter.options.getNumber('volume')
            if (queue.node.volume === vol) return inter.editReply({ content: `Volume yang ingin Anda ubah sudah menjadi volume saat ini ${inter.member} ❌`, ephemeral: true });
        
            const success = queue.node.setVolume(vol);
        
            // return inter.editReply({ content: success ? `Volumenya telah diubah menjadi ${vol}/${maxVol}% 🔊` : `Ada yang salah ${inter.member}... coba lagi ? ❌` });
            const embed = new EmbedBuilder()
                .setColor('#EE4B2B')
                .setDescription(success ? `Volumenya telah diubah menjadi ${vol}/${maxVol}% 🔊` : `Ada yang salah ${inter.member}... coba lagi ? ❌`);
        
            return inter.editReply({ embeds: [embed] }).then(() => {

        });
    },
};