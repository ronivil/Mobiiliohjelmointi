import React, { useState, useEffect, useCallback }from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TextInput, View, Button } from 'react-native';
import * as Location from 'expo-location'

export default function FindAddress() {
  
  const [ location, setLocation ] = useState('')
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)
  const [ data, setData ] = useState([])

    const getLocation = async () => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('No permission to access location')
      }
      else {
        let userLocation = await Location.getCurrentPositionAsync({})
        let latitude = parseFloat(userLocation.coords.latitude)
        let longitude = parseFloat(userLocation.coords.longitude)

        setLatitude(latitude)
        setLongitude(longitude)

        console.log('position is: ', userLocation)
      }
    }

    useEffect(() => {
      getLocation()
      }, []
    );

    const dataFetch = useCallback(async () => {
        const url = `https://www.mapquestapi.com/geocoding/v1/address?key=jg4Asyi2g3okHrqbAo9bxhTqGHkCklNM&inFormat=kvp&outFormat=json&location=${location}&thumbMaps=false`;
        const response = await fetch(url);
        const responseData = await response.json();
        (response.ok) 
        ? setData(responseData.results[0].locations[0])
        : console.error('Failed to retrieve your address, try again.');
    })

    const onRegionChange = () => {
        return {
          region: {
            latitude: latitude,
            longitude: longitude,
          },
        };
      }
    
      useEffect( () => {
        dataFetch();
      }, [location]);
      
      const find = () => {
        setLatitude(data.latLng.lat);
        setLongitude(data.latLng.lng);
        onRegionChange();
      }

    return(
        <View style={{ flex:1}}>
            <View style={styles.container}>
                <TextInput
                    style = {styles.inputText}
                    value={location}
                    onChangeText={(location) => setLocation(location)}
                />
            
            <View style = {styles.buttonStyle}>
                <Button title="Search" onPress={() => find()} />
            </View>
        </View>
        
        <MapView
            style={{ flex:1 }}
            showsUserLocation = {true}
            region={{
                latitude: latitude,
                longitude: longitude,
                latitudeDelta: 0.1,
                longitudeDelta: 0.2,}}
        >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
          title={location}
        />
      </MapView>
    </View>
    )
}
const styles = StyleSheet.create({
    container: {
      backgroundColor: 'white',
      height: 100,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      paddingTop: 20,
      position: 'relative',
      paddingBottom: 10,
    },
    buttonStyle: {
        width: 100
    },
    inputText: {
      fontSize: 24,
      width: 150,
      marginHorizontal: 5,
      paddingRight: 10,
      paddingLeft: 5,
      backgroundColor: 'white',
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 2,
      textAlign: "left",
    },
  });