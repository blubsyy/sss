const { MessageEmbed } = require('discord.js')
let enable = `<:sr_n_antinuke_no:1260172380135886929><:sr_antinuke_yes:1260172482178973737>`
let disable = `<:sr_antinuke_no:1260171097328979978><:sr_n_antinuke_yes:1260172474918637569>`
let protect = `<:moderator:1267738499587768400>`
let hii = `<a:dot:1267433233964859435>`
const wait = require('wait')
module.exports = {
    name: 'antinuke',
    aliases: ['antiwizz', 'an'],
    category: 'security',
    premium: true,
    run: async (client, message, args) => {
         if (message.guild.memberCount < 2) {
          return message.channel.send({
                 embeds: [
                     new MessageEmbed()
                         .setColor(client.color)
                         .setDescription(
                             `${client.emoji.cross} | Your Server Doesn't Meet My 2 Member Criteria`
                         )
                 ]
             })
     }
        let own = message.author.id == message.guild.ownerId
        const check = await client.util.isExtraOwner(
            message.author,
            message.guild
        )
        if (!own && !check) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `${client.emoji.cross} ** Only Server Owner Or Extraowner Can Run This Command.!**`
                        )
                ]
            })
        }
        if (
            !own &&
            !(
                message?.guild.members.cache.get(client.user.id).roles.highest
                    .position <= message?.member?.roles?.highest.position
            )
        ) {
            const higherole = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `${client.emoji.cross} **Only Server Owner Or Extraowner Having Higher Role Than Me Can Run This Command**`
                )
            return message.channel.send({ embeds: [higherole] })
        }

        let prefix = '&' || message.guild.prefix
        const option = args[0]
        const isActivatedAlready = await client.db.get(
            `${message.guild.id}_antinuke`
        )
        const antinuke = new MessageEmbed()
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setColor(client.color)
            .setTitle(`__**Antinuke**__`)
            .setDescription(
                `***> Level up your server security with Antinuke!***`
            )
            .addFields([
                {
                    name: `__**Antinuke Enable**__`,
                    value: `To Enable Antinuke, Use - \`${prefix}antinuke enable\``
                },
                {
                    name: `__**Antinuke Disable**__`,
                    value: `To Disable Antinuke, Use - \`${prefix}antinuke disable\``
                }
            ])

        {
            if (!option) {
                message.channel.send({ embeds: [antinuke] })
            } else if (option === 'enable') {
                if (isActivatedAlready) {
                    const enabnble = new MessageEmbed()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor(client.color)
                        .setDescription(
                            `**Security Settings For ${message.guild.name} ${protect}\nUmm, looks like your server has already enabled security\n\nCurrent Status : ${enable}\nTo Disable use ${prefix}antinuke disable**`
                        )
                    message.channel.send({ embeds: [enabnble] })
                } else {
                    await client.db.set(`${message.guild.id}_antinuke`, true)
                    await client.db.set(`${message.guild.id}_wl`, {
                        whitelisted: []
                    })
                    const enabled = new MessageEmbed()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setAuthor({
                            name: `${client.user.username} Security`,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setColor(client.color)
                        .setDescription(
                            `**Security Settings For ${message.guild.name} ${protect}**\n\n**Antinuke is Now Enabled**`
                        )
                        .setFooter({
                            text: `Punishment Type: Ban`,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        })

                    let msg = await message.channel.send({
                        embeds: [
                            new MessageEmbed()
                                .setColor(client.color)
                                .setDescription(
                                    `${client.emoji.tick} | Initializing Quick Setup!`
                                )
                        ]
                    })
                    const steps = [
                        'Adding Server To Database',
                        'Creating Sparkk Dominance...!!'
                    ]
                    for (const step of steps) {
                        await client.util.sleep(1000)
                        await msg.edit({
                            embeds: [
                                new MessageEmbed()
                                    .setColor(client.color)
                                    .setDescription(
                                        `${msg.embeds[0].description}\n${client.emoji.tick} | ${step}`
                                    )
                            ]
                        })
                    }
                    await client.util.sleep(2000)
                    await msg.edit({ embeds: [enabled] })
                    //  message.channel.send({ embeds: [enabled] })
                    if (message.guild.roles.cache.size > 249)
                        return message.reply(
                            `I Won't Able To Create \`Spakk Dominance\` Cause There Are Already 249 Roles In This Server`
                        )
                    let role = message?.guild.members.cache.get(client.user.id)
                        .roles.highest.position
                    let createdRole = await message.guild.roles.create({
                        name: 'SPARKK Dominance',
                        position: role ? role : 0,
                        reason: 'SPARKK Role For Ubypassable Setup',
                        permissions: ['ADMINISTRATOR'],
                        color: '#5c00ff'
                    })
                    await message.guild.me.roles.add(createdRole.id)
                }
            } else if (option === 'disable') {
                if (!isActivatedAlready) {
                    const dissable = new MessageEmbed()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor(client.color)
                        .setDescription(
                            `**Security Settings For ${message.guild.name} ${protect}\k looks like your server hasn't enabled security.\n\nCurrent Status: ${disable}\n\nTo Enable use ${prefix}antinuke enable**`
                        )
                    message.channel.send({ embeds: [dissable] })
                } else {
                    await client.db
                        .get(`${message.guild.id}_wl`)
                        .then(async (data) => {
                            const users = data.whitelisted
                            let i
                            for (i = 0; i < users.length; i++) {
                                let data2 = await client.db?.get(
                                    `${message.guild.id}_${users[i]}_wl`
                                )
                                if (data2) {
                                    await client.db?.delete(
                                        `${message.guild.id}_${users[i]}_wl`
                                    )
                                }
                            }
                        })
                    await client.db.set(`${message.guild.id}_antinuke`, null)
                    await client.db.set(`${message.guild.id}_wl`, {
                        whitelisted: []
                    })
                    const disabled = new MessageEmbed()
                        .setThumbnail(client.user.displayAvatarURL())
                        .setColor(client.color)
                        .setDescription(
                            `**Security Settings For ${message.guild.name} ${protect}\nSuccessfully disabled security settings for this server.\n\nCurrent Status: ${disable}\n\nTo Enable use ${prefix}antinuke enable**`
                        )
                    message.channel.send({ embeds: [disabled] })
                }
            } else {
                return message.channel.send({ embeds: [antinuke] })
            }
        }
    }
}