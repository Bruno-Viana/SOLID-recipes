import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MyStatusBar from './src/components/statusabar';
import SearchForm from './src/components/searchform';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <View>
          <Text>Open up App.js to start wosrking on your app!</Text>
          <MyStatusBar/> 
          <SearchForm/>
        </View>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#944d3d',
    flex: 1,   
    alignItems: 'center',
    justifyContent: 'center',
  },
});
