import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { X } from 'lucide-react-native';
import Colors from '@/constants/colors';
import { commonStyles } from '@/styles/common';

interface ChoiceInputProps {
  value: string;
  index: number;
  onChange: (value: string) => void;
  onRemove: () => void;
  showRemoveButton: boolean;
}

const ChoiceInput = ({ 
  value, 
  index, 
  onChange, 
  onRemove, 
  showRemoveButton 
}: ChoiceInputProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChange}
        placeholder={`Option ${index + 1}`}
        placeholderTextColor={Colors.light.subtext}
      />
      {showRemoveButton && (
        <TouchableOpacity 
          style={styles.removeButton} 
          onPress={onRemove}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <X size={18} color={Colors.light.subtext} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  input: {
    ...commonStyles.input,
    flex: 1,
    fontSize: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 12,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  removeButton: {
    marginLeft: 12,
    padding: 10,
    borderRadius: 10,
    backgroundColor: Colors.light.card,
    shadowColor: Colors.light.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
});

export default ChoiceInput;