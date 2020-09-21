import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View, Button, TextInput, FlatList, Image, Linking } from 'react-native';

export default function RecipeFinder() {
  const [query, setQuery] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipe = () => {
    const url = 'http://www.recipepuppy.com/api/?q='+ query;
    fetch(url)
    .then((response) => response.json())
    .then((responseJson) => { 
       setRecipes(responseJson.results);
    })
    .catch((error) => { 
      Alert.alert('Something went wrong, maybe try again?' , error); 
    }); 
  }
  
  const listSeparator = () => {
    return (
      <View
        style={{
            height: 3,
            width: "96%",
            borderTopWidth: 1,
            borderColor: 'rgb(89, 113, 385)',
            marginVertical: 2,
        }}
      />
    );
  };

  return (
    <View style={styles.container}>
        <TextInput 
            style={styles.searchText} 
            value={query} 
            placeholder="Search a recipe!"
            onChangeText={(query) => setQuery(query)} 
        />
        <View style={styles.buttonStyle}>
            <Button 
                title="Find!" 
                onPress={getRecipe} 
            />
        </View>
        <FlatList 
            style={{marginLeft : "5%"}}
            keyExtractor={item => item.key} 
            renderItem={({ item }) =>
            
            <View >
              <View style={styles.items}>
                <Image style={styles.imageStyle} source={{uri: item.thumbnail ? `${item.thumbnail}` : 'http://premiumtruckrepair.com/wp-content/uploads/2019/11/no-image-available.png' }}/>
                <Text style={styles.itemDescription} >{item.title}</Text>
              </View>
              <Text onPress={() => Linking.openURL(item.href)} >Open</Text>
            </View>
          } 

        ItemSeparatorComponent={listSeparator}
        data={recipes} 
      />  
    </View>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: 'white',
  alignItems: 'center',
  justifyContent: 'center',
 },
 imageStyle: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
 },
 itemDescription: {
    fontSize: 17,
    marginRight: 5,
 },
 items: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
 },
 searchText: {
    fontSize: 18,
    width: 220,
    height: 40,
    paddingLeft: 8,
    color:'black',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 3,
 },
 buttonStyle: {
    flexDirection: 'column',
    justifyContent: 'center',
    width: 60,
    marginLeft: -160,
    marginTop: 5,
 }
});