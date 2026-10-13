# Profile & Activity App (MMA301 – Assignment 1)

* **Sinh viên thực hiện:** Lê Phúc Nghĩa  
* **Mã số sinh viên:** CE181020  
* **Học phần:** MMA301 – Multiplatform Mobile App Development  
* **Nền tảng:** React Native (Expo SDK 57, JavaScript)  

---

## 1. Overview
Ứng dụng React Native gồm 5 màn hình: **Home**, **Profile**, **Edit Profile**, **Activity/Interests**, **Settings**.  
Ứng dụng hoạt động như một workflow thống nhất: dữ liệu Profile và Theme được lưu trữ bền vững bằng `AsyncStorage`, chia sẻ xuyên suốt qua `Context API`, form nhập liệu có validation bằng `Formik` + `Yup`, danh sách `FlatList` hỗ trợ tương tác chọn lọc và empty state.

---

## 2. Cách chạy ứng dụng từ môi trường sạch
```bash
# 1. Cài đặt dependencies
npm install

# 2. Kiểm tra tính tương thích theo Expo SDK
npx expo install --fix

# 3. Chẩn đoán cấu hình dự án
npx expo-doctor

# 4. Khởi chạy Metro Bundler
npx expo start
```
* Bấm phím `a` để mở trên Android Emulator.
* Bấm phím `i` để mở trên iOS Simulator.
* Hoặc quét mã QR bằng ứng dụng Expo Go trên điện thoại thật.

---

## 3. Screen / Workflow Map
```
Home ──┬──> Profile ──> EditProfile (Save / Cancel -> quay lại Profile)
       ├──> Activity (FlatList + chọn + lọc Tất cả / Đã chọn + Bỏ chọn)
       └──> Settings (Light/Dark toggle + Đặt lại dữ liệu gốc)
```
- Từ **Home** có thể xem tóm tắt thông tin, chuyển nhanh tới Profile, Activity hoặc Settings.
- Khi cập nhật tại **Edit Profile**, màn hình Profile và Home cập nhật ngay lập tức mà không cần restart app.
- Khi đổi theme tại **Settings** hoặc **Home**, toàn bộ ứng dụng đổi màu ngay lập tức; khi tắt app mở lại, theme đã chọn vẫn được duy trì.

---

## 4. State & Persistence Strategy

| State | Phân loại | Vị trí quản lý | Mô tả chiến lược |
|---|---|---|---|
| Form `name`/`bio`/`avatar` | Local | `EditProfileScreen` (Formik) | Vòng đời form, chỉ lưu khi validate đạt; cancel giữ nguyên |
| `selectedIds` + `filter` | Local | `ActivityScreen` (`useState`) | Mảng lựa chọn hoạt động, cập nhật không mutate |
| `profile` | Shared + Persistent | `ProfileContext` + `@mma301/profile` | Dùng chung toàn app, lưu AsyncStorage, có fallback an toàn |
| `theme` mode | Shared + Persistent | `ThemeContext` + `@mma301/theme` | Giao diện toàn app, lưu AsyncStorage, chống nháy màu khi hydrate |

- **Hydration chống nháy (Flicker prevention):** `Root` component trong `App.js` chờ cả `themeLoaded` và `profileLoaded` hoàn thành rồi mới render `AppNavigator`.
- **Phục hồi an toàn (Resilient fallback):** Key chưa có (first-run) hoặc dữ liệu JSON bị hỏng đều tự động rơi về `DEFAULT_PROFILE` / `'light'`, không làm sập ứng dụng.
- **Tính bất biến (Immutability):** Không sửa trực tiếp object/array (`{ ...next }`, `[...prev, id]`), đảm bảo React re-render đúng chuẩn.

---

## 5. Danh Mục Hồ Sơ Đánh Giá (Deliverables Documentation)

Toàn bộ tài liệu chuẩn bị cho 8 tiêu chí Rubric (10.0 điểm) nằm tại thư mục `docs/`:

1. [Requirement Traceability Matrix & Design Decision Record](file:///d:/Lephucnghia_Ce181020/docs/RTM_DDR.md) – Ma trận yêu cầu R01-R10, State ownership map và 5 quyết định kiến trúc.
2. [Test Matrix (12 Test Cases)](file:///d:/Lephucnghia_Ce181020/docs/TEST_MATRIX.md) – Bảng kiểm thử Normal/Negative/Edge với kết quả 100% PASS.
3. [Debug Logs (2 Lỗi thực tế)](file:///d:/Lephucnghia_Ce181020/docs/DEBUG_LOGS.md) – Nhật ký 5 bước debug lỗi trim undefined và lỗi theme flicker.
4. [AI Usage Log](file:///d:/Lephucnghia_Ce181020/docs/AI_USAGE_LOG.md) – Bảng ghi nhận việc sử dụng AI có kiểm chứng theo chuẩn Section 9.4.
5. [Cẩm Nang Phỏng Vấn & Transfer Tasks](file:///d:/Lephucnghia_Ce181020/docs/INTERVIEW_TRANSFER_GUIDE.md) – Hướng dẫn giải thích code 5 tầng và bài tập thay đổi.

---

## 6. Limitations (Giới hạn phạm vi)
- Danh sách Activity và trạng thái đã chọn được lưu trong local state theo đúng yêu cầu đề bài (không bắt buộc persist).
- Ảnh avatar sử dụng URL online; khi mất mạng hoặc URL hỏng, app tự động hiển thị chữ cái đầu tên người dùng.
- Theo quy định đề bài (Section 1.4), dự án tập trung vào nền tảng cốt lõi của React Native, không sử dụng backend/Redux/TypeScript phức tạp.
