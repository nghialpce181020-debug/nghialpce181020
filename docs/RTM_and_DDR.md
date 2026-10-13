# Requirement Traceability Matrix

| ID | Yêu cầu | Bằng chứng UI/code | Test (docs/TEST_MATRIX.md) |
|---|---|---|---|
| R01 | Expo/RN project chạy đúng quy ước | `package.json`, `app.json`, `App.js` | T01, T12 |
| R02 | Navigation ≥5 screen | `src/navigation/AppNavigator.js` | T12 |
| R03 | Profile hiển thị dữ liệu | `ProfileScreen`, `ProfileCard` | T01, T02 |
| R04 | Edit Profile + validation | `EditProfileScreen`, `profileSchema.js` | T03, T04, T05 |
| R05 | Theme/preference bằng Context | `ThemeContext`, `ThemeToggle` (Home + Settings) | T06 |
| R06 | FlatList Activity/Interests | `ActivityScreen`, `ActivityItem` | T08, T09, T10 |
| R07 | Persistence AsyncStorage | `storage.js`, hydrate trong 2 Context | T01, T07 |
| R08 | Reusable components | `ProfileCard`, `ThemeToggle`, `ActivityItem`, `FormField`, `PrimaryButton`, `EmptyState` | T02, T06 |
| R09 | Responsive Flexbox/StyleSheet | `StyleSheet` + flex trong mọi screen/component | T12 |
| R10 | Error/fallback state | `loadJSON` fallback, Yup errors, `EmptyState` | T03, T09, T11 |

# Design Decision Record

| Quyết định | Lựa chọn | Lý do | Impact nếu đổi requirement |
|---|---|---|---|
| Navigation | Native Stack, 5 route; Edit là route con của Profile | Đề cho phép Stack; luồng Home -> Profile -> Edit tuyến tính, back tự nhiên; Edit unmount khi back nên form tự reset | Thêm screen cần profile: thêm 1 `Stack.Screen`, không đổi state |
| State ownership | Profile + theme ở Context; form và list/filter ở local | Profile/theme nhiều screen cần đọc; form gắn vòng đời EditProfile; list chỉ dùng ở Activity | Nếu Home cần đếm mục đã chọn: nâng `selectedIds` lên Context |
| Persistence / hydration | `storage.js` helper (`loadJSON`/`saveJSON`); Provider hydrate trong `useEffect` + cờ `loaded`; `App.js` chờ cả hai | Tập trung try/catch + fallback; tránh nháy theme | Thêm field phone: sửa `DEFAULT_PROFILE`, `isValidProfile`, schema, form, `ProfileCard` |
| List item structure | `FlatList` + `ActivityItem` (React.memo) + `keyExtractor = item.id` + `extraData` | id ổn định, tránh dùng index; item tách riêng để tái sử dụng/giảm re-render | Thêm sort/section: đổi sang SectionList hoặc sort trong `useMemo` |
| Folder/component reuse | Tách `screens/components/context/storage/validation/data` | Mỗi thư mục một trách nhiệm; component dùng lại ở nhiều screen | Đổi storage sang API: chỉ sửa `storage.js`/Context |
