
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
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

interface MoodHistoryViewProps {
  onBack: () => void;
}

const MoodHistoryView = ({ onBack }: MoodHistoryViewProps) => {
  const { t } = useTranslations();
  
  const [moodHistory] = useState<MoodEntry[]>(() => {
    try {
      return JSON.parse(localStorage.getItem("moodHistory") || "[]");
    } catch {
      return [];
    }
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4 px-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={onBack}
          className="hover:bg-wellness-sage/10"
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-2xl font-bold text-wellness-sage-dark">{t('allMoods')}</h1>
      </div>

      <div className="px-4 space-y-4">
        {moodHistory.length === 0 ? (
          <Card className="glass-morphism border-wellness-sage/20">
            <CardContent className="p-8 text-center">
              <p className="text-wellness-sage-dark/70">{t('noMoodEntriesYet')}</p>
            </CardContent>
          </Card>
        ) : (
          moodHistory.map((entry) => (
            <Card key={entry.id} className="glass-morphism border-wellness-sage/20">
              <CardContent className="p-4">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{entry.mood}</div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-wellness-sage-dark">{entry.name}</h3>
                    <p className="text-sm text-wellness-sage-dark/70">
                      {entry.date} • {entry.time}
                    </p>
                    {entry.description && (
                      <p className="text-sm text-wellness-sage-dark/80 mt-1">{entry.description}</p>
                    )}
                  </div>
                  <Badge className="bg-wellness-sage/20 text-wellness-sage-dark border-wellness-sage/30">
                    Brave
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
};

export default MoodHistoryView;
