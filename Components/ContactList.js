import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, FlatList } from 'react-native';
import Constants from 'expo-constants';
import * as Speech from 'expo-speech';
import { TextInput } from 'react-native-gesture-handler';
import * as Contacts from 'expo-contacts';
import * as SMS from 'expo-sms'   

export default function ContactList() {

    const [ contact, setContact ] = useState([])

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync()

        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers]
            })
            if (data.length > 0) {
                setContact(data)
                console.log(contact)
            }
        }
    }

    const listSeparator = () => {
        return (
          <View
            style={{
              height: 5,
              width: '100%',
              marginVertical: 2,
            }}
          />
        );
      };
  

    return (
        <View style={styles.container}>

        <FlatList 
            keyExtractor={item => item.key} 
            renderItem={({item}) => 
              <View style={styles.listcontainer}>
                <Text style={styles.textProduct}>{item.name}</Text>
                <Text style={styles.textAmount}>{item.number}</Text>
              </View>}
            ItemSeparatorComponent={listSeparator} 
            data={contact} 
            
          />      
            <View style={styles.buttonStyle}>
                <Button title="see contacts" onPress={getContacts} />
            </View>
        </View>
    );
  }

const styles = StyleSheet.create({

    bottomView: {
        flex:1,
        marginTop: 5,
        },

    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        },

    listcontainer: {
        alignItems: 'stretch'
        },

    buttonStyle: {
        right: 1,
        },

    textProduct: {
        fontSize: 18,
        marginRight: 120,
        color:'black',
        },

    textAmount: {
        position: 'absolute',
        right: 10,
        fontSize: 20,
        color: 'black',
        borderColor:'black',
        width: 100,
        height: 40,
        padding: 5,
        textAlign: 'right',
        },
    })