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

class Main extends React.Component{
  // observe(props, state) {
  //   return {
  //     items: (new Parse.Query('Card')).ascending('createdAt')
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {
      card: '',
      isLoading: false,
      error: false
    }
  }

  handleChange(event) {
    this.setState({
      card: event.nativeEvent.text
    });
  }

  handleSubmit() {
    // update our indicatorIOS spinner
    this.setState({
      isLoading: true
    });
    // fetch data from external source
    api.getBio(this.state.card)
      .then((res) => {
        if (res.message === 'Not Found') {
          this.setState({
            error: "User not found",
            isLoading: "false"
          });
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: CardInfo,
            passProps: {userInfo: res}
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

    return (
      <View style={styles.mainContainer}>
        <Text style={styles.title}>Search for a Tarot card</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.card} 
          onChange={this.handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}> SEARCH </Text>
        </TouchableHighlight>
        <ActivityIndicatorIOS
          animating={this.state.isLoading}
          color="#111111"
          size="large"></ActivityIndicatorIOS>
        {showErr}
      </View>
    )
  }
};

module.exports = Main;
