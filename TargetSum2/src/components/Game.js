import React from 'react';
import PropTypes from 'prop-types';

import {View, Text, StyleSheet} from 'react-native';

import RandomNumber from './RandomNumber';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
  };
  state = {
    selectedIDs: [],
  };
  randomNumbers = Array.from({length: this.props.randomNumberCount}).map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
  isNumberSelected = (numberIndex) => {
    return this.state.selectedIDs.indexOf(numberIndex) >= 0;
  };
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIDs:[...prevState.selectedIDs, numberIndex],
    }));

  }
  // GameStatus
  gameStatus =() => {
    const sumSelected = this.state.selectedIDs.reduce((acc,curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (sumSelected < this.target){
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target){
      return 'LOST';
    }
  }
  render() {
    const gameStatus = this.gameStatus();
    return (
      <View style={styles.container}>
        <Text style={styles.target}>{this.target}</Text>
        <View style={styles.randomContainer}>{
          this.randomNumbers.map((randomNumbers, index) =>
            <RandomNumber key={index} id={index} number={randomNumbers} isDisabled={this.isNumberSelected(index)} onPress={this.selectNumber}/>
          )}
        </View>
        <Text>{gameStatus}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ddd',
    flex: 1,
    paddingTop: 100,
  },

  target: {
    fontSize: 50,
    backgroundColor: '#aaa',
    margin: 50,
    textAlign: 'center',
  },

  randomContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
   
  },

  random: {
    backgroundColor: '#5883',
    width: 120,
    padding:10,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
});

export default Game;
