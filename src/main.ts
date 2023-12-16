// 必要なパッケージをインポートする
import { GatewayIntentBits, Client, Partials, Message, ApplicationCommandData } from 'discord.js';
import dotenv from 'dotenv';
import fs from 'fs';

// .envファイルを読み込む
dotenv.config();

// Botで使うGatewayIntents、partials
const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Message, Partials.Channel],
});

const commands: ApplicationCommandData[] = [];

// ビルド後のディレクトリを指定
const buildDir = './commands';

const commandFiles = fs.readdirSync(buildDir).filter((file: string) => file.endsWith('.js'));

for (const file of commandFiles) {
  const commandModule = require(`${buildDir}/${file}`).default;
  commands.push(commandModule.data);
}

// Botがきちんと起動したか確認
client.once('ready', async () => {
  await client.application?.commands.set(commands);
  console.log('Ready!');
  if (client.user) {
    console.log(client.user.tag);
  }
});

// !timeと入力すると現在時刻を返信するように
client.on('messageCreate', async (message: Message) => {
  if (message.author.bot) return;
  if (message.content === '!time') {
    const date1 = new Date();
    message.channel.send(date1.toLocaleString());
  }
});

interface Command {
  data: ApplicationCommandData;
  execute: (interaction: any) => Promise<void>;
  // Add any other properties or methods required for your command
}

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) {
    return;
  }
  const commandModule = require(`${buildDir}/${interaction.commandName}`).default as Command;
  try {
    await commandModule.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: 'There was an error while executing this command!',
      ephemeral: true,
    });
  }
});

// ボット作成時のトークンでDiscordと接続
client.login(process.env.TOKEN);
