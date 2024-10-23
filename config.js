module.exports = {
	app: {
		token: "TOKEN_BOT",
		playing: "VoltzV4 - Ampere ⚡",
		global: true,
		guild: "GUILD_ID",
		ExtraMessages: false,
		loopMessage: false,
	},

	opt: {
		DJ: {
			enabled: false,
			roleName: "",
			commands: [],
		},
		maxVol: 100,
		spotifyBridge: true,
		volume: 75,
		leaveOnEmpty: true,
		leaveOnEmptyCooldown: 300000,
		leaveOnEnd: true,
		leaveOnEndCooldown: 300000,
		discordPlayer: {
			ytdlOptions: {
				quality: "highestaudio",
				highWaterMark: 1 << 25,
			},
		},
	},
};
