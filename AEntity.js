'use strict';

// Local dependencies
const elasticSearchClient = require('./SElasticsearchClient');

module.exports = class AEntity {

  constructor(id, type, scheme, document = {}) {
    /**
     *
     */
    this.id = id;


    /**
     *
     */
    this.type = type;

    /**
     *
     * @type {{}}
     */
    this.document = document;

    /**
     *
     */
    this.xmlScheme = scheme;
  }

  /**
   * TODO
   * @param index
   * @returns {Promise.<TResult>}
   */
  get(index) {
    return elasticSearchClient.instance.search({
      'index' : index,
      'body' : {
        'query' : {
          'ids': {
            'type': this.type,
            'values' : [this.id]
          }
        }
      }
    })
    .then((result) => { // TODO : add type elasticsearch response in documentation
      if (!result.hits.hits.length) {
        return null;
      }
      else {
        return result.hits.hits[0];
      }
    });
  }

  save(index) {
    return new Promise((resolve, reject) => {
      this.get(index).then((result) => {
        if (!result) { // New element
          elasticSearchClient.instance.create({
            index: index,
            type: this.type,
            id: this.id,
            body: this.document
          })
          .then((result) => {
            resolve(result);
          }).catch((err) => {
            console.error(err);
            reject(err);
          }); // TODO : catch
        }
        else { // Update element
          elasticSearchClient.instance.update({
            index: index,
            type: this.type,
            id: this.id,
            body: {
              doc: this.document
            }
          })
          .then((result) => {
            resolve(result);
          })
          .catch((err) => {
            reject(err);
          });
        }
      });
    });
  }

  /**
   * TODO : externalize in an other object
   * @param xml
   */
  setDataFromXml(xml) {
    for (let field in xml) {
      if (this.xmlScheme.indexOf(field) != -1) {
        this.document[field] = xml[field][0];
      }
    }
  }
}


