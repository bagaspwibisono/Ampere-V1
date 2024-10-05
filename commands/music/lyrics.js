const { EmbedBuilder } = require('discord.js');
const { useMainPlayer, useQueue  } = require('discord-player');

// const BASE_URL = "https://some-random-api.com/lyrics";

module.exports = {
    name: 'lyrics',
    description: 'memperoleh lirik untuk lagu saat ini',
    voiceChannel: true,

    async execute({ inter }) {
    
    const queue = useQueue(inter.guild);

        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌`, ephemeral: true });
        
        try {
        
        const search = await genius.songs.search(queue.currentTrack.title); 

        const song = search.find(song => song.artist.name.toLowerCase() === queue.currentTrack.author.toLowerCase());
        if (!song) return inter.editReply({ content: `Tidak ada lirik yang ditemukan untuk ${queue.currentTrack.title}... coba lagi ? ❌`, ephemeral: true });
        const lyrics = await song.lyrics();
        const embeds = [];
        for (let i = 0; i < lyrics.length; i += 4096) {
            const toSend = lyrics.substring(i, Math.min(lyrics.length, i + 4096));
            embeds.push(new EmbedBuilder()
                .setTitle(`Lirik untuk ${queue.currentTrack.title}`)
                .setDescription(toSend)
                .setColor('#2f3136')
                .setTimestamp()
                .setFooter({ text: 'Voltz - Ampere Project ⚡', iconURL: inter.member.avatarURL({ dynamic: true })})
                );
        }
        
        // return inter.editReply({ embeds: embeds });
        const message = await inter.editReply({ embeds: [embeds] });
        
        setTimeout(() => {
            message.delete();
        }, 360000);
        
        
    } catch (error) {
            const errorMsg = await inter.editReply({ content: `Error! DM Voltac! | ❌`, ephemeral: true });

            setTimeout(() => {
                errorMsg.delete();  //error meseg
            }, 360000);
    } 
    },
};

