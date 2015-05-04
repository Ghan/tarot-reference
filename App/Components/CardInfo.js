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
  header: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  },
  description: {
    fontSize: 14,
    color: '#111',
    alignSelf: 'center'
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

class CardInfo extends React.Component{

  openPage(url, label){
    this.props.navigator.push({
      component: Web_View,
      title: {label},
      passProps: {url}
    });
  }

  render() {
    console.log(this.props.card);

    var buttons = [
      {
        label: "Biddy Tarot",
        url: this.props.card.biddy_link
      },
      {
        label: "Keen Tarot",
        url: this.props.card.keen_link
      },
      {
        label: "Learn Tarot",
        url: this.props.card.learn_tarot_link
      }
    ];

    var externalButtons = buttons.map((item, index) => {
      return (
        <TouchableHighlight
          style={styles.button}
          onPress={ () => {this.openPage(item.url, item.label)} }
          underlayColor="white">
          <Text style={styles.buttonText}>{item.label}</Text>
        </TouchableHighlight>
      )
    });

    return (
      <ScrollView style={styles.container}>
        <Image
          style={styles.image}
          source={{uri: this.props.card.image.url()}}/>
        <Text
          style={styles.header}>{this.props.card.full_name}</Text>
        <Text
          style={styles.description}>{this.props.card.description} </Text>
        <Text
          style={styles.external}>External Links: </Text>
        {externalButtons}
      </ScrollView>
    )
  }
};

CardInfo.propTypes = {
  card: React.PropTypes.object.isRequired
}

module.exports = CardInfo;