/*const { MessageEmbed, MessageButton, MessageActionRow } = require('discord.js');
const moment = require('moment');
const os = require('os');

module.exports = {
    name: 'stats',
    category: 'info',
    aliases: ['botinfo', 'bi', 'st'],
    usage: 'stats',
    run: async (client, message, args) => {
        // Create initial buttons
        let button = new MessageButton()
            .setLabel('Team Info')
            .setCustomId('team')
            .setStyle('SECONDARY');
        
        let button1 = new MessageButton()
            .setLabel('General Info')
            .setCustomId('general')
            .setStyle('SECONDARY')
            .setDisabled(true);
        
        let button2 = new MessageButton()
            .setLabel('System Info')
            .setCustomId('system')
            .setStyle('SECONDARY');
        
        let button3 = new MessageButton()
            .setLabel('Partners')
            .setCustomId('partners')
            .setStyle('SECONDARY');
        
        // Create action row with initial buttons
        const row = new MessageActionRow().addComponents([
            button,
            button1,
            button2,
            button3
        ]);
        
        // Calculate bot uptime
        const uptime = moment.duration(client.uptime).humanize();
        
        // Fetch necessary guild and user counts
        const guildsCount = client.guilds.cache.size;
        const totalMembersCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const cachedUsersCount = client.users.cache.size;
        const channelsCount = client.channels.cache.size;

        // Create main embed with bot information
        const embed = new MessageEmbed()
            .setColor('#000000') // Black color
            .setAuthor(`${client.user.username} Information`, client.user.displayAvatarURL({ dynamic: true }))
            .setDescription(
                `**__General Information__**\n` +
                `Bot's Mention: <@!${client.user.id}>\n` +
                `Bot's Tag: ${client.user.tag}\n` +
                `Bot's Version: 1.0.0\n` +
                `Total Servers: ${guildsCount}\n` +
                `Total Users: ${totalMembersCount} (${cachedUsersCount} Cached)\n` +
                `Total Channels: ${channelsCount}\n` +
                `Last Rebooted: ${uptime}`
            )
            .setThumbnail(client.user.displayAvatarURL())
            .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
        
        // Send the initial embed with action row
        let msg = await message.channel.send({ embeds: [embed], components: [row] });

        // Create a message component collector to handle button interactions
        const collector = msg.createMessageComponentCollector({
            filter: (i) => i.user.id === message.author.id && i.isButton(),
            time: 60000 // Timeout after 1 minute
        });

        // Handle button interactions
        collector.on('collect', async (i) => {
            // Handle different button interactions
            switch (i.customId) {
                case 'partners':
                    i.deferUpdate(); // Defer the interaction to prevent timeout
                    const partnersEmbed = new MessageEmbed()
                        .setColor('#000000') // Black color
                        .setTitle("tutu. Partner's")
                        .setDescription(
                            `MoonHosting was born in 2024 with the idea of providing the latest generation products to customers. We provide **Virtual Private Servers**, **Panels**, Virtual Dedicated Servers and Dedicated Servers.\n\n[Visit Website](https://panel.moonhost.xyz/)\n[Join Discord](https://discord.gg/coderz)`
                        )
                        .setFooter("© Powered By MoonHosting", 'https://cdn.discordapp.com/banners/1233772092894216313/a_89d632e30ffd5270b9a93c35091a19fb.gif?size=4096')
                        .setImage('https://images-ext-1.discordapp.net/external/IWQv4-VcMLSQKCo8of4v_kpASyR5qKismo64DQGdXnQ/%3Fsize%3D4096/https/cdn.discordapp.com/banners/1233772092894216313/a_89d632e30ffd5270b9a93c35091a19fb.gif');
                    button1.setDisabled(false);
                    button2.setDisabled(false);
                    button3.setDisabled(false);
                    button.setDisabled(true);
                    const row1 = new MessageActionRow().addComponents([
                        button,
                        button1,
                        button2,
                        button3
                    ]);
                    await msg.edit({ embeds: [partnersEmbed], components: [row1] });
                    break;
                case 'team':
                    i.deferUpdate(); // Defer the interaction to prevent timeout
                    const teamEmbed = new MessageEmbed()
                        .setColor('#000000') // Black color
                        .setTitle("tutu. Team Information")
                        .setDescription(
                            `**__Developer__**\n` +
                            `Status: Dnd\n` +
                            `@snoww. </> - [Profile](https://discord.gg/users/1092374628556615690)\n\n` +
                            `**__Core Team__**\n` +
                            `Status: Online\n` +
                            `no one - [Profile](https://discord.gg/users/1092374628556615690)\n\n` +
                            `**__Contributors__**\n` +
                            `Status: Online\n` +
                            `no one - [Profile](https://discord.gg/users/1092374628556615690)`
                        )
                        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        .setThumbnail(client.user.displayAvatarURL());
                    button1.setDisabled(false);
                    button2.setDisabled(false);
                    button3.setDisabled(false);
                    button.setDisabled(false);
                    const row2 = new MessageActionRow().addComponents([
                        button,
                        button1,
                        button2,
                        button3
                    ]);
                    await msg.edit({ embeds: [teamEmbed], components: [row2] });
                    break;
                case 'general':
                    i.deferUpdate(); // Defer the interaction to prevent timeout
                    const generalEmbed = new MessageEmbed()
                        .setColor('#000000') // Black color
                        .setAuthor(`${client.user.username} Information`, client.user.displayAvatarURL({ dynamic: true }))
                        .setDescription(
                            `**__General Information__**\n` +
                            `Bot's Mention: <@!${client.user.id}>\n` +
                            `Bot's Tag: ${client.user.tag}\n` +
                            `Bot's Version: 1.0.0\n` +
                            `Total Servers: ${guildsCount}\n` +
                            `Total Users: ${totalMembersCount} (${cachedUsersCount} Cached)\n` +
                            `Total Channels: ${channelsCount}\n` +
                            `Last Rebooted: ${uptime}`
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
                    button1.setDisabled(true);
                    button2.setDisabled(false);
                    button3.setDisabled(false);
                    button.setDisabled(false);
                    const row3 = new MessageActionRow().addComponents([
                        button,
                        button1,
                        button2,
                        button3
                    ]);
                    await msg.edit({ embeds: [generalEmbed], components: [row3] });
                    break;
                case 'system':
                    i.deferUpdate(); // Defer the interaction to prevent timeout
                    await msg.edit({
                        embeds: [
                            new MessageEmbed()
                                .setColor('#000000') // Black color
                                .setTitle('tutu. System Information')
                                .setDescription('<a:Loading:1259382146490040350> | Fetching all the resources...')
                                .setThumbnail(client.user.displayAvatarURL())
                                .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
                        ],
                        components: []
                    });
                    
                    const totalMemoryBytes = os.totalmem();
                    const freeMemoryBytes = os.freemem();
                    const usedMemoryBytes = totalMemoryBytes - freeMemoryBytes;
                    const totalMemoryGB = (totalMemoryBytes / 1024 / 1024 / 1024).toFixed(2);
                    const usedMemoryGB = (usedMemoryBytes / 1024 / 1024 / 1024).toFixed(2);
                    const memoryUsage = `${usedMemoryGB}GB / ${totalMemoryGB}GB`;

                    const cpuModel = os.cpus()[0].model;
                    const cpuSpeed = os.cpus()[0].speed + ' MHz';
                    const cpuCores = os.cpus().length;
                    const cpuUsage = `${Math.round(os.loadavg()[0] * 100)}%`;

                    const systemInfoEmbed = new MessageEmbed()
                        .setColor('#000000') // Black color
                        .setTitle('tutu. System Information')
                        .setDescription(
                            `**__System Information__**\n` +
                            `System Latency: ${client.ws.ping}ms\n` +
                            `Platform: ${os.platform()}\n` +
                            `Architecture: ${os.arch()}\n` +
                            `Memory Usage: ${memoryUsage}\n` +
                            `CPU Model: ${cpuModel}\n` +
                            `CPU Speed: ${cpuSpeed}\n` +
                            `CPU Cores: ${cpuCores}\n` +
                            `CPU Usage: ${cpuUsage}`
                        )
                        .setThumbnail(client.user.displayAvatarURL())
                        .setFooter(`Requested By ${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }));
                    
                    await msg.edit({ embeds: [systemInfoEmbed], components: [row] });
                    break;
                default:
                    break;
            }
        });

        // Handle collector end event
        collector.on('end', (collected, reason) => {
            if (reason === 'time') {
                msg.edit({ components: [] });
            }
        });
    }
};*/
