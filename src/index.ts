import { Client, Collection, Events, GatewayIntentBits } from "discord.js"
import dotenv from "dotenv"
import path from "path";
import fs from "fs"
import { setClient } from "./lib/client";
dotenv.config()

const client = new Client(
    {
        intents: [
            GatewayIntentBits.Guilds,
            GatewayIntentBits.GuildMessages,
            GatewayIntentBits.MessageContent
        ],
    }
)



client.on(Events.InteractionCreate, async interaction => {
	if (!interaction.isChatInputCommand()) return;

	const command = (interaction.client as any).commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
});

const commandsPath = path.join(__dirname, "..", "dist", 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
(client as any).commands = new Collection();
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	// Set a new item in the Collection with the key as the command name and the value as the exported module
	if ('data' in command && 'execute' in command) {
		(client as any).commands.set(command.data.name, command);
	} else {
		console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
		console.log(typeof command.data, typeof command.execute)
	}
}

client.once("ready", (client) => {
    console.log("Ready")
	setClient(client)
})



client.login(process.env.DISCORD_TOKEN)