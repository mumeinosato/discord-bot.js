//必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, Message, ActivityType  } from 'discord.js'
import dotenv from 'dotenv'
import {setcmd} from './register_cmd'
import { cmd } from './commands/list'
const fs = require('fs');

//.envファイルを読み込む
dotenv.config()

//Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
})


//Botがきちんと起動したか確認
client.once('ready', async () => {
  await setcmd();
  client.user?.setActivity(`テストバージョン | 導入サーバー数: ${client.guilds.cache.size} | ユーザー数: ${client.users.cache.size}`, {type: ActivityType.Playing})
  console.log('Ready!')
  if(client.user){
    console.log(client.user.tag)
  }
})

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isCommand()) {
      return;
  }
  const [type, obj] = await cmd(interaction.commandName, client);
  if(type === "embed"){
    interaction.reply({ embeds: [obj.embed] });
  }  
});

//ボット作成時のトークンでDiscordと接続
client.login(process.env.TOKEN)
