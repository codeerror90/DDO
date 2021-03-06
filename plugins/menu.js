import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Menu ๐ง',
  'rpg': 'Juego - RPG ๐',
  'game': 'Juegos ๐ฎ',
  'exp': 'Exp & limite โจ',
  'sticker': 'Stickers ๐งฉ',
  'maker': 'Logo - maker ๐จ',
  'random': 'Random ๐ฅ',
  'adm': 'Admins ๐',
  'group': 'Grupos ๐ฅ', 
  'premium': 'Premiun ๐',
  'internet': 'Internet ๐ถ',
  'downloader': 'Descargas ๐ฅ',
  'search': 'Buscador ๐',
  'tools': 'Ajustes โ๏ธ',
  'fun': 'Diverciรณn ๐ก',
  'database': 'Almacenamiento ๐',
  'nsfw': 'Nsfw ๐',
  'owner': 'Creador ๐',
  'info': 'Info ๐',
  'advanced': 'Abanzado ๐ ',
}

const defaultMenu = {
  before: `
*๊ท๊ฆ๊ท๊ท๊ฆ๊ท๊ฆ๊ท๊ท๊ฆ๊ท๊ฆ๊ท๊ฆ๊ท๊ท๊ฆ๊ท๊ท๊ฆ๊ท๊ท๊ฆ๊ท๊ฆ๊ท๊ฆ๊ท๊ฆ๊ท*

โ Holษ *%taguser ๐๐ป*, %greeting โ


\t\t\t\`\`\`I N F O  -  U S E R\`\`\`
โหโ > *Nombre* : %name
โหโ > *Exp* : %totalexp
โหโ > *Limite* : %limit
โหโ > *Rango* : %role
โหโ > *Nivel* : %level

โ \t\t\t\`\`\`I N F O  -  B O T\`\`\`
โหโ > *Usuarios* : %totalreg
โหโ > *Regs* : %rtotalreg
โหโ > *Hora* : %time

โ \t\t\t\`\`\`I N F O  -  N P M\`\`\`
โหโ > *Nombre* : %npmname
โหโ > *Descrip* : %npmdesc
โหโ > *Versiรณn* : %version
โหโ > *Main* : %npmmain
โหโ > *Autor* : %author
โหโ > *Licencia* : %license


โ๐ข๐ฉ๐๐๐ฌ๐ฑ remastered by โ๐ข๐ฏ๐ช๐ข๐ฐ *%wasp*

ิบโด โด โด โด โด โด โด โด โด โด โด โด โด โด

\t\t\`\`\`L I S T A  -  M E N U S\`\`\`
`.trimStart(),
  header: 'โข\tโ ๊ฐ โ *%category*',
  body: 'แซใโ๐ %cmd\n',
  footer: 'โถ',
  after: '',
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level, role } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    // d.getTimeZoneOffset()
    // Offset -420 is 18.00
    // Offset    0 is  0.00
    // Offset  420 is  7.00
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : `Powered by https://wa.me/${global.conn.user.jid.split`@`[0]}`) + defaultMenu.after
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? 'ห' : '')
                .replace(/%isPremium/g, menu.premium ? 'ห' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg, role,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
  //const pp = await conn.profilePictureUrl(conn.user.jid).catch(_ => './src/avatar_contact.png')
  //const pp = await (await fetch('https://i.ibb.co/qMG1JPY/fg.jpg')).buffer()
  //await conn.sendButton(m.chat, text.trim(), 'Creษted by โ๐ข๐ฏ๐ช๐ข๐ฐ', imgmenu, [['Info ๐ง', '.ping'], ['Creador ๐ญ', '.owner']], false, { quoted: m, contextInfo: { mentions: conn.parseMention(text.trim()), externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: '', title: 'ไฝๆใใใใใใ', body: 'By โ๐ข๐ฏ๐ช๐ข๐ฐ โพ', thumbnail: miniurl, sourceUrl: 'https://chat.whatsapp.com/ELn6Ck7InoUmA3QiQsgo' }}})
  const buttons = [ { buttonId: `.info`, buttonText: { displayText: 'Info ๐ง' }, type: 1 }, { buttonId: `.creador`, buttonText: { displayText: 'Creador ๐ญ' }, type: 1 }, ]
  let buttonMessage = { "document": { url: "https://wa.me/5218331898686" }, "fileName": 'โ๐ข๐ฉ๐๐๐ฌ๐ฑ - ๐๐ฃ๐ฆ๐ ๐ฆ๐๐ฉโข.โโโขแญ', "mimetype": 'application/vnd.ms-excel', "jpegThumbnail": false, "caption": text.trim(), "fileLength": '99999999999999', "mentions": [m.sender, '0@s.whatsapp.net'], "footer": 'By โ๐ข๐ฏ๐ช๐ข๐ฐ', "buttons": buttons, "headerType": 4, contextInfo: { "mentionedJid": [m.sender, '0@s.whatsapp.net'], "externalAdReply": { "showAdAttribution": true, "title": 'ไฝๆใใใใใใ โ ๅฐผๅง', "mediaType": 2, "previewType": "VIDEO", "thumbnail": imgmenu, "mediaUrl": 'https://youtu.be/jeXHB0IIzCM', "sourceUrl": 'https://chat.whatsapp.com/ELn6Ck7InoP6UmA3iQgo' }}} 
  conn.sendMessage(m.chat, buttonMessage, { quoted: m })

  } catch (e) {
    conn.reply(m.chat, 'โ Lo sentimos, el menรบ tiene un error.', m)
    throw e
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menรบ'] 

export default handler


const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

  var ase = new Date();
  var hour = ase.getHours();
switch(hour){
  case 0: hour = 'una linda noche ๐'; break;
  case 1: hour = 'una linda noche ๐ค'; break;
  case 2: hour = 'una linda noche ๐ฆ'; break;
  case 3: hour = 'una linda maรฑana โจ'; break;
  case 4: hour = 'una linda maรฑana ๐ซ'; break;
  case 5: hour = 'una linda maรฑana ๐'; break;
  case 6: hour = 'una linda maรฑana ๐'; break;
  case 7: hour = 'una linda maรฑana ๐'; break;
  case 8: hour = 'una linda maรฑana ๐ซ'; break;
  case 9: hour = 'una linda maรฑana โจ'; break;
  case 10: hour = 'un lindo dia ๐'; break;
  case 11: hour = 'un lindo dia ๐จ'; break;
  case 12: hour = 'un lindo dia โ'; break;
  case 13: hour = 'un lindo dia ๐ค'; break;
  case 14: hour = 'una linda tarde ๐'; break;
  case 15: hour = 'una linda tarde ๐ฅ'; break;
  case 16: hour = 'una linda tarde ๐น'; break;
  case 17: hour = 'una linda tarde ๐'; break;
  case 18: hour = 'una linda noche ๐'; break;
  case 19: hour = 'una linda noche ๐'; break;
  case 20: hour = 'una linda noche ๐'; break;
  case 21: hour = 'una linda noche ๐'; break;
  case 22: hour = 'una linda noche ๐'; break;
  case 23: hour = 'una linda noche ๐'; break;
}
  var greeting = "espero que tengas " + hour;
