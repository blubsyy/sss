const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'boostcount',
    category: 'info',
    aliases: ['bc', 'bcount'],
    premium: false,

    run: async (client, message, args) => {
        
        const boostCount = message.guild.premiumSubscriptionCount || message.guild.premiumTier;

        const embed = new MessageEmbed()
            .setColor('#000000') 
            .setTitle('Boosts')
            .setDescription(`<:bannerstory_Badge_ServerBooster9:1240150920986099792> **${boostCount} Boosts** `)
            .setTimestamp();

        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    }
};