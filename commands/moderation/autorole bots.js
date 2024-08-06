const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'autorolebots',
    description: 'Assign auto roles to bots.',
    category: 'mod',
    usage: '$autorolebots <role_name>',
    run: async (client, message, args) => {
        // Check if the message author has the permission to manage roles
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            return message.reply('You do not have permission to use this command.');
        }

        // Check if a role name is provided
        const roleName = args.join(' ');
        if (!roleName) {
            return message.reply('Please provide a role name.');
        }

        // Fetch the role from the guild
        const role = message.guild.roles.cache.find(role => role.name === roleName);
        if (!role) {
            return message.reply('Role not found. Please check the role name.');
        }

        // Filter out bot users
        const bots = message.guild.members.cache.filter(member => member.user.bot);

        // Assign the role to each bot
        bots.forEach(bot => {
            bot.roles.add(role).catch(error => {
                console.error(`Failed to add role to bot ${bot.user.tag}: ${error}`);
            });
        });

        // Confirmation message
        const embed = new MessageEmbed()
            .setColor('#00FF00')
            .setTitle('Auto Role Assignment Complete')
            .setDescription(`Assigned role \`${roleName}\` to all bots in the server.`)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        message.channel.send({ embeds: [embed] });
    },
};
