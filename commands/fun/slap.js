const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'slap',
    aliases: ['thapad'],
    category: 'fun',
    premium: false,
    usage: '$slap <@user>',
    run: async (client, message, args) => {
        // Helper function to send error messages in an embed
        const sendErrorEmbed = (errorMsg) => {
            const errorEmbed = new MessageEmbed()
                .setColor('#000000')
                .setTitle(' **Slap** ')
                .setDescription(errorMsg)
                .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
            message.channel.send({ embeds: [errorEmbed] });
        };

        // Check if a user is mentioned
        if (!message.mentions.users.size) {
            return sendErrorEmbed(' **Please mention a user to slap!** ');
        }

        // Get the mentioned user
        const user = message.mentions.users.first();

        // Prevent users from slapping themselves
        if (user.id === message.author.id) {
            return sendErrorEmbed(' **You cannot slap yourself!** ');
        }

        // Prevent users from slapping the bot
        if (user.id === client.user.id) {
            return sendErrorEmbed(' **You cannot slap the bot!** ');
        }

        // URLs for the slap GIFs (you can replace these with your own GIFs)
        const slapGifs = [
            'https://media.giphy.com/media/Gf3AUz3eBNbTW/giphy.gif',
            'https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif',
            'https://media.giphy.com/media/mEtSQlxqBtWWA/giphy.gif',
            'https://media.giphy.com/media/3XlEk2RxPS1m8/giphy.gif',
            'https://media.discordapp.net/attachments/1259388491662495744/1259390332462694470/Slap_Fight.gif?ex=668b8225&is=668a30a5&hm=fd1e9a6ee0637b0f7874c99372197ba8dfd79c1563b3d1742f04b4397c8ab743&='
        ];

        // Select a random slap GIF
        const slapGif = slapGifs[Math.floor(Math.random() * slapGifs.length)];

        // Create an embed to display the slap action
        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle(`${message.author.username} slaps ${user.username}!`)
            .setImage(slapGif)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));

        // Send the embed to the channel
        message.channel.send({ embeds: [embed] });
    },
};
