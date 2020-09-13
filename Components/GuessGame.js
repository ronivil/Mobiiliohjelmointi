import React, { useState } from 'react'
import { Text, View, Button, TextInput } from 'react-native'

export default function GuessGame() {

    const [inputNum, setInput] = useState('');
    const [message, setMessage] = useState('');
    const [randomNumber, setRandomNum] = useState((Math.floor(Math.random() * 100) + 1));
  
    const buttonPress = (guess) => {

      (parseInt(guess) < randomNumber) ? (
        setMessage(`Your guess ${inputNum} is too low. Please try again!`))

      : (parseInt(guess) > randomNumber) ? (
        setMessage(`Your guess ${inputNum} is too high. Please try again!`))

      : (parseInt(guess) == randomNumber) ? setMessage(`You guessed right! The number was "${inputNum}"!`)

      : setMessage(
        (`${inputNum} is not a number, try again!`))
    }
        return(
            <View>
                <Text>Guess a number between 1-100</Text>
                
                <TextInput 
                    style = {{borderWidth: 1, margin: 10, width: 100}} 
                    keyboardType='number-pad' 
                    onChangeText={(inputNum) => setInput(inputNum)}
                    value={inputNum}>
                </TextInput>

                <Button title="Make guess" onPress={() => buttonPress(inputNum)}/>
                <Text>{message}</Text>
            </View>
        )
    }