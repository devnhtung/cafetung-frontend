// components/dashboard/AddShiftForm.tsx
import { useShift } from "@/context/ShiftContext";
import { Button } from "@/components/ui/button";
import { ShiftType } from "@/types";
import { toast } from "react-toastify";

interface AddShiftFormProps {
  date: string;
  shiftType: ShiftType;
}

const AddShiftForm: React.FC<AddShiftFormProps> = ({ date, shiftType }) => {
  const { createShift, fetchData } = useShift();

  const handleAddShift = async () => {
    try {
      await createShift(date, shiftType.id);
      toast.success("Thêm ca làm thành công!", {
        position: "top-right",
        autoClose: 3000,
      });
      fetchData();
    } catch {
      toast.error("Không thể thêm ca làm. Vui lòng thử lại.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  return (
    <Button onClick={handleAddShift} className="w-full">
      Thêm ca làm
    </Button>
  );
};

export default AddShiftForm;
