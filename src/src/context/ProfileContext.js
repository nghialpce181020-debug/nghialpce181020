import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { KEYS, loadJSON, saveJSON } from '../storage/storage';

const ProfileContext = createContext(null);

export const DEFAULT_PROFILE = {
  name: 'Guest User',
  bio: 'Chưa có giới thiệu.',
  avatar: '',
};

const isValidProfile = (p) =>
  p !== null &&
  typeof p === 'object' &&
  typeof p.name === 'string' &&
  p.name.trim().length > 0 &&
  typeof p.bio === 'string' &&
  typeof p.avatar === 'string';

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState(DEFAULT_PROFILE);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    let active = true;
    (async () => {
      const saved = await loadJSON(KEYS.PROFILE, DEFAULT_PROFILE, isValidProfile);
      if (active) {
        setProfile(saved);
        setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  // Trả true nếu lưu thành công. Tạo object mới (không mutate) để consumer re-render.
  const saveProfile = useCallback(async (next) => {
    const newProfile = { ...next };
    const ok = await saveJSON(KEYS.PROFILE, newProfile);
    if (ok) setProfile(newProfile);
    return ok;
  }, []);

  const value = useMemo(() => ({ profile, saveProfile, loaded }), [profile, saveProfile, loaded]);

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
}

export function useProfile() {
  const ctx = useContext(ProfileContext);
  if (!ctx) throw new Error('useProfile must be used inside ProfileProvider');
  return ctx;
}
