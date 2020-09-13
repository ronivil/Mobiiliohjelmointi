import { StatusBar } from 'expo-status-bar';
import { number } from 'prop-types';
import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList } from 'react-native';

export default function ShoppingList() {

    const [ grocery, setGrocery ] = useState('')
    const [ items, setItems ] = useState([])
    
    const buttonPress = (press) => {
        (press == 'ADD') ? (
        setItems([...items, {key: `${grocery}`}]),
        setGrocery(''))

    :   setItems('')

    }

      return(
        <View>
           
        <View>

          <TextInput 
            style = {{borderWidth: 1, margin: 10, width: 100}} 
            onChangeText={(grocery) => setGrocery(grocery)}
            value= {grocery}
          />

        </View>

        <View>
          <Button
            style = {{width: 1000}} 
            title = "ADD" 
            onPress={() => buttonPress('ADD')}
          />

          <Button 
            title = "CLEAR" 
            onPress={() => buttonPress('CLEAR')}
          />
        </View>

        <Text>Groceries</Text>

        <FlatList
          data={ items }
          renderItem={ ({item}) => 
            <Text>{ item.key }</Text>}
        />        
          
        </View>
      );
    }