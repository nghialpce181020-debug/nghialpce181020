import React, { createContext, useContext, useEffect, useMemo, useState, useCallback } from 'react';
import { lightColors, darkColors } from '../constants/theme';
import { KEYS, loadJSON, saveJSON } from '../storage/storage';

const ThemeContext = createContext(null);

const isValidMode = (v) => v === 'light' || v === 'dark';

export function ThemeProvider({ children }) {
  const [mode, setMode] = useState('light'); // default an toàn cho first-run
  const [loaded, setLoaded] = useState(false);

  // Hydrate khi app khởi động
  useEffect(() => {
    let active = true;
    (async () => {
      const saved = await loadJSON(KEYS.THEME, 'light', isValidMode);
      if (active) {
        setMode(saved);
        setLoaded(true);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  const toggleTheme = useCallback(() => {
    const next = mode === 'light' ? 'dark' : 'light';
    setMode(next); // cập nhật UI ngay
    saveJSON(KEYS.THEME, next); // persist
  }, [mode]);

  const value = useMemo(
    () => ({
      mode,
      isDark: mode === 'dark',
      colors: mode === 'dark' ? darkColors : lightColors,
      toggleTheme,
      loaded,
    }),
    [mode, toggleTheme, loaded]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
