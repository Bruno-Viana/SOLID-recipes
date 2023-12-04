import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TagContainer = ({ tags }) => {
  return (
    <View style={styles.tagContainer}>
      {tags.map((tag, index) => (
        <View key={index} style={styles.tag}>
          <Text style={styles.tagText}>{tag}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },
  tag: {
    backgroundColor: '#ff8e3a',
    padding: 5,
    margin: 2,
    borderRadius: 8,
  },
  tagText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TagContainer;
