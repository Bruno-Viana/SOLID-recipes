import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

const CustomButton = ({ onPress, text, iconFromFA}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.closeButton}>
      <FontAwesomeIcon icon={iconFromFA} color="#fff" size={15} style={styles.icon} />
      <Text style={styles.closeButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    position: 'absolute',
    left: 5,
    top: 5,
    backgroundColor: '#E97451',
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
});

export default CustomButton;
