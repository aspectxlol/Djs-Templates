import { EmbedBuilder, Interaction } from "discord.js";
import Bot from "../structures/Bot";

export default async function onCommand(interaction: Interaction, client: Bot) {
    if (!interaction.isCommand()) return;
		const command = client.commands.get(
			interaction.commandName.toString()
		);

		if (!command) return;

		try {
			command?.execute(interaction, client);
		} catch (e) {
			if (e instanceof Error) {
				const embed = new EmbedBuilder()
					.setTitle(`${e.name}`)
					.setDescription(e.message);

				interaction.reply({ embeds: [embed], ephemeral: true });
			}
		}
  }