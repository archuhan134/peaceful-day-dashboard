
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { useTranslations } from "@/hooks/useTranslations";

interface MoodEntry {
  id: string;
  mood: string;
  name: string;
  date: string;
  time: string;
  dateKey: string;
}

interface MoodChartProps {
  type: 'weekly' | 'monthly';
}

const MoodChart = ({ type }: MoodChartProps) => {
  const { t } = useTranslations();

  // Get mood data from localStorage
  const getMoodHistory = (): MoodEntry[] => {
    try {
      return JSON.parse(localStorage.getItem("moodHistory") || "[]");
    } catch {
      return [];
    }
  };

  // Generate chart data based on type
  const generateChartData = () => {
    const moodHistory = getMoodHistory();
    const now = new Date();
    
    if (type === 'weekly') {
      // Last 7 days
      const weekData = [];
      for (let i = 6; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        const dateKey = date.toISOString().split('T')[0];
        const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
        
        const moodForDay = moodHistory.find(entry => entry.dateKey === dateKey);
        
        weekData.push({
          day: dayName,
          mood: moodForDay?.mood || '',
          moodName: moodForDay?.name || '',
          date: moodForDay?.date || '',
          time: moodForDay?.time || '',
          value: moodForDay ? 1 : 0
        });
      }
      return weekData;
    } else {
      // Current month
      const year = now.getFullYear();
      const month = now.getMonth();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthData = [];
      
      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateKey = date.toISOString().split('T')[0];
        
        const moodForDay = moodHistory.find(entry => entry.dateKey === dateKey);
        
        monthData.push({
          day: day.toString(),
          mood: moodForDay?.mood || '',
          moodName: moodForDay?.name || '',
          date: moodForDay?.date || '',
          time: moodForDay?.time || '',
          value: moodForDay ? 1 : 0
        });
      }
      return monthData;
    }
  };

  const chartData = generateChartData();
  const hasData = chartData.some(item => item.value > 0);

  const chartConfig = {
    value: {
      label: "Mood",
      color: "hsl(var(--wellness-sage))",
    },
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.value > 0) {
        return (
          <div className="bg-white p-3 border border-wellness-sage/20 rounded-lg shadow-lg">
            <p className="font-medium text-wellness-sage-dark">
              {data.mood} {data.moodName}
            </p>
            <p className="text-sm text-wellness-sage-dark/70">
              {data.date} • {data.time}
            </p>
          </div>
        );
      }
    }
    return null;
  };

  if (!hasData) {
    return (
      <Card className="glass-morphism border-wellness-sage/20">
        <CardHeader>
          <CardTitle className="text-wellness-sage-dark">
            {type === 'weekly' ? t('weeklyView') : t('monthlyView')}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <p className="text-wellness-sage-dark/70 text-center">
            {t('noMoodDataToDisplay')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="glass-morphism border-wellness-sage/20">
      <CardHeader>
        <CardTitle className="text-wellness-sage-dark">
          {type === 'weekly' ? t('weeklyView') : t('monthlyView')}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis 
                dataKey="day" 
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 12 }}
              />
              <YAxis hide />
              <ChartTooltip content={<CustomTooltip />} />
              <Bar 
                dataKey="value" 
                fill="var(--color-value)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
        
        {/* Mood emoji display */}
        <div className="mt-4 flex flex-wrap gap-2 justify-center">
          {chartData.filter(item => item.value > 0).map((item, index) => (
            <div key={index} className="flex flex-col items-center p-2 bg-wellness-sage/10 rounded-lg">
              <span className="text-2xl mb-1">{item.mood}</span>
              <span className="text-xs text-wellness-sage-dark/70">{item.day}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MoodChart;
