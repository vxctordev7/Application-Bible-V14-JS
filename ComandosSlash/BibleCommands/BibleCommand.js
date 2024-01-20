const Discord = require("discord.js");
const Axios = require("axios");
const { QuickDB } = require("quick.db");
const db = new QuickDB();

module.exports = {
    name: 'consultar_biblia',
    description: '「 BIBLE DISCORD 」 Consulte versículos na bíblia.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'discipulo',
            description: 'Qual discipulo deseja pesquisar?',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'capitulo',
            description: 'Qual capitulo deseja pesquisar?',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true
        },
        {
            name: 'versículo',
            description: 'Qual versículo deseja pesquisar?',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true
        }
        
    ],

    run: async(client, interaction) => {
        const Disciple = interaction.options.getString("discipulo");
        const VersionBible = await db.get(`${interaction.user.id}_LanguageBible`);
        const Chapter = interaction.options.getNumber("capitulo");
        const Versicle = interaction.options.getNumber("versículo");

        const BibleAPI = `https://www.abibliadigital.com.br/api/verses/${VersionBible}/${Disciple}/${Chapter}/${Versicle}`;
        const { data } = await Axios.get(BibleAPI, {
            method: "GET",
        });

        const BibleConsul = new Discord.EmbedBuilder()
        .setTitle(`**${data.book.name} ${Chapter}:${Versicle}**`)
        .setDescription(`\`\`\`ini\n${data.number} ${data.text}\`\`\``)
        interaction.reply({ content: `Consulta enviada com sucesso!\n> Nome: \`${data.book.name} (${data.book.abbrev.pt})\`\n> Autor: \`${data.book.author}\`\n> Grupo: \`${data.book.group}\``, ephemeral: true });
        interaction.channel.send({ content: `${interaction.user}`, embeds: [BibleConsul] })
    }
}

function newFunction() {
    return {
        name: 'versiculo',
        description: 'Qual versículo deseja pesquisar?',
        type: Discord.ApplicationCommandOptionType.Number,
        required: true
    };
}
