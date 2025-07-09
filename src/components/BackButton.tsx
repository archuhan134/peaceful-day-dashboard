
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="fixed top-4 right-4 z-50">
      <Button
        variant="outline"
        size="sm"
        onClick={handleBack}
        className="glass-morphism border-wellness-sage/30 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 bg-white/90 backdrop-blur-md rounded-xl p-3"
      >
        <ArrowLeft className="h-5 w-5 text-wellness-sage-dark" />
      </Button>
    </div>
  );
};

export default BackButton;
