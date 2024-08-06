const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'channelinfo',
    aliases: ['cinfo'],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        // Get the channel mentioned or the channel where the command was used
        const channel = message.mentions.channels.first() || message.channel;

        // Ensure the channel is valid
        if (!channel) {
            return message.channel.send({
                embeds: [
                    new MessageEmbed()
                        .setColor('#000000')
                        .setDescription(`<a:Cross:1265733965180960849> | No valid channel mentioned or found.`)
                ]
            });
        }

        // Gather channel information
        const embed = new MessageEmbed()
            .setTitle(`<:Threads:1265734023808815134> **Information for #${channel.name}** `)
            .setColor('#000000')
            .addField('<:narrow:1240150985326858291> **ID**', channel.id, false)
            .addField('<:narrow:1240150985326858291> **Type**', channel.type, false)
            .addField('<:narrow:1240150985326858291> **Created At**', channel.createdAt.toDateString(), false)
            .addField('<:narrow:1240150985326858291> **Topic**', channel.topic || 'No topic', false)
            .addField('<:narrow:1240150985326858291> **NSFW**', channel.nsfw ? 'Yes' : 'No', false)
            .addField('<:narrow:1240150985326858291> **Position**', channel.position.toString(), false)
            .addField('<:narrow:1240150985326858291> **Category**', channel.parent ? channel.parent.name : 'No category', false)
            .setFooter(`Requested by ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: false }))
            .setTimestamp();

        // Additional information for text channels
        if (channel.isText()) {
            embed.addField('<:narrow:1240150985326858291> **Slowmode**', `${channel.rateLimitPerUser} seconds`, false)
                .addField('<:narrow:1240150985326858291> **Topic**', channel.topic || 'No topic', false);
        }

        // Additional information for voice channels
        if (channel.isVoice()) {
            embed.addField('<:narrow:1240150985326858291> **User Limit', channel.userLimit ? channel.userLimit.toString() : 'No limit** ', false)
                .addField('<:narrow:1240150985326858291> **Bitrate', `${channel.bitrate / 1000} kbps** `, false);
        }

        // Send the embed
        return message.channel.send({ embeds: [embed] });
    }
};
