import React, { Component } from 'react';
import { Button, View, Text } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

export default class Homescreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Welcome!</Text>
          <Button
            title="Calculator"
            onPress={() => this.props.navigation.navigate('Calculator')}
          />
          <Button
            title="Number guessing game"
            onPress={() => this.props.navigation.navigate('GuessGame')}
          />
           <Button
            title="Calculator with history"
            onPress={() => this.props.navigation.navigate('HistoryCalculator')}
          />
      </View>
    )
  }
}