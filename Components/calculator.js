import { StatusBar } from 'expo-status-bar';
import React, { useState, Component } from 'react';
import { StyleSheet, text, View, TextInput, Button } from 'react-native';

export default class calculator extends Component 
  {
    constructor(props)
    {
      super(props);
      this.state={Num1: 0, Num2: 0};
    }  
    
    Sum=()=>
    {
      var N1 = parseInt(this.state.Num1);
      var N2 = parseInt(this.state.Num2);

      var result = N1 + N2;
      alert(result);
    } 

    Substraction=()=>
    {
      N1 = parseInt(this.state.Num1);
      N2 = parseInt(this.state.Num2);

      var result2 = N1 - N2;
      alert(result2);
    }

    render()
    {
      return(
        <View style = {styles.container}>
          <TextInput 
          style = {{borderWidth: 1, margin: 10, width: 100}} 
          keyboardType = "number-pad"
          onChangeText={Num1=>this.setState({Num1})}
          />

          <TextInput 
          style = {{borderWidth: 1, margin: 10, width: 100}} 
          keyboardType = "number-pad"
          onChangeText={Num2=>this.setState({Num2})}
          />

          <Button
          style = {{width: 1000}} 
          title = "Sum" 
          onPress={this.Sum}
          />

          <Button 
          title = "Subtraction" 
          onPress={this.Substraction}
          />

        </View>
      );
    }
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
