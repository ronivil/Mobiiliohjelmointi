import React, { useState, useEffect, useCallback }from 'react';
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, TextInput, View, Button } from 'react-native';
import * as Location from 'expo-location'

//incomplete, i cant figure how to parse "location2" json data to the mapview component. I have tried same way to parse the json data as in "dataFetch" const, but 
//not working. I am able to show user location on the mapview component with "showsUserLocation={true}" but not by default when you open the app.

export default function FindAddress() {
  
  const [ location, setLocation ] = useState('kerava')
  const [ location2, setLocation2 ] = useState(null)
  const [ latitude, setLatitude ] = useState(0)
  const [ longitude, setLongitude ] = useState(0)
  const [ data, setData ] = useState([])
  const [ userLocation, setUserLocation] = useState([])
  
    const getLocation = async (location3) => {
      let { status } = await Location.requestPermissionsAsync()
      if (status !== 'granted') {
        Alert.alert('No permission to access location')
      }
      else {
        let location3 = await Location.getCurrentPositionAsync({})
        let latitude = parseFloat(location3.coords.latitude)
        let longitude = parseFloat(location3.coords.latitude)
        let region = {
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0522,
          longitudeDelta: 0.0321
        } 

        console.log('position is: ', location3)

        setLocation2(location3)
      }
    }
console.log('näkyykö täällä', location2)
    useEffect(() => {
      getLocation()
      }, []
    );
/* 
    const currentLongitude = location2.coords.longitude;
    const currentLatitude =  location2.coords.latitude; */

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
            <View style = {styles.buttonStyle}>
                <Button title="current location" onPress={() => getLocation()} />
            </View>
        </View>
        
        <MapView
            style={{ flex:1 }}
            showsUserLocation = {true}
            initialRegion={{
                latitude: 0,
                longitude: 0,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,}}
            
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