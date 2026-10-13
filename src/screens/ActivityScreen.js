import React, { useState, useMemo, useCallback } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { ACTIVITIES } from '../data/activities';
import ActivityItem from '../components/ActivityItem';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';

export default function ActivityScreen() {
  const { colors } = useTheme();
  // Local state: chỉ màn này dùng -> không cần đưa lên Context.
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState('all'); // 'all' | 'selected'

  // Không mutate: luôn tạo mảng mới.
  const toggle = useCallback((id) => {
    setSelectedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  }, []);

  const data = useMemo(
    () => (filter === 'selected' ? ACTIVITIES.filter((a) => selectedIds.includes(a.id)) : ACTIVITIES),
    [filter, selectedIds]
  );

  const renderItem = useCallback(
    ({ item }) => <ActivityItem item={item} selected={selectedIds.includes(item.id)} onToggle={toggle} />,
    [selectedIds, toggle]
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.filters}>
        <View style={styles.filterBtn}>
          <PrimaryButton
            title="Tất cả"
            variant={filter === 'all' ? 'primary' : 'secondary'}
            onPress={() => setFilter('all')}
          />
        </View>
        <View style={styles.filterBtn}>
          <PrimaryButton
            title={`Đã chọn (${selectedIds.length})`}
            variant={filter === 'selected' ? 'primary' : 'secondary'}
            onPress={() => setFilter('selected')}
          />
        </View>
      </View>
      {selectedIds.length > 0 && (
        <View style={styles.clearBar}>
          <PrimaryButton
            title="Bỏ chọn tất cả"
            variant="secondary"
            onPress={() => setSelectedIds([])}
          />
        </View>
      )}
      <FlatList
        data={data}
        extraData={selectedIds}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<EmptyState message="Chưa có mục nào được chọn. Hãy quay lại “Tất cả” để chọn." />}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  filters: { flexDirection: 'row', padding: 16, paddingBottom: 8 },
  filterBtn: { flex: 1, marginHorizontal: 4 },
  clearBar: { paddingHorizontal: 20, paddingBottom: 8 },
  list: { padding: 16, paddingTop: 8 },
});
