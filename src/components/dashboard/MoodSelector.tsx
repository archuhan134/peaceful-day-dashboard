
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { X, Sparkles } from "lucide-react";

interface MoodSelectorProps {
  currentMood: string;
  onMoodSelect: (mood: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

const moods = [
  { emoji: "😊", label: "Happy", color: "from-yellow-100 to-yellow-50", description: "Feeling joyful and bright" },
  { emoji: "😌", label: "Calm", color: "from-blue-100 to-blue-50", description: "Peaceful and relaxed" },
  { emoji: "😴", label: "Sleepy", color: "from-indigo-100 to-indigo-50", description: "Tired but cozy" },
  { emoji: "🤔", label: "Thoughtful", color: "from-purple-100 to-purple-50", description: "Reflective mood" },
  { emoji: "😅", label: "Stressed", color: "from-orange-100 to-orange-50", description: "Feeling overwhelmed" },
  { emoji: "😢", label: "Sad", color: "from-gray-100 to-gray-50", description: "Down but healing" },
  { emoji: "😍", label: "Excited", color: "from-pink-100 to-pink-50", description: "Energetic and enthusiastic" },
  { emoji: "😐", label: "Neutral", color: "from-slate-100 to-slate-50", description: "Balanced and steady" }
];

export const MoodSelector = ({ currentMood, onMoodSelect, isOpen, onClose }: MoodSelectorProps) => {
  if (!isOpen) return null;

  const selectedMood = moods.find(m => m.emoji === currentMood);

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
        onClick={onClose}
      />
      
      {/* Modal positioned in center */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md animate-fade-in">
          <Card className="glass-morphism border-wellness-sage/30 shadow-2xl backdrop-blur-lg">
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg font-bold text-wellness-sage-dark flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-wellness-sage animate-pulse" />
                  How are you feeling?
                </CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="h-8 w-8 p-0 hover:bg-wellness-sage/20 rounded-full transition-all duration-200 hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-4">
              <div className="grid grid-cols-4 gap-3">
                {moods.map((mood) => (
                  <button
                    key={mood.emoji}
                    onClick={() => {
                      onMoodSelect(mood.emoji);
                      onClose();
                    }}
                    className={`p-3 rounded-2xl transition-all duration-300 text-center group hover:scale-105 hover:shadow-lg bg-gradient-to-br ${mood.color} ${
                      currentMood === mood.emoji 
                        ? 'ring-2 ring-wellness-sage shadow-lg scale-105' 
                        : 'hover:ring-1 hover:ring-wellness-sage/50'
                    }`}
                    title={mood.description}
                  >
                    <div className="text-xl mb-1 group-hover:scale-110 transition-transform duration-200">
                      {mood.emoji}
                    </div>
                    <div className="text-xs font-medium text-wellness-sage-dark/80">
                      {mood.label}
                    </div>
                  </button>
                ))}
              </div>
              
              {selectedMood && (
                <div className="mt-4 p-4 bg-gradient-to-r from-wellness-sage/10 to-wellness-sky/10 rounded-xl border border-wellness-sage/20">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{selectedMood.emoji}</div>
                    <div>
                      <p className="font-semibold text-wellness-sage-dark">
                        You're feeling {selectedMood.label.toLowerCase()}
                      </p>
                      <p className="text-sm text-wellness-sage-dark/70">
                        {selectedMood.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};
