import { REST, Routes } from "discord.js"
import dotenv from "dotenv"
import fs from "fs"
dotenv.config()


const commands:{}[] = [];
// Grab all the command files from the commands directory you created earlier
const commandFiles = fs.readdirSync('./dist/commands').filter(file => file.endsWith('.js'));

// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN as string);

// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);

		// The put method is used to fully refresh all commands in the guild with the current set
		const data:any = await rest.put(
			Routes.applicationGuildCommands(process.env.CLIENT_ID as string, process.env.SERVER_ID as string),
			{ body: commands },
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();