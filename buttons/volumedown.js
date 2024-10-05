const maxVol = client.config.opt.maxVol;

module.exports = async ({ inter, queue }) => {
    if (!queue?.isPlaying()) return inter.editReply({ content: `Tidak ada musik yang sedang di putar... coba lagi ? ❌` });

    const vol = Math.floor(queue.node.volume - 5);
    if (vol < 0) return inter.editReply({ content: `Tidak dapat menurunkan volume lagi ${inter.member}... coba lagi ? ❌` });
    if (queue.node.volume === vol) return inter.editReply({ content: `Volume yang ingin Anda ubah sudah menjadi volume saat ini ${inter.member}... ❌` });

    const success = queue.node.setVolume(vol);
    return inter.editReply({ content: success ? `Volume telah diubah menjadi ${vol}/${maxVol}% 🔊` : `Terjadi kesalahan ${inter.member}... coba lagi ? ❌` });
    
}