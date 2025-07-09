import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useDecisionStore } from '@/store/decisionStore';
import ResultDisplay from '@/components/ResultDisplay';
import AdBanner from '@/components/AdBanner';
import DynamicBackground from '@/components/DynamicBackground';
import { commonStyles } from '@/styles/common';

export default function ResultScreen() {
  const { result } = useDecisionStore();
  const router = useRouter();

  // If there's no result, redirect back to home
  useEffect(() => {
    if (result === null) {
      router.replace('/');
    }
  }, [result]);

  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <DynamicBackground />
      <ResultDisplay result={result} />
      <AdBanner />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    justifyContent: 'space-between',
  },
});