import {Text, TextInput, View, TouchableHighlight, StyleSheet} from 'react-native'
import React, { Component } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'


export class SearchForm extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>SearchForm</Text>
        <TextInput placeholder="Search for recipes ex: Caesar Salad"/>
        <TouchableHighlight onPress={()=>{console.log("test")}} style={styles.buttonarea}>
          <View>
            <FontAwesomeIcon icon={faSearch} color='#fff' size={25}/>
          </View>
        </TouchableHighlight>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonarea: {
    borderRadius: 10,
    backgroundColor: '#008ad6',
    width: '80%',
    height: '6%',
    maxHeight: 250,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default SearchForm