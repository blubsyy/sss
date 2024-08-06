const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'membercount',
    description: 'Displays the total number of humans and their statuses in the server.',
    category: 'info',
    run: async (client, message, args) => {
        const members = message.guild.members.cache.filter(member => !member.user.bot);
        
        const totalHumans = members.size;
        const onlineHumans = members.filter(member => member.presence?.status === 'online').size;
        const offlineHumans = members.filter(member => !member.presence || member.presence.status === 'offline').size;
        const idleHumans = members.filter(member => member.presence?.status === 'idle').size;
        const dndHumans = members.filter(member => member.presence?.status === 'dnd').size;

        const embed = new MessageEmbed()
            .setColor('#000000')
            .setTitle('Member Count')
            .setDescription('Here is the breakdown of human members and their statuses:')
            .addField('Total Humans', totalHumans.toString(), true)
            .addField('Online', onlineHumans.toString(), true)
            .addField('Offline', offlineHumans.toString(), true)
            .addField('Idle', idleHumans.toString(), true)
            .addField('Do Not Disturb', dndHumans.toString(), true);

        message.channel.send({ embeds: [embed] });
    }
};
