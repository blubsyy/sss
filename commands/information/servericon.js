const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');

module.exports = {
    name: 'serverav',
    aliases: ['serveravatar', 'sav'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        // Check if the user is authorized to interact with buttons
        const filter = (interaction) => interaction.user.id === message.author.id;

        // Initial embed with server avatar
        let embed = new MessageEmbed()
            .setColor('#000000') // Set embed color to black
            .setImage(message.guild.iconURL({ dynamic: true, size: 2048 }))
            .setDescription(
                `[**Server Avatar**](${message.guild.iconURL({
                    dynamic: true,
                    size: 2048,
                    format: 'png'
                })})`
            );

        // Create buttons for server avatar and banner
        const avatarButton = new MessageButton()
            .setLabel('Server Avatar')
            .setStyle('PRIMARY')
            .setCustomId('serveravatar')
            .setEmoji('<:avatar:1261554133668991038>'); // Set emoji for server avatar button

        const bannerButton = new MessageButton()
            .setLabel('Server Banner')
            .setStyle('PRIMARY')
            .setCustomId('serverbanner')
            .setEmoji('<:banner:1261554045210984551>'); // Set emoji for server banner button

        // Create an action row with buttons
        const row = new MessageActionRow().addComponents([avatarButton, bannerButton]);

        // Send the initial embed with buttons
        const msg = await message.channel.send({ embeds: [embed], components: [row] });

        // Create a message component collector to handle button interactions
        const collector = msg.createMessageComponentCollector({ filter, time: 60000 });

        // Handle button interactions
        collector.on('collect', async (interaction) => {
            if (interaction.customId === 'serveravatar') {
                // Update embed to show server avatar
                embed.setImage(message.guild.iconURL({ dynamic: true, size: 2048 }));
                embed.setDescription(
                    `[**Server Avatar**](${message.guild.iconURL({
                        dynamic: true,
                        size: 2048,
                        format: 'png'
                    })})`
                );
                await interaction.update({ embeds: [embed], components: [row] });
            } else if (interaction.customId === 'serverbanner') {
                // Update embed to show server banner if available
                const bannerURL = message.guild.bannerURL({ dynamic: true, size: 2048 });
                if (bannerURL) {
                    embed.setImage(bannerURL);
                    embed.setDescription(
                        `[**Server Banner**](${bannerURL})`
                    );
                    await interaction.update({ embeds: [embed], components: [row] });
                } else {
                    // If no banner is available, update with a message
                    await interaction.update({ content: 'This server does not have a banner.', components: [row] });
                }
            }
        });

        // Handle timeout
        collector.on('end', () => {
            msg.edit({ components: [] }); // Remove components after interaction ends
        });
    }
};
