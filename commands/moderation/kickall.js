const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kickall',
    category: 'moderation', // Adjust category as needed
    aliases: ['kall'],
    description: 'Kicks all members from the server.',
    premium: false,
    
    run: async (client, message, args) => {
        // Check if the user has permission to kick members
        if (!message.member.permissions.has('KICK_MEMBERS')) {
            const embedError = new MessageEmbed()
                .setColor('#000000') // Black color
                .setTitle('<:icons_kicking:1263857251299364916> **Kick All Command**')
                .setDescription('<a:stolen_emoji:1262020623111159839> **You do not have permission to use this command.**')
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));

            return message.reply({ embeds: [embedError] });
        }

        // Fetch all members in the server
        const members = await message.guild.members.fetch();

        // Array to store promises of member kicks
        const kickPromises = [];

        // Kick each member (except the bot itself and the command issuer)
        members.forEach(member => {
            if (member.user.bot || member.user.id === message.author.id) return;

            kickPromises.push(member.kick('Kickall command used by ' + message.author.tag));
        });

        // Execute all kick promises
        try {
            await Promise.all(kickPromises);

            // Send a confirmation message
            const embed = new MessageEmbed()
                .setColor('#000000') // Black color
                .setTitle('<:icons_kicking:1263857251299364916> **Kick All Command**')
                .setDescription('<a:stolen_emoji:1262020561962405930> **Successfully kicked all members from the server.**')
                .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }));

            message.channel.send({ embeds: [embed] });
        } catch (error) {
            console.error('Failed to kick members:', error);
            message.reply('Failed to kick members. Please try again later.');
        }
    },
};
