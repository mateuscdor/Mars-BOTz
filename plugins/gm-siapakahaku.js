import fetch from 'node-fetch'
let timeout = 120000
let poin = 500

let handler = async (m, { conn, usedPrefix }) => {
    conn.siapakahaku = conn.siapakahaku ? conn.siapakahaku : {}
    let id = m.chat
    if (id in conn.siapakahaku) {
        conn.reply(m.chat, 'belum dijawab!', conn.siapakahaku[id][0])
        throw false
    }
    let res = await fetch(API('lolhuman', 'api/tebak/siapaaku', {}, 'apikey'))
    if (!res.ok) throw eror
    let json = await res.json()
    if (!json.status) throw json
    let caption = `
${json.result,question}

Timeout *${(timeout / 1000).toFixed(2)} detik*
Ketik ${usedPrefix}who untuk bantuan
`.trim()
    conn.siapakahaku[id] = [
        await conn.sendButton(m.chat, caption, wm, ['Bantuan', '.who'], m),
        json, poin,
        setTimeout(async () => {
            if (conn.siapakahaku[id]) await conn.sendButton(m.chat, `Waktu habis!\nJawabannya adalah *${json.result.answer}*`, wm, ['Siapakah Aku', '.siapaaku'], conn.siapakahaku[id][0])
            delete conn.siapakahaku[id]
        }, timeout)
    ]
}
handler.help = ['siapakahaku']
handler.tags = ['game']
handler.command = /^siapa(kah)?aku/i

export default handler