# Worksheet 2.2 – Phân tích trước khi code
(Đọc, sửa lại bằng lời của bạn cho khớp với code, và phải tự giải thích được.)

| Câu hỏi | Trả lời |
|---|---|
| State nào local / shared / persistent? | Local: form (Formik), selectedIds + filter (Activity). Shared: profile, theme (Context). Persistent: profile, theme (AsyncStorage). |
| Profile model và validation? | `{ name, bio, avatar }`. name bắt buộc 2–50 ký tự; bio ≤200; avatar có thể trống, nếu có phải bắt đầu bằng http(s)://. |
| List dùng key nào, vì sao? | `item.id` – ổn định, không đổi khi lọc/sắp xếp (index thì sai khi danh sách thay đổi). |
| Storage chưa có dữ liệu hoặc JSON lỗi thì sao? | `loadJSON` trả fallback (default) qua `try/catch` + `isValid`; app không crash. |
| Context đặt ở đâu để không share quá rộng? | Chỉ profile và theme (nhiều screen cần) đặt ở root; list/filter Activity để local. |
| Save profile cập nhật UI nào ngay? | `setProfile` trong ProfileContext -> Home, Profile (và mọi consumer `useProfile`) re-render, không cần restart. |
| Hydrate trước/sau render thế nào để tránh nháy? | Mỗi Provider đọc AsyncStorage trong `useEffect`, bật cờ `loaded`; `App.js` chỉ render navigator khi cả hai `loaded`. |

# Impact Analysis Worksheet (mẫu luyện: thêm field `phone`)
| Change request | Screen/component | State/data | Service/storage | UI/permission | Tests phải sửa/thêm |
|---|---|---|---|---|---|
| Thêm `phone` | EditProfileScreen (thêm FormField), ProfileCard (hiển thị) | `DEFAULT_PROFILE`, `initialValues`, `isValidProfile` | Dữ liệu cũ thiếu `phone` -> xử lý tương thích | Không cần permission | T01, T03/T04 (valid/invalid phone), T07, T11 (dữ liệu cũ không có phone) |
| (change request khác bạn tự luyện) | | | | | |

# Scorecard tự chấm trước đánh giá (tự điền sau khi test)
| Tiêu chí | Max | Tự chấm | Evidence tôi sẽ mở |
|---|---|---|---|
| Problem Understanding | 1.0 | | |
| Solution Design & Reasoning | 1.5 | | |
| Implementation | 2.0 | | |
| Testing & Verification | 1.5 | | |
| Debugging & Problem Solving | 1.5 | | |
| Code Explanation | 1.0 | | |
| Modification / Transfer Task | 1.0 | | |
| AI Usage & Engineering Practice | 0.5 | | |
| TỔNG | 10.0 | | |

# Final self-declaration
Chỉ ký khi đúng sự thật: "Tôi đã tự kiểm tra assignment, có thể giải thích các phần chính, có thể phân tích/sửa một thay đổi nhỏ và chịu trách nhiệm với mọi code, tài nguyên và AI output tôi sử dụng."
