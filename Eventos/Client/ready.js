const client = require("../../index");
const CatLoggr = require('cat-loggr');
const lg = new CatLoggr();

client.on("ready", () =>{
  lg.init(`[ BIBLE SYSTEM ] Successfully connected to Discord!`);
  lg.info(`[ BIBLE SYSTEM ] Project started on 01/18/2024`);
  lg.info(`[ BIBLE SYSTEM ] Developed by: uprince7!`);
  lg.info(`[ BIBLE STSTEM ] System successfully logged in to: ${client.user.username} (${client.user.id})`);
})