import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Dices } from 'lucide-react-native';
import Colors from '@/constants/colors';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  showText?: boolean;
}

const Logo = ({ size = 'medium', showText = true }: LogoProps) => {
  const sizeConfig = {
    small: { iconSize: 20, fontSize: 14, containerSize: 40 },
    medium: { iconSize: 28, fontSize: 18, containerSize: 56 },
    large: { iconSize: 36, fontSize: 24, containerSize: 72 },
  };

  const config = sizeConfig[size];

  return (
    <View style={styles.container}>
      <View style={[styles.iconContainer, { 
        width: config.containerSize, 
        height: config.containerSize 
      }]}>
        <Dices size={config.iconSize} color="#FFFFFF" />
      </View>
      {showText && (
        <Text style={[styles.logoText, { fontSize: config.fontSize }]}>
          Decision Maker
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logoText: {
    fontWeight: '700',
    color: Colors.light.text,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default Logo;