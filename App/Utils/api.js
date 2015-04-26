var Parse = require('parse').Parse;

var api = {
  cache: {},
  getCardsBySuit(suit) {
    var Card = Parse.Object.extend("Card");
    var query = new Parse.Query(Card);
    query.equalTo("suit", suit);
    console.log("getting ", suit);
    return query.find();
  },
  getBio(username){
    username = username.toLowerCase().trim();
    var url = `https://api.github.com/users/${username}`;
    return fetch(url).then((res) => res.json());
  },
};

module.exports = api;