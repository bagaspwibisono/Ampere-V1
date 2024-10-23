let lastMessageId = null;

module.exports = async ({ inter, queue }) => {
    // Memeriksa apakah ada musik yang sedang diputar
    if (!queue?.isPlaying()) {
        if (lastMessageId) {
            try {
                await inter.channel.messages.delete(lastMessageId);
            } catch (error) {
                console.error('Gagal menghapus pesan sebelumnya:', error);
            }
        }
        const newMessage = await inter.editReply({ content: `Tidak ada musik yang sedang diputar... coba lagi? ❌` });
        lastMessageId = newMessage.id;
        return;
    }

    // Mencoba melanjutkan musik
    const resumed = queue.node.resume();

    // Menentukan pesan yang sesuai
    let message;
    if (resumed) {
        message = `Musik saat ini ${queue.currentTrack.title} dilanjutkan ✅`;
    } else {
        // Jika sudah diputar, jeda musik
        queue.node.pause();
        message = `Musik saat ini ${queue.currentTrack.title} dijeda ✅`;
    }

    // Menghapus pesan sebelumnya jika ada
    if (lastMessageId) {
        try {
            await inter.channel.messages.delete(lastMessageId);
        } catch (error) {
            console.error('Gagal menghapus pesan sebelumnya:', error);
        }
    }

    // Mengirim pesan baru dan menyimpan ID-nya
    const newMessage = await inter.editReply({ content: message, ephemeral: true });
    lastMessageId = newMessage.id;
}



// module.exports = async ({ inter, queue }) => {

//     if (!queue?.isPlaying()) return inter.editReply({ content: `No music currently playing... try again ? ❌` });

//     const resumed = queue.node.resume();
//     let message = `Musik saat ini ${queue.currentTrack.title} diLanjutkan ✅`;

//     if (!resumed) {
//         queue.node.pause();
//         message = `Musik saat ini ${queue.currentTrack.title} diJeda ✅`;
//     }

//     return inter.editReply({ content: message });

// }