import React, { useState, useEffect } from 'react';
import { Text, View, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import * as SQLite from 'expo-sqlite'

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
          tx.executeSql('insert into grocery (amounts, title) values (?, ?);', [parseInt(amount), title]);    
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
            marginVertical: 3,
          }}
        />
      );
    };

    return (
        <View style={styles.container}>
          <View style={styles.topView}>  

            <Text style={styles.title}>Shopping List</Text>

            <View style={styles.inputsContainer}>
              <TextInput placeholder='Product...' style={styles.inputProduct}
                onChangeText={(title) => setTitle(title)}
                value={title}/>

              <View>
              <TextInput placeholder='Quantity...' keyboardType="numeric" style={styles.inputAmount}
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
              <View style={styles.listcontainer}>
                <Text style={styles.textProduct}>{item.title}</Text>
                <Text style={styles.textAmount}>{item.amounts}</Text>
                <Text style={styles.delete} onPress={() => deleteItem(item.id)}>Bought</Text>
              </View>} 
            data={grocery} 
            ItemSeparatorComponent={listSeparator} 
          />      

        </View>
      );
  }
  const styles = StyleSheet.create({
    container: {
     flex: 1,
     alignItems: 'center',
     justifyContent: 'flex-start',
   },
   topView: {
     flex:.3,
     flexDirection:'column',
     justifyContent: 'space-around',
     alignItems: 'center',
     width: '100%',
   },
   title: {
     color: 'black',
     fontSize: 42,
     marginTop: -10,
     width:'100%',
     textAlign:'center',
   },
   inputsContainer: {
     width: '100%',
     flexDirection: 'column',
     justifyContent: 'flex-start',
     alignItems: 'flex-start',
   },
   inputProduct: {
     paddingLeft: 2,
     marginLeft: 20,
     marginRight: 10,
     fontSize: 20,
     width: 180,
     color:'black',
     borderColor: 'black',
     borderWidth: 1,
     borderRadius: 5,
   },
   inputAmount: {
     paddingLeft: 2,
     marginLeft: 20,
     marginTop: 5, 
   
     fontSize: 20,
     width: 180,
     color:'black',
     borderWidth: 1,
     borderRadius: 5,
    },
    add: {
     position: 'absolute',
     right: 100,
     width: 100,
     paddingTop: 13
    },
    bottomView: {
     flex:1,
     marginTop:20,
     width:'100%',
     paddingHorizontal:30,
    },
    listcontainer: {
     flexDirection: 'row',
     alignItems: 'center'
    },
    textProduct: {
     paddingLeft: 2,
     fontSize: 18,
     marginRight: 120,
     color:'black',
    },
    textAmount: {
     position: 'absolute',
     right: 80,
     fontSize: 20,
     color: 'black',
     borderColor:'black',
     width: 20,
     height: 40,
     padding: 5,
     textAlign:'center',
    },
    delete: {
     position: 'absolute',
     right: 0,
     fontSize: 20,
     height: 30,
     color: 'blue',
     paddingHorizontal: 6,
     textAlign:'center',
     textDecorationLine: 'underline'
    }
   });