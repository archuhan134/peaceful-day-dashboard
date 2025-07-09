
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { ChevronRight } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useTranslations } from "@/hooks/useTranslations";

const TaskStatsSection = () => {
  const { t } = useTranslations();
  const [selectedTaskDate, setSelectedTaskDate] = useState<Date | undefined>();
  const [taskData, setTaskData] = useLocalStorage<Record<string, boolean>>("taskCalendarData", {});

  const formatDateKey = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const handleTaskToggle = () => {
    if (selectedTaskDate) {
      const dateKey = formatDateKey(selectedTaskDate);
      setTaskData(prev => ({
        ...prev,
        [dateKey]: !prev[dateKey]
      }));
      setSelectedTaskDate(undefined);
    }
  };

  const getTaskStatusForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return taskData[dateKey];
  };

  const renderTaskDay = (date: Date) => {
    const hasTask = getTaskStatusForDate(date);
    const isSelected = selectedTaskDate && formatDateKey(selectedTaskDate) === formatDateKey(date);
    
    return (
      <div className={`relative w-full h-full flex items-center justify-center ${isSelected ? 'bg-wellness-lavender/20 rounded-full' : ''}`}>
        <span className="text-sm">{date.getDate()}</span>
        {hasTask && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-wellness-lavender rounded-full"></div>
        )}
      </div>
    );
  };

  return (
    <Card className="glass-morphism border-wellness-lavender/20 mx-4">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-wellness-lavender-dark">{t('taskStats')}</CardTitle>
          <Button variant="ghost" size="sm" className="text-wellness-lavender-dark/70">
            {t('viewAll')}
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Calendar
          mode="single"
          selected={selectedTaskDate}
          onSelect={setSelectedTaskDate}
          className="w-full"
          components={{
            Day: ({ date }) => renderTaskDay(date)
          }}
        />
        
        {selectedTaskDate && (
          <div className="mt-4 p-4 bg-wellness-lavender/10 rounded-lg">
            <p className="text-sm font-medium text-wellness-lavender-dark mb-3">
              {selectedTaskDate.toDateString()}
            </p>
            <Button
              onClick={handleTaskToggle}
              className={`w-full ${
                getTaskStatusForDate(selectedTaskDate)
                  ? 'bg-wellness-lavender hover:bg-wellness-lavender-dark'
                  : 'bg-wellness-sage hover:bg-wellness-sage-dark'
              } text-white`}
            >
              {getTaskStatusForDate(selectedTaskDate) ? t('markAsIncomplete') : t('markAsComplete')}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskStatsSection;
