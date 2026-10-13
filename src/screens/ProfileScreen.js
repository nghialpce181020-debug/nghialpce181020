import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import ProfileCard from '../components/ProfileCard';
import PrimaryButton from '../components/PrimaryButton';

export default function ProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile } = useProfile();

  return (
    <ScrollView style={{ backgroundColor: colors.background }} contentContainerStyle={styles.content}>
      <ProfileCard profile={profile} />
      <View style={styles.gap} />
      <PrimaryButton title="Edit" onPress={() => navigation.navigate('EditProfile')} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  gap: { height: 16 },
});
