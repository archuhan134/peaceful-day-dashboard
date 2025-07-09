
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, BookOpen, Lightbulb, Target, Heart } from "lucide-react";
import BackButton from "@/components/BackButton";

const Library = () => {
  const resources = [
    {
      category: "Habit Building",
      icon: Target,
      color: "wellness-sky",
      articles: [
        { title: "The Science of Habit Formation", readTime: "5 min read" },
        { title: "21-Day Habit Challenge Guide", readTime: "3 min read" },
        { title: "Breaking Bad Habits Effectively", readTime: "7 min read" }
      ]
    },
    {
      category: "Mindfulness & Wellness",
      icon: Heart,
      color: "wellness-lavender",
      articles: [
        { title: "Morning Meditation for Beginners", readTime: "4 min read" },
        { title: "Stress Management Techniques", readTime: "6 min read" },
        { title: "The Power of Gratitude Practice", readTime: "5 min read" }
      ]
    },
    {
      category: "Productivity & Planning",
      icon: Lightbulb,
      color: "wellness-peach",
      articles: [
        { title: "Time Blocking Strategies", readTime: "8 min read" },
        { title: "Goal Setting That Actually Works", readTime: "6 min read" },
        { title: "Weekly Review Process", readTime: "4 min read" }
      ]
    }
  ];

  const tips = [
    "Start with just 2-3 habits to avoid overwhelm",
    "Track your progress visually for motivation",
    "Create environmental cues for new habits",
    "Celebrate small wins along the way",
    "Be patient - lasting change takes time"
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <BackButton />
      
      <div className="text-center px-4">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent mb-2">
          Resource Library
        </h1>
        <p className="text-wellness-sage-dark/70">
          Curated content to support your wellness journey
        </p>
      </div>

      {/* Quick Tips */}
      <div className="px-4">
        <Card className="glass-morphism border-wellness-sage/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-wellness-sage-dark">
              <Book className="h-5 w-5" />
              Quick Tips
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-wellness-sage/10 rounded-lg">
                  <div className="w-6 h-6 rounded-full bg-wellness-sage text-white text-sm flex items-center justify-center mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-wellness-sage-dark">{tip}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resource Categories */}
      {resources.map((category, index) => {
        const Icon = category.icon;
        return (
          <div key={index} className="px-4">
            <Card className={`glass-morphism border-${category.color}/20`}>
              <CardHeader>
                <CardTitle className={`flex items-center gap-3 text-${category.color}-dark`}>
                  <Icon className="h-5 w-5" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {category.articles.map((article, articleIndex) => (
                    <div key={articleIndex} className={`flex items-center justify-between p-3 bg-${category.color}/10 rounded-lg hover:bg-${category.color}/20 transition-colors cursor-pointer`}>
                      <div className="flex items-center gap-3">
                        <BookOpen className={`h-4 w-4 text-${category.color}-dark`} />
                        <div>
                          <h4 className="font-medium text-wellness-sage-dark">{article.title}</h4>
                        </div>
                      </div>
                      <Badge className={`bg-${category.color}/20 text-${category.color}-dark border-${category.color}/30`}>
                        {article.readTime}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}

      <div className="h-6"></div>
    </div>
  );
};

export default Library;
