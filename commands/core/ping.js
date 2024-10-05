const ms = require('ms');

module.exports = {
    name: 'ping',
    description: "Dapatkan ping dari bot!",
    ephemeral: true,
    async execute({ client, inter }) {
        
        await inter.editReply("Ping?");
        inter.editReply(`Pong! Latensi API ${Math.round(client.ws.ping)}ms 🛰️, Latensi ping shard terakhir ${ms(Date.now() - client.ws.shards.first().lastPingTimestamp, { long: true })}`)

    },
};