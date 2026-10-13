# AI Usage Log – Nhật Ký Sử Dụng AI Có Kiểm Soát (Section 9.4)

Dự án: **Assignment 01 – Profile & Activity App**  
Học phần: **MMA301 – Multiplatform Mobile App Development**  
Sinh viên: **Lê Phúc Nghĩa – CE181020**  

---

Nguyên tắc sử dụng AI:
- Minh bạch mục đích, prompt và tài liệu tham chiếu.
- Không phụ thuộc mù quáng vào mã sinh tự động: luôn kiểm tra tính tương thích với Expo SDK 57 và React Native 0.86.
- Mọi giải pháp đều được sinh viên đọc hiểu, tùy biến cho cấu trúc thư mục của bài và kiểm thử thực tế trước khi sử dụng.

---

## BẢNG NHẬT KÝ SỬ DỤNG AI (MINIMUM AI LOG TABLE)

| # | Task / Prompt / Ref | Mục đích | Output dùng? | Tôi đã sửa gì? | Tôi kiểm chứng thế nào? |
|---|---|---|---|---|---|
| **01** | *"Thiết kế schema validation cho form Profile dùng Yup với rule: name required (2-50 ký tự), bio tối đa 200 ký tự, avatar là URL"* | Tạo cấu hình validation Yup chuẩn cho màn hình Edit Profile theo yêu cầu Section 1.1 | Dùng một phần | Ban đầu AI dùng `Yup.string().url()`, nhưng rule này bắt buộc nhập và không cho phép chuỗi rỗng. Tôi đã sửa thành `matches(/^https?:\/\/.+/i, { excludeEmptyString: true })` để cho phép người dùng để trống nếu không có ảnh đại diện URL. | Viết test script node kiểm tra 4 trường hợp: URL hợp lệ, URL sai định dạng, chuỗi rỗng và `undefined`. Kết quả đều pass đúng mong đợi. |
| **02** | *"Tư vấn giải pháp kiến trúc lưu trữ AsyncStorage an toàn trong React Native để không bị crash khi dữ liệu null hoặc JSON hỏng"* | Xây dựng module `src/storage/storage.js` có tính năng tự phục hồi (resilient storage helper) | Dùng cấu trúc chính | Bổ sung thêm tham số callback `isValid` kiểm tra kiểu dữ liệu sau khi `JSON.parse` để phòng trường hợp dữ liệu trong storage bị sai cấu trúc object. | Thử ghi vào key storage giá trị chuỗi rác `"{invalid-data"`, gọi `loadJSON` và thấy hàm tự động bắt exception, trả về giá trị fallback mặc định an toàn. |
| **03** | *"Gợi ý cách khắc phục hiện tượng theme bị chớp sáng (flash) khi restart app trong React Native khi dùng Context + AsyncStorage"* | Loại bỏ hoàn toàn lỗi flicker giao diện khi khởi động ứng dụng với Dark Mode | Dùng ý tưởng | AI đề xuất dùng SplashScreen của Expo. Tôi đã đơn giản hóa theo phạm vi đề bài bằng cách dùng cờ `loaded` trong Context và hiển thị màn hình loading Splash ngay tại `App.js` để tránh thêm thư viện ngoài không cần thiết. | Bật Dark mode, dùng lệnh reload Metro (`r`), xác nhận app hiển thị loading rồi vào thẳng theme tối, không bị chớp màn hình trắng. |
| **04** | *"Lập bảng Test Matrix bao phủ 12 kịch bản kiểm thử theo hướng dẫn Section 5 của đề bài MMA301 Assignment 1"* | Chuẩn bị tài liệu kiểm thử và bằng chứng cho buổi đánh giá (Verification & Demo) | Áp dụng đầy đủ | Bổ sung các bước thao tác cụ thể trên app của mình, gắn mã test case (TC-01 đến TC-12) và ghi nhận kết quả thực tế trên emulator. | Chạy lần lượt từng case trên app thật, đối chiếu hành vi thực tế và đánh dấu 100% PASS. |
