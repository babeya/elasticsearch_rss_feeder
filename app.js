'use strict';

// TODO : remove from here
const FElasticsearchClient = require('./SElasticsearchClient');
const Channel = require('./Channel');

// init elasticsearch client for further use
FElasticsearchClient.init();

/*Channel.fetch('rss').then(function (result) {
    console.log(result);
});*/

let testChannel = new Channel('https://business.lesechos.fr/rss/dn.xml');
let testChannel2 = new Channel('http://feeds.feedburner.com/TechCrunch/');
let testChannel3 = new Channel('http://www.maddyness.com/feed/');


testChannel.update('rss').then(function (result) {
  testChannel.saveItems('rss');
}).catch(function(error) {
  console.error(error);
});

testChannel2.update('rss').then(function (result) {
  testChannel2.saveItems('rss');
});


testChannel3.update('rss').then(function (result) {
  testChannel3.saveItems('rss');
});
/*testChannel.save('rss').then(function (result) {
    console.log(result);
});*/


//testChannel.update();

/*
const request = require('request-promise-native');
const xmlParser = require('xml2js');
const req = request('https://business.lesechos.fr/rss/dn.xml').then(function(result) {
    xmlParser.parseString(result, function (err, result) {
    });
});

const fakeFlux = [{
    'index':'rss',
    'type':'flux',
    'id':'https://business.lesechos.fr/rss/entrepreneur.xml',
    'body': {
        'description':"Entrepreneurs"
    },
}];

function initFlux() {
    client.indices.exists({'index':'flux'}).then(function (result) {
        if (!result) {
            client.indices.create({'index': 'flux'}).then(function (result) {
                console.log(result);
            })
        }
        else {
            for (let key in fakeFlux) {
                client.create(fakeFlux[key]).then(function (result) {
                    console.log(result);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }
    });
}



/*
client.ping({
    // Verify if cluster is live
    requestTimeout: 3000
}, function (error) {
    if (error) {
        console.trace('elasticsearch cluster is down!');
    } else {
        console.log('All is well');
    }
});

client.search({
    'index':'rss',
    'body' : {
        "query": {
            "match_all": {}
        }
    }
}).then(function (result) {
    console.log(result);
});



const fakeRss = [{
    'index' : 'rss',
    'type' : 'item',
    'id' : 'http://business.lesechos.fr/entrepreneurs/ressources-humaines/030382294098-compte-penibilite-vers-un-recalibrage-de-certains-criteres-310602.php#xtor=RSS-122',
    'body' :  {
        'title' : 'Compte pénibilité : vers un recalibrage de certains critères',
        'link' : 'http://business.lesechos.fr/entrepreneurs/ressources-humaines/030382294098-compte-penibilite-vers-un-recalibrage-de-certains-criteres-310602.php#xtor=RSS-122',
        'category' : 'Entrepreneurs',
        'pubDate' : new Date("Wed, 14 Jun 2017 15:00:00 +0200"),
        'description' : "Pour Pierre Gattaz, l'annonce du gouvernement sur la simplification du compte pénibilité ne suffit pas. « Reculer le mur ne le détruit pas pour autant », déclare le président du Medef qui souhaite une suppression de l'acquisition de points par les salariés."
    }
}];

function initRss() {
    client.indices.exists({'index':'rss'}).then(function (result) {
        if (!result) {
            client.indices.create({'index':'rss'}).then(function (result) {
                console.log(result);
            })
        }
        else {
            for (let key in fakeRss) {
                client.create(fakeRss[key]).then(function (result) {
                    console.log(result);
                }).catch(function (error) {
                    console.error(error);
                });
            }
        }

    });
}*/