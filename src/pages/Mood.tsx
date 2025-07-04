
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Heart, Smile } from "lucide-react";
import { useLocalStorage } from "@/hooks/useLocalStorage";

const Mood = () => {
  const navigate = useNavigate();
  
  const [todayMood, setTodayMood] = useLocalStorage("todayMood", "😊");
  const [wellnessRating, setWellnessRating] = useLocalStorage("wellnessRating", 0);
  const [wellnessReflection, setWellnessReflection] = useLocalStorage("wellnessReflection", "");
  const [gratitude, setGratitude] = useLocalStorage("gratitude", "");

  const moods = [
    { emoji: "😊", label: "Happy", color: "wellness-peach" },
    { emoji: "😌", label: "Calm", color: "wellness-sky" },
    { emoji: "😴", label: "Sleepy", color: "wellness-lavender" },
    { emoji: "🤔", label: "Thoughtful", color: "wellness-sage" },
    { emoji: "😅", label: "Stressed", color: "wellness-peach" },
    { emoji: "😢", label: "Sad", color: "wellness-sky" },
    { emoji: "😡", label: "Angry", color: "wellness-lavender" },
    { emoji: "🤗", label: "Grateful", color: "wellness-sage" },
    { emoji: "😍", label: "Excited", color: "wellness-peach" },
    { emoji: "😐", label: "Neutral", color: "wellness-sky" }
  ];

  const handleWellnessRating = (rating: number) => {
    setWellnessRating(rating);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          onClick={() => navigate('/')}
          className="hover:bg-wellness-lavender/20"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Dashboard
        </Button>
        <div>
          <h1 className="text-3xl font-poppins font-bold text-wellness-lavender-dark">
            Mood Journal
          </h1>
          <p className="text-wellness-lavender-dark/70">
            Check in with yourself and track your emotional wellness
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Mood Selection */}
        <Card className="glass-morphism border-wellness-sage/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-sage-dark">
              <Smile className="h-5 w-5" />
              How are you feeling right now?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-3">
              {moods.map((mood) => (
                <button
                  key={mood.emoji}
                  onClick={() => setTodayMood(mood.emoji)}
                  className={`p-3 rounded-lg hover:bg-wellness-sage/20 transition-all text-center ${
                    todayMood === mood.emoji ? 'bg-wellness-sage/30 ring-2 ring-wellness-sage' : ''
                  }`}
                  title={mood.label}
                >
                  <div className="text-2xl mb-1">{mood.emoji}</div>
                  <div className="text-xs text-wellness-sage-dark/70">{mood.label}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Wellness Rating */}
        <Card className="glass-morphism border-wellness-lavender/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-wellness-lavender-dark">
              <Heart className="h-5 w-5" />
              Wellness Rating
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-wellness-lavender-dark/70">Rate your overall wellness today</p>
              <div className="flex justify-center gap-2">
                {[1, 2, 3, 4, 5].map((rating) => (
                  <button
                    key={rating}
                    onClick={() => handleWellnessRating(rating)}
                    className={`w-8 h-8 rounded-full transition-all hover:scale-110 ${
                      rating <= wellnessRating
                        ? "bg-wellness-lavender shadow-lg"
                        : "bg-wellness-lavender/20 hover:bg-wellness-lavender/40"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-wellness-lavender-dark/50">
                {wellnessRating > 0 && `${wellnessRating}/5`}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reflection */}
      <Card className="glass-morphism border-wellness-sky/20">
        <CardHeader>
          <CardTitle className="text-wellness-sky-dark">
            Daily Reflection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-wellness-sky-dark mb-2">
              What's on your mind today?
            </label>
            <Textarea
              placeholder="Take a moment to reflect on your thoughts, feelings, and experiences..."
              value={wellnessReflection}
              onChange={(e) => setWellnessReflection(e.target.value)}
              className="min-h-[120px] resize-none border-wellness-sky/20"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-wellness-sky-dark mb-2">
              What are you grateful for today?
            </label>
            <Textarea
              placeholder="List three things you're grateful for today..."
              value={gratitude}
              onChange={(e) => setGratitude(e.target.value)}
              className="min-h-[80px] resize-none border-wellness-sky/20"
            />
          </div>
        </CardContent>
      </Card>

      {/* Mood Tips */}
      <Card className="glass-morphism border-wellness-peach/20">
        <CardHeader>
          <CardTitle className="text-wellness-peach-dark">
            Wellness Tips
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 rounded-lg bg-wellness-sage/10">
              <h3 className="font-medium text-wellness-sage-dark mb-2">If you're feeling stressed:</h3>
              <ul className="text-sm text-wellness-sage-dark/70 space-y-1">
                <li>• Take 5 deep breaths</li>
                <li>• Go for a short walk</li>
                <li>• Practice mindfulness</li>
              </ul>
            </div>
            <div className="p-4 rounded-lg bg-wellness-sky/10">
              <h3 className="font-medium text-wellness-sky-dark mb-2">If you're feeling low:</h3>
              <ul className="text-sm text-wellness-sky-dark/70 space-y-1">
                <li>• Reach out to a friend</li>
                <li>• Do something you enjoy</li>
                <li>• Practice self-compassion</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Mood;
