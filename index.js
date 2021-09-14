require('dotenv').config();

// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
  console.log('Ready!');
});
const cheese = async (interaction) => {
  await interaction.reply('Chese.');
};

const onInteraction = async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === 'ping') {
    await interaction.reply('Pong!');
  } else if (commandName === 'server') {
    await interaction.reply('Server info.');
  } else if (commandName === 'cheese') {
    await cheese(interaction);
  } else if (commandName === 'rps') {
    const winningPairs = { Rock: 'Scissors', Scissors: 'Paper', Paper: 'Rock' };

    const choices = ['Rock', 'Paper', 'Scissors'];
    const botChoice = choices[Math.floor(Math.random() * choices.length)];
    const userChoice = interaction.options.getString('choice');

    if (winningPairs[botChoice] === userChoice) {
      await interaction.reply(`I chose **${botChoice.toLowerCase()}**, I win!`);
    } else if (botChoice === userChoice) {
      await interaction.reply(`I chose **${botChoice.toLowerCase()}**, draw!`);
    } else {
      await interaction.reply(`I chose **${botChoice.toLowerCase()}**, you win!`);
    }
  }
};

client.on('interactionCreate', onInteraction);

// Login to Discord with your client's token
client.login(process.env.TOKEN);
