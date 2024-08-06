const { MessageEmbed } = require('discord.js');
const { aliases, premium } = require('./warn');

module.exports = {
    name: 'purgeemojis',
    aliases: ['pemoji'],
    category: 'mod',
    premium: true,
    description: 'Deletes all emojis (both animated and non-animated) from the server.',

    run: async (client, message, args) => {
        if (!message.member.permissions.has('MANAGE_EMOJIS_AND_STICKERS')) {
            return message.reply('You do not have permission to use this command.');
        }


        const emojis = message.guild.emojis.cache;


        const animatedEmojis = emojis.filter(emoji => emoji.animated);
        const staticEmojis = emojis.filter(emoji => !emoji.animated);


        const deleteEmojis = async (emojiArray) => {
            for (let i = 0; i < emojiArray.length; i++) {
                const emoji = emojiArray[i];
                try {
                    await emoji.delete();

                    await new Promise(resolve => setTimeout(resolve, 10000)); // 10 seconds delay
                } catch (error) {
                    console.error(`Error deleting emoji ${emoji.name}:`, error);
                    message.channel.send(`Error deleting emoji ${emoji.name}.`);
                }
            }
        };


        if (animatedEmojis.size > 0) {
            await deleteEmojis(Array.from(animatedEmojis.values()));
        }


        if (staticEmojis.size > 0) {
            await deleteEmojis(Array.from(staticEmojis.values()));
        }


        const embed = new MessageEmbed()
            .setColor('#000000')
            .setDescription(`Successfully deleted ${emojis.size} emojis from the server.`);
        message.channel.send({ embeds: [embed] }).then(m => m.delete({ timeout: 5000 }));
    }
};
