import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { handleDataToObj, nextPage, recipeObjList } from '../structure/recipeObj';
import { detectScrollCloseToBottom } from '../utils/scrollEventHandler';
import { requestData } from '../utils/requestData';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons/faArrowLeft';

const FoundRecipes = () => {
  const [loading, setLoading] = useState(true);
  const [observableRecipes, setObservableRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [scrolledItems, setScrolledItems] = useState(0);

  useEffect(() => {
    handleObservableRecipes(recipeObjList);
  }, []);

  const handleObservableRecipes = (value) => {
    setObservableRecipes(value);
  };

  const fetchDataAndHandleObservable = async () => {
    try {
      const newData = await requestData(nextPage);
      handleDataToObj(newData);
      handleObservableRecipes([...recipeObjList]);
    } catch (error) {
      console.error('Err: ', error);
    }
  };

  const openWebView = (url) => {
    setSelectedRecipe(url);
  };

  const closeWebView = () => {
    setSelectedRecipe(null);
  };

  const handleImageLoad = () => {
    setLoading(false);
  };

  const scrollViewRef = useRef(); //Scrolls to Y

  return (
    <>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.scrollContainer}
        onScroll={async ({ nativeEvent }) => {
          if (detectScrollCloseToBottom(nativeEvent) && nextPage !== "") {
            await fetchDataAndHandleObservable();
          }
          const itemHeight = 200;
          const scrolledItemsCount = Math.floor(nativeEvent.contentOffset.y / itemHeight);

          setScrolledItems(scrolledItemsCount);
          setShowScrollToTop(scrolledItemsCount > 3);
        }}>
        {observableRecipes.map((recipe, index) => (
          <TouchableOpacity
            key={index}
            style={styles.recipeContainer}
            onPress={() => openWebView(recipe.instructionsUrl)}>
            <Image
              onLoad={handleImageLoad}
              style={styles.recipeImage}
              source={{
                uri: recipe.thumbnailUrl,
              }}
            />
            <Text style={styles.recipeLabel}>{recipe.label}</Text>
            <Text style={styles.source}>Source: {recipe.source}</Text>
            {loading && <ActivityIndicator size="small" color="#008ad6" />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {selectedRecipe && (
        <View style={styles.webViewContainer}>
          <WebView
            source={{ uri: selectedRecipe }}
            style={styles.webView}
          />
          <TouchableOpacity onPress={closeWebView} style={styles.closeButton}>
            <FontAwesomeIcon icon={faArrowLeft} color="#fff" size={15} style={styles.icon} />
            <Text style={styles.closeButtonText}>Close WebView</Text>
          </TouchableOpacity>
        </View>
      )}

      {showScrollToTop && (
        <TouchableOpacity
          onPress={() => {
            if (scrollViewRef.current) {
              scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
            }
          }}
          style={styles.scrollButton}>
          <Text style={styles.scrollButtonText}>Scroll to Top</Text>
        </TouchableOpacity>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: '#fff',
  },
  source: {
    fontSize: 14,
    color: 'grey',
    marginBottom: 5,
  },
  recipeContainer: {
    backgroundColor: '#e3e3e3',
    borderRadius: 10,
    margin: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  recipeImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    resizeMode: 'cover',
  },
  recipeLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  webViewContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  webView: {
    borderRadius: 15,
    overflow: 'hidden',
  },
  closeButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    backgroundColor: 'red',
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  icon: {
    marginRight: 5,
  },
  scrollButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#008ad6',
    padding: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scrollButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default FoundRecipes;
