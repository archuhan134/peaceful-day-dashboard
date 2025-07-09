
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sparkles, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      toast.error("Please fill in all required fields");
      return false;
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);

    // Simulate authentication process
    setTimeout(() => {
      const userData = {
        email: formData.email,
        loginTime: new Date().toISOString(),
        isAuthenticated: true
      };
      
      localStorage.setItem("userSession", JSON.stringify(userData));
      toast.success(isLogin ? "Login successful!" : "Account created successfully!");
      navigate('/');
      setLoading(false);
    }, 1500);
  };

  const handleGoogleAuth = () => {
    setLoading(true);
    
    // Simulate Google authentication
    setTimeout(() => {
      const userData = {
        email: "user@gmail.com",
        loginTime: new Date().toISOString(),
        isAuthenticated: true,
        provider: "google"
      };
      
      localStorage.setItem("userSession", JSON.stringify(userData));
      toast.success("Google authentication successful!");
      navigate('/');
      setLoading(false);
    }, 1000);
  };

  const handleDemoUser = () => {
    const demoData = {
      email: "demo@dailylife.app",
      loginTime: new Date().toISOString(),
      isAuthenticated: true,
      isDemo: true
    };
    
    localStorage.setItem("userSession", JSON.stringify(demoData));
    toast.success("Welcome to the demo!");
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-wellness-sage/5 via-wellness-sky/5 to-wellness-lavender/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md glass-morphism border-wellness-sage/20 shadow-2xl">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-wellness-sage via-wellness-sky to-wellness-lavender flex items-center justify-center shadow-lg">
              <Sparkles className="h-8 w-8 text-white animate-pulse" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-wellness-sage-dark via-wellness-sky-dark to-wellness-lavender-dark bg-clip-text text-transparent">
            Daily Life Routine
          </CardTitle>
          <p className="text-wellness-sage-dark/70 mt-2 font-medium">
            Organize. Reflect. Grow.
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Toggle between Login and Sign Up */}
          <div className="flex bg-wellness-sage/10 rounded-lg p-1">
            <Button
              variant={isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(true)}
              className={`flex-1 rounded-md ${isLogin ? 'bg-wellness-sage text-white' : 'text-wellness-sage-dark'}`}
            >
              Login
            </Button>
            <Button
              variant={!isLogin ? "default" : "ghost"}
              onClick={() => setIsLogin(false)}
              className={`flex-1 rounded-md ${!isLogin ? 'bg-wellness-sage text-white' : 'text-wellness-sage-dark'}`}
            >
              Sign Up
            </Button>
          </div>

          {/* Email/Password Form */}
          <form onSubmit={handleEmailAuth} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-wellness-sage-dark font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-wellness-sage-dark/50" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="pl-10 border-wellness-sage/30 focus:border-wellness-sage"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-wellness-sage-dark font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-wellness-sage-dark/50" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10 pr-10 border-wellness-sage/30 focus:border-wellness-sage"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-wellness-sage-dark font-medium">
                  Confirm Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-wellness-sage-dark/50" />
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    className="pl-10 pr-10 border-wellness-sage/30 focus:border-wellness-sage"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
                  >
                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-wellness-sage hover:bg-wellness-sage-dark text-white"
              disabled={loading}
            >
              {loading ? "Please wait..." : (isLogin ? "Login" : "Create Account")}
            </Button>
          </form>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-wellness-sage/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-wellness-sage-dark/60">or</span>
            </div>
          </div>

          {/* Google Sign Up */}
          <Button
            onClick={handleGoogleAuth}
            variant="outline"
            className="w-full border-wellness-sky/30 hover:bg-wellness-sky/10"
            disabled={loading}
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 mr-2">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          {/* Demo User */}
          <Button
            onClick={handleDemoUser}
            variant="outline"
            className="w-full border-wellness-lavender/30 hover:bg-wellness-lavender/10 text-wellness-lavender-dark"
          >
            Continue as Demo User
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
