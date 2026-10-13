import React, { useState } from 'react';
import { ScrollView, View, Alert, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import { useTheme } from '../context/ThemeContext';
import { useProfile } from '../context/ProfileContext';
import { profileSchema } from '../validation/profileSchema';
import FormField from '../components/FormField';
import PrimaryButton from '../components/PrimaryButton';

export default function EditProfileScreen({ navigation }) {
  const { colors } = useTheme();
  const { profile, saveProfile } = useProfile();
  const [saving, setSaving] = useState(false);

  // Chỉ chạy khi validation đã qua -> dữ liệu lỗi không bao giờ tới saveProfile.
  const handleSave = async (values) => {
    setSaving(true);
    const ok = await saveProfile({
      name: values.name.trim(),
      bio: values.bio.trim(),
      avatar: values.avatar.trim(),
    });
    setSaving(false);
    if (ok) {
      navigation.goBack();
    } else {
      Alert.alert('Lỗi', 'Không thể lưu dữ liệu. Vui lòng thử lại.');
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Formik
        initialValues={{ name: profile.name, bio: profile.bio, avatar: profile.avatar }}
        validationSchema={profileSchema}
        onSubmit={handleSave}
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <View>
            <FormField
              label="Tên"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              error={touched.name && errors.name}
              placeholder="Nhập tên"
            />
            <FormField
              label="Bio"
              value={values.bio}
              onChangeText={handleChange('bio')}
              onBlur={handleBlur('bio')}
              error={touched.bio && errors.bio}
              placeholder="Giới thiệu ngắn"
              multiline
            />
            <FormField
              label="Avatar (URL, không bắt buộc)"
              value={values.avatar}
              onChangeText={handleChange('avatar')}
              onBlur={handleBlur('avatar')}
              error={touched.avatar && errors.avatar}
              placeholder="https://..."
              autoCapitalize="none"
              autoCorrect={false}
            />
            <PrimaryButton title={saving ? 'Đang lưu...' : 'Save'} onPress={handleSubmit} disabled={saving} />
            <View style={styles.gap} />
            <PrimaryButton title="Cancel" variant="secondary" onPress={() => navigation.goBack()} />
          </View>
        )}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: { padding: 16 },
  gap: { height: 12 },
});
