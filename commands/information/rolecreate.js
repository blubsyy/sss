const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'rolecreate',
    category: 'moderation',
    description: 'Create a new role with a random color.',
    usage: '&rolecreate <role name>',
    run: async (client, message, args) => {
        // Check if the user has permission to manage roles
        if (!message.member.permissions.has('MANAGE_ROLES')) {
            const noPermissionEmbed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('<:cross_mark:1267383549623930892> **You must have the `Manage Roles` permission to use this command.** ');

            return message.reply({ embeds: [noPermissionEmbed] });
        }

        // Check if role name is provided
        const roleName = args.join(' ');
        if (!roleName) {
            const usageEmbed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(`<:cross_mark:1267383549623930892> **Usage: ${message.guild.prefix}rolecreate <role name>** `);

            return message.reply({ embeds: [usageEmbed] });
        }

        try {
            // Create the role with a random color
            const role = await message.guild.roles.create({
                name: roleName,
                color: 'RANDOM', // Random color
                reason: `Role created by ${message.author.tag}`
            });

            // Success message with embed
            const successEmbed = new MessageEmbed()
                .setColor('#000000')
                .setDescription(`<:tick:1267383653512773705> **Role **${role.name}** has been created successfully.** `);

            message.channel.send({ embeds: [successEmbed] });
        } catch (error) {
            console.error('Error creating role:', error);

            // Error message with embed
            const errorEmbed = new MessageEmbed()
                .setColor('#000000')
                .setDescription('<:cross_mark:1267383549623930892> **Failed to create the role. Please try again later.** ');

            message.reply({ embeds: [errorEmbed] });
        }
    },
};
