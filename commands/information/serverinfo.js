const { MessageEmbed } = require('discord.js');
const moment = require('moment');

// Constants for emoji representations
const disabled = '<:stolen_emoji:1249318563437871194>';
const enabled = '<:stolen_emoji:1249318723932913778>';

// Verification levels and booster tiers mapping
const verificationLevels = {
    NONE: 'None',
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High',
    VERY_HIGH: 'Very High'
};

const booster = {
    NONE: 'Level 0',
    TIER_1: 'Level 1',
    TIER_2: 'Level 2',
    TIER_3: 'Level 3'
};

module.exports = {
    name: 'serverinfo',
    category: 'info',
    aliases: ['si'],
    description: 'Get detailed information about the server.',
    run: async (client, message, args) => {
        const guild = message.guild;

        // Fetch necessary data
        const { createdTimestamp, ownerId, description } = guild;
        const bans = await message.guild.bans.fetch().then((bans) => bans.size);
        const members = guild.members.cache;
        const channels = guild.channels.cache;
        const emojis = guild.emojis.cache;

        // Function to calculate days since creation
        function checkDays(date) {
            const now = new Date();
            const diff = now.getTime() - date.getTime();
            const days = Math.floor(diff / 86400000);
            return days + (days == 1 ? ' day' : ' days') + ' ago';
        }

        // Role display
        const roles = guild.roles.cache
            .sort((a, b) => b.position - a.position)
            .map((role) => role.toString())
            .slice(0, -1);
        let rolesdisplay = roles.length < 15 ? roles.join(' ') : `\`Too many roles to show..\``;
        if (rolesdisplay.length > 1024) rolesdisplay = `${roles.slice(4).join(' ')} \`more..\``;

        // Embed construction
        const embed = new MessageEmbed()
            .setColor('#000000') // Black color
            .setTitle(`${guild.name}'s Information`)
            .setThumbnail(guild.iconURL({ dynamic: true }))
            .setDescription(description || 'No description provided.')
            .addFields(
                {
                    name: 'About Server',
                    value: `**Name**: ${guild.name}\n**ID**: ${guild.id}\n**Owner**: <@!${ownerId}>\n**Created at**: <t:${Math.floor(createdTimestamp / 1000)}:R> (${checkDays(guild.createdAt)})\n**Members**: ${guild.memberCount}\n**Banned Members**: ${bans}`
                },
                {
                    name: 'Server Settings',
                    value: `**Verification Level**: ${verificationLevels[guild.verificationLevel]}\n**AFK Channel**: ${guild.afkChannelId ? `<#${guild.afkChannelId}>` : disabled}\n**AFK Timeout**: ${guild.afkTimeout / 60} minutes\n**System Messages Channel**: ${guild.systemChannelId ? `<#${guild.systemChannelId}>` : disabled}\n**Boost Bar**: ${guild.premiumProgressBarEnabled ? enabled : disabled}`
                },
                {
                    name: 'Server Features',
                    value: `**Boost Status**: ${booster[guild.premiumTier]} [<a:boosts:1259378037271564330> ${guild.premiumSubscriptionCount || '0'} Boosts]`
                },
                {
                    name: 'Incidents Data',
                    value: `**Total Bans**: ${bans}`
                },
                {
                    name: 'Emojis & Stickers Info',
                    value: `**Regular Emojis**: ${emojis.filter((emoji) => !emoji.animated).size}\n**Animated Emojis**: ${emojis.filter((emoji) => emoji.animated).size}\n**Total Emojis**: ${emojis.size}`
                },
                {
                    name: 'Channels',
                    value: `**Total Channels**: ${channels.size}\n**Text Channels**: ${channels.filter((channel) => channel.type === 'GUILD_TEXT').size} | **Voice Channels**: ${channels.filter((channel) => channel.type === 'GUILD_VOICE').size}`
                },
                {
                    name: `Server Roles [${roles.length}]`,
                    value: `${rolesdisplay}`
                }
            )
            .setTimestamp();

        // Sending the embed
        message.channel.send({ embeds: [embed] });
    }
};
