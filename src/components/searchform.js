import React, { useState } from 'react';
import { Text, TextInput, View, TouchableHighlight, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons/faSearch';
import { requestData } from '../utils/requestdata';
import FoundRecipes from './foundrecipes';

const SearchForm = () => {
  const [showFoundRecipes, setShowFoundRecipes] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [dataFromAPI, setData] = useState('')

  const url = "https://api.edamam.com/api/recipes/v2?type=public&q=" + searchText + "&app_id=6bd1601d&app_key=49f019b3f5b8128868dce0126a6e100b"
  const handleSearch = async () => {
    try {
      setData(await requestData(url));
      setShowFoundRecipes(true);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>SearchForm</Text>      
      <TextInput 
        style={styles.textinput}
        placeholder="Search for recipes ex: Caesar Salad"
        value={searchText}
        onChangeText={(text) => setSearchText(text)} 
      />
      <TouchableHighlight onPress={handleSearch} style={styles.buttonarea}>
        <View>
          <FontAwesomeIcon icon={faSearch} color="#fff" size={25} />
        </View>
      </TouchableHighlight>
      {showFoundRecipes && <FoundRecipes url={url} dataReceived={dataFromAPI} />}
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