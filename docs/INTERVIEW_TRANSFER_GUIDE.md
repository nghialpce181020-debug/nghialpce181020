# Cẩm Nang Phỏng Vấn & Xử Lý Yêu Cầu Thay Đổi (Transfer Tasks)

Dự án: **Assignment 01 – Profile & Activity App**  
Học phần: **MMA301 – Multiplatform Mobile App Development**  
Sinh viên: **Lê Phúc Nghĩa – CE181020**  

---

## PHẦN 1: KỊCH BẢN "MỞ FILE VÀ CHỈ CODE TRONG 30 GIÂY" (SECTION 7.3)

Giảng viên yêu cầu mở file nào, bạn chỉ cần mở file đó và giải thích theo đúng mô hình 5 tầng: **Purpose → Input → Trigger → Transform → Output/Failure path**:

### 1. Navigation Config & Routing
* **File cần mở:** [`src/navigation/AppNavigator.js`](file:///d:/Lephucnghia_Ce181020/src/navigation/AppNavigator.js)
* **Giải thích nhanh:**
  - *Purpose:* Cấu hình stack điều hướng giữa 5 màn hình (`Home`, `Profile`, `EditProfile`, `Activity`, `Settings`) và đồng bộ theme cho Navigation.
  - *Input:* Theme lấy từ hook `useTheme()`.
  - *Transform:* Ghép `navTheme` từ bảng màu `colors` vào `DefaultTheme` / `DarkTheme`.
  - *Output:* Trả về `<NavigationContainer>` chứa `<Stack.Navigator>`.

### 2. Theme / Profile Context & Providers
* **File cần mở:** [`src/context/ThemeContext.js`](file:///d:/Lephucnghia_Ce181020/src/context/ThemeContext.js) hoặc [`src/context/ProfileContext.js`](file:///d:/Lephucnghia_Ce181020/src/context/ProfileContext.js)
* **Giải thích nhanh:**
  - *Purpose:* Quản lý shared state toàn ứng dụng và thực hiện hydration tự động từ AsyncStorage.
  - *Input:* Dữ liệu lưu trữ bền vững đọc từ key `@mma301/theme` và `@mma301/profile`.
  - *Trigger:* `useEffect` khi Provider mount lần đầu; hoặc hàm `toggleTheme()` / `saveProfile()` khi người dùng thao tác.
  - *Transform:* Kiểm tra tính hợp lệ bằng hàm `isValidMode` / `isValidProfile`. Tạo object mới (immutability) trước khi set state để kích hoạt consumer re-render.
  - *Output:* Cung cấp context value gồm state và các hàm update cho toàn bộ component con qua custom hook `useTheme()` / `useProfile()`.

### 3. Logic Validation & Save Profile
* **File cần mở:** [`src/screens/EditProfileScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/EditProfileScreen.js) và [`src/validation/profileSchema.js`](file:///d:/Lephucnghia_Ce181020/src/validation/profileSchema.js)
* **Giải thích nhanh:**
  - *Purpose:* Thu thập thông tin người dùng qua Controlled Form, validate dữ liệu, chỉ lưu khi hợp lệ.
  - *Input:* `values` từ Formik (`name`, `bio`, `avatar`).
  - *Trigger:* Bấm nút "Save" kích hoạt `handleSubmit` của Formik.
  - *Transform:* Yup kiểm tra: Tên không rỗng (2–50 ký tự), Bio tối đa 200 ký tự, Avatar định dạng URL. Nếu hợp lệ, hàm `handleSave` gọi `saveProfile`.
  - *Failure Path:* Nếu validation thất bại -> hiển thị lỗi inline đỏ, Formik chặn submit, không gọi `saveProfile`, không ghi vào AsyncStorage. Nếu lưu storage thất bại -> hiển thị `Alert.alert('Lỗi')`.

### 4. Storage Helper & Hydration
* **File cần mở:** [`src/storage/storage.js`](file:///d:/Lephucnghia_Ce181020/src/storage/storage.js)
* **Giải thích nhanh:**
  - *Purpose:* Module độc lập bọc `AsyncStorage` để đọc/ghi dữ liệu an toàn có cơ chế tự phục hồi (resilient).
  - *Transform:* `JSON.parse` chuỗi JSON, kiểm tra tính hợp lệ qua callback `isValid`.
  - *Failure Path:* Nếu key chưa tồn tại (`null`) hoặc JSON bị lỗi cú pháp (`catch`) -> trả về giá trị `fallback` mặc định an toàn, không bao giờ để ứng dụng bị crash.

### 5. FlatList & Collection
* **File cần mở:** [`src/screens/ActivityScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/ActivityScreen.js)
* **Giải thích nhanh:**
  - *Purpose:* Render danh sách collection hoạt động bằng FlatList tối ưu hiệu năng.
  - *State:* `selectedIds` (mảng id được chọn) và `filter` ('all' hoặc 'selected').
  - *Trigger:* Bấm vào từng card gọi `toggle(id)` -> tạo mảng mới (`prev.filter` hoặc `[...prev, id]`).
  - *Props FlatList:* `data={data}`, `keyExtractor={(item) => item.id}`, `renderItem`, `ListEmptyComponent={<EmptyState />}`. Item được bọc bằng `React.memo` để tránh render lại các item không bị thay đổi.

---

## PHẦN 2: HƯỚNG DẪN XỬ LÝ NHANH CÁC BÀI LUYỆN THAY ĐỔI (TRANSFER TASKS - SECTION 8)

Khi giảng viên đưa ra bài tập thay đổi trực tiếp tại chỗ, hãy làm theo các bước sau:

### Kịch bản 1: Thêm trường Phone hoặc Location vào Profile (Mức Cơ Bản)
1. **Schema:** Mở [`src/validation/profileSchema.js`](file:///d:/Lephucnghia_Ce181020/src/validation/profileSchema.js), thêm:
   ```javascript
   phone: Yup.string().matches(/^[0-9]{10}$/, { message: 'SĐT gồm 10 chữ số', excludeEmptyString: true }),
   ```
2. **Context:** Mở [`src/context/ProfileContext.js`](file:///d:/Lephucnghia_Ce181020/src/context/ProfileContext.js), thêm `phone: ''` vào `DEFAULT_PROFILE`.
3. **UI Form:** Mở [`src/screens/EditProfileScreen.js`](file:///d:/Lephucnghia_Ce181020/src/screens/EditProfileScreen.js), thêm `<FormField label="Số điện thoại" ... />`.
4. **UI View:** Mở [`src/components/ProfileCard.js`](file:///d:/Lephucnghia_Ce181020/src/components/ProfileCard.js), thêm `<Text>{profile.phone}</Text>`.

### Kịch bản 2: Thêm chức năng Tìm Kiếm / Lọc theo từ khóa cho Activity (Mức Cơ Bản)
1. Thêm `const [keyword, setKeyword] = useState('');` trong `ActivityScreen.js`.
2. Thêm `<TextInput placeholder="Tìm kiếm hoạt động..." value={keyword} onChangeText={setKeyword} />`.
3. Trong `useMemo` tính toán `data`:
   ```javascript
   const filtered = data.filter(item => item.title.toLowerCase().includes(keyword.toLowerCase()));
   ```

### Kịch bản 3: Đổi validation rule của Name hoặc Bio (Mức Cơ Bản)
- Chỉ cần mở [`src/validation/profileSchema.js`](file:///d:/Lephucnghia_Ce181020/src/validation/profileSchema.js), sửa `.min(5, 'Tối thiểu 5 ký tự')` hoặc `.max(...)` mà không cần đụng vào code UI.

---

## PHẦN 3: ĐÁP ÁN CÁC CÂU HỎI PHỎNG VẤN TRỌNG TÂM (SECTION 12)

1. **Component / Props / State khác nhau thế nào?**
   - *Component:* Khối giao diện và logic độc lập, có thể tái sử dụng.
   - *Props:* Dữ liệu truyền từ component cha xuống con, mang tính bất biến (read-only) đối với component con.
   - *State:* Dữ liệu nội tại của component, có thể thay đổi theo thời gian và kích hoạt re-render khi cập nhật.

2. **Điều gì làm component re-render?**
   - Khi State nội tại thay đổi (qua `setState`).
   - Khi Props từ component cha truyền xuống thay đổi.
   - Khi Context mà component đó đang lắng nghe (qua `useContext`) phát sinh giá trị mới.
   - Khi component cha bị re-render (trừ khi component con được tối ưu bằng `React.memo`).

3. **Vì sao FlatList cần `keyExtractor`?**
   - Giúp React Native xác định danh tính duy nhất của từng phần tử trong danh sách, từ đó tối ưu hóa việc tái sử dụng view (recycle view), chỉ render lại item bị thay đổi mà không vẽ lại cả danh sách.

4. **Vì sao không mutate state trực tiếp?**
   - React so sánh state cũ và mới theo tham chiếu (shallow reference comparison `===`). Nếu mutate trực tiếp (ví dụ `profile.name = 'abc'`), tham chiếu vùng nhớ không đổi, React sẽ không nhận biết được sự thay đổi và bỏ qua việc cập nhật giao diện (UI không re-render). Luôn dùng immutable pattern: `setProfile({ ...profile, name: 'abc' })`.

5. **Khi restart app, quá trình hydrate diễn ra ở đâu?**
   - Diễn ra trong hook `useEffect` của `ThemeProvider` và `ProfileProvider` khi các Provider được mount. Trong khi chờ đọc dữ liệu, cờ `loaded` giữ giá trị `false`, component `Root` tại `App.js` hiển thị loading indicator để chống giật nháy theme.

6. **Nếu AsyncStorage trả `null` hoặc JSON lỗi thì xử lý thế nào?**
   - Trong hàm `loadJSON`, nếu `getItem` trả `null` (lần đầu chạy), hàm tự động trả về `fallback` (`DEFAULT_PROFILE` hoặc `'light'`). Nếu chuỗi lưu trữ bị lỗi cú pháp, khối `try/catch` sẽ bắt ngoại lệ và trả về `fallback`, đảm bảo ứng dụng không bao giờ bị crash.
