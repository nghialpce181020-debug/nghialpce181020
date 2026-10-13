import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from '../components/ThemeToggle';

export default function SettingsScreen() {
  const { colors, mode } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggle />
      <Text style={[styles.note, { color: colors.subtext }]}>
        Giao diện hiện tại: {mode === 'dark' ? 'Dark' : 'Light'}. Lựa chọn được lưu và giữ lại khi mở lại app.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  note: { marginTop: 12, fontSize: 14 },
});
