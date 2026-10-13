# Requirement Traceability Matrix (RTM) & Design Decision Record (DDR)

Dự án: **Assignment 01 – Profile & Activity App**  
Học phần: **MMA301 – Multiplatform Mobile App Development**  
Sinh viên: **Lê Phúc Nghĩa – CE181020**  

---

## PHẦN 1: REQUIREMENT TRACEABILITY MATRIX (RTM)

Bảng đối chiếu toàn bộ yêu cầu từ đề bài (Section 1.3) với file mã nguồn, component và test case kiểm thử tương ứng.

| ID | Yêu cầu nghiệp vụ / kỹ thuật | Bằng chứng UI & Code | File / Symbol triển khai | Test case kiểm thử |
|---|---|---|---|---|
| **R01** | Expo/React Native project chạy đúng quy ước, không có lỗi cấu hình | `package.json`, `app.json`, `App.js` | [`package.json`](file:///d:/Lephucnghia_Ce181020/package.json), [`App.js`](file:///d:/Lephucnghia_Ce181020/App.js) | TC-01 (Cold start / First-run) |
| **R02** | Navigation giữa ≥ 5 khu vực/màn hình bằng Stack Navigator | Native Stack Navigator, Header title, back button | [`src/navigation/AppNavigator.js`](file:///d:/Lephucnghia_Ce181020/src/navigation/AppNavigator.js) | TC-12 (Mở từng màn hình, back về an toàn) |
| **R03** | Profile hiển thị dữ liệu name, avatar, bio (default + persisted) | Card hiển thị avatar URL (hoặc ký tự đại diện), name, bio | [`src/screens/ProfileScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/ProfileScreen.js), [`src/components/ProfileCard.js`](file:///d:/Lephucnghia_Ce181020/src/components/ProfileCard.js) | TC-02 (Xem profile đúng dữ liệu ban đầu / đã lưu) |
| **R04** | Edit Profile có validation (Formik + Yup), save/cancel, lỗi không ghi | Form nhập liệu controlled, error inline đỏ, nút Save, nút Cancel | [`src/screens/EditProfileScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/EditProfileScreen.js), [`src/validation/profileSchema.js`](file:///d:/Lephucnghia_Ce181020/src/validation/profileSchema.js) | TC-03, TC-04, TC-05 (Invalid không lưu; Valid cập nhật; Cancel giữ nguyên) |
| **R05** | Theme/preference chia sẻ xuyên suốt qua Context API | Light / Dark mode đổi màu background, text, card, header, status bar trên toàn bộ app | [`src/context/ThemeContext.js`](file:///d:/Lephucnghia_Ce181020/src/context/ThemeContext.js), [`src/constants/theme.js`](file:///d:/Lephucnghia_Ce181020/src/constants/theme.js) | TC-06, TC-07 (Toggle theme đổi ngay; restart vẫn giữ) |
| **R06** | FlatList hiển thị danh sách hoạt động, có tương tác thay đổi state | FlatList, item nhấn để chọn/bỏ chọn, bộ lọc Tất cả / Đã chọn, empty state | [`src/screens/ActivityScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/ActivityScreen.js), [`src/components/ActivityItem.js`](file:///d:/Lephucnghia_Ce181020/src/components/ActivityItem.js) | TC-08, TC-09, TC-10 (List có dữ liệu, list rỗng, tương tác toggle) |
| **R07** | Persistence lưu trữ bền vững bằng AsyncStorage | `loadJSON`, `saveJSON`, `useEffect` hydrate khi app khởi động | [`src/storage/storage.js`](file:///d:/Lephucnghia_Ce181020/src/storage/storage.js), [`src/context/ProfileContext.js`](file:///d:/Lephucnghia_Ce181020/src/context/ProfileContext.js) | TC-01, TC-07 (Dữ liệu tồn tại qua vòng đời app restart) |
| **R08** | Component tái sử dụng (Reusable components) | Tách thành các component độc lập: Card, Button, FormField, Toggle, EmptyState | [`src/components/ProfileCard.js`](file:///d:/Lephucnghia_Ce181020/src/components/ProfileCard.js), [`src/components/PrimaryButton.js`](file:///d:/Lephucnghia_Ce181020/src/components/PrimaryButton.js), [`src/components/ThemeToggle.js`](file:///d:/Lephucnghia_Ce181020/src/components/ThemeToggle.js) | Kiểm tra reuse: Button dùng ở 4 screens; ThemeToggle dùng ở Home + Settings |
| **R09** | Responsive giao diện bằng Flexbox và StyleSheet | Bố cục co giãn linh hoạt theo tỷ lệ màn hình, bọc `SafeAreaProvider` chuẩn | Toàn bộ style trong `src/screens/` và `src/components/` | TC-12 (Kiểm tra hiển thị chuẩn trên màn hình portrait) |
| **R10** | Trạng thái lỗi và fallback an toàn (Error/Fallback State) | Fallback default khi AsyncStorage null hoặc JSON hỏng; Avatar fallback chữ cái; Empty list fallback | [`src/storage/storage.js`](file:///d:/Lephucnghia_Ce181020/src/storage/storage.js), [`src/components/ProfileCard.js`](file:///d:/Lephucnghia_Ce181020/src/components/ProfileCard.js), [`src/components/EmptyState.js`](file:///d:/Lephucnghia_Ce181020/src/components/EmptyState.js) | TC-11 (Dữ liệu storage hỏng / trống không làm crash app) |

---

## PHẦN 2: BẢN ĐỒ QUẢN LÝ STATE (STATE OWNERSHIP MAP)

| Phân loại State | Biến State | Vị trí lưu trữ | Phạm vi sử dụng | Lý do thiết kế |
|---|---|---|---|---|
| **Local UI** | `saving` (boolean), `imageFailed` (boolean) | `EditProfileScreen`, `ProfileCard` | Trong component/screen cục bộ | Chỉ phục vụ hiệu ứng loading của form hoặc xử lý fallback khi ảnh lỗi, không màn nào khác cần biết. |
| **Local Form** | `values`, `errors`, `touched` | Formik trong `EditProfileScreen` | Cục bộ màn chỉnh sửa | Gắn liền vòng đời form. Hủy bỏ khi ấn Cancel, chỉ chuyển thành state ứng dụng khi đã validate hợp lệ và lưu thành công. |
| **Local List** | `selectedIds` (array), `filter` ('all' \| 'selected') | `ActivityScreen` (`useState`) | Màn hình Activity | Chỉ phục vụ màn hình Activity, giữ state gần nhất với UI consumer theo khuyến nghị đề bài. |
| **Shared State** | `profile` (object: name, bio, avatar) | `ProfileContext` | Toàn app (`HomeScreen`, `ProfileScreen`, `EditProfileScreen`) | Nhiều màn hình cùng đọc dữ liệu người dùng; cập nhật tại EditProfile phải phản ánh ngay lập tức tại Home và Profile mà không cần tải lại app. |
| **Shared State** | `mode` ('light' \| 'dark'), `colors`, `isDark` | `ThemeContext` | Toàn app (Mọi screen và Navigator) | Chế độ giao diện ảnh hưởng đến tất cả component và navigation container. |
| **Persistent** | `@mma301/profile`, `@mma301/theme` | `AsyncStorage` | Lưu trữ thiết bị | Duy trì dữ liệu qua các lần khởi động lại ứng dụng. |

---

## PHẦN 3: DESIGN DECISION RECORD (DDR) – 5 QUYẾT ĐỊNH KỸ THUẬT CỐT LÕI

### Quyết định 1: Kiến trúc Navigation
* **Lựa chọn:** Sử dụng `@react-navigation/native-stack` kết hợp bọc theme động tại `NavigationContainer`.
* **Lý do:** Tận dụng Native Stack cho hiệu năng chuyển cảnh mượt mà chuẩn native (Android Fragment / iOS UINavigationController). Khai báo 5 màn hình (`Home`, `Profile`, `EditProfile`, `Activity`, `Settings`) rõ ràng, dễ bảo trì.
* **Impact nếu thay đổi yêu cầu:** Nếu chuyển sang Tab Navigator hoặc Drawer, chỉ cần thay đổi navigator cha trong `AppNavigator.js`, toàn bộ các màn hình con (`src/screens/*`) vẫn giữ nguyên 100% không bị ảnh hưởng.

### Quyết định 2: Quản lý State phân tầng (State Ownership)
* **Lựa chọn:** Kết hợp Context API cho Shared State (`ThemeContext`, `ProfileContext`) và `useState` cho Local State (`ActivityScreen`, form).
* **Lý do:** Tránh "prop drilling" đối với theme và profile qua nhiều tầng điều hướng; đồng thời không lạm dụng Context/Redux cho các state cục bộ như bộ lọc Activity để tránh re-render không cần thiết toàn app.
* **Impact nếu thay đổi yêu cầu:** Nếu mở rộng thêm màn hình hiển thị danh sách hoạt động ưa thích ở Profile, ta chỉ cần nâng state `selectedIds` từ local lên một Context mới (`ActivityContext`) mà không phá vỡ cấu trúc hiện tại.

### Quyết định 3: Chiến lược Hydration & Fallback cho AsyncStorage
* **Lựa chọn:** Hydrate dữ liệu bất đồng bộ trong `useEffect` của từng Provider; sử dụng biến trạng thái `loaded` và chỉ cho phép `Root` render `AppNavigator` khi cả Theme và Profile đã hydrate xong. Hàm `loadJSON` có schema validator và fallback an toàn.
* **Lý do:** Giải quyết triệt để vấn đề "nháy giao diện" (theme flash - ví dụ mở app đang dark mode bị chớp trắng 0.5s rồi mới chuyển đen). Nếu dữ liệu storage bị hỏng hoặc chưa có (first-run), hệ thống tự động rơi về `DEFAULT_PROFILE` và theme `'light'` mà không bị crash.
* **Impact nếu thay đổi yêu cầu:** Nếu thay AsyncStorage bằng SecureStore hoặc Remote API (Firebase/REST API), chỉ cần thay logic đọc/ghi trong `src/storage/storage.js`, các Context và Screen không cần sửa đổi.

### Quyết định 4: Cơ chế Validation và xử lý Form
* **Lựa chọn:** Sử dụng Formik kết hợp Yup schema (`profileSchema.js`). Cập nhật dữ liệu theo nguyên tắc bất biến (immutability) với `enableReinitialize`.
* **Lý do:** Yup tách biệt logic kiểm tra tính hợp lệ ra ngoài view, giúp code gọn gàng và dễ viết unit test. Chỉ khi dữ liệu thỏa mãn schema thì `saveProfile` mới được gọi. Nếu lưu vào storage thành công mới tiến hành cập nhật State.
* **Impact nếu thay đổi yêu cầu:** Nếu thêm trường mới (như Phone, Address, Date of Birth theo bài tập Transfer), chỉ cần thêm 1 trường vào Yup schema, thêm 1 `<FormField>` trong UI và truyền vào payload lưu trữ.

### Quyết định 5: Tách biệt Reusable Components và Design Tokens
* **Lựa chọn:** Gom màu sắc thành tokens tại `src/constants/theme.js` (`lightColors`, `darkColors`) và xây dựng 6 components tái sử dụng: `ProfileCard`, `ThemeToggle`, `ActivityItem`, `FormField`, `PrimaryButton`, `EmptyState`.
* **Lý do:** Đảm bảo tính nhất quán (UI Consistency), giảm thiểu lặp code (DRY), dễ dàng bảo trì hoặc tùy biến giao diện nhanh chóng.
* **Impact nếu thay đổi yêu cầu:** Nếu nhà thiết kế thay đổi bảng màu nhận diện hoặc kích thước nút bấm, chỉ cần sửa tại 1 vị trí duy nhất (`theme.js` hoặc component đó).
