const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { addAlias } = require('module-alias');

module.exports = {
    name: 'about',
    category: 'info',
    aliases: ['info','bio'],
    description: 'Displays sponsor links.',
    premium: false,

    run: async (client, message, args) => {
        const sponsorEmbed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(' **About tutu.** ')
            .setDescription('<:narrow:1240150985326858291> heyy .. !! its **[__tutu__.](https://discord.com/api/oauth2/authorize?client_id=1250413871391309908&permissions=8&scope=bot)** A cutee and cozy multipurpose discord bot made by **[snoww.](https://discord.gg/users/1092374628556615690)** to deliver the user-friendly and best experience in all command options.')
            .setImage('https://github.com/snowded/tutu.DiscordBot/blob/main/TuTu.png?raw=true') 
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

            
        message.channel.send({ embeds: [sponsorEmbed]});
    },
};
