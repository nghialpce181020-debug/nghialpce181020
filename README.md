# Profile & Activity App (MMA301 – Assignment 1)

## 1. Overview
Ứng dụng React Native (Expo, JavaScript) gồm 5 màn hình: Home, Profile, Edit Profile, Activity/Interests, Settings.
Hoạt động như một workflow thống nhất: dữ liệu profile và theme được lưu bằng AsyncStorage, chia sẻ qua Context.

## 2. Cách chạy
```bash
npm install
npx expo install --fix   # căn chỉnh version dependency theo Expo SDK đang dùng
npx expo start           # mở bằng Expo Go hoặc emulator (a = Android, i = iOS)
```
Yêu cầu: Node.js LTS, Expo Go (hoặc Android Studio / Xcode).

## 3. Screen / Workflow map
```
Home ─┬─> Profile ──> EditProfile (Save / Cancel -> quay lại Profile)
      ├─> Activity (FlatList + chọn + lọc Tất cả/Đã chọn)
      └─> Settings (Light/Dark toggle)
```
Home và Settings đều có ThemeToggle.

## 4. State / Persistence strategy
| State | Loại | Vị trí |
|---|---|---|
| Form name/bio/avatar/errors | local | Formik trong EditProfileScreen |
| Danh sách chọn + filter | local | ActivityScreen (`useState`) |
| profile | shared + persistent | `ProfileContext` + AsyncStorage key `@mma301/profile` |
| theme mode | shared + persistent | `ThemeContext` + AsyncStorage key `@mma301/theme` |

- **Hydrate:** mỗi Provider đọc AsyncStorage trong `useEffect` khi mount, có cờ `loaded`; `App.js` hiển thị loading cho đến khi cả hai xong -> không nháy sai theme.
- **Fallback:** key chưa có (first-run), JSON hỏng, hoặc sai cấu trúc -> dùng default (`loadJSON` trong `src/storage/storage.js`), không crash.
- **Save profile:** validate (Yup) -> ghi AsyncStorage -> nếu thành công mới `setProfile` (object mới, không mutate) -> mọi screen đọc profile cập nhật ngay, không cần restart.

## 5. Cấu trúc thư mục
```
App.js
src/navigation/AppNavigator.js
src/context/{ThemeContext,ProfileContext}.js
src/storage/storage.js
src/validation/profileSchema.js
src/data/activities.js
src/screens/*.js
src/components/{ProfileCard,ThemeToggle,ActivityItem,FormField,PrimaryButton,EmptyState}.js
docs/  (RTM + DDR, test matrix, debug logs, AI log)
```

## 6. Limitations
- Danh sách Activity/Interests và lựa chọn của người dùng chỉ lưu trong state (không persist) vì đề chỉ yêu cầu persist profile/theme/preference.
- Avatar là URL (cần mạng); lỗi tải ảnh -> hiển thị chữ cái đầu.
- Chỉ hỗ trợ portrait; không có authentication/backend (ngoài phạm vi đề).

## 7. AI usage
Xem `docs/AI_USAGE_LOG.md`.
