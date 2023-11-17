import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import MyStatusBar from './src/components/statusBar';
import SearchForm from './src/components/searchForm';

export default function App() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <MyStatusBar />
        <SearchForm />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#944d3d',
  },
  container: {
    flex: 1,
  },
});
