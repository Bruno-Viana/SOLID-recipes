import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { handleDataToObj, nextPage, recipeObjList } from '../structure/recipeObj';
import { detectScrollCloseToBottom } from '../utils/scrollEventHandler';
import { requestData } from '../utils/requestData';

const FoundRecipes = () => {
  const [loading, setLoading] = useState(true);
  const handleImageLoad = () => {
    setLoading(false);
  };
  const [observableRecipes, setObservableRecipes] = useState([]);
  const handleObservableRecipes = (value) => {
    setObservableRecipes(value);
  };

  useEffect(() => {
    handleObservableRecipes(recipeObjList)
  }, []);

  const fetchDataAndHandleObservable = async () => {
    try {
      const newData = await requestData(nextPage);
      handleDataToObj(newData);
      handleObservableRecipes([...recipeObjList]);
    } catch (error) {
      console.error('Err: ', error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContainer}
      onScroll={async ({ nativeEvent }) => {
        if (detectScrollCloseToBottom(nativeEvent) && nextPage !== "") {
          await fetchDataAndHandleObservable();
        }
      }}>
      {observableRecipes.map((recipe, index) => (
        <View key={index} style={styles.recipeContainer}>
          <Text style={styles.recipeLabel}>{recipe.label}</Text>
          {loading && (
            <ActivityIndicator size="small" color="#008ad6" />
          )}
          <View style={styles.imageContainer}>
            <Image
              onLoad={handleImageLoad}
              style={styles.logo}
              source={{
                uri: recipe.thumbnailUrl,
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingTop: 20,
    alignItems: 'center',
    backgroundColor: '#944d2d',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  recipeContainer: {
    paddingTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
  recipeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center'
  },
  imageContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 15,
    overflow: 'hidden',
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 150,
    height: 120,
    borderRadius: 15,
  },
});

export default FoundRecipes;
