import MessageType from '@adiwajshing/baileys'
import axios from 'axios'
import fetch from 'node-fetch'
import fs from 'fs'

let handler = async (m, { conn, text } ) => {
  /*conn.sendButton(m.chat, `*Test button*`, '-', imgmenu, [['Speedtest', 'ping'], ['Owner', 'owner']], false, { quoted: m, contextInfo: { externalAdReply: { showAdAttribution: true, mediaType: 'VIDEO', mediaUrl: imgmenu, title: 'Simple Bot Esm', body: 'By Papah-Chan',thumbnail: imgmenu, sourceUrl: 'https://youtu.be/poD-7_U3jXk' } } })

  conn.sendButton(m.chat, `*Test button*`, 'CreΙted by gΙtito βΎ', imgmenu, [['Info π§', '.ping'], ['Creador π­', '.owner']], false, { quoted: m, contextInfo: { externalAdReply: {
  showAdAttribution: true,
  mediaType: 'VIDEO',
  mediaUrl: '',
  title: 'δ½ζγγγγγγ',
  body: 'By gΙtito βΎ',
  thumbnail: miniurl,
  sourceUrl: 'Ι
'
  }}})*/


const buttons = [
{ buttonId: `.info`, buttonText: { displayText: 'Info π§' }, type: 1 },
{ buttonId: `.creador`, buttonText: { displayText: 'Creador π­' }, type: 1 }, ]

let buttonMessage = {
"document": { url: "https://wa.me/51940617554" }, 
"fileName": 'π·ππππππ - πΊππππππβ’.βββ’α­', 
"mimetype": 'application/vnd.ms-excel',
"jpegThumbnail": false,
"caption": '*Test button*',
"fileLength": '99999999999999',
"mentions": [m.sender],
"footer": 'By gΙtito βΎ',
"buttons": buttons,
"headerType": 4,   
contextInfo: {
"mentionedJid": [m.sender],
"externalAdReply": {
"showAdAttribution": true,
"title": 'δ½ζγγγγγγ β ε°Όε§',
"mediaType": 2, 
"previewType": "VIDEO",
"thumbnail": imgmenu,
"mediaUrl": 'https://youtu.be/jeXHB0IIzCM',
"sourceUrl": 'https://chat.whatsapp.com/ELn6Ck7InoP6UmA3QiQsgo' }}} 
conn.sendMessage(m.chat, buttonMessage, { quoted: m })

}

handler.command = ['test']

export default handler
