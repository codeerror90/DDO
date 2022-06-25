export function before(m) {
    let user = global.db.data.users[m.sender]
    if (user.afk > -1) {
        m.reply(`\t\t*😴 Dejaste de estar AFK*

• Usuario: @${m.sender.split('@')[0]}
• Razon: ${reason ? `${reason}` : '×'}

Durante *${stime(new Date - user.afk)}*`)
        user.afk = -1
        user.afkReason = ''
    }
    let jids = [...new Set([...(m.mentionedJid || []), ...(m.quoted ? [m.quoted.sender] : [])])]
    for (let jid of jids) {
        let user = global.db.data.users[jid]
        if (!user)
            continue
        let afkTime = user.afk
        if (!afkTime || afkTime < 0)
            continue
        let reason = user.afkReason || ''
        m.reply(`\t\t*😴 El usuario que mencionas está AFK*

• Usuario: @${jid.split('@')[0]}
• Razon: ${reason ? `${reason}` : '×'}

Durante *${stime(new Date - afkTime)}*`)
    }
    return true
}
