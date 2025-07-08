
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Target, Calendar, Repeat, Heart, Bell, User, Settings, Menu } from "lucide-react";
import { useState } from "react";
import AppHeader from "@/components/AppHeader";

const Index = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const quickActions = [
    { 
      name: "Habits", 
      path: "/habits", 
      icon: Target, 
      color: "from-wellness-sage to-wellness-sky",
      description: "Track daily habits"
    },
    { 
      name: "Planning", 
      path: "/planning", 
      icon: Calendar, 
      color: "from-wellness-sky to-wellness-lavender",
      description: "Plan your day"
    },
    { 
      name: "Routines", 
      path: "/routines", 
      icon: Repeat, 
      color: "from-wellness-lavender to-wellness-peach",
      description: "Manage routines"
    },
    { 
      name: "Mood", 
      path: "/mood", 
      icon: Heart, 
      color: "from-wellness-peach to-wellness-sage",
      description: "Track your mood"
    },
    { 
      name: "Reminders", 
      path: "/reminders", 
      icon: Bell, 
      color: "from-wellness-sage to-wellness-sky",
      description: "Set reminders"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-sage/5 via-wellness-sky/5 to-wellness-lavender/5">
      {/* Header with improved alignment */}
      <div className="flex items-center justify-between p-4 lg:p-6">
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="lg:hidden text-wellness-sage-dark hover:bg-wellness-sage/10 p-2"
        >
          <Menu className="h-5 w-5" />
        </Button>

        {/* Title - Centered on mobile, left-aligned on desktop */}
        <div className="flex-1 text-center lg:text-left lg:ml-0 ml-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-wellness-sage-dark leading-tight">
            Daily Life Routine
          </h1>
          <p className="text-wellness-sage-dark/70 text-sm sm:text-base lg:text-lg mt-1">
            Your peaceful wellness overview
          </p>
        </div>

        {/* Profile Icon - Modern rounded design */}
        <Link to="/profile" className="flex-shrink-0">
          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-wellness-sage/20 to-wellness-sky/20 border-2 border-wellness-sage/30 flex items-center justify-center hover:shadow-lg hover:scale-105 transition-all duration-300 hover:from-wellness-sage/30 hover:to-wellness-sky/30">
            <User className="h-5 w-5 sm:h-6 sm:w-6 text-wellness-sage-dark" />
          </div>
        </Link>
      </div>

      <div className="container mx-auto px-4 pb-6 max-w-6xl">
        {/* Welcome Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-wellness-sage/10 rounded-full mb-4">
            <div className="w-2 h-2 bg-wellness-sage rounded-full animate-pulse"></div>
            <span className="text-wellness-sage-dark text-sm font-medium">Welcome back to your wellness journey</span>
          </div>
          
          <h2 className="text-2xl lg:text-3xl font-bold text-wellness-sage-dark mb-4">
            How are you feeling today?
          </h2>
          <p className="text-wellness-sage-dark/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Take a moment to check in with yourself and nurture your well-being through mindful daily practices.
          </p>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link key={action.name} to={action.path}>
                <Card className="glass-morphism border-wellness-sage/20 hover:shadow-xl hover:scale-105 transition-all duration-300 group h-full">
                  <CardContent className="p-6 text-center">
                    <div className={`mx-auto w-16 h-16 bg-gradient-to-br ${action.color} rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                      <Icon className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-wellness-sage-dark mb-2">
                      {action.name}
                    </h3>
                    <p className="text-wellness-sage-dark/70 text-sm">
                      {action.description}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Today's Focus */}
        <Card className="glass-morphism border-wellness-peach/30 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-wellness-peach-dark">
              Today's Wellness Focus
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="space-y-4">
              <div className="text-4xl">🌱</div>
              <h3 className="text-xl font-semibold text-wellness-sage-dark">
                Growth Through Consistency
              </h3>
              <p className="text-wellness-sage-dark/70 max-w-md mx-auto leading-relaxed">
                Small, consistent actions create lasting change. Focus on progress, not perfection, and celebrate every step forward.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Motivation Section */}
        <div className="text-center">
          <div className="inline-flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-wellness-sage/10 to-wellness-sky/10 rounded-2xl border border-wellness-sage/20">
            <div className="text-2xl">✨</div>
            <div>
              <p className="text-wellness-sage-dark font-medium">
                "Every day is a new opportunity to nurture your well-being"
              </p>
              <p className="text-wellness-sage-dark/60 text-sm mt-1">
                Start with one small step today
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
