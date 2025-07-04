
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface MoodSelectorProps {
  currentMood: string;
  onMoodSelect: (mood: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const moods = [
  { emoji: "😊", label: "Happy" },
  { emoji: "😌", label: "Calm" },
  { emoji: "😴", label: "Sleepy" },
  { emoji: "🤔", label: "Thoughtful" },
  { emoji: "😅", label: "Stressed" },
  { emoji: "😢", label: "Sad" },
  { emoji: "😡", label: "Angry" },
  { emoji: "🤗", label: "Grateful" },
  { emoji: "😍", label: "Excited" },
  { emoji: "😐", label: "Neutral" }
];

export const MoodSelector = ({ currentMood, onMoodSelect, isOpen, onClose }: MoodSelectorProps) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 right-0 z-50 mt-2">
      <Card className="glass-morphism border-wellness-sage/20 shadow-xl">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium text-wellness-sage-dark">
              How are you feeling?
            </CardTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0 hover:bg-wellness-sage/20"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-5 gap-2">
            {moods.map((mood) => (
              <button
                key={mood.emoji}
                onClick={() => {
                  onMoodSelect(mood.emoji);
                  onClose();
                }}
                className={`p-2 rounded-lg hover:bg-wellness-sage/20 transition-colors text-center ${
                  currentMood === mood.emoji ? 'bg-wellness-sage/30' : ''
                }`}
                title={mood.label}
              >
                <div className="text-lg">{mood.emoji}</div>
                <div className="text-xs text-wellness-sage-dark/70 mt-1">{mood.label}</div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
