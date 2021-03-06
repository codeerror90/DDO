import fs from 'fs'

//Pico
const Pickaxe1 = 175000 //Madera
const Pickaxe2 = 225000 //Piedra
const Pickaxe3 = 325000 //Hierro
const Pickaxe4 = 375000 //Oro
const Pickaxe5 = 475000 //Diamante

//Hacha
const Axe1 = 100000 //Madera
const Axe2 = 150000 //Piedra
const Axe3 = 250000 //Hierro
const Axe4 = 300000 //Oro
const Axe5 = 400000 //Diamante

//Espada
const Sword1 = 50000 //Madera
const Sword2 = 75000 //Piedra
const Sword3 = 125000 //Hierro
const Sword4 = 150000 //Oro
const Sword5 = 200000 //Diamante

//Armadura 
const Armor1 = 250000 //Cuero
const Armor2 = 450000 //Malla
const Armor3 = 650000 //Hierro
const Armor4 = 850000 //Oro
const Armor5 = 1050000 //Diamante

//CaÃ±a
const Rod1 = 250000 //Normal

let handler = async (m, { conn, usedPrefix, command }) => {
let tumb = fs.readFileSync('./storage/image/tienda.jpg')
let tt = "```"
let shop = `\t*â¢ ðª Herramientas para Comprar ð£ â¢*

*â Picos para Minar*
${tt}â Madera:   $${Pickaxe1}
â Piedra:   $${Pickaxe2}
â Hierro:   $${Pickaxe3}
â Oro:      $${Pickaxe4}
â Diamante: $${Pickaxe5}${tt}

*ðª Hachas para Talar*
${tt}â Madera:   $${Axe1}
â Piedra:   $${Axe2}
â Hierro:   $${Axe3}
â Oro:      $${Axe4}
â Diamante: $${Axe5}${tt}

*ð¡ï¸ Espada*
${tt}â Madera:   $${Sword1}
â Piedra:   $${Sword2}
â Hierro:   $${Sword3}
â Oro:      $${Sword4}
â Diamante: $${Sword5}${tt}

*ð Armadura*
${tt}â Cuero:    $${Armor1}
â Malla:    $${Armor2}
â Hierro:   $${Armor3}
â Oro:      $${Armor4}
â Diamante: $${Armor5}${tt}

*ð£ CaÃ±a para Pescar*
${tt}â Normal:   $${Rod1}${tt}

\t\t*â¢ ð© Intems para Vender ð¡ â¢*

*ð Minerales:*
${tt}â Diamante: $750
â Oro:      $500
â Hierro:   $150
â Piedra:   $10${tt}

*ð Peces:*
${tt}â Globo:    $500
â Tropical: $300
â Comun:    $50${tt}

*Maderas:*
${tt}â Roble:    $10${tt}`
let note = `*Nota:* Al comprar una herramienta se suben de nivel de madera hasta el diamante

*No puedes comprar una herramienta en especifico*`
conn.sendButton(m.chat, shop, note, tumb, [['EnergÃ­a â¡', '.energia'], ['Inventario ð', '.inv']], m)
}

handler.help = ['tienda']
handler.tags = ['rpg']
handler.command = /^(store|tienda|shop)$/i

export default handler
