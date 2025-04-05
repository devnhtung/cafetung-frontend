// pages/dashboard/shift.tsx

export default function Shift() {
  return (
    <div className="bg-primary-opaque p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Quản lý ca làm việc</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-secondary text-white">
              <th className="p-3">Ngày</th>
              <th className="p-3">Thời gian</th>
              <th className="p-3">Nhân viên</th>
              <th className="p-3">Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-gray-700">
              <td className="p-3">2025-03-27</td>
              <td className="p-3">08:00 - 12:00</td>
              <td className="p-3">Nguyễn Văn A</td>
              <td className="p-3">
                <button className="text-blue-400 hover:underline mr-2">
                  Sửa
                </button>
                <button className="text-red-400 hover:underline">Xóa</button>
              </td>
            </tr>
            {/* Thêm các hàng khác */}
          </tbody>
        </table>
      </div>
    </div>
  );
}
