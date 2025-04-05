// components/dashboard/EmployeeEvaluations.tsx
import { useState } from "react";
import { addEmployeeEvaluation } from "@/actions/api";
import { useAuth } from "@/context/AuthContext";
import { Employee, Evaluation } from "@/types";

interface EmployeeEvaluationsProps {
  evaluations: Evaluation[];
  employees: Employee[];
  fetchData: () => void;
}

const EmployeeEvaluations: React.FC<EmployeeEvaluationsProps> = ({
  evaluations,
  employees,
  fetchData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(
    null
  );
  const [evaluationDate, setEvaluationDate] = useState("");
  const [rating, setRating] = useState<number>(0);
  const [comments, setComments] = useState("");
  const { user } = useAuth();
  const handleAddEvaluation = async () => {
    if (!selectedEmployeeId || !evaluationDate || !rating) return;
    try {
      await addEmployeeEvaluation(
        selectedEmployeeId,
        evaluationDate,
        rating,
        comments,
        user?.id
      );
      alert("Thêm đánh giá thành công!");
      setIsModalOpen(false);
      fetchData();
    } catch {
      alert("Thêm đánh giá thất bại!");
    }
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow overflow-y-auto">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Đánh giá nhân viên
      </h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark"
      >
        Thêm đánh giá
      </button>
      <table className="w-full border-collapse">
        <thead className="bg-gray-50">
          <tr>
            <th className="p-3 text-sm text-primary border">Nhân viên</th>
            <th className="p-3 text-sm text-primary border">Ngày đánh giá</th>
            <th className="p-3 text-sm text-primary border">Điểm</th>
            <th className="p-3 text-sm text-primary border">Nhận xét</th>
          </tr>
        </thead>
        <tbody>
          {evaluations.map((evaluation) => (
            <tr key={evaluation.id} className="border-t">
              <td className="p-3 text-sm text-primary border">
                {evaluation.employee_name}
              </td>
              <td className="p-3 text-sm text-primary border">
                {/* {evaluation.evaluation_date} */}
              </td>
              <td className="p-3 text-sm text-primary border">
                {evaluation.rating}
              </td>
              <td className="p-3 text-sm text-primary border">
                {evaluation.comments}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Thêm đánh giá</h2>
            <div className="mb-4">
              <label className="block mb-1">Nhân viên:</label>
              <select
                value={selectedEmployeeId || ""}
                onChange={(e) => setSelectedEmployeeId(Number(e.target.value))}
                className="w-full p-2 border rounded"
              >
                <option value="">Chọn nhân viên</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ngày đánh giá:</label>
              <input
                type="date"
                value={evaluationDate}
                onChange={(e) => setEvaluationDate(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Điểm (1-5):</label>
              <input
                type="number"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Nhận xét:</label>
              <textarea
                value={comments}
                onChange={(e) => setComments(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Hủy
              </button>
              <button
                onClick={handleAddEvaluation}
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

export default EmployeeEvaluations;
