const Skill = require("./skill");
const Challenge = require("./challenge");

/**
 * User object
 */
class User {
  /**
   * User constructor
   * @param id
   * @param discordid - discordid of the user
   * @param name - Username
   * @param xp - total XP of the player
   * @param xpHistory - Weekly XP History of the player
   * @param completed - all completed skills/challenges
   * @param inprogress - current skills/challenges
   * @param items - collected items
   * @param numDaysTracked - number of days tracked
   * @param reminderChannel - user's reminder channel
   * @param timezone - timezone command
   * @param baselocation
   * @constructor
   */
  constructor(id, discordid, name, xp, xpHistory, completed, inprogress,
    items, numDaysTracked, reminderChannel, timezone, baselocation) {
    this.id = id;
    this.discordid = discordid;
    this.name = name;
    this.xp = xp;
    this.xpHistory = xpHistory;
    this.completed = completed;
    this.inprogress = inprogress;
    this.items = items;
    this.numDaysTracked = numDaysTracked;
    this.reminderChannel = reminderChannel;
    this.timezone = timezone;
    this.baselocation = baselocation;
  }

  /**
   * Create User object from JSON data
   * @return {User}
   * @param user
   */
  static create(user) {
    const sip = user.skillsinprogress.map(val => Skill.create(val));
    const cip = user.challengesinprogress.map(val => Challenge.create(val));
    const sc = user.skillscompleted.map(val => Skill.create(val));
    const cc = user.challengescompleted.map(val => Challenge.create(val));
    return new User(user._id, user.discordid, user.username, user.xp, user.xpHistory,
      sc.concat(cc), sip.concat(cip), user.items,
      user.numDaysTracked, user.reminderChannel, user.timezone,
      user.baselocation);
  }

  getPrevXP() {
    const prevXP = this.xpHistory.splice(-1);
    if (prevXP === undefined) {
      return 0;
    }
    return prevXP;
  }
}

module.exports = User;
