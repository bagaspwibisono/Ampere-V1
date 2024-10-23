const { QueueRepeatMode, useQueue } = require('discord-player');
const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { execute } = require('./jump');

module.exports = {
    name: 'loop',
    description: 'mengaktifkan atau menonaktifkan loop di satu lagu atau seluruh antrian',
    voiceChannel: true,
    options: [
        {
        name: 'action' ,
        description: 'tindakan yang ingin di lakukan pada loop',
        type: ApplicationCommandOptionType.String,
        required: true,
        choices: [
            { name: 'Queue', value: 'enable_loop_queue' },
            { name: 'Disable', value: 'disable_loop'},
            { name: 'Song', value: 'enable_loop_song' },
            { name: 'Autoplay', value: 'enable_autoplay' },
        ],
    }
    ],
    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        const errorMessage = `Terjadi kesalahan ${inter.member}... coba lagi ? ❌`;
        let baseEmbed = new EmbedBuilder()
            .setColor('#2f3136');

        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan ${inter.member}... coba lagi ? ❌` });

        switch (inter.options._hoistedOptions.map(x => x.value).toString()) {
            case 'enable_loop_queue': {
                if (queue.repeatMode === QueueRepeatMode.TRACK) return inter.editReply({ content:`Anda harus terlebih dahulu menonaktifkan musik saat ini dalam mode loop (/loop Disable) ${inter.member}... coba lagi ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.QUEUE);
                baseEmbed.setAuthor({ name: success ? errorMessage : `Mode pengulangan diaktifkan, seluruh antrian akan diulang tanpa henti 🔁` })

                return inter.editReply({ embeds: [baseEmbed] });
                
            }
            case 'disable_loop': {
                if (queue.repeatMode === QueueRepeatMode.OFF) return inter.editReply({ content:`Anda harus terlebih dahulu mengaktifkan mode loop (/loop Queue atau /loop Song) ${inter.member}... coba lagi ? ❌` });
                
                const success = queue.setRepeatMode(QueueRepeatMode.OFF);
                baseEmbed.setAuthor({ name: success ? errorMessage : `Mode pengulangan dinonaktifkan, antrian tidak akan terulang lagi 🔁`})

                return inter.editReply({ embeds: [baseEmbed] });
                
            }
            case 'enable_loop_song': {
                if (queue.repeatMode === QueueRepeatMode.QUEUE) return inter.editReply({ content:`Anda harus terlebih dahulu menonaktifkan musik saat ini dalam mode loop (/loop Disable) ${inter.member}... coba lagi ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.TRACK);
                baseEmbed.setAuthor({ name: success ? errorMessage : `Mode pengulangan diaktifkan, lagu saat ini akan diulang tanpa henti (Anda dapat mengakhiri loop dengan /loop disbale)` })

                return inter.editReply({ embeds: [baseEmbed] });
                
            }
            case 'enable_autoplay': {
                if (queue.repeatMode === QueueRepeatMode.AUTOPLAY) return inter.editReply({ content:`Anda harus terlebih dahulu menonaktifkan musik saat ini dalam mode loop (/loop Disable) ${inter.member}... coba lagi ? ❌` });

                const success = queue.setRepeatMode(QueueRepeatMode.AUTOPLAY);
                baseEmbed.setAuthor({ name: success ? errorMessage : `Putar otomatis diaktifkan, antrian akan otomatis terisi dengan lagu yang mirip dengan lagu saat ini 🔁` })

                return inter.editReply({ embeds: [baseEmbed] });
            } 
        }
        return inter.editReply({ embeds: [baseEmbed] });
        
    }
};