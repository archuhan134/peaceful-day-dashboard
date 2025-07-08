import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Smile, Sparkles, Sun } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import AppHeader from "@/components/AppHeader";

const Mood = () => {
  const [wellnessRating, setWellnessRating] = useLocalStorage("wellness-rating", 0);
  const [wellnessReflection, setWellnessReflection] = useLocalStorage("wellness-reflection", "");
  const [gratitude, setGratitude] = useLocalStorage("gratitude", "");

  // Initialize mood from localStorage with today's date check
  const [todayMood, setTodayMood] = useState(() => {
    try {
      const savedMoodData = localStorage.getItem("mood_journal");
      if (savedMoodData) {
        const moodData = JSON.parse(savedMoodData);
        const today = new Date().toISOString().split('T')[0];
        if (moodData.date === today) {
          return moodData.mood;
        }
      }
    } catch (error) {
      console.error("Error loading mood data:", error);
    }
    return "😊";
  });

  const moods = [
    { emoji: "😊", label: "Happy", color: "wellness-peach", description: "Feeling joyful and content" },
    { emoji: "😌", label: "Calm", color: "wellness-sky", description: "Peaceful and relaxed" },
    { emoji: "😴", label: "Sleepy", color: "wellness-lavender", description: "Tired but cozy" },
    { emoji: "🤔", label: "Thoughtful", color: "wellness-sage", description: "Reflective and contemplative" },
    { emoji: "😅", label: "Stressed", color: "wellness-peach", description: "Feeling overwhelmed" },
    { emoji: "😢", label: "Sad", color: "wellness-sky", description: "Down but healing" },
    { emoji: "😡", label: "Angry", color: "wellness-lavender", description: "Frustrated or upset" },
    { emoji: "🤗", label: "Grateful", color: "wellness-sage", description: "Appreciative and thankful" },
    { emoji: "😍", label: "Excited", color: "wellness-peach", description: "Energetic and enthusiastic" },
    { emoji: "😐", label: "Neutral", color: "wellness-sky", description: "Balanced and steady" }
  ];

  const handleMoodSelect = (moodEmoji: string) => {
    const selectedMoodData = moods.find(m => m.emoji === moodEmoji);
    const now = new Date();
    const today = now.toISOString().split('T')[0];
    
    const moodJournalEntry = {
      mood: moodEmoji,
      date: today,
      description: selectedMoodData ? `You're feeling ${selectedMoodData.label.toLowerCase()} today` : ""
    };
    
    setTodayMood(moodEmoji);
    localStorage.setItem("mood_journal", JSON.stringify(moodJournalEntry));
    
    // Save detailed mood entry to mood history for Profile page
    const moodEntry = {
      id: Date.now().toString(),
      mood: moodEmoji,
      name: selectedMoodData?.label || "Unknown",
      date: now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      }),
      dateKey: today
    };
    
    // Save to mood history
    const existingHistory = JSON.parse(localStorage.getItem("moodHistory") || "[]");
    const updatedHistory = [moodEntry, ...existingHistory.filter((entry: any) => entry.dateKey !== moodEntry.dateKey)];
    localStorage.setItem("moodHistory", JSON.stringify(updatedHistory));
    
    // Save to mood calendar data for Profile page
    const existingMoodData = JSON.parse(localStorage.getItem("moodCalendarData") || "{}");
    existingMoodData[today] = moodEmoji;
    localStorage.setItem("moodCalendarData", JSON.stringify(existingMoodData));
  };

  const handleWellnessRating = (rating: number) => {
    setWellnessRating(rating);
  };

  const getRatingMessage = (rating: number) => {
    const messages = [
      "",
      "Take it easy today 💜",
      "Be gentle with yourself 🌱", 
      "You're doing okay 👍",
      "Feeling pretty good! ⭐",
      "Amazing energy today! ✨"
    ];
    return messages[rating] || "";
  };

  const selectedMood = moods.find(m => m.emoji === todayMood) || moods[0];

  return (
    <div className="space-y-6">
      <AppHeader />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Selection */}
        <Card className="glass-morphism border-wellness-sage/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
              <div className="p-2 rounded-lg bg-wellness-sage/20">
                <Smile className="h-5 w-5" />
              </div>
              How are you feeling right now?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2 sm:gap-3 mb-6">
              {moods.map((mood) => (
                <button
                  key={mood.emoji}
                  onClick={() => handleMoodSelect(mood.emoji)}
                  className={`p-2 sm:p-3 rounded-xl hover:scale-105 transition-all text-center group relative ${
                    todayMood === mood.emoji 
                      ? 'bg-wellness-sage/30 ring-2 ring-wellness-sage shadow-lg' 
                      : 'hover:bg-wellness-sage/10'
                  }`}
                  title={mood.description}
                >
                  <div className="text-lg sm:text-2xl mb-1 group-hover:scale-110 transition-transform duration-200">
                    {mood.emoji}
                  </div>
                  <div className="text-[10px] sm:text-xs text-wellness-sage-dark/70 font-medium leading-tight">
                    {mood.label}
                  </div>
                </button>
              ))}
            </div>
            {selectedMood && (
              <div className="text-center p-4 bg-wellness-sage/10 rounded-xl">
                <p className="text-wellness-sage-dark font-medium mb-1">
                  You're feeling {selectedMood.label.toLowerCase()} today
                </p>
                <p className="text-sm text-wellness-sage-dark/70">
                  {selectedMood.description}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Wellness Rating */}
        <Card className="glass-morphism border-wellness-lavender/30 hover:shadow-xl transition-all duration-300">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
              <div className="p-2 rounded-lg bg-wellness-lavender/20">
                <Heart className="h-5 w-5" />
              </div>
              Wellness Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-wellness-lavender-dark/70">Rate your overall wellness today</p>
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleWellnessRating(rating)}
                    className={`w-10 h-10 rounded-full transition-all hover:scale-110 border-2 ${
                      rating <= wellnessRating
                        ? "bg-wellness-lavender border-wellness-lavender shadow-lg"
                        : "bg-wellness-lavender/20 border-wellness-lavender/30 hover:bg-wellness-lavender/40"
                    }`}
                  >
                    <span className="text-white font-bold">{rating}</span>
                  </button>
                ))}
              </div>
              {wellnessRating > 0 && (
                <div className="space-y-2">
                  <p className="text-lg font-medium text-wellness-lavender-dark">
                    {wellnessRating}/5
                  </p>
                  <p className="text-sm text-wellness-lavender-dark/70">
                    {getRatingMessage(wellnessRating)}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reflection */}
      <Card className="glass-morphism border-wellness-sky/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
            <div className="p-2 rounded-lg bg-wellness-sky/20">
              <Sun className="h-5 w-5" />
            </div>
            Daily Reflection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-wellness-sky-dark mb-3">
              What's on your mind today?
            </label>
            <Textarea
              placeholder="Take a moment to reflect on your thoughts, feelings, and experiences. What's been weighing on your mind? What brought you joy today?"
              value={wellnessReflection}
              onChange={(e) => setWellnessReflection(e.target.value)}
              className="min-h-[140px] resize-none border-wellness-sky/30 focus:border-wellness-sky/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wellness-sky-dark mb-3">
              What are you grateful for today?
            </label>
            <Textarea
              placeholder="List three things you're grateful for today. They can be big or small - every blessing counts!"
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="min-h-[100px] resize-none border-wellness-sky/30 focus:border-wellness-sky/50 transition-colors"
            />
          </div>
        </CardContent>
      </Card>

      {/* Wellness Tips */}
      <Card className="glass-morphism border-wellness-peach/30 hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
            <div className="p-2 rounded-lg bg-wellness-peach/20">
              <Sparkles className="h-5 w-5" />
            </div>
            Wellness Tips for Today
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-xl bg-wellness-sage/10 border border-wellness-sage/20 hover:border-wellness-sage/30 transition-colors">
              <h3 className="font-semibold text-wellness-sage-dark mb-3 flex items-center gap-2">
                <span className="text-lg">🧘‍♀️</span>
                If you're feeling stressed:
              </h3>
              <ul className="text-sm text-wellness-sage-dark/80 space-y-2 leading-relaxed">
                <li>• Take 5 deep, mindful breaths</li>
                <li>• Go for a gentle walk outside</li>
                <li>• Practice a 5-minute meditation</li>
                <li>• Listen to calming music</li>
              </ul>
            </div>
            <div className="p-6 rounded-xl bg-wellness-sky/10 border border-wellness-sky/20 hover:border-wellness-sky/30 transition-colors">
              <h3 className="font-semibold text-wellness-sky-dark mb-3 flex items-center gap-2">
                <span className="text-lg">💙</span>
                If you're feeling low:
              </h3>
              <ul className="text-sm text-wellness-sky-dark/80 space-y-2 leading-relaxed">
                <li>• Reach out to someone you trust</li>
                <li>• Do something creative you enjoy</li>
                <li>• Practice self-compassion</li>
                <li>• Remember: this feeling will pass</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mood;
