const { QueueRepeatMode } = require('discord-player');

module.exports = async ({ inter, queue }) => {
    const methods = ['disabled', 'track', 'queue'];
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang diputar... coba lagi ? ❌` });

    if (queue.repeatMode === 2) queue.setRepeatMode(QueueRepeatMode.OFF)
    else queue.setRepeatMode(queue.repeatMode + 1)

    return inter.editReply({ content: `Loop telah disetel ke mode: **${methods[queue.repeatMode]}**.✅` });

}