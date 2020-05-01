const Discord = require("discord.js");
const axios = require("axios");
const token = require("./config").token;

const client = new Discord.Client();
// CONSTANTS
const prefix = "!";
const CYRPTO_COMPARE_URL = "https://min-api.cryptocompare.com";
const PRICE_ENDPOINT = "/data/price";

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        message.channel.send("Pong.");
    } else if (command === "beep") {
        message.channel.send("Boop.");
    } else if (command === "get") {
        const crypto = args[0] || "BTC";
        const code = args[1] || "CAD";
        axios
            .get(
                `${CYRPTO_COMPARE_URL}${PRICE_ENDPOINT}?fsym=${crypto}&tsyms=${code}`
            )
            .then((response) => {
				if (response.data.Response === "Error") {
					message.channel.send(`Sorry there is no data for the code: ${crypto}`)
                } else {
                    message.channel.send(
                        `The price for 1 BTC is ${
                            response.data[code.toUpperCase()]
                        }${code.toUpperCase()}!`
                    );
                }
            });
    }
});

client.login(token);
