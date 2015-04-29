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
    alignSelf: 'center',
    width: 250,
    height: 500
  },
  buttonText: {
    fontSize: 24,
    color: 'white',
    alignSelf: 'center'
  },
  header: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  description: {
    fontSize: 14,
    color: '#111',
    alignSelf: 'center'
  }
});

class CardInfo extends React.Component{
  render() {
    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.card.image.url()}}/>
        <Text
          style={styles.header}>{this.props.card.full_name}</Text>
        <Text
          style={styles.description}>{this.props.card.description} </Text>
      </ScrollView>
    )
  }
};

CardInfo.propTypes = {
  card: React.PropTypes.object.isRequired
}

module.exports = CardInfo;