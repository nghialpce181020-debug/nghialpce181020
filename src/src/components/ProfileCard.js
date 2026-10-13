import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileCard({ profile }) {
  const { colors } = useTheme();
  const [imageFailed, setImageFailed] = useState(false);

  // Đổi URL avatar thì thử tải lại (tránh kẹt ở trạng thái lỗi của URL cũ)
  useEffect(() => {
    setImageFailed(false);
  }, [profile.avatar]);

  const showImage = profile.avatar && !imageFailed;
  const initial = profile.name.trim().charAt(0).toUpperCase();

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {showImage ? (
        <Image
          source={{ uri: profile.avatar }}
          style={styles.avatar}
          onError={() => setImageFailed(true)}
        />
      ) : (
        <View style={[styles.avatar, styles.placeholder, { backgroundColor: colors.primary }]}>
          <Text style={[styles.initial, { color: colors.onPrimary }]}>{initial}</Text>
        </View>
      )}
      <Text style={[styles.name, { color: colors.text }]}>{profile.name}</Text>
      <Text style={[styles.bio, { color: colors.subtext }]}>{profile.bio || 'Chưa có giới thiệu.'}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { alignItems: 'center', padding: 20, borderRadius: 14, borderWidth: 1 },
  avatar: { width: 88, height: 88, borderRadius: 44, marginBottom: 12 },
  placeholder: { alignItems: 'center', justifyContent: 'center' },
  initial: { fontSize: 36, fontWeight: '700' },
  name: { fontSize: 20, fontWeight: '700', marginBottom: 6 },
  bio: { fontSize: 14, textAlign: 'center' },
});
