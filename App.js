import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";

import HomeScreen from './Components/HomeScreen';
import calculator from './Components/calculator';
import GuessGame from './Components/GuessGame';
import HistoryCalculator from './Components/HistoryCalculator'
import ShoppingList from './Components/ShoppingList'
import CalcHistory from './Components/CalcHistory'
import HistoryPage from './Components/HistoryPage'
import RecipeFinder from './Components/RecipeFinder'
import EuroConverter from './Components/EuroConverter'
import FindAddress from './Components/FindAddress'
import TextToSpeech from './Components/TextToSpeech'
import ContactList from './Components/ContactList'

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
  },
  CalcHistory: {
    screen: CalcHistory
  },
  HistoryPage: {
    screen: HistoryPage
  },
  RecipeFinder: {
    screen: RecipeFinder
  },
  EuroConverter: {
    screen: EuroConverter
  },
  FindAddress: {
    screen: FindAddress
  },
  TextToSpeech: {
    screen: TextToSpeech
  },
  ContactList: {
    screen: ContactList
  }
},{
    initialRouteName: "Home"
});

export default createAppContainer(AppNavigator);