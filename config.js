import { watchFile, unwatchFile } from 'fs'
import fs from 'fs'
import chalk from 'chalk'
import { fileURLToPath } from 'url'

global.owner = [
  ['5218331898686', '「ℌ𝔢𝔯𝔪𝔢𝔰」', true], 
  ['5218333659697'] 
 
] //Numeros de owner 

global.mods = [] // Moderadores
global.prems = ['5218331898686', '5218333659697']  // El usuario Premium tiene diamantes ilimitado
global.APIs = { // API Prefix
  // name: 'https://website'
  nrtm: 'https://nurutomo.herokuapp.com',
  zenz: 'https://zenzapis.xyz',
  bg: 'http://bochil.ddns.net',
  xteam: 'https://api.xteam.xyz',
  zahir: 'https://zahirr-web.herokuapp.com',
  zeks: 'https://api.zeks.xyz',
  pencarikode: 'https://pencarikode.xyz',
  LeysCoder: 'https://leyscoders-api.herokuapp.com'
}
global.APIKeys = { // APIKey Here
  // 'https://website': 'apikey'
  'https://api.xteam.xyz': 'd90a9e986e18778b',
  'https://zenzapis.xyz': '675e34de8a',
  'https://zahirr-web.herokuapp.com': 'zahirgans',
  'https://api.zeks.xyz': 'apivinz',
  'https://pencarikode.xyz': 'pais',
  'https://leyscoders-api.herokuapp.com': 'dappakntlll'
}

// Sticker WM
global.packname = 'HERMES - OFC'
global.author = 'Dioses del Olimphus 💫'

global.wait = '*↻ Esperɑ soy lentɑ. . .*'
global.error = '*☓ Ocurrió un error inesperado*'

global.igfg = '\n▢ Sígueme en Instagram\nhttps://www.instagram.com\n' 
global.fgsc = 'https://github.com/' 
global.fgyt = 'https://youtube.com/'

global.multiplier = 69 // Cuanto más alto, más difícil subir de nivel


global.imgmenu = fs.readFileSync('./storage/image/menu.jpg')
global.miniurl = fs.readFileSync('./storage/image/miniurl.jpg')


global.stime = function clockString(seconds) {
  var d = Math.floor(seconds / (1000 * 60 * 60 * 24));
  var h = Math.floor((seconds / (1000 * 60 * 60)) % 24);
  var m = Math.floor((seconds / (1000 * 60)) % 60);
  var s = Math.floor((seconds / 1000) % 60);
  var dDisplay = d > 0 ? d + (d == 1 ? " dia," : " Dias,") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hora, " : " Horas, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minuto, " : " Minutos, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " segundo" : " Segundos") : "";
  return dDisplay + hDisplay + mDisplay + sDisplay ? dDisplay + hDisplay + mDisplay + sDisplay : '0 Segundos'
  //return dDisplay + hDisplay + mDisplay + sDisplay;
};


let file = fileURLToPath(import.meta.url)
watchFile(file, () => {
  unwatchFile(file)
  console.log(chalk.redBright("Update 'config.js'"))
  import(`${file}?update=${Date.now()}`)
})
