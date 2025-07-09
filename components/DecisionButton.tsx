import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Platform } from 'react-native';
import { Sparkles } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { commonStyles } from '@/styles/common';

interface DecisionButtonProps {
  onPress: () => void;
  disabled: boolean;
}

const DecisionButton = ({ onPress, disabled }: DecisionButtonProps) => {
  const router = useRouter();
  const [isPressed, setIsPressed] = React.useState(false);

  const handlePress = async () => {
    if (disabled) return;
    
    // Trigger haptic feedback on mobile
    if (Platform.OS !== 'web') {
      await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    setIsPressed(true);
    
    // Simulate a brief loading state for better UX
    setTimeout(() => {
      onPress();
      setIsPressed(false);
      router.push('/result');
    }, 600);
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        disabled && styles.buttonDisabled,
        isPressed && styles.buttonPressed
      ]}
      onPress={handlePress}
      disabled={disabled || isPressed}
      activeOpacity={0.8}
    >
      {isPressed ? (
        <ActivityIndicator color="#FFFFFF" size="small" />
      ) : (
        <>
          <Sparkles size={20} color="#FFFFFF" />
          <Text style={styles.buttonText}>Decide!</Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    ...commonStyles.button,
    backgroundColor: Colors.light.primary,
    paddingVertical: 18,
    marginTop: 24,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 6,
  },
  buttonDisabled: {
    backgroundColor: Colors.light.border,
    shadowOpacity: 0.1,
  },
  buttonPressed: {
    backgroundColor: '#4A8AC0', // Darker shade of primary
    transform: [{ scale: 0.96 }],
    shadowOpacity: 0.15,
  },
  buttonText: {
    ...commonStyles.buttonText,
    fontSize: 18,
    fontWeight: '700',
  },
});

export default DecisionButton;