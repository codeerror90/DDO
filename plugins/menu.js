let handler  = async (m, { conn, usedPrefix: _p }) => {
  try {
    let exp = global.DATABASE.data.users[m.sender].exp
    let limit = global.DATABASE.data.users[m.sender].limit
    let name = conn.getName(m.sender)
    let d = new Date
    let locale = 'id'
    let gmt = new Date(0) - new Date('1 January 1970')
    let weton = ['Pon','Wage','Kliwon','Legi','Pahing'][Math.floor((d + gmt) / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = new Date(process.uptime() * 1000)
    let uptime = clockString(_uptime)
    let tags = {
      'main': 'Main',
      'xp': 'Exp & Limit',
      'sticker': 'Sticker',
      'kerang': 'Kerang Ajaib',
      'quotes': 'Quotes',
      'admin': 'Admin',
      'group': 'Group',
      'downloader': 'Downloader',
      'tools': 'Tools',
      'jadibot': 'Jadi Bot',
      'owner': 'Owner',
      'host': 'Host',
      'advanced': 'Advanced',
      'info': 'Info',
      '': 'No Category',
    }
    for (let plugin of Object.values(global.plugins))
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!tag in  tags) tags[tag] = tag
    let help = Object.values(global.plugins).map(plugin => {
      return {
        help: plugin.help,
        tags: plugin.tags,
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit
      }
    })
    let groups = {}
    for (let tag in tags) {
      groups[tag] = []
      for (let main of help)
        if (main.tags && main.tags.includes(tag))
          if (main.help) groups[tag].push(main)
    }
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || `${conn.getName(conn.user.jid)} • Bot\n\nHai, %name!\n*%exp XP*\n*%limit Limit*\n*%week %weton, %date*\n*%time*\n_Uptime: %uptime\n%readmore`
    let header = conn.menu.header || '╭─「 %category 」'
    let body   = conn.menu.body   || '│ • %cmd%islimit'
    let footer = conn.menu.footer || '╰────\n'
    let after  = conn.menu.after  || conn.user.jid == global.conn.user.jid ? '' : `\nPowered by https://wa.me${global.conn.user.jid}`
    let _text  = before + '\n'
    for (let tag in groups) {
      _text += header.replace(/%category/g, tags[tag]) + '\n'
      for (let menu of groups[tag]) {
        for (let help of menu.command)
          _text += body.replace(/%cmd/g, menu.prefix ? help : '%p' + help).replace(/%islimit/g, menu.limit ? ' (Limit)' : '')  + '\n'
      }
      _text += footer + '\n'
    }
    _text += after
    text =  typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime: _uptime,
      exp, limit, name, weton, week, date, time,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).join`|`})`, 'g'), (_, name) => replace[name])
    conn.reply(m.chat, text.trim(), m)
  } catch (e) {
    conn.reply(m.chat, 'Maaf, menu sedang error', m)
    throw e
  }
}
handler.help = ['menu','help','?']
handler.tags = ['main']
handler.command = /^(menu|help|\?)$/i

export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(date) {
  return ['getHours','getMinutes','getSeconds'].map(method => date[method]().toString().padStart(2, 0)).join`:`
}
