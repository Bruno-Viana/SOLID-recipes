import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, Image, StyleSheet, ActivityIndicator, TouchableOpacity, FlatList } from 'react-native';
import { WebView } from 'react-native-webview';
import { handleDataToObj } from '../structure/recipeObj';
import { nextPage, recipeObjList } from '../api/constants';
import { requestData } from '../api/axiosGet';
import { detectScrollCloseToBottom } from '../utils/scrollEventHandler';
import { faArrowLeft, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import TagContainer from '../components/tagContainer';
import CustomButton from '../components/customButton';

const FoundRecipes = () => {
  const [loading, setLoading] = useState(true);
  const [observableRecipes, setObservableRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [onEndReachedTriggered, setOnEndReachedTriggered] = useState(false);
  const [onScrolledTop, setOnScrolledTop] = useState(false);

  useEffect(() => {
    handleObservableRecipes(recipeObjList);
  }, []);

  const handleObservableRecipes = (value) => {
    setObservableRecipes((prevState) => [...prevState, ...value]);
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

  const scrollToTop = useCallback(async () => {
    setOnScrolledTop(true);
    if (flatListRef.current) {
      await flatListRef.current.scrollToOffset({ offset: 0, animated: true });
      setShowScrollToTop(false);
    }
    setOnScrolledTop(false);
  }, []);

  const handleImageLoad = () => {
    setLoading(false);
  };

  const flatListRef = useRef();

  useEffect(() => {
    if (showScrollToTop && onScrolledTop) {
      setShowScrollToTop(false);
    }
  }, [showScrollToTop, onScrolledTop]);

  return (
    <>
      <FlatList
        ref={flatListRef}
        contentContainerStyle={styles.scrollContainer}
        data={observableRecipes}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.recipeContainer}
            onPress={() => openWebView(item.instructionsUrl)}>
            <Image
              onLoad={handleImageLoad}
              style={styles.recipeImage}
              source={{ uri: item.thumbnailUrl }}
            />
            <Text style={styles.recipeLabel}>{item.label}</Text>
            <Text style={styles.source}>Source: {item.source}</Text>

            <TagContainer
              tags={[
                `Cooking time: ${item.totalTime} minutes`,
                `Calories: ${item.calories.toFixed(0)}kcal`,
                `Proteins: ${item.proteins.toFixed(0)}g`,
                `Carbs: ${item.carbs.toFixed(0)}g`,
                `Fats: ${item.fats.toFixed(0)}g`,
              ]}
            />

            {loading && <ActivityIndicator size="small" color="#008ad6" />}
          </TouchableOpacity>
        )}
        onScroll={(event) => {
          if (detectScrollCloseToBottom(event.nativeEvent) && !onScrolledTop) {
            setShowScrollToTop(true);
            setOnEndReachedTriggered(false);
          }
        }}
        onEndReached={async () => {
          if (!onEndReachedTriggered) {
            setShowScrollToTop(true);
            setOnEndReachedTriggered(true);
            await fetchDataAndHandleObservable();
          }
        }}
      />

      {selectedRecipe && (
        <View style={styles.webViewContainer}>
          <WebView source={{ uri: selectedRecipe }} style={styles.webView} />
          <CustomButton onPress={closeWebView} text={'Close WebView'} iconFromFA={faArrowLeft} />
        </View>
      )}

      {!selectedRecipe && showScrollToTop && (
        <View style={styles.scrollButtonContainer}>
          <CustomButton
            onPress={scrollToTop}
            text={''}
            iconFromFA={faArrowUp}
            additionalButtonStyle={styles.scrollButton}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  scrollButtonContainer: {
    position: 'absolute',
    bottom: 45,
    right: 45,
  },
  scrollButton: {
    width: 35,
    height: 40,
  },
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
  icon: {
    marginRight: 5,
  },
});

export default FoundRecipes;
