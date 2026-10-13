import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { ThemeProvider, useTheme } from './src/context/ThemeContext';
import { ProfileProvider, useProfile } from './src/context/ProfileContext';
import AppNavigator from './src/navigation/AppNavigator';

// Chờ cả theme và profile hydrate xong từ AsyncStorage rồi mới render UI
// -> tránh "nháy" sai giao diện (light rồi mới sang dark).
function Root() {
  const { loaded: themeLoaded } = useTheme();
  const { loaded: profileLoaded } = useProfile();

  if (!themeLoaded || !profileLoaded) {
    return (
      <View style={styles.splash}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return <AppNavigator />;
}

export default function App() {
  return (
    <ThemeProvider>
      <ProfileProvider>
        <Root />
      </ProfileProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  splash: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F5F6FA' },
});
