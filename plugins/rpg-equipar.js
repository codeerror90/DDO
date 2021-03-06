let handler = async (m, { conn, text, usedPrefix, command, args, isOwner, isAdmin, isROwner, isPrems }) => {

  let user = global.db.data.users[m.sender]
  let min = user.pickaxe_bronze + user.pickaxe_iron + user.pickaxe_steel + user.pickaxe_crimsteel + user.pickaxe_mythan + user.pickaxe_cobalt + user.pickaxe_varaxite + user.pickaxe_magic + user.pickaxe_umbral + user.pickaxe_ancient
  //let tpick = (pick == 0 ? 'no tiene' : '' || pick == 1 ? 'bronce' : '' || pick == 2 ? 'hierro' : ''  || pick == 3 ? 'acero' : '' || pick == 4 ? 'carmesí' : '' || pick == 5 ? 'mythan' : '' || pick == 6 ? 'cobalto' : '' || pick == 7 ? 'varaxita' : '' || pick == 8 ? 'magica' : '' || pick == 9 ? 'umbral' : '' || pick == 10 ? 'ancient' : '')

  let type = (args[0] || ' ').toLowerCase()
  let type2 = (args[2] || args[1]).toLowerCase()

  switch (type) {
  case 'pico':
    if (min == 0) throw 'No tienes ningun pico para equiparte'
    switch (type2) {
      case 'bronce':
        if (user.pickaxe_bronze == 0) throw 'Todavia no tienes el pico de bronce para equiparte'
        user.pickaxe_equipped = 1 
        m.reply('Te equipaste un pico de bronce')
      break
      case 'hierro':
        if (user.pickaxe_iron == 0) throw 'Todavia no tienes el pico de hierro para equiparte'
        user.pickaxe_equipped = 2 
        m.reply('Te equipaste un pico de hierro')
      break
      case 'acero':
        if (user.pickaxe_steel == 0) throw 'Todavia no tienes el pico de acero para equiparte'
        user.pickaxe_equipped = 3 
        m.reply('Te equipaste un pico de acero')
      break
      case 'carmesí':
        if (user.pickaxe_crimsteel == 0) throw 'Todavia no tienes el pico de carmesí para equiparte'
        user.pickaxe_equipped = 4 
        m.reply('Te equipaste un pico de carmesí')
      break
      }
  break
  }
}

handler.help = ['equipar']
handler.tags = ['rpg']
handler.command = /^(equipar)$/i

export default handler
