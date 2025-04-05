// components/dashboard/ShiftApprovals.tsx
import { useState } from "react";
import { useShiftActions } from "@/actions/shiftActions";
import { Registration } from "@/types";
interface ShiftApprovalsProps {
  registrations: Registration[];
  fetchData: () => void;
}

const ShiftApprovals: React.FC<ShiftApprovalsProps> = ({
  registrations,
  fetchData,
}) => {
  const { handleApproveShift, handleRejectShift } = useShiftActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [performanceRating, setPerformanceRating] = useState<number>(0);
  const [managerComments, setManagerComments] = useState<string>("");

  const handleApprove = (registration: Registration) => {
    setSelectedRegistration(registration);
    setIsModalOpen(true);
  };

  const handleSubmitApproval = async () => {
    if (!selectedRegistration) return;
    await handleApproveShift(
      selectedRegistration.id,
      performanceRating,
      managerComments,
      () => {
        setIsModalOpen(false);
        fetchData();
      }
    );
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow overflow-y-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">Duyệt ca</h2>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-sm text-primary border">Ngày</th>
            <th className="p-3 text-sm text-primary border">Ca</th>
            <th className="p-3 text-sm text-primary border">Nhân viên</th>
            <th className="p-3 text-sm text-primary border">Vị trí</th>
            <th className="p-3 text-sm text-primary border">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {registrations.map((registration) => (
            <tr key={registration.id} className="border-t">
              <td className="p-3 text-sm text-primary border">
                {registration.shift_date}
              </td>
              <td className="p-3 text-sm text-primary border">
                {registration.shift_type}
              </td>
              <td className="p-3 text-sm text-primary border">
                {registration.employee_name}
              </td>
              <td className="p-3 text-sm text-primary border">
                {registration.position_name}
              </td>
              <td className="p-3 text-sm text-primary border">
                <button
                  onClick={() => handleApprove(registration)}
                  className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 mr-2"
                >
                  Duyệt
                </button>
                <button
                  onClick={() => handleRejectShift(registration.id, fetchData)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Từ chối
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Duyệt ca</h2>
            <p>Nhân viên: {selectedRegistration.employee_name}</p>
            <p>Ca: {selectedRegistration.shift_type}</p>
            <p>Ngày: {selectedRegistration.shift_date}</p>
            <div className="mt-4">
              <label className="block mb-1">Đánh giá hiệu suất (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={performanceRating}
                onChange={(e) => setPerformanceRating(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-4">
              <label className="block mb-1">Nhận xét:</label>
              <textarea
                value={managerComments}
                onChange={(e) => setManagerComments(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmitApproval}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Duyệt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftApprovals;
