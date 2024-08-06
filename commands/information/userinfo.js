const { MessageEmbed } = require("discord.js");
const moment = require("moment");

// Define Discord badges emojis
const DISCORD_EMPLOYEE = '<:sr_staff:1260169657764020336>';
const DISCORD_PARTNER = '<a:sr_partner:1260170443122540584>';
const BUGHUNTER_LEVEL_1 = '<:sr_bughunter1:1260173200394948674>';
const BUGHUNTER_LEVEL_2 = '<:sr_bughunter2:1260172300809142304>';
const HYPESQUAD_EVENTS = '<:sr_admin:1260172888548573204>';
const HOUSE_BRAVERY = '<:sr_HypeSquadOnlineHouse1:1260173599814324275>';
const HOUSE_BRILLIANCE = '<:sr_HypeSquadOnlineHouse2:1260173560132014101>';
const HOUSE_BALANCE = '<:sr_HypeSquadBalance:1260173803674406913>';
const EARLY_SUPPORTER = '<:sr_supporter:1260171958595751966>';
const TEAM_USER = '<:sr_antinuke:1260128570353651736>';
const SYSTEM = '<a:sr_utility:1260170334057795594>';
const VERIFIED_BOT = '<:sr_verifiedBot:1260173360789196860>';
const VERIFIED_DEVELOPER = '<a:sr_dev:1260168357391503413>';
const ACTIVE_DEVELOPER = '<:sr_activedev:1260179694205141014>';

module.exports = {
    name: "userinfo",
    aliases: ['ui', 'whois'],
    category: 'info',
    description: "Get information about a user.",
    run: async (client, message, args) => {
        let user;

        // Check if a user is mentioned or use message author
        if (!args[0]) {
            user = message.author;
        } else {
            user = message.mentions.users.first() || client.users.cache.get(args[0]);
        }
        
        // Fetch the guild member if available
        let member = message.guild.members.cache.get(user.id);

        // Check if the user is found in the guild
        if (member) {
            let flags = user.flags.toArray().map(flag => {
                switch (flag) {
                    case 'DISCORD_EMPLOYEE': return DISCORD_EMPLOYEE;
                    case 'DISCORD_PARTNER': return DISCORD_PARTNER;
                    case 'BUGHUNTER_LEVEL_1': return BUGHUNTER_LEVEL_1;
                    case 'BUGHUNTER_LEVEL_2': return BUGHUNTER_LEVEL_2;
                    case 'HYPESQUAD_EVENTS': return HYPESQUAD_EVENTS;
                    case 'HOUSE_BRAVERY': return HOUSE_BRAVERY;
                    case 'HOUSE_BRILLIANCE': return HOUSE_BRILLIANCE;
                    case 'HOUSE_BALANCE': return HOUSE_BALANCE;
                    case 'EARLY_SUPPORTER': return EARLY_SUPPORTER;
                    case 'TEAM_USER': return TEAM_USER;
                    case 'SYSTEM': return SYSTEM;
                    case 'VERIFIED_BOT': return VERIFIED_BOT;
                    case 'VERIFIED_DEVELOPER': return VERIFIED_DEVELOPER;
                    case 'ACTIVE_DEVELOPER': return ACTIVE_DEVELOPER;
                    default: return '';
                }
            }).join(' ');

            if (!flags) flags = ' No Badges';

            // Construct the embed
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setAuthor(`${member.user.tag}'s Information`, member.user.displayAvatarURL({ dynamic: true }))
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                .addFields(
                    { name: '__General Information__', value: `**Username**: ${member.user.username}\n**User ID**: ${member.user.id}\n**Nickname**: ${member.nickname || 'None'}\n**Bot?**: ${member.user.bot ? 'Yes' : 'No'}\n**Discord Badges**: ${flags}\n**Account Created**: ${moment(member.user.createdAt).format('llll')}\n**Joined Server**: ${moment(member.joinedAt).format('llll')}` },
                    { name: '__Roles Info__', value: `**Highest Role**: ${member.roles.highest}\n**Roles [${member.roles.cache.size}]:** ${member.roles.cache.size > 0 ? member.roles.cache.sort((a, b) => b.position - a.position).map(role => `<@&${role.id}>`).join(', ') : 'No Roles'}` },
                    { name: '__Key Permissions__', value: `${member.permissions.toArray().sort().join(', ')}` },
                    { name: '__Acknowledgement__', value: `${member.user.id === message.guild.ownerId ? 'Server Owner' : 'Server Member'}` }
                )
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

            message.channel.send({ embeds: [embed] });
        } else {
            // If user not found in the guild
            const embed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(` User not found in this server.`);

            message.channel.send({ embeds: [embed] });
        }
    },
};
