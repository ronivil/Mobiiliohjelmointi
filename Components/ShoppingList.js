import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite'
import { ListItem, Input, Button } from 'react-native-elements'

//i didnt bother to comment all the consts because im sure that their names speak for what they do
export default function ShoppingList() {

    const db = SQLite.openDatabase('grocery.db');

    const [ grocery, setGrocery ] = useState([])
    const [ title, setTitle ] = useState('')
    const [ amount, setAmount ] = useState('')

    useEffect(() => {
      createDB();
      updateList();
      Alert.alert('Press "Bought" to remove items from the shopping list!')
    }, []);

    const createDB = () => {
      db.transaction(tx => {
        tx.executeSql('create table if not exists grocery (id integer primary key not null, amounts int, title text);');
      });
    }

    const saveItem = () => {
      db.transaction(tx => {
          tx.executeSql('insert into grocery (amounts, title) values (?, ?);', [amount, title]);    
        }, null, updateList
      );
      clearFields();
    }

    const updateList = () => {
      db.transaction(tx => {
        tx.executeSql('select * from grocery;', [], (_, { rows }) =>
          setGrocery(rows._array)
        ); 
      });
    }

    const deleteItem = (id) => {
      db.transaction(
        tx => {
          tx.executeSql(`delete from grocery where id = ?;`, [id]);
        }, null, updateList
      )    
    }

    const clearFields = () => {
      setTitle('');
      setAmount('');
    }

    const evaluateAddition = () => {
      if (title == '') {
        Alert.alert('Please enter product')
      } else if(amount == ''){
        Alert.alert('Please enter amount of product')
      }
      else if(title&&amount) {
        saveItem()
      }
    }

    const listSeparator = () => {
      return (
        <View
          style={{
            height: 5,
            width: '100%',
            borderTopWidth: 1,
            borderColor: 'black',
            marginVertical: 3,
          }}
        />
      );
    };

    return (
        <View style={styles.container}>
          <View style={styles.topView}>  

            <View style={styles.inputsContainer}>
              <Input label = 'PRODUCT' placeholder='Product...' style={styles.inputProduct}
                onChangeText={(title) => setTitle(title)}
                value={title}/>

              <View>
              <Input label = 'AMOUNT' placeholder='Quantity...' style={styles.inputAmount}
                onChangeText={(amount) => setAmount(amount)}
                value={amount}/>  
                </View>

              <View style={styles.add}>
                <Button onPress={evaluateAddition} title="Add" color="blue" /> 
              </View>  

            </View>
          </View>

          <FlatList 
            style={styles.bottomView}
            keyExtractor={item => item.id.toString()} 
            renderItem={({item}) => 
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.amounts}</ListItem.Subtitle>
                <Text style={styles.delete} onPress={() => deleteItem(item.id)}>Bought</Text>
              </ListItem.Content>} 
            data={grocery} 
            ItemSeparatorComponent={listSeparator} 
          />      

        </View>
      );
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
   },
   topView: {
     flexDirection:'column',
     width: '100%',
   },
   inputsContainer: {
     paddingTop: 10,
     width: '100%',
     flexDirection: 'column',
   },
    add: {
     width: '100%',
     paddingHorizontal: 10
    },
    bottomView: {
     width:'100%',
     paddingTop: 20,
     paddingHorizontal: 10,
    },
    textProduct: {
     paddingLeft: 2,
     fontSize: 18,
     marginRight: 120,
     color:'black',
    },
    delete: {
     position: 'absolute',
     right: 0,
     fontSize: 20,
     height: 30,
     color: 'grey',
     paddingHorizontal: 6,
     textAlign:'center',
    }
   });