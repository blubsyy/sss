const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

// Command
module.exports = {
    name: 'invite',
    aliases: ['inv'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        const inviteURL = `https://discord.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`;

        // Create button
        const button = new MessageActionRow().addComponents(
            new MessageButton()
                .setLabel('Invite Me')
                .setStyle('LINK')
                .setURL(inviteURL)
                .setEmoji('<:LinkAdd:1259761069556236318>') 
        );

        // Create embed
        const embed = new MessageEmbed()
            .setColor('#000000') 
            .setTitle(' **Invite tutu. Bot** ')
            .setDescription(' **Click the button below to invite me to your server!** ')
            .setThumbnail(client.displayAvatar({ dynamic: true})) 
            .setFooter({
                text: `Thank you for choosing tutu. Bot`,
                iconURL: `https://cdn.discordapp.com/emojis/1131909990630834217.webp?size=96&quality=lossless`,
    });

        // Send the embed with button
        await message.channel.send({
            embeds: [embed],
            components: [button]
        });
    }
};
