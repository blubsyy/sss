const { Message, Client, MessageEmbed } = require('discord.js')

module.exports = {
    name: 'avatar',
    aliases: ['av', 'pfp'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        let member = await getUserFromMention(message, args[0])
        if (!member) {
            try {
                member = await client.users.fetch(args[0])
            } catch (error) {
                const embed = new MessageEmbed()
                    .setFooter(`Requested By ${message.author.tag}`)
                    .setImage(
                        message.member.displayAvatarURL({
                            dynamic: true,
                            size: 4096
                        })
                    )
                    .setColor(client.color)

                return message.channel.send({ embeds: [embed] })
            }
        }
        const embed = new MessageEmbed()
            .setFooter(`Requested By ${message.author.tag}`)
            .setAuthor({ name: `${member.username}`, value: `<@${member}>` })
            .setImage(member.displayAvatarURL({ dynamic: true, size: 2048 }))
            .setColor(client.color)

        message.channel.send({ embeds: [embed] })
    }
}

function getUserFromMention(message, mention) {
    if (!mention) return null

    const matches = mention.match(/^<@!?(\d+)>$/)
    if (!matches) return null

    const id = matches[1]
    return message.client.users.fetch(id) || message.member
}
