module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang di putar saat ini... coba lagi ? ❌` });

    const success = queue.node.skip();

    return inter.editReply({ content: success ? `Musik saat ini ${queue.currentTrack.title} dilewati ✅` : `Ada kesalahan ${inter.member}... coba lagi ? ❌` });
}