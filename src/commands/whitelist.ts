import { CommandInteraction, GuildMemberRoleManager, SlashCommandBuilder, TextChannel } from "discord.js"
import { getClient } from "../lib/client"
import { whitelist } from "../lib/minecraft"

module.exports = {
    data:new SlashCommandBuilder()
        .setName("whitelist")
        .setDescription("Menambahkan/menghapus whitelist, membutuhkan role Sesepuh MC!")
        .addBooleanOption(option => option.setName("tambah").setDescription("Tambah pemain ke whitelist? True : Tambah ke whitelist | False : Hapus dari whitelist").setRequired(true))
        .addStringOption(option => option.setName("nama").setDescription("Nama dari pemain, huruf besar kecil harus tepat!").setRequired(true)),
    async execute(interaction: CommandInteraction) {
        if (!interaction.isCommand()) return
        const member = (interaction.member?.roles as GuildMemberRoleManager).cache.has("1053882529494614137")
        if (member) {
            const nama = interaction.options.get("nama")?.value
            const tambah = interaction.options.get("tambah")?.value
            await interaction.reply(`${!!tambah? "Menambah" : "Menghapus"} **${nama}** Kedalam whitelist...`)
            if (typeof nama !== "string") return await interaction.reply("Nama tidak boleh kosong!")
            await whitelist(!!tambah, nama);
            (interaction.client.channels.cache.get("1059292183666098248") as TextChannel).send(`${tambah ? ":green_circle:" : ":red_circle:"} <@${interaction.member?.user.id}> baru saja ${tambah ? "Menambah" : "Menghapus"} **${nama}** ${tambah ? "kedalam" : "dari"} whitelist!`)
            await interaction.followUp(`Berhasil ${(!!tambah) ? "Menambah" : "Menghapus"} **${nama}** dari whitelist!`)
        }
        else {
            interaction.reply("Kamu tidak punya role ini!")
        }
    }
}