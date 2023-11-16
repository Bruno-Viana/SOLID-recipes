import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

import MyStatusBar from './src/components/statusBar';
import SearchForm from './src/components/searchForm';

export default function App() {
  return (
      <SafeAreaView style={styles.container}>
        <View>
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
