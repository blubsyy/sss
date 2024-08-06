const { MessageEmbed } = require('discord.js');
const moment = require('moment');

// Create a cooldown collection to manage command cooldowns
const cooldowns = new Map();

module.exports = {
    name: 'uptime',
    description: 'Displays how long the bot has been online since last restart.',
    category: 'info',
    aliases: ['up'],
    cooldown: 2, // Cooldown in seconds
    run: async (client, message, args) => {
        // Check if the user is on cooldown for this command
        if (cooldowns.has(message.author.id)) {
            const cooldownEmbed = new MessageEmbed()
                .setColor('#000000') // Black color
                .setTitle('<:8045slowmode:1259134332300427295> **Bot Command Cooldown** ')
                .setDescription(`<:stolen_emoji:1260133505959071806> **Please wait ${cooldowns.get(message.author.id)} more second(s) before reusing the \`${module.exports.name}\` command.** `)
                .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            
            return message.channel.send({ embeds: [cooldownEmbed] });
        }

        // Calculate bot uptime
        const uptime = moment.duration(client.uptime).humanize();

        // Create and send the embed message
        const embed = new MessageEmbed()
            .setColor('#000000') // Black color
            .setTitle('<:stolen_emoji:1260133505959071806> **Bot Uptime** ')
            .setDescription(`<:uptimee:1263120634427342869> **The bot has been online for ${uptime}.** `)
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [embed] });

        // Add user to cooldown
        cooldowns.set(message.author.id, module.exports.cooldown);
        setTimeout(() => cooldowns.delete(message.author.id), module.exports.cooldown * 1000);
    },
};
