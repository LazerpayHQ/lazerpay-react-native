import React from 'react';
import { View, Modal, StyleSheet, Platform } from 'react-native';
import type { SDKWrapperProps } from '../@types';

const SDKWrapper = ({ visible, onRequestClose, children }: SDKWrapperProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      {...{ visible, onRequestClose }}
    >
      <View style={styles.container}>
        <View style={styles.mainView}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    paddingTop: Platform.OS === 'ios' ? 48 : 36,
    position: 'relative',
  },
  mainView: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    backgroundColor: '#fff',
    overflow: 'hidden',
    height: '100%',
  },
});

export default SDKWrapper;
