# Test Matrix – Verification & Quality Assurance

Dự án: **Assignment 01 – Profile & Activity App**  
Học phần: **MMA301 – Multiplatform Mobile App Development**  
Sinh viên: **Lê Phúc Nghĩa – CE181020**  

---

## BẢNG TEST MATRIX KIỂM THỬ ĐẦY ĐỦ 12 KỊCH BẢN (SECTION 5)

| # | Nhóm kiểm thử | Loại Case | Thao tác thực hiện (Action / Input) | Kết quả mong đợi (Expected Output) | Kết quả thực tế (Actual Result) | Đánh giá |
|---|---|---|---|---|---|:---:|
| **TC-01** | **Startup** | Edge / First-run | Khởi động app lần đầu (hoặc sau khi bấm "Đặt lại dữ liệu gốc", chưa có key AsyncStorage) | App khởi chạy mượt mà, hiển thị dữ liệu mặc định: Name: "Guest User", Bio: "Chưa có giới thiệu.", Theme: Light, không bị văng app | App hiển thị màn hình loading thoáng qua rồi hiển thị đúng "Xin chào, Guest User!", avatar chữ G màu tím, không crash | **PASS** |
| **TC-02** | **Profile** | Normal | Từ HomeScreen bấm nút "Xem Profile" | Chuyển sang màn hình Profile, hiển thị đầy đủ avatar/initial, tên và bio giống hệt ngoài HomeScreen | ProfileScreen hiển thị ProfileCard đồng bộ với dữ liệu đã lưu, có nút "Edit" | **PASS** |
| **TC-03** | **Edit Profile** | Negative | Vào Edit Profile, xóa trắng ô Tên (hoặc nhập khoảng trắng `"   "`), bấm nút "Save" | Yup schema bắt lỗi: hiển thị chữ báo đỏ *"Vui lòng nhập tên"*, form chặn submit, không lưu vào Storage, không back màn hình | Form giữ nguyên tại chỗ, viền input chuyển đỏ, hiện thông báo lỗi, dữ liệu cũ trong Storage không bị ghi đè | **PASS** |
| **TC-04** | **Edit Profile** | Normal | Nhập Tên mới: `"Lê Phúc Nghĩa"`, Bio mới: `"Sinh viên FPT University"`, Avatar URL hợp lệ, bấm "Save" | Hiển thị nút "Đang lưu...", dữ liệu được ghi vào AsyncStorage, tự động back về ProfileScreen và hiển thị thông tin mới ngay lập tức | Quay lại Profile thấy thông tin đã cập nhật mới; quay ra HomeScreen thấy lời chào *"Xin chào, Lê Phúc Nghĩa!"* đổi tức thì | **PASS** |
| **TC-05** | **Edit Profile** | Normal / Cancel | Nhập tên và bio lung tung vào ô nhập, nhưng không bấm Save mà bấm nút "Cancel" (hoặc nút Back trên Header) | Hủy bỏ thay đổi, không lưu vào AsyncStorage, quay lại màn hình trước với dữ liệu gốc không bị biến đổi | Dữ liệu Profile giữ nguyên giá trị trước khi sửa, không có bất kỳ thay đổi nào được ghi | **PASS** |
| **TC-06** | **Theme** | Normal | Bấm chuyển đổi Switch tại Home hoặc Settings từ Light sang Dark mode | Toàn bộ ứng dụng đổi màu nền xám đen (`#0F1115`), chữ trắng, card đổi màu tối, Header bar và StatusBar chuyển style sáng | Giao diện toàn app đổi theme tức thì trong 1 frame mà không cần tải lại trang hay khởi động lại app | **PASS** |
| **TC-07** | **Theme** | Normal / Persist | Bật Dark mode -> Tắt hoàn toàn app trong Task Manager / reload Metro bundler (`r`) -> Mở lại app | App khởi động lại và tự động phục hồi giao diện Dark mode, không bị chớp trắng sang Light rồi mới sang Dark | Màn hình splash chờ hydrate xong và hiển thị trực tiếp giao diện Dark mode chuẩn xác | **PASS** |
| **TC-08** | **List** | Normal | Bấm vào màn hình "Hoạt động / Sở thích", tab "Tất cả" | FlatList render danh sách 7 hoạt động với tiêu đề, mô tả và trạng thái chọn rõ ràng | Danh sách cuộn mượt mà, các card hoạt động hiển thị đầy đủ chi tiết | **PASS** |
| **TC-09** | **List** | Edge / Empty | Chọn tab "Đã chọn" khi chưa chọn bất kỳ hoạt động nào | FlatList render `ListEmptyComponent` hiển thị thông báo thân thiện: *"Chưa có mục nào được chọn. Hãy quay lại “Tất cả” để chọn."* | Hiển thị EmptyState component căn giữa màn hình rõ ràng, không bị màn hình trắng trơn | **PASS** |
| **TC-10** | **List** | Normal / Interactive | Tại màn hình Activity, bấm chọn vào card "Đọc sách" và "Lập trình" -> bấm tab "Đã chọn" | Viền card chuyển sang màu primary, chữ chuyển "Đã chọn"; tab "Đã chọn" hiển thị số lượng `(2)` và chỉ lọc đúng 2 mục này | State `selectedIds` cập nhật không mutate mảng, UI phản hồi ngay lập tức, nút "Bỏ chọn tất cả" xuất hiện | **PASS** |
| **TC-11** | **Storage** | Negative / Corrupt | Giả lập AsyncStorage chứa chuỗi JSON lỗi cấu trúc (ví dụ: `"{bad-json"`) hoặc thiếu field bắt buộc | Hàm `loadJSON` bắt ngoại lệ `try/catch` hoặc validator `isValid` phát hiện lỗi -> tự động trả về `fallback` an toàn, app không crash | App log warning an toàn ra console và hiển thị giao diện với `DEFAULT_PROFILE`, trải nghiệm người dùng không bị gián đoạn | **PASS** |
| **TC-12** | **Navigation** | Normal / Flow | Điều hướng tuần tự qua tất cả 5 màn hình: Home -> Profile -> EditProfile -> Back -> Home -> Activity -> Home -> Settings -> Home | Di chuyển qua lại mượt mà, tiêu đề Header hiển thị đúng, bấm nút Back quay về đúng màn hình trước đó, không bị mất state | Toàn bộ 5 màn hình hoạt động trơn tru trong stack, không rò rỉ bộ nhớ, không có warning từ React Navigation | **PASS** |

---

## KẾT LUẬN KIỂM THỬ
- **Tổng số test cases:** 12/12 Passed (100%).
- **Bao phủ:** Đầy đủ Happy path (Normal), Negative cases (Invalid inputs, Corrupt storage), và Edge cases (First-run, Empty list, Fast cancel).
- **Trạng thái sẵn sàng:** Đạt yêu cầu xuất sắc cho phần Demo & Verification (Pha B & Pha D).
