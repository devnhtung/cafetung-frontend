// components/dashboard/ShiftTasks.tsx
import { useState } from "react";
import { useShiftActions } from "@/actions/shiftActions";
import { Registration, Task } from "@/types";

interface ShiftTasksProps {
  registrations: Registration[];
  tasks: Task[];
  fetchData: () => void;
}

const ShiftTasks: React.FC<ShiftTasksProps> = ({
  registrations,
  tasks,
  fetchData,
}) => {
  const { handleAddTask } = useShiftActions();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRegistration, setSelectedRegistration] =
    useState<Registration | null>(null);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleAdd = async () => {
    if (!selectedRegistration || !selectedTaskId) return;
    await handleAddTask(selectedRegistration.id, selectedTaskId, () => {
      setIsModalOpen(false);
      fetchData();
    });
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow overflow-y-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Quản lý công việc ca làm
      </h2>
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
                  onClick={() => {
                    setSelectedRegistration(registration);
                    setIsModalOpen(true);
                  }}
                  className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Thêm công việc
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedRegistration && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Thêm công việc</h2>
            <p>Nhân viên: {selectedRegistration.employee_name}</p>
            <p>Ca: {selectedRegistration.shift_type}</p>
            <p>Ngày: {selectedRegistration.shift_date}</p>
            <div className="mt-4">
              <label className="block mb-1">Chọn công việc:</label>
              <select
                value={selectedTaskId || ""}
                onChange={(e) => setSelectedTaskId(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="">Chọn công việc</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
              >
                Thêm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShiftTasks;
