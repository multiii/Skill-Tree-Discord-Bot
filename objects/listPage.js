const Swipeable = require("./swipeable");
const { emotes, success } = require("../modules/resources.js");

/**
 * ListPage object to display a list of items all at once
 * @implements Swipeable - Can be cycled to display multiple pages
 */
class ListPage extends Swipeable {
  /**
   * Page constructor
   * @constructor
   * @param {string} title - short page title
   * @param {Object[]} list - page content
   * @constructor
   */
  constructor(title, list) {
    super();
    this.title = title;
    this.list = list;
  }

  /**
   * Updates properties of embed with values from this class
   * @returns data - [embed, files]
   */
  async update() {
    const title = this.title;
    let description = "";

    for (const [index, skill] of this.list.entries())
      description += `${emotes.dotE} \`${index}.\` → ${skill.toLine()}\n`;

    const embeds = [success.embed({ title: title, description: description })];
    const files = [];
    return [embeds, files];
  }
}

module.exports = ListPage;
