const { readdirSync } = require('fs');
const { Collection } = require('discord.js');
const { useMainPlayer } = require('discord-player');
client.commands = new Collection();
const commandsArray = [];
const player = useMainPlayer()

const discordEvents = readdirSync('./events/Discord/').filter(file => file.endsWith('.js'));
const playerEvents = readdirSync('./events/Player/').filter(file => file.endsWith('.js'));

for (const file of discordEvents) {
    const DiscordEvent = require(`./events/Discord/${file}`);
    console.log(`\x1b[35m ► ❰Memuat Event Bot Discord❱ ${file.split('.')[0]}`);
    client.on(file.split('.')[0], DiscordEvent.bind(null, client));
    delete require.cache[require.resolve(`./events/Discord/${file}`)];
};

for (const file of playerEvents) {
    const PlayerEvent = require(`./events/Player/${file}`);
    console.log(`\x1b[33m ► ❰Memuat Event pemutar❱ ${file.split('.')[0]}`);
    player.events.on(file.split('.')[0], PlayerEvent.bind(null));
    delete require.cache[require.resolve(`./events/Player/${file}`)];
};


readdirSync('./commands/').forEach(dirs => {
    const commands = readdirSync(`./commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./commands/${dirs}/${file}`);
        if (command.name && command.description) {
            commandsArray.push(command);
            console.log(`\x1b[36m ► ❰Memuat Command❱ ${command.name.toLowerCase()}`);
            client.commands.set(command.name.toLowerCase(), command);
            delete require.cache[require.resolve(`./commands/${dirs}/${file}`)];
        } else console.log(`❰failed Command❱  ${command.name.toLowerCase()}`)
    }
});

    client.on("ready", (client) => {
    if (client.config.app.global)
        client.application.commands.set(commandsArray);
    else
        client.guilds.cache
        .get(client.config.app.guild)
        .commands.set(commandsArray);
    });

// client.on('ready', (client) => {
//     if (client.config.app.global) client.application.commands.set(commandsArray)
//     else client.guilds.cache.get(client.config.app.guild).commands.set(commandsArray)
// });