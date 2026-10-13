# Debug Logs – Nhật Ký Debug Thực Tế (Section 6.2)

Dự án: **Assignment 01 – Profile & Activity App**  
Học phần: **MMA301 – Multiplatform Mobile App Development**  
Sinh viên: **Lê Phúc Nghĩa – CE181020**  

---

Quy trình 5 bước áp dụng khi debug:
1. Mô tả triệu chứng quan sát được (Symptom observation).
2. Khoanh vùng component / state / service gây lỗi (Isolation).
3. Kiểm tra input / state / props (State inspection).
4. Kiểm tra điểm biến đổi / async call (Data mutation / Async tracing).
5. Sửa lỗi nhỏ nhất, kiểm tra hồi quy và ghi nhận kết quả (Minimal fix & Regression test).

---

## DEBUG LOG 01: LỖI RUNTIME CRASH KHI TRIM TRƯỜNG DỮ LIỆU CHƯA KHỞI TẠO HOẶC ĐỂ TRỐNG

| Tiêu chí | Nội dung chi tiết |
|---|---|
| **Lỗi (Symptom)** | Ứng dụng ném ngoại lệ đỏ: `TypeError: Cannot read properties of undefined (reading 'trim')` ngay khi người dùng nhấn nút "Save" trên màn hình EditProfile. |
| **Giả thuyết (Hypothesis)** | Trong Formik, đối với các trường không bắt buộc (optional) như `avatar` hoặc `bio`, nếu người dùng không chạm vào ô nhập (untouched) hoặc profile cũ truyền vào bị thiếu thuộc tính, giá trị trong object `values` sẽ là `undefined`. Việc gọi trực tiếp `.trim()` lên `undefined` sẽ làm vỡ ứng dụng. |
| **Cách kiểm tra (Inspection)** | Đặt `console.log('Values before save:', values)` trong hàm `handleSave` tại [`src/screens/EditProfileScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/EditProfileScreen.js), mở form và chỉ sửa ô Tên rồi bấm Save. Kết quả console hiển thị: `{ name: "Nghĩa", bio: "...", avatar: undefined }`. |
| **Nguyên nhân gốc (Root Cause)** | Biểu thức `values.avatar.trim()` giả định rằng `values.avatar` luôn là kiểu `string`, vi phạm nguyên tắc phòng ngừa dữ liệu rỗng (defensive programming) khi làm việc với dynamic state của React Native Formik. |
| **Cách sửa (Fix)** | Thêm toán tử fallback chuỗi rỗng trước khi gọi method `.trim()`: `(values.avatar || '').trim()` và `(values.bio || '').trim()`. Đồng thời thêm thuộc tính `enableReinitialize` vào component `<Formik>` để đảm bảo form luôn đồng bộ với context cha khi profile cập nhật. |
| **Kiểm tra lại (Retest)** | Chạy TC-03 và TC-04: để trống hoàn toàn avatar và bio, chỉ nhập tên hợp lệ rồi bấm Save. Kết quả: Lưu thành công, dữ liệu cập nhật bình thường, không còn bất kỳ cảnh báo hay crash nào. |

---

## DEBUG LOG 02: HIỆN TƯỢNG NHÁY GIAO DIỆN (THEME FLICKER / FLASH) KHI KHỞI ĐỘNG LẠI APP

| Tiêu chí | Nội dung chi tiết |
|---|---|
| **Lỗi (Symptom)** | Người dùng đang cài đặt chế độ Dark Mode. Khi tắt hẳn ứng dụng và mở lại (Cold start), màn hình bị chớp trắng giao diện Light Mode khoảng 300ms rồi mới đột ngột chuyển sang màu đen của Dark Mode, gây mỏi mắt và trải nghiệm người dùng kém (UI glitch). |
| **Giả thuyết (Hypothesis)** | Quá trình đọc từ `AsyncStorage.getItem(KEYS.THEME)` là bất đồng bộ (asynchronous Promise). Trong khi đó, `useState('light')` trong `ThemeContext` lại khởi tạo giá trị đồng bộ ban đầu là `'light'`. Vì vậy, giao diện màn hình chính đã được vẽ ra trước khi quá trình đọc dữ liệu từ bộ nhớ kết thúc. |
| **Cách kiểm tra (Inspection)** | Đặt `console.log('[Theme] Render mode:', mode)` và `console.log('[Theme] Hydrated:', saved)`. Kết quả log trên terminal cho thấy: Component `HomeScreen` đã render 1 lần với `mode = 'light'`, sau đó `ThemeContext` mới log thông báo đã load được giá trị `'dark'` và ép toàn bộ cây component re-render lần 2. |
| **Nguyên nhân gốc (Root Cause)** | Cây điều hướng `AppNavigator` được mount và render ngay lập tức ở lần khởi tạo đầu tiên mà không đợi cờ trạng thái hoàn tất quá trình hydration từ AsyncStorage. |
| **Cách sửa (Fix)** | Bổ sung cờ `loaded` vào `ThemeContext` và `ProfileContext`. Tại [`App.js`](file:///d:/Lephucnghia_Ce181020/App.js), tạo component `Root` điều phối: chỉ khi cả hai cờ `themeLoaded` và `profileLoaded` đều chuyển thành `true` thì mới render `AppNavigator`. Trong thời gian chờ đọc storage, hiển thị màn hình `ActivityIndicator` (Splash loading). |
| **Kiểm tra lại (Retest)** | Bật Dark mode -> Reload app bằng phím `r` trên Metro bundler -> App hiển thị vòng quay loading trong tích tắc và lập tức mở ra giao diện Dark mode mượt mà, loại bỏ 100% hiện tượng chớp trắng sai màu. |
