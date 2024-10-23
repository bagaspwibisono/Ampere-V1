module.exports = async ({  inter, queue }) => { 
    if (!queue || !queue.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang dimainkan  ❌`, ephemeral: true });

    if (!queue.history.previousTrack) return inter.editReply({ content: `Belum ada musik yang dimainkan ${inter.member}... coba lagi ? ❌`, ephemeral: true });

    await queue.history.back();

    // inter.editReply({ content:`Memutar trek lagu **kembali** ✅`, ephemeral: true});
    const replyMessage = inter.editReply({ content:`Memutar trek lagu **kembali** ✅`, ephemeral: true});
    
    //Hapus pesan setelah 5 detik
    setTimeout(() => {
        replyMessage.delete();
    }, 5000);
}
