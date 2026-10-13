# Test Matrix
Điền cột **Actual** và **Pass** sau khi tự chạy trên máy/emulator của bạn (kèm ảnh chụp/evidence).

| # | Nhóm | Case | Thao tác | Expected | Actual | Pass |
|---|---|---|---|---|---|---|
| T01 | Startup | First run | Xoá dữ liệu app / cài mới, mở app | Dùng default (Guest User, light), không crash | | |
| T02 | Profile | Read | Home -> Xem Profile | Hiển thị đúng name/bio/avatar | | |
| T03 | Edit | Invalid | Xoá trống Tên -> Save | Không lưu; hiện lỗi "Vui lòng nhập tên"; ở lại màn Edit | | |
| T04 | Edit | Valid | Đổi name/bio -> Save | Quay lại Profile, dữ liệu mới; Home cũng cập nhật; không cần restart | | |
| T05 | Edit | Cancel | Sửa name rồi bấm Cancel | Profile giữ nguyên, không ghi | | |
| T06 | Theme | Toggle | Bật dark ở Home/Settings | Toàn app đổi theme; hai toggle đồng bộ | | |
| T07 | Theme | Persistence | Bật dark -> đóng hẳn app -> mở lại | Vẫn dark, không nháy light; profile vẫn giữ | | |
| T08 | List | Normal | Mở Activity | FlatList hiển thị 7 item | | |
| T09 | List | Empty | Chưa chọn gì -> bấm "Đã chọn" | Hiện empty state | | |
| T10 | List | Interaction | Chọn/bỏ chọn item; lọc "Đã chọn" | Nhãn/viền đổi; đếm cập nhật; filter đúng | | |
| T11 | Storage | Corrupt/missing | Ghi tạm giá trị hỏng vào key profile/theme (xem hướng dẫn dưới) rồi mở app | Dùng default, không crash | | |
| T12 | Navigation | All screens | Mở lần lượt 5 screen và Back | Không crash, không mất state ngoài thiết kế | | |

**Cách tạo dữ liệu hỏng cho T11:** tạm thêm vào `App.js` (rồi xoá sau khi test):
`AsyncStorage.setItem('@mma301/profile', '{broken')` trước khi render, sau đó reload app.
