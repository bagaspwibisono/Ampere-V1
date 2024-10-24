const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");
const { YoutubeiExtractor } = require('discord-player-youtubei');

global.client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.MessageContent,
	],
	disableMentions: "everyone",
});

client.config = require("./config");

const player = new Player(client, client.config.opt.discordPlayer);

player.extractors.register(YoutubeiExtractor, {});

console.clear();
require("./loader");

client.login(client.config.app.token).catch(async (e) => {
	if (e.message === "Token yang diberikan tidak valid.") {
		require("./process_tools").throwConfigError(
			"app",
			"token",
			"\n\t   ❌ Token yang Diberikan Tidak Valid! ❌ \n\tubah token di file config\n"
		);
	} else {
		console.error("❌ Terjadi kesalahan saat mencoba masuk ke bot! ❌ \n", e);
	}
});