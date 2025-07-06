
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Habit {
  id: string;
  name: string;
  frequency: string;
  color: string;
  completed: boolean[];
  streak: number;
}

interface CreateHabitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (habit: Omit<Habit, 'id' | 'completed' | 'streak'>) => void;
  editingHabit?: Habit | null;
}

const colorOptions = [
  { value: "sage", label: "Sage Green", class: "bg-wellness-sage" },
  { value: "sky", label: "Sky Blue", class: "bg-wellness-sky" },
  { value: "lavender", label: "Lavender", class: "bg-wellness-lavender" },
  { value: "peach", label: "Peach", class: "bg-wellness-peach" }
];

const frequencyOptions = [
  { value: "daily", label: "Daily" },
  { value: "3x", label: "3x per week" },
  { value: "5x", label: "5x per week" }
];

export const CreateHabitDialog = ({ isOpen, onClose, onSave, editingHabit }: CreateHabitDialogProps) => {
  const [habitName, setHabitName] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [color, setColor] = useState("sage");

  useEffect(() => {
    if (editingHabit) {
      setHabitName(editingHabit.name);
      setFrequency(editingHabit.frequency);
      setColor(editingHabit.color);
    } else {
      setHabitName("");
      setFrequency("daily");
      setColor("sage");
    }
  }, [editingHabit, isOpen]);

  const handleSave = () => {
    if (habitName.trim()) {
      onSave({ name: habitName.trim(), frequency, color });
      onClose();
    }
  };

  const selectedColorClass = colorOptions.find(opt => opt.value === color)?.class || "bg-wellness-sage";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-morphism border-wellness-sage/30">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-wellness-sage-dark text-center">
            {editingHabit ? "Edit Habit" : "Create New Habit"}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="habit-name" className="text-sm font-medium text-wellness-sage-dark">
              Habit Name
            </Label>
            <Input
              id="habit-name"
              placeholder="Enter habit name"
              value={habitName}
              onChange={(e) => setHabitName(e.target.value)}
              className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-sage-dark">
              Frequency
            </Label>
            <Select value={frequency} onValueChange={setFrequency}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-wellness-sage/30">
                {frequencyOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-wellness-sage-dark">
              Color
            </Label>
            <Select value={color} onValueChange={setColor}>
              <SelectTrigger className="border-wellness-sage/30 focus:border-wellness-sage/50 rounded-xl">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="glass-morphism border-wellness-sage/30">
                {colorOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full ${option.class}`} />
                      {option.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2 p-3 rounded-xl bg-wellness-sage/10">
            <div className={`w-6 h-6 rounded-full ${selectedColorClass}`} />
            <span className="text-sm text-wellness-sage-dark">Preview color</span>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-4">
          <Button 
            onClick={handleSave}
            className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white rounded-xl py-3 font-medium"
            disabled={!habitName.trim()}
          >
            {editingHabit ? "Update Habit" : "Create Habit"}
          </Button>
          <Button 
            variant="ghost" 
            onClick={onClose}
            className="w-full text-wellness-sage-dark hover:bg-wellness-sage/10 rounded-xl py-3"
          >
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
