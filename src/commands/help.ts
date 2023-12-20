  import { CommandInteraction, CacheType, SlashCommandBuilder, EmbedBuilder } from "discord.js";
  import Bot from "../structures/Bot";
  import BotCommand from "../structures/BotCommand";

  class help extends BotCommand {
    constructor() {
      super(
        new SlashCommandBuilder()
          .setName('help')
          .setDescription('a command that can provied help')
      )
    }

    public execute(interaction: CommandInteraction<CacheType>, client: Bot) {
      const helpEmbed = new EmbedBuilder()
        .setTitle('Help!')
        .setDescription('the almighty help embed')
        .setColor('Blue')
      
      client.commands.forEach((cmd) => {
        helpEmbed.addFields([{
          name: `/${cmd.data.name}`,
          value: `${cmd.data.description}`,
          inline: true
        }])
      })
      return interaction.reply({ embeds: [helpEmbed] })
    }
  }

  export default new help()