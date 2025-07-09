import React, { useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform 
} from 'react-native';
import { Plus } from 'lucide-react-native';
import { useDecisionStore } from '@/store/decisionStore';
import ChoiceInput from '@/components/ChoiceInput';
import DecisionButton from '@/components/DecisionButton';
import AdBanner from '@/components/AdBanner';
import Logo from '@/components/Logo';
import DynamicBackground from '@/components/DynamicBackground';
import Colors from '@/constants/colors';
import { commonStyles } from '@/styles/common';

export default function HomeScreen() {
  const { choices, updateChoice, addChoice, removeChoice, makeDecision, clearResult } = useDecisionStore();

  // Clear any previous result when visiting the home screen
  useEffect(() => {
    clearResult();
  }, []);

  const handleAddChoice = () => {
    addChoice('');
  };

  const handleRemoveChoice = (index: number) => {
    if (choices.length > 2) {
      removeChoice(index);
    }
  };

  const handleUpdateChoice = (index: number, value: string) => {
    updateChoice(index, value);
  };

  const handleDecide = () => {
    makeDecision();
  };

  // Check if we have at least two valid choices
  const hasValidChoices = choices.filter(choice => choice.trim() !== '').length >= 2;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <DynamicBackground />
      <ScrollView 
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.header}>
          <Logo size="large" />
          <Text style={styles.subtitle}>
            Add your options below and let the app decide for you!
          </Text>
        </View>

        <View style={styles.choicesContainer}>
          {choices.map((choice, index) => (
            <ChoiceInput
              key={`choice-${index}`}
              value={choice}
              index={index}
              onChange={(value) => handleUpdateChoice(index, value)}
              onRemove={() => handleRemoveChoice(index)}
              showRemoveButton={choices.length > 2}
            />
          ))}

          <TouchableOpacity 
            style={styles.addButton}
            onPress={handleAddChoice}
          >
            <Plus size={20} color="#FFFFFF" />
            <Text style={styles.addButtonText}>Add Option</Text>
          </TouchableOpacity>
        </View>

        <DecisionButton 
          onPress={handleDecide} 
          disabled={!hasValidChoices} 
        />

        {!hasValidChoices && (
          <Text style={styles.helperText}>
            Enter at least 2 options to make a decision
          </Text>
        )}
      </ScrollView>
      
      <AdBanner />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
  },
  contentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 32,
    alignItems: 'center',
  },
  subtitle: {
    ...commonStyles.subtitle,
    textAlign: 'center',
    marginTop: 16,
  },
  choicesContainer: {
    width: '100%',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.secondary,
    borderRadius: 12,
    paddingVertical: 14,
    marginTop: 8,
    marginBottom: 20,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
  helperText: {
    textAlign: 'center',
    color: Colors.light.subtext,
    marginTop: 10,
    fontSize: 14,
  },
});