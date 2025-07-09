
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, Heart, Star, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import BackButton from "@/components/BackButton";

const Inspire = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  const [savedQuotes, setSavedQuotes] = useLocalStorage("savedQuotes", []);

  const inspirationalQuotes = [
    {
      text: "The journey of a thousand miles begins with a single step.",
      author: "Lao Tzu"
    },
    {
      text: "Your life does not get better by chance, it gets better by change.",
      author: "Jim Rohn"
    },
    {
      text: "Progress, not perfection, is the goal.",
      author: "Unknown"
    },
    {
      text: "Small daily improvements lead to stunning results.",
      author: "Robin Sharma"
    },
    {
      text: "You are never too old to set another goal or to dream a new dream.",
      author: "C.S. Lewis"
    },
    {
      text: "Success is the sum of small efforts repeated day in and day out.",
      author: "Robert Collier"
    }
  ];

  const journalingPrompts = [
    "What are three things I'm grateful for today?",
    "What small win can I celebrate from this week?",
    "How did I show kindness to myself today?",
    "What lesson did I learn recently?",
    "What energizes me the most?",
    "How can I make tomorrow better than today?"
  ];

  const getNextQuote = () => {
    setCurrentQuoteIndex((prev) => (prev + 1) % inspirationalQuotes.length);
  };

  const saveQuote = () => {
    const currentQuote = inspirationalQuotes[currentQuoteIndex];
    if (!savedQuotes.find(q => q.text === currentQuote.text)) {
      setSavedQuotes([...savedQuotes, { ...currentQuote, savedAt: new Date().toISOString() }]);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent mb-2">
          Daily Inspiration
        </h1>
        <p className="text-wellness-sage-dark/70">
          Uplift your spirit with motivational quotes and journaling prompts
        </p>
      </div>

      {/* Daily Quote */}
      <div className="px-4">
        <Card className="glass-morphism border-wellness-lavender/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-lavender-dark">
              <Lightbulb className="h-5 w-5" />
              Quote of the Moment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <blockquote className="text-xl font-medium text-wellness-sage-dark leading-relaxed">
              "{inspirationalQuotes[currentQuoteIndex].text}"
            </blockquote>
            <cite className="text-wellness-sage-dark/70 text-lg">
              — {inspirationalQuotes[currentQuoteIndex].author}
            </cite>
            <div className="flex gap-3 justify-center">
              <Button onClick={getNextQuote} className="bg-wellness-lavender hover:bg-wellness-lavender-dark text-white">
                <Sparkles className="h-4 w-4 mr-2" />
                New Quote
              </Button>
              <Button onClick={saveQuote} variant="outline" className="border-wellness-lavender/30">
                <Heart className="h-4 w-4 mr-2" />
                Save Quote
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Journaling Prompts */}
      <div className="px-4">
        <Card className="glass-morphism border-wellness-sky/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-sky-dark">
              <Star className="h-5 w-5" />
              Reflection Prompts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {journalingPrompts.map((prompt, index) => (
                <div key={index} className="p-4 bg-wellness-sky/10 rounded-lg">
                  <p className="text-wellness-sage-dark font-medium">{prompt}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Saved Quotes */}
      {savedQuotes.length > 0 && (
        <div className="px-4">
          <Card className="glass-morphism border-wellness-peach/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-wellness-peach-dark">
                <Heart className="h-5 w-5" />
                Your Saved Quotes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {savedQuotes.map((quote, index) => (
                  <div key={index} className="p-3 bg-wellness-peach/10 rounded-lg">
                    <p className="text-wellness-sage-dark font-medium">"{quote.text}"</p>
                    <p className="text-sm text-wellness-sage-dark/70">— {quote.author}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="h-6"></div>
    </div>
  );
};

export default Inspire;
