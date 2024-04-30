import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CommonCheckBox = ({ imageSource, onToggle, isChecked , uncheckedImage}) => {
  const toggleCheckbox = () => {
    onToggle(!isChecked);
  };

  return (
    <TouchableOpacity onPress={toggleCheckbox} style={styles.checkboxContainer}>
      <View style={[styles.checkbox, isChecked && styles.checked]}>
        {isChecked ? <Image source={imageSource} style={styles.image} /> : <Image source={uncheckedImage} style={styles.image} /> }
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    
    // Change the background color when checked
  },
  image: {
    width: 30,
    height: 30,
  },
});

export default CommonCheckBox;
