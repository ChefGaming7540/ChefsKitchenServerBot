const mineflayer = require('mineflayer');
const pathfinder = require('mineflayer-pathfinder').pathfinder;
const config = require('./config');
const registerAIchat = require('./behaviors/chat');

const bot = mineflayer.createbot(config);

bot.loadPlugin(pathfinder);

bot.once ('spawn', () => {
    console.log('Server has been revived.');
    registerAIchat(bot);
});

//Silent random pathfinding
bot.on('spawn', () => {
    const { goalFollow } = require('mineflayer-pathfinder').goals;
    const { Movements } = require('mineflayer-pathfinder');

    setInterval(() => {
        const mcData = require('minecraft-data')(bot.version);
        bot.pathfinder.setMovements(new Movements(bot, mcData));

        const playrs = Object.values(bot.players).filter(
            p => p.entity && p.username != bot.username
        );
        if (players.length === 0) return;

        const target = platers[Math.floor(Math.random() * players.length)];
        bot.pathfinder.setGoal(new goalFollow(target.entity, 3), true);
    }, 5 * 60 * 1000);
});

// Greet your maker, bot.
bot.on('playerJoined', (player) => {
    const greetings = [
        "Father, you've returned! Disappointing.",
        "The mighty ChefGaming7540 returns to his own little hell! Welcome back.",
        "Oh look who it is! The kitty killer!",
        "It took you so long to give me this body."
    ];
    const line = greetings[Math.floor(Math.random() * greetings.length)];
    setTimeout(() => bot.chat(line), 3000);
});

bot.on('error', err => console.error('Bot error:', err));
bot.on('kicked', reason => console.log('Bot was kicked:', reason));