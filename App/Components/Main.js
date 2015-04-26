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

class Main extends React.Component{

  constructor(props) {
    super(props);
    console.log("yo");
    this.state = {
      isLoading: false,
      error: false,
    }
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
          console.log(res);
          
          this.props.navigator.push({
            title: suit || "Select an Option",
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

    var list = suits.map((item, index) => {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={ () => {this.handleSubmit(item)} }
          underlayColor="white">
          <Text style={styles.buttonText}>{item}</Text>
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
