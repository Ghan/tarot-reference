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
    marginTop: 65,
    flex: 1,
    backgroundColor: 'red'
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
        <Image
          source={{uri: this.props.userInfo.avatar_url}}
          style={styles.image} />
        <Text>This is the Card Info </Text>
        <Text>{this.props.userInfo} </Text>
      </ScrollView>
    )
  }
};

CardInfo.propTypes = {
  userInfo: React.PropTypes.object.isRequired
}

module.exports = CardInfo;