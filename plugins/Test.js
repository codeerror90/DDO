import fs from 'fs'

let handler = async (m, { conn, text } ) => {
  let groups = Object.entries(conn.chats).filter(([jid, chat]) => jid.endsWith('@g.us') && chat.isChats && !chat.metadata?.read_only && !chat.metadata?.announce).map(v => v[0])
  for (let id of groups) {
  let member = (await conn.groupMetadata(id)).participants.map(v => v.jid)
  conn.sendButton(id, '────━┅ *BROADCAST* ┅━────\n' + text, 'lolibot-md', 'BROADCAST', [['OWNER 🎐', '.owner'],['DONASI ✨', '.donasi']], false, { contextInfo: { externalAdReply: { title: 'Test', body: '-', sourceUrl: '', thumbnail: false }}})
  }
}

handler.command = ['test']
handler.tags = ['owner']
handler.help = /^(test)$/i

export default handler
