
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const GuestLoginPanel = () => {
  const { t } = useTranslations();

  return (
    <Card className="glass-morphism border-wellness-sage/20 mx-4">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-wellness-sage-dark mb-1">{t('signUpOrLogIn')}</h3>
            <p className="text-sm text-wellness-sage-dark/70">{t('youAreCurrentlyInGuestMode')}</p>
          </div>
          <ChevronRight className="h-5 w-5 text-wellness-sage-dark/50" />
        </div>
      </CardContent>
    </Card>
  );
};

export default GuestLoginPanel;
