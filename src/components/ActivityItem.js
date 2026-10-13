import React from 'react';
import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

function ActivityItem({ item, selected, onToggle }) {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={() => onToggle(item.id)}
      style={[
        styles.row,
        { backgroundColor: colors.card, borderColor: selected ? colors.primary : colors.border },
      ]}
    >
      <View style={styles.texts}>
        <Text style={[styles.title, { color: colors.text }]}>{item.title}</Text>
        <Text style={[styles.desc, { color: colors.subtext }]}>{item.description}</Text>
      </View>
      <Text style={[styles.mark, { color: selected ? colors.primary : colors.subtext }]}>
        {selected ? 'Đã chọn' : 'Chọn'}
      </Text>
    </Pressable>
  );
}

export default React.memo(ActivityItem);

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    borderRadius: 12,
    borderWidth: 1.5,
    marginBottom: 10,
  },
  texts: { flex: 1 },
  title: { fontSize: 16, fontWeight: '600' },
  desc: { fontSize: 13, marginTop: 2 },
  mark: { fontSize: 14, fontWeight: '600', marginLeft: 12 },
});
