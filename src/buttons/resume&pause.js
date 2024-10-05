// module.exports = async ({ inter, queue }) => {
//     if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });

//     const resumed = queue.node.resume();
//     let message = `Musik saat ini ${queue.currentTrack.title} dilanjutkan ✅`;
    
//     if (!resumed) {
//         queue.node.pause();
//         message = `Musik saat ini ${queue.currentTrack.title} dijeda ✅`;
//     }

//     return inter.editReply({
//         content: message, ephemeral: true
//     });
// }

module.exports = async ({inter, queue }) => {
    if (!queue || !queue.isPlaying()) return inter.editReply({content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });

    const resumed = queue.node.resume();
    let message = `Musik saat ini ${queue.currentTrack.title} dilanjutkan ✅`;
    
    if (!resumed) {
        queue.node.pause();
        message = `Musik saat ini ${queue.currentTrack.title} dijeda ✅`;
    }

    const reply = await inter.editReply({
        content: message, ephemeral: true
    });

    setTimeout(() => {
        reply.delete();
    }, 5000); // delete message after 5000 milliseconds (5 seconds)
}