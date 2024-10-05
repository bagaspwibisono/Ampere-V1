const { EmbedBuilder } = require("discord.js");
const { useMainPlayer, QueryType } = require("discord-player");

const channelId = "CHANNEL_ID"; //auto play musik ketika mengirimkan pesan di channel spesifik
const commandsList = [
	"skips",
	"pause",
	"resume",
	"queue",
	"stops",
	// "autoplay",
];

module.exports = async (client, message, inter) => {
	if (message.channel.id !== channelId) return;
	if (message.author.bot) return;

	const player = useMainPlayer();

	const song = message.content;
	// Minimum query yang di butuhkan diubah di sini
	if (song.length < 5) {
		const shortQueryEmbed = new EmbedBuilder()
			.setAuthor({ name: `Minimum query adalah 5 huruf... coba lagi ❌` })
			.setColor("#2f3136")
			.addFields({
				name: "Command cepat:",
				value: commandsList.join(", "),
			}); // new line code

		return message.reply({ embeds: [shortQueryEmbed] });
	}
	const res = await player.search(song, {
		requestedBy: message.member,
		searchEngine: QueryType.AUTO,
	});
	const NoResultsEmbed = new EmbedBuilder()
		.setAuthor({ name: `Hasil tidak ditemukan... coba lagi ? ❌` })
		.setColor("#2f3136");

	if (!res || !res.tracks.length)
		return message.reply({ embeds: [NoResultsEmbed] });

	const queue = player.nodes.create(message.guild, {
		metadata: message.channel,
		spotifyBridge: client.config.opt.spotifyBridge,
		volume: client.config.opt.volume,
		leaveOnEmpty: client.config.opt.leaveOnEmpty,
		leaveOnEmptyCooldown: client.config.opt.leaveOnEmptyCooldown,
		leaveOnEnd: client.config.opt.leaveOnEnd,
		leaveOnEndCooldown: client.config.opt.leaveOnEndCooldown,
	});

	if (commandsList.includes(song?.toLowerCase())) {
		switch (song?.toLowerCase()) {
			case "pause":
				await queue.node.pause();
				break;
			case "resume":
				await queue.node.resume();
				break;
			case "skips":
				await queue.node.skip();
				break;
			case "stops":
				await queue.node.stop();
				break;
			case "queue":
				const songs = queue.tracks.size;
				// case "autoplay":
				//     const queue = queue.setRepeatMode.autoplay;

				const nextSongs =
					songs > 5
						? `dan **${songs - 5}** lagu lainya...`
						: `Terdapat **${songs}** didalam playlist...`;

				const tracks = queue.tracks.map(
					(track, i) =>
						`**${i + 1}** - ${track.title} | ${
							track.author
						} (requested by : ${track.requestedBy.username})`
				);

				const queueEmbed = new EmbedBuilder()
					.setColor("#2f3136")
					.setAuthor({
						name: `Antrian Musik`,
						iconURL: client.user.displayAvatarURL({
							size: 1024,
							dynamic: true,
						}),
					})
					.setDescription(
						`Current ${queue.currentTrack.title}\n\n${tracks
							.slice(0, 5)
							.join("\n")}\n\n${nextSongs}`
					)
					.setTimestamp()
					.setFooter({
						text: "Voltz - Ampere Project⚡",
					});

				await message.reply({ embeds: [queueEmbed] });
			default:
				break;
		}

		return;
	}

	try {
		if (!queue.connection)
			await queue.connect(message.member.voice.channel);
	} catch {
		queue.delete();
		const NoVoiceEmbed = new EmbedBuilder()
			.setAuthor({
				name: `Saya tidak bisa bergabung dengan voice channel ❌`,
			})
			.setColor("#2f3136");

		return message.reply({ embeds: [NoVoiceEmbed] });
	}

	const playEmbed = new EmbedBuilder()
		.setAuthor({
			name: `Memuat ${
				res.playlist ? "playlist" : "track"
			} kedalam antrian... ✅`,
		})
		.setColor("#2f3136");

	const msgDlt = await message.reply({ embeds: [playEmbed] });

	setTimeout(() => {
		msgDlt.delete();
	}, 10000);

	res.playlist ? queue.addTrack(res.tracks) : queue.addTrack(res.tracks[0]);

	if (!queue.isPlaying()) await queue.node.play();
};
