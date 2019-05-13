const Config = require('../../utils/Config');
const PlayerManager = require('../../classes/PlayerManager');

/**
 * Allow an admin to give an item to somebody
 * @param message - The message that caused the function to be called. Used to retrieve the author of the message.
 */
const giveBadgeCommand = async function (message, args) {
    if (userIsNotTheOwnerOfTheBotOrABadgeManager(message)) { // the author of the command is not the owner of the bot
        return console.log(message.author.username + " tried to use an admin command");
    } else { // the author of the command is the author of the bot
        let playerManager = new PlayerManager();
        let playerId = args[2]
        playerId = playerId.substring(2,playerId.length-1)
        let player = await playerManager.getPlayerById(playerId);
        player.badges = player.badges + args[1];
        playerManager.updatePlayer(player);
        message.channel.send(":white_check_mark: Le joueur " +args[2] + " a recu le badge : " + args[1]);
    }
};

/**
 * Test if the person who sent the message is the owner of the bot.
 * @returns {boolean} - A boolean containing false if the user is the owner.
 * @param message - The message that caused the function to be called. Used to retrieve the author of the message.
 */
function userIsNotTheOwnerOfTheBotOrABadgeManager(message) {
    return message.author.id != Config.BOT_OWNER_ID && !Config.BADGE_MANAGER_ID.includes(message.author.id) ;
}



module.exports.GiveBadgeCommand = giveBadgeCommand;


