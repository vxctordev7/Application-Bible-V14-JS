const { ApplicationCommandType } = require("discord.js")
module.exports = {
  name: "latência",
  description: "「 BIBLE DISCORD 」 Veja a latência da minha hospedagem.",
  type: ApplicationCommandType.ChatInput,
  run: async (client, interaction) => {
    const ping = client.ws.ping;
    interaction.reply(`🌐 | Minha latência está em: \`${ping}ms\``)
  }
}