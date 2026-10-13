import React from 'react';
import { ScrollView, Text, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import PrimaryButton from '../components/PrimaryButton';
import ThemeToggle from '../components/ThemeToggle';

export default function HomeScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile } = useProfile();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <Text style={[styles.welcome, { color: colors.text }]}>Xin chào, {profile.name}!</Text>
      <ProfileCard profile={profile} />
      <View style={styles.gap} />
      <PrimaryButton title="Xem Profile" onPress={() => navigation.navigate('Profile')} />
      <View style={styles.gap} />
      <PrimaryButton title="Hoạt động / Sở thích" onPress={() => navigation.navigate('Activity')} />
      <View style={styles.gap} />
      <PrimaryButton title="Cài đặt" variant="secondary" onPress={() => navigation.navigate('Settings')} />
      <View style={styles.gap} />
      <ThemeToggle />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16, paddingBottom: 32 },
  welcome: { fontSize: 22, fontWeight: '700', marginBottom: 16 },
  gap: { height: 12 },
});
