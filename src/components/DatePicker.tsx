import { useState } from "react";
import { Calendar as CalendarIcon } from "lucide-react";

interface DatePickerProps {
  selectedDate: string;
  onDateSelect: (date: string) => void;
}

export const DatePicker = ({ selectedDate, onDateSelect }: DatePickerProps) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());

  const weekDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    return date;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short',
      day: 'numeric'
    });
  };

  const formatDayName = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'short' });
  };

  const formatDayNumber = (date: Date) => {
    return date.getDate().toString();
  };

  const isToday = (date: Date) => {
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date) => {
    return date.toDateString() === new Date(selectedDate).toDateString();
  };

  return (
    <div className="flex items-center justify-between px-4 py-3 overflow-x-auto">
      {weekDays.map((date, index) => {
        const selected = isSelected(date);
        const todayDate = isToday(date);
        
        return (
          <button
            key={index}
            onClick={() => onDateSelect(date.toISOString())}
            className={`flex flex-col items-center justify-center min-w-[3.5rem] h-16 rounded-2xl transition-all duration-200 ${
              selected
                ? 'bg-accent-pink text-white'
                : 'text-text-gray hover:bg-secondary hover:text-foreground'
            }`}
          >
            <span className="text-sm font-medium">
              {formatDayName(date)}
            </span>
            <span className={`text-lg font-semibold ${selected ? 'text-white' : 'text-foreground'}`}>
              {formatDayNumber(date)}
            </span>
          </button>
        );
      })}
    </div>
  );
};