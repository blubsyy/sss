const { MessageEmbed } = require('discord.js')
const db = require('../../models/afk.js')

module.exports = {
    name: 'afk',
    description: "Set's You Away From Keyboard",
    category: 'info',
    run: async (client, message, args) => {
        const data = await db.findOne({
            Guild: message.guildId,
            Member: message.author.id
        })
        const reason = args.join(' ') ? args.join(' ') : "idk <:theshrug:1266165185501069433>"
        if (data) {
            const embed = new MessageEmbed()
                .setTitle(' **<a:sleeping_vw:1266164794654986251> you are already AFK.** ')
                .setColor(client.color)
            return message.channel.send({ embeds: [embed] })
        } else {
            const newData = new db({
                Guild: message.guildId,
                Member: message.author.id,
                Reason: reason,
                Time: Date.now()
            })
            await newData.save()
            const embed = new MessageEmbed()
                .setDescription(`<a:sleeping_vw:1266164794654986251> **Your AFK is now set to**: **${reason}**`)
                .setColor(client.color)
            return message.channel.send({ embeds: [embed] })
        }
    }
}
