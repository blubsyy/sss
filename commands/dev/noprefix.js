const {
    Message,
    Client,
    MessageEmbed,
    MessageActionRow,
    MessageButton
} = require('discord.js');
this.config = require(`${process.cwd()}/config.json`);
module.exports = {
    name: 'noprefix',
    aliases: ['np'],
    category: 'owner',
    run: async (client, message, args) => {
        if (!this.config.np.includes(message.author.id)) return;

        const embed = new MessageEmbed().setColor(client.color);
        let prefix = message.guild.prefix;

        if (!args[0]) {
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `Please provide the required arguments.\n${prefix}noprefix \`<add/remove/list>\` \`<user id/tag>\``
                        )
                ]
            });
        }

        if (args[0].toLowerCase() === 'list') {
            let listing = await client.db.get(`noprefix_${client.user.id}`) || [];
            let info = [];
            let ss;
            if (listing.length < 1) {
                info.push(`No Users ;-;`);
            } else {
                for (let i = 0; i < listing.length; i++) {
                    ss = await client.users.fetch(listing[i]);
                    info.push(`${i + 1}) ${ss.tag} (${ss.id})`);
                }
            }
            return await client.util.pagination(message, info, '**No Prefix **Users List :-');
        }

        if (!args[1] && !message.mentions.users.size) {
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `Please provide the required arguments.\n${prefix}noprefix \`<add/remove/list>\` \`<user id/tag>\``
                        )
                ]
            });
        }

        let user;
        if (message.mentions.users.size) {
            user = message.mentions.users.first();
        } else if (args[1]) {
            user = await client.users.fetch(args[1]).catch(() => null);
        } else {
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `Please provide the required arguments.\n${prefix}noprefix \`<add/remove/list>\` \`<user id/tag>\``
                        )
                ]
            });
        }

        if (!user) {
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `Please provide a valid user ID or tag.\n${prefix}noprefix \`<add/remove/list>\` \`<user id/tag>\``
                        )
                ]
            });
        }

        let added = await client.db.get(`noprefix_${client.user.id}`) || [];
        let opt = args[0].toLowerCase();

        if (opt === 'add' || opt === 'a' || opt === '+') {
            if (added.includes(user.id)) {
                return message.channel.send({
                    embeds: [
                        embed.setDescription(`<a:Cross:1265733965180960849> | <@${user.id}> is already present in my **No Prefix** list.`)
                    ]
                });
            }
            added.push(user.id);
            added = client.util.removeDuplicates(added);
            await client.db.set(`noprefix_${client.user.id}`, added);
            client.util.noprefix();
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `<:tick:1267383653512773705> **Successfully Added No Prefix to <@${user.id}>**.`
                        )
                ]
            });
        }

        if (opt === 'remove' || opt === 'r' || opt === '-') {
            added = added.filter(id => id !== user.id);
            added = client.util.removeDuplicates(added);
            await client.db.set(`noprefix_${client.user.id}`, added);
            client.util.noprefix();
            return message.channel.send({
                embeds: [
                    embed.setColor(client.color)
                        .setDescription(
                            `<:tick:1267383653512773705>**<@${user.id}> has been removed from the No Prefix** list.`
                        )
                ]
            });
        }

        message.channel.send({
            embeds: [
                embed.setColor(client.color)
                    .setDescription(
                        `<:arrowright:1267383039218946049> ${prefix}noprefix \`<add/remove/list>\` \`<user id/mention>\``
                    )
            ]
        });
    }
};


