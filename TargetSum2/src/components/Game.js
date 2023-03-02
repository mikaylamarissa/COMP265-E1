import React from 'react';
import PropTypes from 'prop-types';

import { View, Button, Text, StyleSheet } from 'react-native';

import RandomNumber from './RandomNumber';
import shuffle from 'lodash.shuffle';

class Game extends React.Component {
  static propTypes = {
    randomNumberCount: PropTypes.number.isRequired,
    initialSeconds: PropTypes.number.isRequired,
    onPlayAgain: PropTypes.func.isRequired,
  };
  state = {
    selectedIDs: [],
    remainingSeconds: this.props.initialSecondFfs,
  };
  gameStatus = 'PLAYING';
  randomNumbers = Array.from({ length: this.props.randomNumberCount }).map(() => 1 + Math.floor(10 * Math.random()));
  target = this.randomNumbers.slice(0, this.props.randomNumberCount - 2).reduce((acc, curr) => acc + curr, 0);
  shuffledRandomNumbers = shuffle(this.randomNumbers);
  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.setState((prevState) => { return { remainingSeconds: prevState.remainingSeconds - 1 }; }, () => { if (this.state.remainingSeconds === 0) { clearInterval(this.intervalId); } });
    }, 1000);
  }
  //reset game



  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  isNumberSelected = (numberIndex) => {
    return this.state.selectedIDs.indexOf(numberIndex) >= 0;
  };
  selectNumber = (numberIndex) => {
    this.setState((prevState) => ({
      selectedIDs: [...prevState.selectedIDs, numberIndex],
    }));

  }
  // eslint-disable-next-line react/no-deprecated
  componentWillUpdate(nextProps, nextState){
    if (nextState.selectedIDs !== this.state.selectedIDs || nextState.remainingSeconds === 0) { this.gameStatus = this.calcgameStatus(nextState); if (this.gameStatus !== 'PLAYING'){clearInterval(this.intervalId);}}} 
  
  // GameStatus
  calcgameStatus = (nextState) => {
    const sumSelected = nextState.selectedIDs.reduce((acc, curr) => {
      return acc + this.randomNumbers[curr];
    }, 0);
    if (nextState.remainingSeconds === 0) {
      return 'LOST';
    }
    if (sumSelected < this.target) {
      return 'PLAYING';
    }
    if (sumSelected === this.target) {
      return 'WON';
    }
    if (sumSelected > this.target) {
      return 'LOST';
    }
  };
  render() {
    const gameStatus = this.calcgameStatus;
    return (
      <View style={styles.container}>
        <Text style={[styles.target, styles[`STATUS_${gameStatus}`]]}>{this.target}</Text>
        <View style={styles.randomContainer}>{
          this.randomNumbers.map((randomNumbers, index) =>
            <RandomNumber key={index} id={index} number={randomNumbers} isDisabled={this.isNumberSelected(index) || gameStatus !== 'PLAYING'} onPress={this.selectNumber} />
          )}
        </View>
        {this.gameStatus !== 'PLAYING' && (<Button title = "Play Again" onPress = {this.props.onPlayAgain} />
        )}
        <Text style={styles.timer}>{this.state.remainingSeconds}</Text>
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
    padding: 10,
    marginHorizontal: 15,
    marginVertical: 25,
    fontSize: 35,
    textAlign: 'center',
  },
  STATUS_PLAYING: {
    backgroundColor: '#aaa',
  },
  STATUS_WON: {
    backgroundColor: 'green',
  },
  STATUS_LOST: {
    backgroundColor: 'red',
  },
  timer: {
    paddingBottom: 50,
    paddingLeft: 50,
  }
});

export default Game;
