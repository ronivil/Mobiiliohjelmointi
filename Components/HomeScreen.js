import React, { Component } from 'react';
import { Button, View, Text, StyleSheet } from 'react-native';
import { round } from 'react-native-reanimated';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Homescreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
          <Button
            title="Exercise: Calculator"
            onPress={() => this.props.navigation.navigate('Calculator')}
          />
          <Button
            title="Exercise: Number Guessing Game"
            onPress={() => this.props.navigation.navigate('GuessGame')}
          />
           <Button
            title="Exercise: Calculator with history"
            onPress={() => this.props.navigation.navigate('HistoryCalculator')}
          />
          <Button
            title="Exercise: Shopping List"
            onPress={() => this.props.navigation.navigate('ShoppingList')}
          />
          <Button
            title="Exercise: Calculator with pages"
            onPress={() => this.props.navigation.navigate('CalcHistory')}
          />
      </View>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 40,
  }
});