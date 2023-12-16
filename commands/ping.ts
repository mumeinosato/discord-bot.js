import { CommandInteraction } from 'discord.js';

const data = {
  name: 'ping',
  description: 'Replies with Pong!',
};

async function execute(interaction: CommandInteraction): Promise<void> {
  await interaction.reply('Pong!');
}

export default { data, execute };
