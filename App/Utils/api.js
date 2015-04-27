var _ = require('lodash');
var Parse = require('parse').Parse;

var api = {
  cache: {},
  suits: ['major', 'cups', 'swords', 'pentacles', 'wands'],
  getAllCards() {
    if (this.cache.length > 0) {
      return this.cache;
    } else {
      var Card = Parse.Object.extend("Card");
      var query = new Parse.Query(Card);
      return query.find().then((cards) => {
        var organizedCards = {};

        var cardArray = cards.map((card) => {
          return card.attributes;
        })

        _.forEach(this.suits, (suit) => {
          organizedCards[suit] = _.filter(cardArray, "suit", suit);
        });

        this.cache = organizedCards;
        return this.cache;
      });
    }
  },
  getCardsBySuit(suit) {
    if (!_.isEmpty(this.cache[suit])) {
      return new Promise((resolve, reject) => {
        resolve(this.cache[suit]);
      });
    } else {
      console.log("AAAAAH!! NO CACHE");
      var Card = Parse.Object.extend("Card");
      var query = new Parse.Query(Card);
      query.equalTo("suit", suit);
      console.log("getting ", suit);
      return query.find().then((cards) => {
        var cardArray = cards.map((card) => {
          return card.attributes;
        });
        return cardArray;
      });
    }
  }
};

module.exports = api;