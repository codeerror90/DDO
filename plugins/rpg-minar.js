let handler = async (m, { conn, text, usedPrefix, command, args, isOwner, isAdmin, isROwner, isPrems }) => {

  let user = global.db.data.users[m.sender]
  let time = user.lastmiming + 600000 
  if (new Date - user.lastmiming < 600000) throw `Espera *${stime(time - new Date())}* para volver a minar` 

  let type = (args[0] || ' ').toLowerCase()

  switch (type) {
  case 'estaño':
  case 'tin':
    let tin = Math.floor(Math.random() * (25 - 30) + 30) + 1
    let exp = tin * 10
    user.mineral_tin += tin * 1 
    user.mineral_tin += exp * 1 
    let m1 = `
*Minaste 🏔️ mineral de estaño*

*Obtienes:*
◦ Estaño: ${tin}
◦ Exp: ${exp}

*⛏️ Pico:* normal
`.trim()
    m.reply(m1)
    user.lastmiming = new Date * 1
  break

  }
}

handler.help = ['minar']
handler.tags = ['rpg']
handler.command = /^(minar|mining|mine|picar)$/i

export default handler
