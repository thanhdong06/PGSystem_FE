import React from "react";

// Dữ liệu sự kiện mẫu
// day: 0 = Chủ Nhật, 1 = Thứ 2, ..., 6 = Thứ 7
// start/end: giờ ở dạng 24h (vd 9.5 = 9:30)
const eventsData = [
  { id: 1, title: "Team Meeting", day: 1, start: 9, end: 10 },
  { id: 2, title: "Code Review", day: 3, start: 13, end: 14.5 },
  { id: 3, title: "Gym", day: 2, start: 6.5, end: 7.5 },
  { id: 4, title: "Project Demo", day: 5, start: 11, end: 12 },
];

export default function MiniCalendarView() {
  // Danh sách ngày trong tuần
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Giờ (0 → 23)
  const hours = Array.from({ length: 24 }, (_, i) => i);

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="mx-auto max-w-4xl bg-white shadow rounded-lg p-4">
        <h1 className="text-xl font-bold text-gray-700 mb-4">
          Lịch Tuần (Light Mode - Mini)
        </h1>
        {/* Grid 8 cột: 1 cột giờ + 7 cột ngày */}
        <div
          className="grid"
          style={{
            gridTemplateColumns: "60px repeat(7, 1fr)",
          }}
        >
          {/* Ô góc trên bên trái (trống) */}
          <div />

          {/* Dòng tiêu đề 7 ngày */}
          {days.map((dayName, idx) => (
            <div
              key={idx}
              className="border-b border-r border-gray-300 p-2 text-center font-semibold bg-gray-50 text-gray-700"
            >
              {dayName}
            </div>
          ))}

          {/* 24 hàng cho 24h */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* Cột giờ */}
              <div className="border-r border-b border-gray-300 h-12 flex items-start justify-end pr-2 text-xs text-gray-500">
                {hour}:00
              </div>

              {/* 7 ô ngày cho mỗi giờ */}
              {days.map((_, dayIndex) => (
                <div
                  key={dayIndex}
                  className="relative border-r border-b border-gray-300 h-12"
                >
                  {eventsData
                    .filter((ev) => ev.day === dayIndex)
                    .map((ev) => {
                      // Kiểm tra sự kiện có nằm trong giờ này không
                      if (ev.end <= hour || ev.start >= hour + 1) {
                        return null; // Không trùng giờ
                      }

                      // Tính thời lượng sự kiện
                      const duration = ev.end - ev.start;
                      // Mỗi ô giờ = 48px (h-12)
                      const hourHeight = 48;
                      // Tính offset top nếu bắt đầu giữa giờ (vd 9.5)
                      const topOffset = (ev.start - hour) * hourHeight;
                      const eventHeight = duration * hourHeight;

                      return (
                        <div
                          key={ev.id}
                          className="absolute left-1 right-1 bg-blue-500 text-white text-xs rounded p-1 shadow"
                          style={{
                            top: `${topOffset}px`,
                            height: `${eventHeight}px`,
                          }}
                        >
                          {ev.title}
                        </div>
                      );
                    })}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}
