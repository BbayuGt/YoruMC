import { AutocompleteInteraction, CommandInteraction, CommandInteractionOptionResolver, GuildMember, GuildMemberManager, GuildMemberRoleManager, Interaction, SlashCommandBuilder } from "discord.js"
import { restart, whitelist } from "../lib/minecraft"


module.exports = {
    data:new SlashCommandBuilder()
        .setName("restart")
        .setDescription("restart server"),
    async execute(interaction: CommandInteraction) {

        if (!interaction.isCommand()) return
        const member = (interaction.member?.roles as GuildMemberRoleManager).cache.has("1053882529494614137")
        if (member) {
            
            await interaction.reply(`Merestart server...`)
            await restart()
            await interaction.followUp(`Berhasil restart server!`)
        }
        else {
            await interaction.reply("Kamu tidak punya role ini!")
        }
    }
}