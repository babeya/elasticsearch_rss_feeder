'use strict';

// Local dependencies
const AEntity = require('./AEntity');

class RSSItem extends AEntity {

  constructor(id, document = {}) {
    super(id, RSSITEM_ELASTIC_TYPE, POSSIBLE_RSSITEM_FIELD, document);
  }

  static createFromXML(xml) {
    let id = xml.guid[0];

    if (typeof id !== String) {
      id  = id._;
    }

    const result = new RSSItem(id, {});

    result.setDataFromXml(xml);

    return result;
  }

}

const RSSITEM_ELASTIC_TYPE = 'RSSItem';

const POSSIBLE_RSSITEM_FIELD = [
  'title', 'link', 'description', 'author', 'category',
  'comments', 'enclosure', 'source'
];

module.exports = RSSItem;