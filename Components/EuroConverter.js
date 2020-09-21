import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, Linking, Picker } from 'react-native';


export default function EuroConverter() {
  const [query, setQuery] = useState('');
  const [amount, setAmount] = useState('');
  const [output, setOutput] = useState('');
  const [data, setData] = useState([]);

  const getData = () => {
    const url = 'http://data.fixer.io/api/convert?access_key=436137d96585982797a467dbd2d59223' + query + '&to=EUR&amount=' + amount;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setData(responseJson.results);
       console.log('json res: ', responseJson);
       alert(Object.keys(responseJson))
       /* this.setState({
           data:JSON
       }) */
    })
    .catch((error) => { 
      Alert.alert('Something went wrong, maybe try again?' , error); 
    }); 
  }

  return (
    <View>
        <TextInput 
            keyboardType = 'number-pad'
            value={query} 
            placeholder="Amount"
            onChangeText={(query) => setQuery(query)} 
        />
        <Picker>
            <Picker.Item label = 'Dollar' value = 'USD' />
        </Picker>
        <Button 
        onPress={() => getData()}
        title = 'Find'/>
        <FlatList
          data={ data }
          renderItem={ ({data}) => 
            <Text>{ data.key }</Text>}
        />  
    </View>
  );
}
//not working because fixer.io doesnt offer conversion API call to the free plan
