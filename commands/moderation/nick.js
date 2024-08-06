

const {
    MessageEmbed,
} = require('discord.js');

module.exports = {
    name: 'nick',
    aliases: ['name'],
    category: 'mod',
    premium: false,

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_NICKNAMES')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `<:cross_mark:1267383549623930892> You must have \`Manage Nick\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!message.guild.me.permissions.has('MANAGE_NICKNAMES')) {
            const error = new MessageEmbed()
                .setColor(client.color)
                .setDescription(
                    `<:cross_mark:1267383549623930892> I must have \`Manage Nick\` permission to use this command.`
                );
            return message.channel.send({ embeds: [error] });
        }
        if (!client.util.hasHigher(message.member)) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor(client.color)
                        .setDescription(
                            `<:cross_mark:1267383549623930892> You must have a higher role than me to use this command.`
                        )
                ]
            })
        }
        
        let member = await getUserFromMention(message, args[0]);
        let name = args.slice(1).join(" ");
        if (!member) {
            try {
                member = await message.guild.members.fetch(args[0])
            } catch (error) {
                return message.channel.send({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<:cross_mark:1267383549623930892> Please Provide a valid member`)]});

            }
        }

        try {
            if (!name) {
                await member.setNickname(null);
                return message.channel.send({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<:tick:1267383653512773705> ${member}'s nickname has been successfully removed`)]});
            } else {
                await member.setNickname(name);
                return message.channel.send({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<:tick:1267383653512773705> ${member}'s nickname has been successfully changed to ${name}`)]});
            }
        } catch (err) {
            return message.channel.send({ embeds: [new MessageEmbed().setColor(client.color).setDescription(`<:cross_mark:1267383549623930892>I may not have sufficient permissions or my highest role may not be above or the same as ${member}.`)]});
        }
    }
};

function getUserFromMention(message, mention) {
    if (!mention) return null;

    const matches = mention.match(/^<@!?(\d+)>$/);
    if (!matches) return null;

    const id = matches[1];
    return message.guild.members.fetch(id).catch(() => null); // Catch errors if member is not found
}
