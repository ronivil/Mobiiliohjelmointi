import React, { Component } from 'react';
import { Button, View, Text, StyleSheet, ImageBackground } from 'react-native';

export default class Homescreen extends Component {
  render() {
    return (
      <ImageBackground 
        style= {{flex: 1, width: '100%', height: '100%'}}
        source={require('../assets/wallpaper.jpg')}
        resizeMode = 'cover'>

      <View style={styles.container}>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Calculator"
            onPress={() => this.props.navigation.navigate('Calculator')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Number Guessing Game"
            onPress={() => this.props.navigation.navigate('GuessGame')}
          />
          </View>
          <View style={styles.buttonStyles}>
           <Button
            title="Exercise: Calculator with history"
            onPress={() => this.props.navigation.navigate('HistoryCalculator')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Shopping List"
            onPress={() => this.props.navigation.navigate('ShoppingList')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Calculator with pages"
            onPress={() => this.props.navigation.navigate('CalcHistory')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Recipe finder"
            onPress={() => this.props.navigation.navigate('RecipeFinder')}
          />
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Euro converter"
            onPress={() => this.props.navigation.navigate('EuroConverter')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Find the address"
            onPress={() => this.props.navigation.navigate('FindAddress')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Text to speech"
            onPress={() => this.props.navigation.navigate('TextToSpeech')}
          />
          </View>
          <View style={styles.buttonStyles}>
          <Button
            title="Exercise: Contacts"
            onPress={() => this.props.navigation.navigate('ContactList')}
          />
          </View>
          </View>
      </View>
      </ImageBackground>
    )
  }
}
const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    height: 100,
    flex: 1,
    paddingTop: 200,
  },
  buttonStyles: {
    paddingTop: 5,
    width: 300,
    alignItems: 'stretch',
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingBottom: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    paddingLeft: 10,
    paddingRight: 10
  }
});