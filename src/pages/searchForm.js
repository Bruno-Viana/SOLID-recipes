import React, { useState, useMemo } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { handleSearch } from '../utils/dataToObject';
import FoundRecipes from './foundRecipes';
import LottieView from 'lottie-react-native';

const SearchForm = () => {
  const [textInput, setTextInput] = useState('');
  const [showFoundRecipesLocal, setShowFoundRecipesLocal] = useState(false);
  const handleShowFoundRecipes = (value) => {
    setShowFoundRecipesLocal(value);
  };

  const memoizedLottieView = useMemo(
    () => (
      <LottieView
        style={{ width: 300, height: 300 }}
        source={require('../../assets/cooking_animation.json')}
        autoPlay={true}
        onError={(error) => console.log('Lottie Error:', error)}
      />
    ),
    [] //Única instância, bug do metro, não ocorre com o compilado.
  );

  return (
    <View style={styles.container}>
      {!showFoundRecipesLocal && memoizedLottieView}
      <Text onPress={() => setShowFoundRecipesLocal(false)} style={styles.title}>
        SOLID Recipes
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Search for recipes (e.g., Caesar Salad)"
          value={textInput}
          onChangeText={(text) => setTextInput(text)}
          onSubmitEditing={() => handleSearch(textInput, handleShowFoundRecipes)}
        />
      </View>
      <TouchableHighlight
        onPress={() => handleSearch(textInput, handleShowFoundRecipes)}
        style={styles.buttonArea}>
        <View>
          <FontAwesomeIcon icon={faSearch} color="#fff" size={25} />
        </View>
      </TouchableHighlight>
      {showFoundRecipesLocal && <FoundRecipes />}
      {!showFoundRecipesLocal && <View style={{ flex: 1 }}></View>}
      <Text style={styles.bottomText}>@ Q4 / 2023</Text>
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
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    width: '100%',
  },
  buttonArea: {
    borderRadius: 10,
    backgroundColor: '#e5934f',
    width: '90%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  bottomText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: 'gray',
    marginBottom: 5,
  },
});

export default SearchForm;
