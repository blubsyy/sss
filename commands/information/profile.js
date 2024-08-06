const { MessageEmbed } = require('discord.js');

module.exports = {
    name: 'profile',
    aliases: ['badge', 'badges', 'achievement', 'pr'],
    category: 'info',
    premium: false,
    run: async (client, message, args) => {
        const user =
            message.mentions.users.first() ||
            client.users.cache.get(args[0]) ||
            message.author;

        let badges = '';

        try {
            const guild = await client.guilds.fetch('1257917945334599754');
            const member = await guild.members.fetch(user.id);

            const snoww = user.id === '1025884510748950558'

            if (snoww) {
                badges += `\n<:black_cross:1259379197345009697>・**[snoww.](https://discord.com/users/1092374628556615690)**`;
            }
            const dev = member.roles.cache.has('1257191246946893824');
            if (dev) {
                badges += `\n<:Developer:1257193352789758022>・**Developer**`;
            }

            const own = member.roles.cache.has('1257191218366906368');
            if (own) {
                badges += `\n<:crownn:1255387438768066636>・**Owners**`;
            }

            const han = member.roles.cache.has('1257191782727286795');
            if (han) {
                badges += `\n<:moderatersheild:1257194185887584297>・**Admin**`;
            }

            const manager = member.roles.cache.has('1257191329700642847');
            if (manager) {
                badges += `\n<:discord_employe:1258402699364270133>・**Mod**`;
            }

            const aman = member.roles.cache.has('1257191355151679581');
            if (aman) {
                badges += `\n<:SupportTeam:1259379889438461964>・**Support Team**`;
            }

            const hundi = member.roles.cache.has('1257191535842299915');
            if (hundi) {
                badges += `\n<:LoveBugs_bughunter2:1257924637476524063>・**Bug Hunter**`;
            }

            const supp = member.roles.cache.has('1257191408759078952');
            if (supp) {
                badges += `\n<:early_supportter_badge:1257128190288203837>・**Supporter**`;
            }

            const fr = member.roles.cache.has('1257191451712946257');
            if (fr) {
                badges += `\n<:friends:1259380203457609818>・**Friends**`;
            }
        } catch (err) {
            console.error('Error fetching guild member:', err);
            badges = '`No Badge Available`';
        }

        const pr = new MessageEmbed()
            .setAuthor(
                `Profile For ${user.username}#${user.discriminator}`,
                client.user.displayAvatarURL({ dynamic: true })
            )
            .setThumbnail(user.displayAvatarURL({ dynamic: true }))
            .setColor('BLACK')
            .setTimestamp()
            .setDescription(`**BADGES** <:icons_warning:1259759647716540441>\n${badges}`)
            .setFooter('Requested by ' + message.author.tag, message.author.displayAvatarURL({ dynamic: true }));

        message.channel.send({ embeds: [pr] });
    }
};
