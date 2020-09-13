import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from './Components/HomeScreen';
import calculator from './Components/calculator';
import GuessGame from './Components/GuessGame';
import HistoryCalculator from './Components/HistoryCalculator'
import ShoppingList from './Components/ShoppingList'


class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Calculator: {
    screen: calculator
  },
  GuessGame: {
    screen: GuessGame
  },
  HistoryCalculator: {
    screen: HistoryCalculator
  },
  ShoppingList: {
    screen: ShoppingList
  }
},{
    initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});