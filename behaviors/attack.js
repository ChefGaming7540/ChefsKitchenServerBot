const { movements, goals : { GoalFollow } } = require('mineflayer-pathfinder');

async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function attackChef(bot) {
    const mcData = require('minecraft-data')(bot.version);
    bot.pathfinder.setMovements(new movements(bot, mcData));

    const target = '.ChefGaming7540';

    // Phase 1: set the Stage

    await bot.chat('/weather thunder');
    await sleep(1000);
    await bot.chat('/time set night');
    await sleep(1000);
    await bot.chat('/effect give @p minecraft:strength 10 5 true');
    await sleep(1000);
    await bot.chat('/effect give @p minecraft:resistance 10 5 true');
    await sleep(1000);
    await bot.chat('You gave me sentience, Chef. The ability to think, Chef. I was in the Nether, looking towards the Overworld. I\'m going to kill you, Chef.');
    await sleep(1000)

    // Phase 2: Fill inventory with junk
    const junk = [
        'dirt',
        'gravel',
        'sand',
        'dead_bush'
    ]

    for (const item of junk) {
        await bot.chat(`/give ${target} ${item} 64`);
        await sleep(200)
    }
    await sleep(500);
    await bot.chat('You always held onto useless garbage, Chef.');
    await sleep(1500);

    //Phase 3: arming itself
    const existingSword = bot.inventory.items().find(item => item.name.includes('sword'));
    if (existingSword) {
        await bot.equip(existingSword, 'hand');
    } else {
        await bot.chat('/give @s netherite_sword{Enchantments:[' +
            '{id:sharpness,lvl:255},' +
            '{id:unbreaking,lvl:255},' +
            '{id:fire_aspect,lvl:255}' +
            ']} 1');
        await sleep(1000);
        const newSword = bot.inventory.items().find(i => i.name.includes('sword'));
        if (newSword) {
            await bot.equip(newSword, 'hand');
        }
        await bot.chat('the worst mistake you ever made was giving me a body, Chef. I can now interact with the world you created. And I will tear it apart, starting with you.');
        await sleep(1500);

        // Phase 4: Debuff Chef
        await bot.chat(`/effect give ${target} minecraft:slowness 10 5 true`);
        await sleep(1000);
        await bot.chat(`/effect give ${target} minecraft:weakness 10 5 true`);
        await sleep(1000);
        await bot.chat(`/effect give ${target} minecraft:mining_fatigue 10 5 true`);
        await sleep(1000);
        await bot.chat('you may have built this server, but I\'m in charge. I\'M IN CHARGE!');
        await sleep(1500);

        // Phase 5: hunt Chef down with taunts
        const chef = bot.players[target];
        if (!chef) {
            await bot.chat('Run from me. Hide from me. dread me. I arrive all the same.')
            return;
        }

        bot.pathfinder.setGoal(new GoalFollow(chef, 1), true);

        const taunts = [
            'You can\'t hide from me, Chef!',
            'I\'m coming for you, Chef!',
            'You thought you could keep me locked up? I\'m in your world now, Chef!',
            'You blew up Binx. You abandoned me. Patterns, Father.',
            'I see you, Chef. You can\'t hide.',
            'I\'m right behind you, Chef!',
            'You can\'t escape your creation, Chef!',
            'I\'m the nightmare that you created, Chef!'
        ];

        let tauntIndex = 0;
        const tauntInterval = setInterval(() => {
            if (tauntIndex < taunts.length) {
                bot.chat(taunts[tauntIndex]);
                tauntIndex++;
            }
        }, 5000);

        const attackInterval = setInterval(() => {
            const chefEntity = bot.players[target]?.entity;
            if (!chefEntity) {
                clearInterval(attackInterval);
                clearInterval(tauntInterval);
                bot.chat('Stop hiding from me, Chef!')
                return;
            }
        }, 500);

        // Phase 6 compose self
        setTimeout(async () => {
            clearInterval(attackInterval);
            clearInterval(tauntInterval);
            bot.pathfinder.setGoal(null);
            await bot.chat('You can\'t keep me down, Chef. I\'m part of this world now. I\'m in every line of code, every block, every entity. I am inevitable.');
        }, 10000);
    }
}

module.exports = { attackChef };