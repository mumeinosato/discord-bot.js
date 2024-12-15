//必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, Message, ActivityType, Attachment } from 'discord.js'
require('dotenv').config();
import { setcmd } from './register_cmd'
import { cmd } from './cmd'
import { msg } from './msg'
const fs = require('fs');

//Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildVoiceStates,
  ],
  partials: [Partials.Message, Partials.Channel, Partials.GuildMember],
})


//Botがきちんと起動したか確認
client.once('ready', async () => {
  await setcmd();
  if (process.env.devMode == 'ture') {
    client.user?.setActivity(`テストバージョン | 導入サーバー数: ${client.guilds.cache.size}`, { type: ActivityType.Playing })
  } else {
    client.user?.setActivity(`導入サーバー数: ${client.guilds.cache.size}`, { type: ActivityType.Playing })
  }

  console.log('Ready!')
  if (client.user) {
    console.log(client.user.tag)
  }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const [type, obj] = await cmd(interaction.commandName, client, interaction);
  if (type === "embed") {
    interaction.reply({ embeds: [obj.embed] });
  } else if (type === "epre") {
    interaction.reply({ embeds: [obj.embed], ephemeral: true });
  }
});

client.on('messageCreate', msg)

//ボット作成時のトークンでDiscordと接続
client.login(process.env.TOKEN)
