import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix, command }) => {
    let res = `https://api.lolhuman.xyz/api/meme/memeindo?apikey=rey2k22`
conn.sendButton(m.chat, 'hidupmu terlalu meme', wm, res, ['Next', `${usedPrefix+command}`], m)
}
handler.help = ['meme']
handler.tags = ['random']
handler.command = /^(meme)$/i

export default handler
