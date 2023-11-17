import React, { Component } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';

export class MyStatusBar extends Component {
  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="light-content"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: StatusBar.currentHeight,
    backgroundColor: '#2c3e50', // Set your desired background color
  },
});

export default MyStatusBar;
