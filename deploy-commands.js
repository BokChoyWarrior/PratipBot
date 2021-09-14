const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

require('dotenv').config();

const clientId = process.env.CLIENT_ID;
const guildId = process.env.GUILD_ID;
const token = process.env.TOKEN;

const commands = [
  new SlashCommandBuilder().setName('ping').setDescription('Replies with pong!'),
  new SlashCommandBuilder().setName('server').setDescription('Replies with server info!'),
  new SlashCommandBuilder().setName('cheese').setDescription('🧀'),
  new SlashCommandBuilder()
    .setName('rps')
    .setDescription('Rock, paper, scissors!')
    .addStringOption((option) => option.setName('choice')
      .setDescription('Choose your item')
      .setRequired(true)
      .addChoice('Rock', 'Rock')
      .addChoice('Paper', 'Paper')
      .addChoice('Scissors', 'Scissors')),
]
  .map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

(async () => {
  try {
    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );

    console.log('Successfully registered application commands.');
  } catch (error) {
    console.error(error);
  }
})();
