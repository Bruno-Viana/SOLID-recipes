import React, { useState } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch'
import { handleSearch } from '../utils/dataToObject';
import FoundRecipes from './foundRecipes';

const SearchForm = () => {
  const [textInput, setTextInput] = useState('');
  const [showFoundRecipesLocal, setShowFoundRecipesLocal] = useState(false);
  const handleShowFoundRecipes = (value) => {
    setShowFoundRecipesLocal(value);
  };


  return (
    <View style={styles.container}>
      <View>
        <Text 
          style={styles.textinput}
          >SearchForm</Text>      
        <TextInput 
          style={styles.textinput}
          placeholder="Search for recipes ex: Caesar Salad"
          value={textInput}
          onChangeText={(text) => setTextInput(text)} 
          onSubmitEditing={() => handleSearch(textInput, handleShowFoundRecipes)}
        />
      </View>
      <TouchableHighlight onPress={() => handleSearch(textInput, handleShowFoundRecipes)} style={styles.buttonarea}>
        <View>
          <FontAwesomeIcon icon={faSearch} color="#fff" size={25} />
        </View>
      </TouchableHighlight>
      {showFoundRecipesLocal && <FoundRecipes/>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textinput:{
    textAlign: 'center'
  },
  buttonarea: {
    borderRadius: 10,
    backgroundColor: '#008ad6',
    width: '80%',
    height: '6%',
    maxHeight: 250,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchForm;