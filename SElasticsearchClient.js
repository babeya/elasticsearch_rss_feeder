'use strict';

// Modules dependencies
const elasticsearch = require('elasticsearch');
// Locales dependencies
const config = require('./config').elasticsearch;

/**
 * Encapsulation of elasticsearch client.
 * Used as a singleton, to simplify interaction with elasticsearch and avoid duplicate client
 */
class SElasticsearchClient {

    /**
     * @constructor
     * @param host {string} url of the elasticsearch server
     */
    constructor(host) {
        this.host = host;
        this.instance = null;
    }

    /**
     * Initialize connection with elasticsearch
     */
    init() {
        this.instance = new elasticsearch.Client({
            host: this.host,
            log: 'trace' // Todo add it as an option
        });
    }

}

module.exports = new SElasticsearchClient(config.host);