import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import HistoryPage from './HistoryPage';
import { CommonActions, useNavigation } from '@react-navigation/native'

//IMPORTANT: THIS IS JUST A COPY OF "HISTORYCALCULATOR.JS"

export default function CalcHistory(props) {

    const [ Num1, setNum1 ] = useState('')
    const [ Num2, setNum2 ] = useState('')
    const [ operator, setOperator ] = useState('')
    const [ result, setResult ] = useState('')
    const [ history, setHistory] = useState([])
    const { navigate } = props.navigation;
    
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
          
          <Button color="blue"
              accessibilityLabel="Navigate to Previous Operations"
              onPress={ () => navigate('HistoryPage', {history: history} ) }
              title="History"/>
        </View>

            <Text>The result is: { result }</Text>       
        
        </View>
      );
    }