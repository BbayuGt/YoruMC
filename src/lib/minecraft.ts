import { PteroClient } from "ptero-client";
import pteroly from 'pteroly'
import dotenv from "dotenv"
dotenv.config()

const client = new PteroClient({
    baseURL: process.env.PTERODACTYL_HOST as string,
    apiKey: process.env.PTERODACTYL_API_KEY as string,
});

const client2 = pteroly.Client
client2.fastLogin(process.env.PTERODACTYL_HOST as string, process.env.PTERODACTYL_API_KEY as string)

export async function getServerInfo() {
    return await client.servers.getResourceUsage(process.env.PTERODACTYL_SERVER_ID as string)
}

export async function whitelist(add:boolean, name:string) {
    if (add) {
        await client2.sendCommand(process.env.PTERODACTYL_SERVER_ID as string, `allowlist add ${name}`)
    }
    else {
        await client2.sendCommand(process.env.PTERODACTYL_SERVER_ID as string, `allowlist remove ${name}`)
    }
}

export async function restart() {
    await client.servers.restart(process.env.PTERODACTYL_SERVER_ID as string)
}