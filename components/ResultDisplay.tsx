import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Share, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { Share2, RotateCcw } from 'lucide-react-native';
import Logo from '@/components/Logo';
import Colors from '@/constants/colors';
import { commonStyles } from '@/styles/common';

interface ResultDisplayProps {
  result: string;
}

const ResultDisplay = ({ result }: ResultDisplayProps) => {
  const router = useRouter();
  const scaleAnim = useRef(new Animated.Value(0.5)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;
  const bounceAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
      Animated.spring(bounceAnim, {
        toValue: 1,
        friction: 8,
        tension: 100,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleShare = async () => {
    try {
      await Share.share({
        message: `I used Decision Maker and got: ${result}`,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleNewDecision = () => {
    router.replace('/');
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size="medium" showText={false} />
      </View>
      
      <Text style={styles.resultLabel}>Your decision is:</Text>
      
      <Animated.View 
        style={[
          styles.resultCard,
          {
            opacity: opacityAnim,
            transform: [
              { scale: scaleAnim },
              { 
                translateY: bounceAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [20, 0],
                })
              }
            ],
          }
        ]}
      >
        <Text style={styles.resultText}>{result}</Text>
      </Animated.View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.shareButton} 
          onPress={handleShare}
        >
          <Share2 size={18} color="#FFFFFF" />
          <Text style={styles.shareButtonText}>Share</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.newDecisionButton}
          onPress={handleNewDecision}
        >
          <RotateCcw size={18} color="#FFFFFF" />
          <Text style={styles.newDecisionText}>Try Again</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.centeredContent,
    padding: 20,
  },
  logoContainer: {
    marginBottom: 20,
  },
  resultLabel: {
    fontSize: 18,
    color: Colors.light.subtext,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '500',
  },
  resultCard: {
    backgroundColor: Colors.light.card,
    borderRadius: 20,
    padding: 32,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 8,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  resultText: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.light.primary,
    textAlign: 'center',
    lineHeight: 36,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    gap: 16,
  },
  shareButton: {
    backgroundColor: Colors.light.secondary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  newDecisionButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
    flex: 1,
  },
  newDecisionText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default ResultDisplay;