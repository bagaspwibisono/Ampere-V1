const { EmbedBuilder } = require('discord.js');
const { useMainPlayer } = require('discord-player');

module.exports = async ({ inter, queue }) => {
    const player = useMainPlayer();
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

    try {

    const results = await player.lyrics
        .search({
            q: `${queue.currentTrack.title && queue.currentTrack.artistName}`
        })
        .catch(async (e) => {
            console.log(e);
            return inter.editReply({ content: `Error! Infokan dev @voltac! | ❌` });
        });

    // const lyrics = results?.[0];
    // if (!lyrics?.plainLyrics) return inter.editReply({ content: `Lirik untuk ${queue.currentTrack.title} tidak ditemukan... coba lagi ? ❌` });
    if (!results || results.length === 0) {
        return inter.editReply({ content: `Lirik untuk ${queue.currentTrack.title} tidak ditemukan... coba lagi ? ❌` });
    }

    const trimmedLyrics = lyrics.plainLyrics.substring(0, 1997);
    const embed = new EmbedBuilder()
        .setTitle(`Lyrics for ${queue.currentTrack.title}`)
        .setAuthor({
            name: lyrics.artistName
        })
        .setDescription(trimmedLyrics.length === 1997 ? `${trimmedLyrics}...` : trimmedLyrics)
        .setFooter({ text: 'Voltz - Ampere Project⚡', iconURL: inter.member.avatarURL({ dynamic: true }) })
        .setTimestamp()
        .setColor('#2f3136');

        const message = await inter.editReply({ embeds: [embed] });
        
        setTimeout(() => {
            message.delete();
        }, 360000); 
        
        }catch (error) {
            const errorMsg = await inter.editReply({ content: `Error! DM Voltac! | ❌` });

            setTimeout(() => {
                errorMsg.delete();  //error meseg
            }, 360000);
        }
    };
