let handler = async (m, { conn, args, usedPrefix, command }) => {

let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.quoted.sender
let ra = (100).getRandom()

let type = (command).toLowerCase()

switch (type) {
case 'esgay':
case 'esgey':
case 'esgai':
  conn.reply(m.chat, `*@${who.split`@`[0]} es ${ra}% gay 🏳️‍🌈*`.trim(), m, { mentions: [who] })
break

default:
 }
}

handler.help = ['esgay']
handler.tags = ['fun']
handler.command = /^(esgay|esgai|esgey)$/i

export default handler


function pickRandom(list) {
  return list[Math.floor(list.length * Math.random())]
}
