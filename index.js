const { Client } = require('discord.js-selfbot-v13');
const express = require('express');

const app = express();
app.get('/', (req, res) => res.send('Bots Active 24/7!'));
app.listen(process.env.PORT || 8080);

const rawTokens = process.env.DISCORD_TOKENS || "";
const TOKENS = rawTokens.split(",").map(t => t.trim()).filter(Boolean);

const CHANNEL_ID = "1488276681373516017";

TOKENS.forEach((token, index) => {
    setTimeout(() => {
        const client = new Client({ checkUpdate: false });
        client.on('ready', async () => {
            console.log(`Logged in as ${client.user.tag}`);
            try {
                const channel = await client.channels.fetch(CHANNEL_ID);
                await client.voice.joinChannel(channel, { selfMute: false, selfDeaf: false });
                console.log(`${client.user.tag} joined VC!`);
            } catch (err) {
                console.error(`VC Join Error: ${err}`);
            }
        });
        client.login(token).catch(err => console.error(`Login error: ${err}`));
    }, index * 3000);
});
