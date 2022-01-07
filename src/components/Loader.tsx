import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.wrapper}>
      <ActivityIndicator size="small" color="#0B3779" />
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '100%',
  },
});

export default Loader;
