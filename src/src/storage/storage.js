import AsyncStorage from '@react-native-async-storage/async-storage';

export const KEYS = {
  PROFILE: '@mma301/profile',
  THEME: '@mma301/theme',
};

// Đọc JSON an toàn: key chưa có (first-run), JSON hỏng, hoặc sai cấu trúc -> trả fallback, không crash.
export async function loadJSON(key, fallback, isValid) {
  try {
    const raw = await AsyncStorage.getItem(key);
    if (raw === null) return fallback;
    const parsed = JSON.parse(raw);
    if (isValid && !isValid(parsed)) return fallback;
    return parsed;
  } catch (e) {
    console.warn('[storage] load failed for', key, e);
    return fallback;
  }
}

// Ghi JSON; trả true/false để caller biết có ghi thành công không.
export async function saveJSON(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (e) {
    console.warn('[storage] save failed for', key, e);
    return false;
  }
}
