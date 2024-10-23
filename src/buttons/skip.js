module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan... coba lagi ? ❌`, ephemeral: true });
    
    const success = queue.node.skip();

    // return inter.editReply({ content: success ? `Lagu ${queue.currentTrack.title} telah dilewati ✅` : `Terjadi kesalahan ${inter.member}... coba lagi ? ❌`, ephemeral: true});
    const replyMessage = await inter.editReply({ content: success ? `Lagu ${queue.currentTrack.title} telah dilewati ✅` : `Terjadi kesalahan ${inter.member}... coba lagi ? ❌`, ephemeral: true});

    // Hapus pesan setelah 5 detik
    setTimeout(() => {
        replyMessage.delete();
    }, 5000);
}