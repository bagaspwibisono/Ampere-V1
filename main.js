const { Player } = require("discord-player");
const { Client, GatewayIntentBits } = require("discord.js");

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

<<<<<<< HEAD
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
=======
console.clear()
require('./loader');

client.login(client.config.app.token)
.catch(async (e) => {
    if(e.message === 'Token yang diberikan tidak valid.'){
    require('./process_tools')
    .throwConfigError('app', 'token', '\n\t  ❌ Token yang Diberikan Tidak Valid! ❌ \n\tubah token di file config\n')}

    else{
        console.error('❌ Terjadi kesalahan saat mencoba masuk ke bot! ❌ \n', e)
    }
>>>>>>> db841859936e99f49fa70c55df1e2420f8adf2fc
});

// client.config = require('./config');

// const player = new Player(client, client.config.opt.discordPlayer);
// player.extractors.loadDefault();

// require('./loader');

<<<<<<< HEAD
// client.login(client.config.app.token);
=======
// client.login(client.config.app.token);
>>>>>>> db841859936e99f49fa70c55df1e2420f8adf2fc
