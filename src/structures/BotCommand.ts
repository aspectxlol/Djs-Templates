import { CommandInteraction, RESTPostAPIApplicationCommandsJSONBody, SlashCommandBuilder } from "discord.js";
import Bot from "./Bot";

export default abstract class BotCommand {
  data: SlashCommandBuilder

  constructor(data: SlashCommandBuilder) {
    this.data = data
  }

  public abstract execute(
    interaction: CommandInteraction,
    client: Bot
  ): Promise<any>
}