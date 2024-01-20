const Discord = require("discord.js");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'linguagem_biblia',
    description: '「 BIBLE DISCORD 」 Configure a linguagem da bíblia.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'language',
            description: 'Qual linguagem deseja colocar? (Ex: nvi)',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        }
    ],
    run: async(client, interaction) => {
        const LanguageSelect = interaction.options.getString("language");
        await db.set(`${interaction.user.id}_LanguageBible`, `${LanguageSelect}`);
        interaction.reply({ content: `📓 | Linguagem da bíblia setada com sucesso para: \`${LanguageSelect}\``, ephemeral: true})
    }
}