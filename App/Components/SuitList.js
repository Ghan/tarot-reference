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

class SuitList extends React.Component{

  render() {

    console.log(this.props);
    var list = this.props.data.map((item, index) => {
      return (
        <Text style={styles.buttonText}>{item.attributes.full_name}</Text>
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