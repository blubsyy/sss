const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'kiss',
    aliases: [],
    category: 'fun',
    premium: false,
    usage: '$kiss <@user>',
    run: async (client, message, args) => {
        // Helper function to send error messages in an embed
        const sendErrorEmbed = (errorMsg) => {
            const errorEmbed = new MessageEmbed()
                .setColor('#000000')
                .setTitle(' **Kiss** ')
                .setDescription(errorMsg)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send({ embeds: [errorEmbed] });
        };

        // Check if a user is mentioned
        if (!message.mentions.users.size) {
            return sendErrorEmbed(' **Please mention a user to kiss.**');
        }

        // Get the mentioned user
        const user = message.mentions.users.first();

        // Prevent users from kissing themselves
        if (user.id === message.author.id) {
            return sendErrorEmbed(' **You cannot kiss yourself.** ');
        }

        // Prevent users from kissing the bot
        if (user.id === client.user.id) {
            return sendErrorEmbed(' **You cannot kiss the bot.** ');
        }

        // URLs for the kiss GIFs (you can replace these with your own GIFs)
        const kissGifs = [
            'https://media.giphy.com/media/FqBTvSNjNzeZG/giphy.gif',
            'https://media.giphy.com/media/kU586ictpGb0Q/giphy.gif',
            'https://media.giphy.com/media/12VXIxKaIEarL2/giphy.gif',
            'https://media.giphy.com/media/bGm9FuBCGg4SY/giphy.gif'
        ];

        // Select a random kiss GIF
        const kissGif = kissGifs[Math.floor(Math.random() * kissGifs.length)];

        // Create an embed to display the kiss action
        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(`${message.author.username} kisses ${user.username}!`)
            .setImage(kissGif)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    },
};
