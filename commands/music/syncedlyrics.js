const { useMainPlayer, useQueue } = require('discord-player');

module.exports = {
    name: 'syncedlyrics',
    description: 'Mensinkronkan lagu dengan lirik',
    voiceChannel: true,

    async execute({ inter }) {
        const player = useMainPlayer();
        const queue = useQueue(inter.guild);
        if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak adaa musik yang sedang diputar ${inter.member}... coba lagi ? ❌` });

        const metadataThread = queue.metadata.lyricsThread;
        if (metadataThread && !metadataThread.archived) return inter.editReply({ content: `Thread Lirik terlah dibuat ${inter.member} ! ${queue.metadata.lyricsThread}`});
        
        try {

            const results = await player.lyrics.search({
                q: queue.currentTrack.title
            });

            const lyrics = results?.[0];
            if (!lyrics?.plainLyrics) {
                console.log(`No lyrics found for ${queue.currentTrack.title}`);
                return inter.editReply({ content:`Lirik untuk <${queue.currentTrack.title}> tidak ditemuukan... cpba lagi ? ❌` });
            }

            const thread = await queue.metadata.channel.threads.create({
                name: `Lyrics of ${queue.currentTrack.title}`
            });

            queue.setMetadata({
                channel: queue.metadata.channel,
                lyricsThread: thread
            });

            const syncedLyrics = queue?.syncedLyrics(lyrics);
            syncedLyrics.onChange(async (lyrics) => {
                await thread.send({
                    content: lyrics
                });
            });

            syncedLyrics?.subscribe();

            return inter.editReply({ content: `Lirik berhasil disinkronkan ${thread} ! ${inter.member} ✅` });
        } catch (error) {
            console.log(error);
            return inter.editReply({ content: `Terjadi error atau lirik lagu tidak ditemukan ❌` });
        }
    }
}