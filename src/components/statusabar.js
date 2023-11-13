import {  View, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { StatusBar } from 'expo-status-bar'

export class MyStatusBar extends Component {
  render() {
    return (
      <View>
        <StatusBar style={bar.container}/>
      </View>
    )
  }
}

const bar = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', // Set your desired background color for the entire screen
  },
});

export default MyStatusBar