// components/dashboard/TaskListModal.tsx
import { Task } from "@/types";
import { useShift } from "@/context/ShiftContext";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface TaskListModalProps {
  tasks: Task[];
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}

const TaskListModal: React.FC<TaskListModalProps> = ({
  tasks,
  isOpen,
  onClose,
  className,
}) => {
  const { handleCompleteTask, handleFetchTasks } = useShift();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[150]">
      <div
        className={`bg-white relative p-6 rounded-lg shadow-lg w-full max-w-lg ${className}`}
      >
        <h2 className="text-lg font-semibold mb-4">Danh sách công việc</h2>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 cursor-pointer focus:outline-none text-black/50 hover:text-black transition"
        >
          <XMarkIcon className="w-8 h-8" />
        </button>
        {tasks.length === 0 ? (
          <p>Không có công việc nào.</p>
        ) : (
          <ul className="space-y-2">
            {tasks.map((task) => (
              <li key={task.id} className="flex justify-between items-center">
                <div>
                  <p>
                    <strong>{task.name}</strong>
                  </p>
                  <p className="text-sm text-gray-600">{task.description}</p>
                  <p className="text-sm">
                    Trạng thái:{" "}
                    {task.status === "completed"
                      ? "Đã hoàn thành"
                      : "Chưa hoàn thành"}
                  </p>
                  {task.completed_at && (
                    <p className="text-sm">
                      Hoàn thành lúc:{" "}
                      {new Date(task.completed_at).toLocaleString()}
                    </p>
                  )}
                </div>
                {task.status !== "completed" && (
                  <button
                    onClick={() =>
                      handleCompleteTask(task.id, () =>
                        handleFetchTasks(task.shift_registration_id)
                      )
                    }
                    className="px-2 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                  >
                    Hoàn thành
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default TaskListModal;
