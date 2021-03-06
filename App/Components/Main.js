var Parse = require('parse').Parse;
var React = require('react-native');
var ParseReact = require('parse-react');
var api = require('../Utils/api');

var SuitList = require('./SuitList');

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
    backgroundColor: '#333'
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

class Main extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      error: false,
    }
  }

  componentDidMount() {
    var self = this;

    self.setState({
      isLoading: true
    });

    api.getAllCards().then((success) => {
      if (success) {
        self.setState({
          isLoading: false
        });
      }
    });
  }

  handleChange(event) {
    this.setState({
      card: event.nativeEvent.text
    });
  }

  handleSubmit(suit) {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    // fetch data from external source
    api.getCardsBySuit(suit)
      .then((res) => {
        if (res.message === 'Not Found') {
          this.setState({
            error: "Suit not found",
            isLoading: "false"
          });
        } else {
          var formattedSuit = suit.charAt(0).toUpperCase() + 
                              suit.slice(1);
          
          this.props.navigator.push({
            title: formattedSuit || "Suit",
            component: SuitList,
            passProps: {data: res}
          });

          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
       });
    // reroute to the next passing the card name
  }

  render() {
    var showErr = (
      this.state.error ? <Text> Error! </Text> : <View></View>
    );

    var suits = ['major', 'cups', 'swords', 'wands', 'pentacles'];
    var formattedSuits = ['Major Arcana', 'Cups', 'Swords', 'Wands', 'Pentacles'];

    var list = suits.map((item, index) => {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={ () => {this.handleSubmit(item)} }
          underlayColor="white">
          <Text style={styles.buttonText}>{formattedSuits[index]}</Text>
        </TouchableHighlight>
      )
    });

    return (
      <View style={styles.mainContainer}>
        {list}
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111111"
          size="large"></ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
};

Main.mixins = [ParseReact.Mixin];

module.exports = Main;
