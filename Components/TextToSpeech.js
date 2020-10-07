import React, { useState } from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { TextInput } from 'react-native-gesture-handler';

export default function TextToSpeech() {

    const [ speech, setSpeech ] = useState('')

    const speak = () => {
        Speech.speak(speech);
    }

    return (
      <View style={styles.container}>
          <Text style={styles.title}>Text to speech</Text>
        <View>
            <TextInput
                style={styles.inputAmount} 
                placeholder='Write something you want to hear'  
                onChangeText={(speech) => setSpeech(speech)}
                value={speech}/>  
        </View>
        <View style = {styles.buttonStyle}>
            <Button title="Press to hear your text" onPress={speak} />
        </View>
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  title: {
    color: 'black',
    marginBottom: 30,
    fontSize: 42,
    width:'100%',
    textAlign:'center',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputAmount: {
    paddingLeft: 2,
    color:'black',
    borderWidth: 1,
    borderRadius: 5,
   },
  buttonStyle: {
    right: 1,
    paddingTop: 13
  }
});