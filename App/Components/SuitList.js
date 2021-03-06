var React = require('react-native');

var CardInfo = require('./CardInfo');

var {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableHighlight
} = React;

var styles = StyleSheet.create({
  container: {
    marginTop: 0,
    flex: 1,
    backgroundColor: '#333'
  },
  image: {
    height: 350,
  },
  listItem: {
    height: 45,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderColor: '#333',
    borderWidth: 1,
    borderRadius: 0,
    marginBottom: 0,
    marginTop: 0,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  listText: {
    fontSize: 18,
    color: '#111',
    alignSelf: 'center'
  }
});

class SuitList extends React.Component{

  visitCard(item) {
    this.props.navigator.push({
      title: item.full_name || "Card",
      component: CardInfo,
      passProps: {card: item}
    });
  }

  render() {
    var cards = this.props.data.sort(function (a, b) {
      return parseInt(a.order) > parseInt(b.order);
    });
    var list = cards.map((item, index) => {
      return (
        <TouchableHighlight
          style={styles.listItem}
          onPress={ () => {this.visitCard(item)} }
          underlayColor="white">
          <Text style={styles.listText}>{item.full_name}</Text>
        </TouchableHighlight>
        
      )
    });

    return (
      <ScrollView style={styles.container}>
        {list}
      </ScrollView>
    )
  }
};

SuitList.propTypes = {
  data: React.PropTypes.object.isRequired
}

module.exports = SuitList;