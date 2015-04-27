var React = require('react-native');

var {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: '#48BBEC'
  },
  image: {
    height: 350,
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  }
});

class CardInfo extends React.Component{
  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>This is the Card Info </Text>
        <Text>{this.props.card} </Text>
      </ScrollView>
    )
  }
};

CardInfo.propTypes = {
  card: React.PropTypes.object.isRequired
}

module.exports = CardInfo;