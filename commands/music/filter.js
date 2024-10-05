const { ApplicationCommandOptionType, EmbedBuilder } = require('discord.js');
const { AudioFilters, useQueue  } = require('discord-player');

module.exports = {
    name: 'filter',
    description: 'tambahkan filter ke trek lagu',
    voiceChannel: true,
    options: [
        {
            name: 'filter',
            description: 'filter yang ingin di tambahkan',
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [...Object.keys(require("discord-player").AudioFilters.filters).map(m => Object({ name: m, value: m })).splice(0, 25)],
        }
    ],


    async execute({ inter }) {
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content:`idak ada musik yang sedang dimainkan ${inter.member}... coba lagi ? ❌`, ephemeral: true });

        const actualFilter = queue.filters.ffmpeg.getFiltersEnabled()[0];
        const selectedFilter = inter.options.getString('filter');

        const filters = [];
        queue.filters.ffmpeg.getFiltersDisabled().forEach(f => filters.push(f));
        queue.filters.ffmpeg.getFiltersEnabled().forEach(f => filters.push(f));

        const filter = filters.find((x) => x.toLowerCase() === selectedFilter.toLowerCase().toString());

        let msg = `Filter ini tidak tersedia ${inter.member}... Coba lagi ? ❌\n` +
            (actualFilter ? `Filter telah aktif **${actualFilter}**. \n` : "") +
            `List filter yang tersedia: `;
        filters.forEach(f => msg += `- **${f}**`);

        if (!filter) return inter.editReply({ content: msg });

        await queue.filters.ffmpeg.toggle(filter)

        const FilterEmbed = new EmbedBuilder()
        .setAuthor({name: `Menggunakan filter ${filter} diputar ${queue.filters.ffmpeg.isEnabled(filter) ? 'enabled' : 'disabled'} ✅\n*Ingat, semakin panjang musiknya, semakin lama waktu yang dibutuhkan.*`})
        .setColor('#2f3136')

    //  return inter.editReply({ embeds: [FilterEmbed] });
        return inter.editReply({ embeds: [FilterEmbed] });
        
    
    },
};