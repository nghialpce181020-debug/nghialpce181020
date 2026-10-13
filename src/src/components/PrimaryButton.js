import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function PrimaryButton({ title, onPress, variant = 'primary', disabled = false }) {
  const { colors } = useTheme();
  const isPrimary = variant === 'primary';
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        isPrimary
          ? { backgroundColor: colors.primary }
          : { backgroundColor: 'transparent', borderWidth: 1, borderColor: colors.border },
        (pressed || disabled) && { opacity: 0.6 },
      ]}
    >
      <Text style={[styles.label, { color: isPrimary ? colors.onPrimary : colors.text }]}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { paddingVertical: 14, paddingHorizontal: 20, borderRadius: 10, alignItems: 'center' },
  label: { fontSize: 16, fontWeight: '600' },
});
