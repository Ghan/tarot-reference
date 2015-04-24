var React = require('react-native');
var Main = require('./App/Components/Main2');
var Parse = require('parse').Parse;

// Insert your app's keys here:
Parse.initialize("coprg6EbPWg5iTWY8eugIk2xQJCzeiG0iTHlxU1q", "w1sD7u8FSBRkKQ3glL9tKH0QBWejkiIjXTI1gueK");

var {
  AppRegistry,
  StyleSheet,
  Text,
  NavigatorIOS,
  View,
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#111111'
  }
});

class tarotReference extends React.Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: "Tarot Reference",
          component: Main
        }} />
    );
  }
};

AppRegistry.registerComponent('tarotReference', () => tarotReference);
