import { StatusBar } from 'expo-status-bar';
import { number } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

export default function HistoryCalculator() {

    const [ Num1, setNum1 ] = useState('')
    const [ Num2, setNum2 ] = useState('')
    const [ operator, setOperator ] = useState('')
    const [ result, setResult ] = useState('')
    const [ history, setHistory] = useState([]) 
    
    const buttonPress = (input) => {
        (input == '+') ? setResult(parseInt(Num1) + parseInt(Num2))
        : 
            (input == '-') ? setResult(parseInt(Num1) - parseInt(Num2))
        : 
        setOperator(input)
    }

    useEffect(() => {

        if (result) {
          setHistory([...history, {key: `${Num1} ${operator} ${Num2} = ${result}`}]);
        }

      }, [result]);
    //Cannot get the calculating operator to show in flatlist, dont know why, tried many different solutions
      return(
        <View>
           
        <View>

          <TextInput 
            style = {{borderWidth: 1, margin: 10, width: 100}} 
            keyboardType = "number-pad"
            onChangeText={(Num1) => setNum1(Num1)}
            value= {Num1}
          />

          <TextInput 
            style = {{borderWidth: 1, margin: 10, width: 100}} 
            keyboardType = "number-pad"
            onChangeText={(Num2) => setNum2(Num2)}
            value= {Num2}
          />
        </View>

        <View>
          <Button
            style = {{width: 1000}} 
            title = "+" 
            onPress={() => buttonPress('+')}
          />

          <Button 
            title = "-" 
            onPress={() => buttonPress('-')}
          />
        </View>

        <Text>The result is: { result }</Text> 
        <Text>History</Text>

        <FlatList
          data={ history }
          renderItem={ ({item}) => 
            <Text>{ item.key }</Text>}
        />        
          
        </View>
      );
    }