var Parse = require('parse').Parse;
var React = require('react-native');
var ParseReact = require('parse-react');
var api = require('../Utils/api');

var CardInfo = require('./CardInfo');

var {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} = React;

var styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 30,
    marginTop: 65,
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#48BBEC'
  },
  title: {
    marginBottom: 20,
    fontSize: 25,
    textAlign: 'center',
    color: '#fff'
  },
  searchInput: {
    height: 50,
    padding: 4,
    marginRight: 5,
    fontSize: 23,
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 8,
    color: 'white'
  },
  buttonText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  button: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    marginTop: 10,
    alignSelf: 'stretch',
    justifyContent: 'center'
  }
});

var Main2 = React.createClass({

  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
      cards: (new Parse.Query('Card')).ascending('createdAt')
    };

  },

  render: function() {
    var self = this,
        showErr = "YES";

    return (
      <View style={styles.mainContainer}>
        {this.data.cards.map(function(i) {
          return (
            <Text>{i.full_name}</Text>
          );
        })}
      </View>
    )
  }
});


module.exports = Main2;
