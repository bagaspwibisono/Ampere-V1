module.exports = async (client) => {
    console.log(`\x1b[32m Initializing bot ${client.user.username}\n\x1b[32m Complete....`);
    client.user.setActivity(client.config.app.playing);   
};