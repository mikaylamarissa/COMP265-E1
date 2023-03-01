import React from 'react';

import PropTypes from 'prop-types';

import {Text, TouchableOpacity, StyleSheet} from 'react-native';


class RandomNumber extends React.Component {
  static propTypes = {
    number: PropTypes.number.isRequired,
  };
  handlePress = () => {
    // console.log(this.props.number);
  }
  render (){
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Text style={styles.random}>{this.props.number}</Text>
      </TouchableOpacity>
    );}
}

const styles = StyleSheet.create({
  random: {
    backgroundColor: '#5883',
    width: 120,
    padding:10,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',},
});  
export default RandomNumber;
  