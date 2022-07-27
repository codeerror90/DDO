import { youtubeSearch } from '@bochilteam/scraper'

let handler = async (m, { conn, command, text, usedPrefix }) => {
  if (!text) throw 'Ingrese el nombre de un video de YouTube junto al comando'
  let vid = (await youtubeSearch(text)).video[0]
  if (!vid) throw 'Vídeo/Audio no encontrado'
  let { title, description, thumbnail, videoId, durationH, viewH, publishedTime } = vid
  const url = 'https://www.youtube.com/watch?v=' + videoId
  let teksyt = `\t\t\t*× 📻 Descargɑ de YouTube 📻 ×*

*• Titulo:* ${title}
*• Duración:* ${durationH}
*• Visitas:* ${viewH}
*• Publicado:* ${publishedTime}
*• Url:* ${url}`
  conn.sendButton(m.chat, teksyt.replace('a', 'ɑ').replace('á', 'ά'), 'elija un formato de descarga', thumbnail, [
    ['Audio 🎶', `${usedPrefix}fgmp3 ${url} yes`],
    ['Vídeo 🎥', `${usedPrefix}fgmp4 ${url} yes`]
  ], m)
}

handler.help = ['play']
handler.tags = ['downloader']
handler.command = /^(play|playvid|play2)$/i

handler.restrict = false

export default handler

