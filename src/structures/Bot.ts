import { Client, Collection, GatewayIntentBits, Partials } from "discord.js";
import BotCommand from "./BotCommand";
import onCommand from "../events/onCommand";
import onReady from "../events/onReady";

export default class Bot extends Client {
  commands: Collection<string, BotCommand>

  constructor() {
    super({
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMessages,
      ],
      partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.Message,
        Partials.User,
      ],
    })

    this.commands = new Collection()

    this.on('ready', () => onReady(this))
    this.on('interactionCreate', (interaction) => onCommand(interaction, this))
  }

  start() {
    this.login(process.env.DISCORD_TOKEN)
    console.log("Bot is Starting")
  }
}