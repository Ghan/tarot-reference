var Parse = require('parse').Parse;

var api = {
  cache: {},
  getCardsBySuit(suit) {
    var Card = Parse.Object.extend("Card");
    var query = new Parse.Query(Card);
    query.equalTo("suit", suit);
    console.log("getting ", suit);
    return query.find();
  }
};

module.exports = api;