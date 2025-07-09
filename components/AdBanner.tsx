import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '@/constants/colors';

const AdBanner = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.adText}>Ad Space</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    backgroundColor: Colors.light.card,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: Colors.light.border,
    width: '100%',
  },
  adText: {
    color: Colors.light.subtext,
    fontSize: 12,
  },
});

export default AdBanner;