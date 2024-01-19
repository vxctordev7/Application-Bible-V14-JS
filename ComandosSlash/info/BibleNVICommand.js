const Discord = require("discord.js");
const Axios = require("axios");

module.exports = {
    name: 'consultar_biblia',
    description: '「 BIBLE DISCORD 」 Consulte versículos na bíblia.',
    type: Discord.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'versao_biblia',
            description: 'Qual versão da biblia deseja consultar?',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'discipulo',
            description: 'Qual discipulo deseja pesquisar?',
            type: Discord.ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: 'capitulo',
            description: 'Qual capitulo deseja pesquisar:',
            type: Discord.ApplicationCommandOptionType.Number,
            required: true
        }
    ],

    run: async(client, interaction) => {
        const Disciple = interaction.options.getString("discipulo");
        const VersionBible = interaction.options.getString("versao_biblia");
        const Chapter = interaction.options.getNumber("capitulo");

        const BibleAPI = `https://www.abibliadigital.com.br/api/verses/${VersionBible}/${Disciple}/${Chapter}`;
        const { data } = await Axios.get(BibleAPI, {
            method: "GET",
        });

        const Vers = data.verses;
        let VersMap = Vers.map((vers) => `${vers.number}. ${vers.text}`).join(`\n`)
        const BibleConsul = new Discord.EmbedBuilder()
        .setTitle(`**${data.book.name} | ${data.chapter.verses}**`)
        .setDescription(`\`\`\`ini\n${VersMap}\`\`\``)
        interaction.reply({ content: `Consulta enviada com sucesso!\n> Nome: \`${data.book.name} (${data.book.abbrev.pt})\`\n> Autor: \`${data.book.author}\`\n> Grupo: \`${data.book.group}\``, ephemeral: true });
        interaction.channel.send({ content: `${interaction.user}`, embeds: [BibleConsul] })
    }
}