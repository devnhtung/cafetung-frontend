import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    day: "2-digit", // Hiển thị ngày (ví dụ: "31")
    month: "2-digit", // Hiển thị tháng (ví dụ: "03")
    year: "numeric", // Hiển thị năm (ví dụ: "2025")
  });
};

export const formatDateWeek = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("vi-VN", {
    weekday: "short",
    day: "2-digit",
    month: "2-digit",
  });
};
// Tính số tuần (week number) dựa trên startDate
export const getWeekNumber = (date: Date) => {
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = (date.getTime() - firstDayOfYear.getTime()) / 86400000;
  return Math.ceil((pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7);
};

export function getISOWeekNumber(date: Date) {
  const year = date.getFullYear();
  const firstDayOfYear = new Date(year, 0, 1); // Ngày 1/1 của năm
  const dayOfWeek = firstDayOfYear.getDay(); // Thứ của ngày 1/1

  // Xác định ngày đầu tiên của tuần đầu tiên (Thứ Hai đầu tiên của năm)
  const firstMonday = new Date(
    year,
    0,
    1 + (dayOfWeek === 0 ? 1 : 8 - dayOfWeek)
  );

  // Tính số ngày đã trôi qua kể từ thứ Hai đầu tiên
  const diff = date.getTime() - firstMonday.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.ceil((diff / oneDay + 1) / 7) + 1;
}

// Tính ngày đầu và cuối tuần
export const getWeekRange = (
  today: Date
): { startDate: string; endDate: string } => {
  const dayOfWeek = today.getDay(); // 0 (Chủ Nhật) đến 6 (Thứ Bảy)
  const daysToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek; // Tính số ngày để đến thứ Hai

  const start = new Date(today);
  start.setDate(today.getDate() + daysToMonday); // Đặt ngày bắt đầu là thứ Hai

  const end = new Date(start);
  end.setDate(start.getDate() + 6); // Đặt ngày kết thúc là Chủ Nhật

  return {
    startDate: start.toISOString().split("T")[0],
    endDate: end.toISOString().split("T")[0],
  };
};
