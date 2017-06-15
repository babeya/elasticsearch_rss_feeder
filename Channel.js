'use strict';

// Modules dependencies
const request = require('request-promise-native');
const xmlParser = require('xml2js');

// Local dependencies
const AEntity = require('./AEntity');
const RSSItem = require('./RSSItem');
const elasticSearchClient = require('./SElasticsearchClient');

class Channel extends AEntity { // TODO : extends document

  /**
   *
   * @param id
   * @param data
   */
  constructor(id, document = {}) {
    super(id, CHANNEL_ELASTIC_TYPE, POSSIBLE_CHANNEL_FIELD, document);

    /**
     *
     * @type {Array}
     */
    this.items = [];
  }


  update(index) {
    return new Promise((resolve, reject) => {
      request(this.id).then((xml) => {
        // Parse data
        xmlParser.parseString(xml, (err, result) => {
          if (err) {
            console.error(err);
            return reject(err);
          }

          this.setDataFromXml(result.rss.channel[0]);

          this.items = result.rss.channel[0].item.map((xmlItem) => {
            result = RSSItem.createFromXML(xmlItem);

            if (this.document.language) {
              result.document.language = this.document.language;
            }

            return result;
          });

          return this.save(index).then((result) => {
            resolve(result);
          }).catch((error) => {
            console.error(error);
            reject(error);
          });
        });
      });
    });
  }

  saveItems(index) {
      this.items.forEach(function(item) {
        item.save(index);
    });
  }


  static fetch(index, from = 0, size = 10) {
    return elasticSearchClient.instance.search({
      'index' : index,
      'type': FLUX_ELASTIC_TYPE,
      'body' : {
        'from' : from,
        'size' : size,
        'query' : {
          'match_all': {}
        }
      }
    });
  }
}

const CHANNEL_ELASTIC_TYPE = 'Channel';

module.exports = Channel;

const POSSIBLE_CHANNEL_FIELD = [
  'title', 'link', 'description', 'language', 'copyright', 'managingEditor',
  'webmaster', 'category', 'generator', 'cloud',
  'ttl', 'image', 'rating', 'textInput', 'skipHours', 'skipDays'
];
// 'pubDate', 'lastBuildDate'