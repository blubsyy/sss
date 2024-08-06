
const { MessageEmbed } = require('discord.js')
this.config = require(`${process.cwd()}/config.json`)
module.exports = {
    name: `leaveserver`,
    category: `Owner`,
    aliases: [`gl`, `gleave`],
    description: `Leaves A Guild`,
    run: async (client, message, args) => {
        if (!this.config.admin.includes(message.author.id)) return
        let id = args[0]
        if (!id) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You didn't provided the server Id.`
                        )
                ]
            })
        }
        let guild = await client.guilds.fetch(id)
        let name = guild?.name || 'No Name Found'
        if (!guild) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<a:Cross:1265733965180960849> | You didn't provided a valid server Id.`
                        )
                ]
            })
        }
        await guild.leave()
        return message.channel.send({
            embeds: [
                new MessageEmbed()
                    .setColor(client.color)
                    .setDescription(
                        `<:tick:1267383653512773705> Successfully left **${name} (${id})**.`
                    )
            ]
        })
    }
}
