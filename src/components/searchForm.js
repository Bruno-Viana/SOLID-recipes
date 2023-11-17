import React, { useState } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
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
      <Text style={styles.title}>SOLID Recipes</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for recipes (e.g., Caesar Salad)"
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          onSubmitEditing={() => handleSearch(textInput, handleShowFoundRecipes)}
        />
      </View>
      <TouchableHighlight onPress={() => handleSearch(textInput, handleShowFoundRecipes)} style={styles.buttonArea}>
        <View>
          <FontAwesomeIcon icon={faSearch} color="#fff" size={25} />
        </View>
      </TouchableHighlight>
      {showFoundRecipesLocal && <FoundRecipes />}
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
  },
  buttonArea: {
    borderRadius: 10,
    backgroundColor: '#008ad6',
    width: '80%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchForm;
