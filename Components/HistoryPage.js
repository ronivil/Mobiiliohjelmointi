import React, { useState } from 'react'
import { Text, View, Button, TextInput, FlatList } from 'react-native'
import CalcHistory from './CalcHistory'


export default function HistoryPage(props) {

    const { params } = props.navigation.state;

        return(
            <View>
                <Text>History</Text>
                <FlatList
                data={ params.history }
                renderItem={ ({item}) => 
                    <Text>{ item.key }</Text>}
                />        
            </View>
        )
    }