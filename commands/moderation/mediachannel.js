const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'mediachannel',
    aliases: ['media'],
    category: 'mod',
    premium: false,
    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_GUILD')) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `You must have \`MANAGE SERVER\` permissions to use this command.`
                        )
                ]
            });
        }
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) { 
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892> I don't have \`Administrator\` permissions to execute this command.`
                        )
                ]
            })
        }

        if (!client.util.hasHigher(message.member)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892> | You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        let prefix = '&' || message.guild.prefix
        const option = args[0]

        const media = new MessageEmbed()
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setColor(client.color)
            .setTitle(`**Media (4**`)

            .addFields([
                {
                    name: `**${message.guild.prefix}media**`,
                    value: `<:arrow:1267432055101460586> Configure  the media only channels !`
                },
                {
                    name: `**${message.guild.prefix}media Set**`,
                    value: `<:arrow:1267432055101460586>  media only channel in server`
                },
                {
                    name: `**${message.guild.prefix}media reset**`,
                    value: `<:arrow:1267432055101460586> disable media only channels configured in server`
                },
                {
                    name: `**${message.guild.prefix}media view**`,
                    value: `<:arrow:1267432055101460586> Get The List Of the media only channels`
                }
            ])
        if (!option) {
            message.channel.send({ embeds: [media] })
        } else if (option.toLowerCase() === 'set') {
            const channel =
                getChannelFromMention(message, args[1]) ||
                message.guild.channels.cache.get(args[1])

            if (!channel)
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:cross_mark:1267383549623930892> Oops! It seems there was an issue. Please make sure to provide a valid channel for the media configuration.`
                            )
                    ]
                })
            if (channel.type === 'GUILD_VOICE') {
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:cross_mark:1267383549623930892> You cannot add any voice channels as media channel `
                            )
                    ]
                })
            }
            if (channel) {
                await client.db.set(`mediachannel_${message.guild.id}`, {
                    channel: channel.id
                })
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:tick:1267383653512773705> Successfully Added ${channel} As Media Only Channel`
                            )
                    ]
                })
            }
        } else if (option.toLowerCase() === 'reset') {
            const data = await client.db.get(`mediachannel_${message.guild.id}`)
            if (!data) {
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:cross_mark:1267383549623930892> There Is No Media Only Channel Configuration In This Server.!`
                            )
                    ]
                })
            } else if (data) {
                await client.db.set(`mediachannel_${message.guild.id}`, null)
                message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:cross_mark:1267383549623930892> Successfully Disabled Media Only Configuration.!`
                            )
                    ]
                })
            }
        } else if (option.toLowerCase() === 'view') {
            const data = await client.db.get(`mediachannel_${message.guild.id}`)
            if (!data?.channel)
                return message.channel.send({
                    embeds: [
                        new MessageEmbed()
                            .setColor(client.color)
                            .setDescription(
                                `<:cross_mark:1267383549623930892> | No Media Only configured is Set.!`
                            )
                    ]
                })
            const whitelisted = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `Current media only configured channel is <#${data.channel}>`
                )
            message.channel.send({ embeds: [whitelisted] })
        }
    }
}

function getChannelFromMention(message, mention) {
    if (!mention) return null

    const matches = mention.match(/^<#(\d+)>$/)
    if (!matches) return null

    const channelId = matches[1]
    return message.guild.channels.cache.get(channelId)
}