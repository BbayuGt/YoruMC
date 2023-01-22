import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js"
import { getServerInfo } from "../lib/minecraft"

const COLORS= {
    RUNNING: 0x2596be,
    STOPPED: 0xff004c
}

module.exports = {
    data:new SlashCommandBuilder()
        .setName("status")
        .setDescription("Cek Status Server"),
    async execute(interaction:CommandInteraction) {
        const status = await getServerInfo()
        const embed = new EmbedBuilder()
        embed.setColor(function () {
            switch (status.usage.current_state) {
                case "starting":
                case "running":
                    return COLORS.RUNNING
                
                case "offline":
                case "stopping":
                    return (COLORS.STOPPED)
            }
        }())
        .setTitle("Status Server Minecraft Yoru")
        .setDescription(function () {
            switch (status.usage.current_state) {
                case "offline":
                    return ":red_circle: Server sekarang offline :/"
                case "running":
                    return ":green_circle: Server sekarang online! :D"
                case "starting":
                case "stopping":
                    return ":yellow_circle: Server Sedang Restart! :)"
            }
        }())
        .addFields(
        {
            name:"Jumlah pemain",
            value:`${status.information.playersOnline}/${status.information.playersMax}`
        },
        {
            name:"Versi server",
            value:`${status.information.version}`
        },
        {
            name:"Penggunaan RAM",
            value:(Math.floor(status.usage.resources.memory_bytes/1024/1024)).toString() + ` MB / ${1024 * 3} MB`
        },
        {
            name:"Penggunaan CPU",
            value:`${Math.floor(status.usage.resources.cpu_absolute).toString()}%/100%`
        },
        {
            name:"Penggunaan Disk",
            value:`${Math.floor(status.usage.resources.disk_bytes/1024/1024).toString()} MB`
        })
        await interaction.reply({
            embeds:[embed]
        })
    }
}