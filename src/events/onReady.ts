import { REST, Routes } from "discord.js";
import BotCommand from "../structures/BotCommand";
import { commandFiles } from "../utils/file";
import Bot from "../structures/Bot";

export default async function onReady(client: Bot) {
    console.clear()
    console.log('Bot is Ready')

    const botCommands: BotCommand[] = []
    const tasks: Promise<unknown>[] = [];

		for (const file of commandFiles) {
			const task = import(file);
			task.then((module) => {
				const command = module.default as BotCommand;
				if (command === undefined || command.data === undefined) {
					console.error(
						`File at path ${file} seems to incorrectly` +
							' be exporting a command.'
					);
				} else {
					botCommands.push(command);
				}
			});
			tasks.push(task);
		}
		await Promise.all(tasks);

		for (const command of botCommands) {
			client.commands.set(command.data.name, command);
			console.log(`registered command ${command.data.name}`);
		}

		const payload = client.commands.map((cmd) => cmd.data.toJSON());

		const rest = new REST({  }).setToken(process.env.DISCORD_TOKEN!);
		await rest
			.put(
				Routes.applicationGuildCommands(
					client.user?.id!,
					process.env.DISCORD_GUILD_ID!
				),
				{ body: payload }
			)
			.then(() => console.log('successfully registered slash command'));
  }