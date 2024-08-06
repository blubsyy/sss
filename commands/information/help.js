const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: 'help',
    aliases: ['h'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        let prefix = message.guild?.prefix;

        // Create a MessageSelectMenu
        const selectMenu = new MessageSelectMenu()
            .setCustomId('categorySelect')
            .setPlaceholder('Commands')
            .addOptions([
                {
                    label: 'Moderation',
                    value: 'mod',
                    emoji: '<:moderator:1267738499587768400>' ,
                },
                {
                    label: 'Utility',
                    value: 'info',
                    emoji: '<:leaf:1267381326751731722>',
                },
                {
                    label: 'Welcomer',
                    value: 'welcomer',
                    emoji: '<:chat:1267382231542927422>',
                },
                {
                    label: 'Automod',
                    value: 'automod',
                    emoji: '<:shield:1267738979545911358>',
                },
                {
                    label: 'Custom Role',
                    value: 'customrole',
                    emoji: '<:star:1267741578378743863>',
                },
                {
                    label: 'Logging',
                    value: 'logging',
                    emoji: '<:star:1267741578378743863>',
                },
                {
                    label: 'Fun',
                    value: 'fun',
                    emoji: '<:warn:1267383282111086612>',
                },
                {
                    label: 'Social',
                    value: 'social',
                    emoji: '<:leaf:1267738126756085791>',
                },
            ]);

        const row1 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('mod')
                .setLabel('Moderation')
                .setStyle('SECONDARY')
                .setEmoji('1245602859458756649'),
            new MessageButton()
                .setCustomId('info')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1245602736813248522'),
            new MessageButton()
                .setCustomId('welcomer')
                .setLabel('Welcomer')
                .setStyle('SECONDARY')
                .setEmoji('1245605497462325298'),
        );

        const row2 = new MessageActionRow().addComponents(
            new MessageButton()
                .setCustomId('automod')
                .setLabel('Automod')
                .setStyle('SECONDARY')
                .setEmoji('1245603108298424381'),
            new MessageButton()
                .setCustomId('customrole')
                .setLabel('Custom Role')
                .setStyle('SECONDARY')
                .setEmoji('1245603173973102602'),
            new MessageButton()
                .setCustomId('logging')
                .setLabel('Logging')
                .setStyle('SECONDARY')
                .setEmoji('1245606546759618622'),
            new MessageButton()
                .setCustomId('fun')
                .setLabel('Fun')
                .setStyle('SECONDARY')
                .setEmoji('1245606546759618622'),
            new MessageButton()
                .setCustomId('utility')
                .setLabel('Utility')
                .setStyle('SECONDARY')
                .setEmoji('1263031662137311384'),
            new MessageButton()
                .setCustomId('social')
                .setLabel('Social')
                .setStyle('SECONDARY')
                .setEmoji('1265734031102840964'),
        );

        const embed = new MessageEmbed()
            .setColor(client.color)
            .setDescription(
                "> ## <:moon:1267382369573273697> **`Help  Panel`**"
            )
            .setImage("https://cdn.discordapp.com/banners/1025884510748950558/676e40e27fef64f78b71a702f1c512f1.png?size=512")
            .addField(
                ' ',
                `
                > <:moderator:1267381587566395473> **・** **Moderation**\n > <:leaf:1267381326751731722> **・** **Utility**\n > <:chat:1267382231542927422> **・** **Welcomer**\n > <:shield_1:1267381821750907003> **・** **Automod**\n > <:badge:1267382873069977632> **・** **Custom Role**\n > <:documents:1267382293589397567> **・** **Logging**\n > <:rocket:1267382440033259521> **・** **Fun**
                `,
                true 
         
            );

        const helpMessage = await message.channel.send({ embeds: [embed], components: [new MessageActionRow().addComponents(selectMenu)] });

        const collector = helpMessage.createMessageComponentCollector({
            filter: (i) => i.user && (i.isButton() || i.isSelectMenu()),
        });

        collector.on('collect', async (i) => {
            if (i.isButton()) {
                const category = i.customId;
                let commands = [];
                switch (category) {
                    case 'mod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'mod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'info':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'info')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'welcomer':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'welcomer')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'automod':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'automod')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'customrole':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'customrole')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'logging':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'logging')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'fun':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'fun')
                            .map((x) => `\`${x.name}\``);
                        break; 
                    case 'utility':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'utility')
                            .map((x) => `\`${x.name}\``);
                        break;
                    case 'social':
                        commands = client.commands
                            .filter((x) => x.category && x.category === 'social')
                            .map((x) => `\`${x.name}\``);
                        break;
                }
                const categoryEmbed = new MessageEmbed()
                    .setColor(client.color)
                    .setAuthor({
                        name: client.user.username,
                        iconURL: client.user.displayAvatarURL()
                    })
                    .setThumbnail(i.guild.iconURL({ dynamic: true }))
                    .setDescription(`**${i.customId.charAt(0).toUpperCase() + i.customId.slice(1)} Commands**\n${commands.join(', ')}`);
                i.reply({ embeds: [categoryEmbed], ephemeral: true });
            } else if (i.isSelectMenu()) {
                const category = i.values[0];
                let commands = [];
                if (category === 'all') {
                    commands = client.commands
                        .map((x) => `\`${x.name}\``);
                    const allCommandsEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setDescription(`**All Commands**\n${commands.join(', ')}`);
                    helpMessage.edit({ embeds: [allCommandsEmbed], components: [] });
                } else {
                    switch (category) {
                        case 'mod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'mod')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'info':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'info')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'welcomer':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'welcomer')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'automod':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'automod')
                                .map((x) => `\`${x.name}\``);
                            break;   
                        case 'customrole':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'customrole')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'logging':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'logging')
                                .map((x) => `\`${x.name}\``);
                            break;  
                        case 'fun':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'fun')
                                .map((x) => `\`${x.name}\``);
                            break;    
                        case 'utility':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'utility')
                                .map((x) => `\`${x.name}\``);
                            break;
                        case 'social':
                            commands = client.commands
                                .filter((x) => x.category && x.category === 'social')
                                .map((x) => `\`${x.name}\``);
                            break;
                    }
                    const categoryEmbed = new MessageEmbed()
                        .setColor(client.color)
                        .setAuthor({
                            name: client.user.username,
                            iconURL: client.user.displayAvatarURL()
                        })
                        .setThumbnail(i.guild.iconURL({ dynamic: true }))
                        .setDescription(`**${category.charAt(0).toUpperCase() + category.slice(1)} Commands**\n${commands.join(', ')}`);
                    i.reply({ embeds: [categoryEmbed], ephemeral: true });
                }
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                helpMessage.edit({ components: [] });
            }
        });
    }
};
