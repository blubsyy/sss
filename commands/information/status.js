const { MessageEmbed } = require('discord.js');

// Command
module.exports = {
    name: 'status',
    aliases: [],
    category: 'info',
    premium: false,

    run: async (client, message, args) => {
        // Get bot's status
        const status = {
            online: 'Online',
            idle: 'Idle',
            dnd: 'Do Not Disturb',
            offline: 'Offline'
        };

        const clientStatus = status[client.presence.status] || 'Unknown';

        // Get bot's activity
        const activities = client.presence.activities.map(activity => `${activity.type}: ${activity.name}`).join('\n') || 'None';

        // Get bot's device status
        const devices = client.presence.clientStatus || {};
        const deviceIcons = {
            desktop: '<:dekstop:1262743290219069581>',
            mobile: '<:Mobile:1262743377888415755>',
            web: '<a:web:1262743722458611802>'
        };

        // Function to get random device
        const getRandomDeviceStatus = () => {
            const deviceTypes = ['desktop', 'mobile', 'web'];
            const randomDevice = deviceTypes[Math.floor(Math.random() * deviceTypes.length)];
            return `${deviceIcons[randomDevice]} ${randomDevice.charAt(0).toUpperCase() + randomDevice.slice(1)}: Online`;
        };

        const deviceStatus = Object.keys(devices).map(device => `${deviceIcons[device] || ''} ${device.charAt(0).toUpperCase() + device.slice(1)}: ${status[devices[device]]}`)
            .join('\n') || getRandomDeviceStatus();

        // Create embed
        const embed = new MessageEmbed()
            .setColor('#000000') // Black color
            .setTitle(' **tutu. Bot Status** ')
            .addFields(
                { name: '<a:Status:1262743824615211082> **Status** ', value: clientStatus, inline: false },
                { name: '<:yunaActivity:1262743460545298563> **Activity** ', value: activities, inline: false },
                { name: '<:Devices:1262743961185947800> **Device** ', value: deviceStatus, inline: false }
            )
            .setTimestamp();

        // Send the embed
        await message.channel.send({ embeds: [embed] });
    }
};
