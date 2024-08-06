const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { aliases } = require('./slowmode');

module.exports = {
    name: 'support',
    category: 'info',
    aliases: [],
    description: 'Get the invite link to the support server.',
    premium: false,

    run: async (client, message, args) => {
        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('<:_helper:1259137267499401246> **Need Help?** ')
            .setDescription(' **Click the button below to join our support server** ***!*** ')
        
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setLabel('Support Server')
                    .setStyle('LINK')
                    .setURL('https://discord.com/invite/xPS8yUc7qA') 
            );
        
        await message.channel.send({ embeds: [embed], components: [row] });
    }
};
