
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

interface MoodEntry {
  id: string;
  mood: string;
  name: string;
  date: string;
  time: string;
  dateKey: string;
  description?: string;
}

interface MoodStatsSectionProps {
  onShowMoodHistory: () => void;
}

const MoodStatsSection = ({ onShowMoodHistory }: MoodStatsSectionProps) => {
  const { t } = useTranslations();
  const [selectedMoodDate, setSelectedMoodDate] = useState<Date | undefined>();
  
  // Read mood data from localStorage
  const [moodData, setMoodData] = useState<Record<string, string>>(() => {
    try {
      return JSON.parse(localStorage.getItem("moodCalendarData") || "{}");
    } catch {
      return {};
    }
  });

  // Mood options with names
  const moodOptions = [
    { emoji: "😊", name: t("happy") },
    { emoji: "😌", name: t("calm") },
    { emoji: "😰", name: t("stressed") },
    { emoji: "😞", name: t("sad") },
    { emoji: "🥳", name: t("excited") },
    { emoji: "😴", name: t("sleepy") },
    { emoji: "🤔", name: t("thoughtful") },
    { emoji: "😇", name: t("neutral") }
  ];

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleMoodSelect = (mood: { emoji: string; name: string }) => {
    if (selectedMoodDate) {
      const dateKey = formatDateKey(selectedMoodDate);
      const now = new Date();
      
      // Save mood to calendar data
      const updatedMoodData = {
        ...moodData,
        [dateKey]: mood.emoji
      };
      setMoodData(updatedMoodData);
      localStorage.setItem("moodCalendarData", JSON.stringify(updatedMoodData));

      // Save detailed mood entry to history
      const moodHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
      const newMoodEntry: MoodEntry = {
        id: Date.now().toString(),
        mood: mood.emoji,
        name: mood.name,
        date: selectedMoodDate.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        time: now.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit',
          hour12: true 
        }),
        dateKey: dateKey,
        description: ""
      };

      const updatedHistory = [newMoodEntry, ...moodHistory.filter((entry: MoodEntry) => entry.dateKey !== dateKey)];
      localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
      
      setSelectedMoodDate(undefined);
    }
  };

  const getMoodForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return moodData[dateKey];
  };

  const renderMoodDay = (date: Date) => {
    const mood = getMoodForDate(date);
    const isSelected = selectedMoodDate && formatDateKey(selectedMoodDate) === formatDateKey(date);
    
    return (
      <div className={`relative w-full h-full flex flex-col items-center justify-center p-1 ${isSelected ? 'bg-wellness-sage/20 rounded-full' : ''}`}>
        {mood ? (
          <span className="text-xl">{mood}</span>
        ) : (
          <span className="text-sm">{date.getDate()}</span>
        )}
      </div>
    );
  };

  return (
    <Card className="glass-morphism border-wellness-sage/20 mx-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-wellness-sage-dark">{t('moodStats')}</CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-wellness-sage-dark/70"
            onClick={onShowMoodHistory}
          >
            {t('viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedMoodDate}
          onSelect={setSelectedMoodDate}
          className="w-full"
          components={{
            Day: ({ date }) => renderMoodDay(date)
          }}
        />
        
        {selectedMoodDate && (
          <div className="mt-4 p-4 bg-wellness-sage/10 rounded-lg">
            <p className="text-sm font-medium text-wellness-sage-dark mb-3">
              {t('selectMoodFor')} {selectedMoodDate.toDateString()}:
            </p>
            <div className="grid grid-cols-4 gap-2">
              {moodOptions.map((option) => (
                <Button
                  key={option.emoji}
                  variant="outline"
                  size="sm"
                  onClick={() => handleMoodSelect(option)}
                  className="h-12 flex flex-col gap-1 text-xs hover:bg-wellness-sage/20"
                >
                  <span className="text-lg">{option.emoji}</span>
                  <span className="text-xs">{option.name}</span>
                </Button>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MoodStatsSection;
