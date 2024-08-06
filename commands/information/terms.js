const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const { category, aliases, premium } = require("./profile");

module.exports = {
  name: "botterms",
  category: 'info',
  aliases: ['bterms'],
  premium: false,

  run: async (client, message, args) => {
    const embeds = [
      {
        title: `Terms and Conditions for ${client.user.username}`,
        description: `Effective Date: \`July 19, 2024.\`\n\nWelcome to ${client.user.username} ("the Bot"). These Terms and Conditions ("Terms") govern your use of the Bot and the services provided by the Bot. By using the Bot, you agree to be bound by these Terms. If you do not agree to these Terms, do not use the Bot.`,
      },
      {
        title: `Terms and Conditions for ${client.user.username}`,
        description: `Subject to these Terms, we grant you a non-exclusive, revocable, non-transferable license to use the Bot for personal, non-commercial purposes. You may not use the Bot for any illegal or unauthorized purpose, nor may you, in the use of the Bot, violate any laws in your jurisdiction.`,
      },
      // Add more pages as needed...
    ];

    const totalPages = embeds.length;
    let currentPage = 0;

    const pag = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("first")
        .setLabel("≪")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("previous")
        .setLabel("Back")
        .setDisabled(true),
      new MessageButton()
        .setStyle("DANGER")
        .setCustomId("close")
        .setLabel("Close"),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("next")
        .setLabel("Next"),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("last")
        .setLabel("≫")
        .setDisabled(false)
    );

    const disabledPag = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("first")
        .setLabel("≪")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("previous")
        .setLabel("Back")
        .setDisabled(true),
      new MessageButton()
        .setStyle("DANGER")
        .setCustomId("close")
        .setLabel("Close")
        .setDisabled(true),
      new MessageButton()
        .setStyle("SUCCESS")
        .setCustomId("next")
        .setLabel("Next")
        .setDisabled(true),
      new MessageButton()
        .setStyle("PRIMARY")
        .setCustomId("last")
        .setLabel("≫")
        .setDisabled(true)
    );

    const generateEmbed = () => {
      const { title, description } = embeds[currentPage];
      return new MessageEmbed()
        .setColor(client.color)
        .setAuthor(title, client.user.displayAvatarURL())
        .setDescription(description)
        .setFooter(`${client.user.username} • Page ${currentPage + 1}/${totalPages}`, client.user.displayAvatarURL());
    };

    const sendMessage = async () => {
      const embed = generateEmbed();
      const messageComponent = await message.channel.send({ embeds: [embed], components: [pag] });
      return messageComponent;
    };

    const messageComponent = await sendMessage();

    const collector = messageComponent.createMessageComponentCollector({
      filter: (interaction) => interaction.user.id === message.author.id,
      time: 200000,
      idle: 300000 / 2,
    });

    collector.on("collect", async (interaction) => {
      if (interaction.isButton()) {
        if (interaction.customId === "next") {
          if (currentPage < totalPages - 1) {
            currentPage++;
          }
        } else if (interaction.customId === "previous") {
          if (currentPage > 0) {
            currentPage--;
          }
        } else if (interaction.customId === "first") {
          currentPage = 0;
        } else if (interaction.customId === "last") {
          currentPage = totalPages - 1;
        } else if (interaction.customId === "close") {
          messageComponent.edit({ components: [disabledPag] });
          collector.stop();
          return;
        }

        const updatedEmbed = generateEmbed();

        const firstButton = pag.components.find((component) => component.customId === "first");
        const backButton = pag.components.find((component) => component.customId === "previous");
        const nextButton = pag.components.find((component) => component.customId === "next");
        const lastButton = pag.components.find((component) => component.customId === "last");

        firstButton.setDisabled(currentPage === 0);
        backButton.setDisabled(currentPage === 0);
        nextButton.setDisabled(currentPage === totalPages - 1);
        lastButton.setDisabled(currentPage === totalPages - 1);

        interaction.update({ embeds: [updatedEmbed], components: [pag] });
      }
    });

    collector.on("end", async () => {
      messageComponent.edit({ components: [disabledPag] });
    });
  },
};
