import { Client } from "discord.js"

let dcClient:Client | undefined
export let setClient = (c:Client) => {
    dcClient = c
}
export const getClient = () => dcClient