import React from 'react';
import { View, Text, Alert, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import ThemeToggle from '../components/ThemeToggle';
import PrimaryButton from '../components/PrimaryButton';

export default function SettingsScreen() {
  const { colors, mode, resetTheme } = useTheme();
  const { resetProfile } = useProfile();

  const handleReset = () => {
    Alert.alert(
      'Đặt lại dữ liệu',
      'Bạn có chắc muốn khôi phục Profile và Theme về mặc định không?',
      [
        { text: 'Hủy', style: 'cancel' },
        {
          text: 'Đồng ý',
          style: 'destructive',
          onPress: async () => {
            await Promise.all([resetProfile(), resetTheme()]);
            Alert.alert('Thành công', 'Đã đặt lại dữ liệu về mặc định (first-run state).');
          },
        },
      ]
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ThemeToggle />
      <Text style={[styles.note, { color: colors.subtext }]}>
        Giao diện hiện tại: {mode === 'dark' ? 'Dark' : 'Light'}. Lựa chọn được lưu và giữ lại khi mở lại app.
      </Text>
      <View style={styles.separator} />
      <Text style={[styles.sectionTitle, { color: colors.text }]}>Quản lý dữ liệu</Text>
      <PrimaryButton
        title="Đặt lại dữ liệu gốc (Reset Defaults)"
        variant="secondary"
        onPress={handleReset}
      />
      <Text style={[styles.helpText, { color: colors.subtext }]}>
        Dùng để kiểm thử trạng thái khởi động lần đầu (first-run) hoặc khôi phục khi dữ liệu bị lỗi.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  note: { marginTop: 12, fontSize: 14 },
  separator: { height: 24 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  helpText: { marginTop: 8, fontSize: 12 },
});
