const { MessageEmbed } = require('discord.js')
let enable = `<:sr_n_antinuke_no:1260172380135886929><:sr_antinuke_yes:1260172482178973737>`
let disable = `<:sr_antinuke_no:1260171097328979978><:sr_n_antinuke_yes:1260172474918637569>`
let protect = `<:moderator:1267738499587768400>`
let hii = `<a:dot:1267433233964859435>`
const wait = require('wait')

module.exports = {
    name: 'antispam',
    aliases: [],
    cooldown: 5,
    category: 'automod',
    subcommand: ['enable', 'disable', 'punishment', 'limit'],
    premium: false,
    run: async (client, message, args) => {
        const embed = new MessageEmbed().setColor(client.color)

        if (message.guild.memberCount < 0) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            ` | Your Server Doesn't Meet My 30 Member Criteria`
                        )
                ]
            })
        }
        let own = message.author.id == message.guild.ownerId
        if (!message.member.permissions.has('ADMINISTRATOR')) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892> You must have \`Administrator\` permissions to use this command.`
                        )
                ]
            })
        }
        if (!message.guild.me.permissions.has('ADMINISTRATOR')) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892>  I don't have \`Administrator\` permissions to execute this command.`
                        )
                ]
            })
        }
        if (
            !own &&
            message.member.roles.highest.position <=
                message.guild.me.roles.highest.position
        ) {
            return message.channel.send({
                embeds: [
                    embed
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892> You must have a higher role than me to use this command.`
                        )
                ]
            })
        }

        let prefix = message.guild.prefix || '&' // Correct way to define default prefix

        const option = args[0]
        const isActivatedAlready =
            (await client.db.get(`antispam_${message.guild.id}`)) ?? null

        const antispam = new MessageEmbed()
            .setThumbnail(client.user.avatarURL({ dynamic: true }))
            .setColor(client.color)
            .setTitle('__**Fortify Your Server with Antispam!**__')
            .setDescription(
                'Defend your server against spam and uphold its integrity with Antispam! .'
            )
            .addField(
                '**Activate Antispam**',
                `<:arrow:1267432055101460586> To enable Antispam, use \`${prefix}antispam enable\``
            )
            .addField(
                '**Deactivate Antispam**',
                `<:arrow:1267432055101460586> To disable Antispam, use \`${prefix}antispam disable\``
            )
            .addField(
                '**Configure Antispam Punishment**',
                '<:arrow:1267432055101460586> Choose the punishment for spammers.'
            )
            .addField(
                '**Punishment Options**',
                '`ban` - Ban spammers, `kick` - Kick spammers, `mute` - Mute spammers'
            )
            .addField(
                '**Set Antispam Threshold**',
                'Adjust the message limit to trigger Antispam.'
            )
            .addField(
                '**Threshold Usage**',
                'Specify the message limit with numbers, e.g., `4`, `10`'
            )
            .setTimestamp()
            .setFooter(client.user.username, client.user.displayAvatarURL())



        switch (option) {
            case undefined:
                message.channel.send({ embeds: [antispam] })
                break

            case 'enable':
                if (!isActivatedAlready) {
                    await client.db.set(`antispam_${message.guild.id}`, true)
                    await client.db.set(`antispamlimit_${message.guild.id}`, 4)
                    await client.db.set(`antispamp_${message.guild.id}`, {
                        data: 'mute'
                    })

                    const antispamEnableMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setTitle('Antispam Enabled')
                        .setDescription(
                            '**Congratulations! Antispam has been successfully enabled on your server.**'
                        )
                        .addField(
                            'Enhanced Protection',
                            'Enjoy enhanced protection against spam messages!'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )

                    await message.channel.send({
                        embeds: [antispamEnableMessage]
                    })
                } else {
                    const antispamSettingsEmbed = new MessageEmbed()
                        .setTitle(
                            `Antispam Settings for ${message.guild.name} ${protect}`
                        )
                        .setColor(client.color)
                        .setDescription(`**Antispam Status**`)
                        .addField(
                            'Current Status',
                            `Antispam is already enabled on your server.\n\nCurrent Status: ${enable}`
                        )
                        .addField(
                            'To Disable',
                            `To disable Antispam, use \`${prefix}antispam disable\``
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({
                        embeds: [antispamSettingsEmbed]
                    })
                }
                break

            case 'disable':
                if (isActivatedAlready) {
                    await client.db.set(`antispam_${message.guild.id}`, false)
                    await client.db.set(`antispamp_${message.guild.id}`, {
                        data: null
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setDescription('**Antispam Disabled**')
                        .addField(
                            'Status',
                            'Antispam has been successfully disabled on your server.'
                        )
                        .addField(
                            'Impact',
                            'Your server will no longer be protected against spam messages.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    return message.channel.send({ embeds: [embedMessage] })
                } else {
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(`**Antispam Status**`)
                        .addField(
                            'Current Status',
                            `Antispam is already disabled on your server.\n\nCurrent Status: ${disable}`
                        )
                        .addField(
                            'To Enable',
                            `To enable Antispam, use \`${prefix}antispam enable\``
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    return message.channel.send({ embeds: [embedMessage] })
                }
                break

            case 'punishment':
                let punishment = args[1]
                if (!punishment) {
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setDescription(
                            '**Error:** Please provide valid punishment arguments.'
                        )
                        .addField(
                            'Valid Punishments',
                            'Valid options are: `ban`, `kick`, `mute`.'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    return message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'ban') {
                    await client.db.set(`antispamp_${message.guild.id}`, {
                        data: 'ban'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setTitle('Anti-Spam Punishment Configured')
                        .setDescription(
                            'The anti-spam punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Ban')
                        .addField(
                            'Action Taken',
                            'Any user caught spamming will be banned.'
                        )
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'kick') {
                    await client.db.set(`antispamp_${message.guild.id}`, {
                        data: 'kick'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setTitle('Anti-Spam Punishment Configured')
                        .setDescription(
                            'The anti-spam punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Kick')
                        .addField(
                            'Action Taken',
                            'Any user caught spamming will be kicked.'
                        )
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                }
                if (punishment === 'mute') {
                    await client.db.set(`antispamp_${message.guild.id}`, {
                        data: 'mute'
                    })
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setTitle('Anti-Spam Punishment Configured')
                        .setDescription(
                            'The anti-spam punishment has been successfully configured.'
                        )
                        .addField('Punishment Type', 'Mute')
                        .addField(
                            'Action Taken',
                            'Any user caught spamming will be muted.'
                        )
                        .addField('Duration', '5 minutes')
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                }
                break

            case 'limit':
                let limit = args[1]
                if (!limit) {
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: message.author.tag,
                            iconURL: message.author.displayAvatarURL({
                                dynamic: true
                            })
                        })
                        .setDescription(
                            `**Error:** Please provide valid message limit arguments.`
                        )
                        .addField(
                            'Example',
                            'Use the command like this: `Antispam limit 4`'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    return message.channel.send({ embeds: [embedMessage] })
                }
                if (limit >= 4 && limit <= 10) {
                    await client.db.set(`antispamlimit_${message.guild.id}`, limit)
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:1180470648053702657:1259150067470831646> | **Spam Threshold Updated**`
                        )
                        .addField('New Spam Threshold', `${limit}`, true)
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                } else {
                    const embedMessage = new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            ` **Error: Invalid Message Count Limit**`
                        )
                        .addField(
                            'Valid Range',
                            'Message count limit must be greater than 3 and less than 10'
                        )
                        .setTimestamp()
                        .setFooter(
                            client.user.username,
                            client.user.displayAvatarURL()
                        )
                    await message.channel.send({ embeds: [embedMessage] })
                }
                break
        }
    }
}
