import React from 'react';
import { View, Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

const ErrorFallback = ({
  onClose,
  error,
}: {
  onClose: () => void;
  error: any;
}) => {
  console.error('error', error);
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{
          opacity: 1,
          padding: 20,
          marginRight: -20,
          position: 'absolute',
          alignItems: 'flex-end',
          alignSelf: 'flex-end',
        }}
        onPress={onClose}
      >
        <Image
          source={require('../assets/close.png')}
          style={styles.closeImg}
        />
      </TouchableOpacity>
      <View style={styles.imgCont}>
        <Image
          source={require('../assets/danger.png')}
          style={styles.img}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.text}>Something went wrong. Try again</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#727EA3',
    fontWeight: '400',
    marginTop: 10,
  },
  closeImg: {
    width: 32,
    height: 32,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    position: 'absolute',
  },
  img: {
    width: 80,
    height: 80,
  },
  imgCont: {
    marginTop: 100,
    alignItems: 'center',
  },
});

export default ErrorFallback;
