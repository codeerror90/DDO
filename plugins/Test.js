import MessageType from '@adiwajshing/baileys'
import axios from 'axios'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, text } ) => {
  conn.sendButton(m.chat, `*Test button*`, '-', imgmenu, [['Speedtest', 'ping'], ['Owner', 'owner']], false, { quoted: m, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: imgmenu, title: 'Simple Bot Esm', body: 'By Papah-Chan',thumbnail: imgmenu, sourceUrl: 'https://youtu.be/poD-7_U3jXk' } } })

  /*conn.sendButton(m.chat, `*Test button*`, 'Creɑted by gɑtito ⾕', imgmenu, [['Info 🧃', '.ping'], ['Creador 🍭', '.owner']], false, { quoted: m, contextInfo: { externalAdReply: {
  showAdAttribution: true,
  mediaType: 'VIDEO',
  mediaUrl: '',
  title: '作成されたボット',
  body: 'By gɑtito ⾕',
  thumbnail: miniurl,
  sourceUrl: 'https://chat.whatsapp.com/ELn6Ck7InoP6UmA3QiQsgo'
  }}})*/


const buttons = [
{ buttonId: `.info`, buttonText: { displayText: 'Info 🧃' }, type: 1 },
{ buttonId: `.creador`, buttonText: { displayText: 'Creador 🍭' }, type: 1 }, ]

let buttonMessage = {
document: imgmenu, 
fileName: '𝕷𝖔𝖑𝖎𝖇𝖔𝖙 - 𝕺𝖋𝖎𝖈𝖎𝖆𝖑™.⁖⃟•᭄', 
mimetype: 'application/vnd.ms-excel',
jpegThumbnail: imagen1,
caption: '*Test button*',
fileLength: '99999999999999',
mentions:[m.sender],
footer: 'By gɑtito ⾕',
buttons: buttons,
headerType: 4,   
contextInfo: {
"mentionedJid": [m.sender],
"externalAdReply": {
"showAdAttribution": true,
"title": '作成されたボット',
"mediaType": 2, 
"previewType": "VIDEO",
"thumbnail": miniurl,
"mediaUrl": 'https://youtu.be/eC9TfKICpcY',
"sourceUrl": 'https://chat.whatsapp.com/ELn6Ck7InoP6UmA3QiQsgo' }}} 
conn.sendMessage(m.chat, buttonMessage, m)

}

handler.command = ['test']

export default handler
