
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User } from "lucide-react";
import { useTranslations } from "@/hooks/useTranslations";

const ProfileHeader = () => {
  const { t } = useTranslations();

  return (
    <div className="flex items-start gap-4 px-4">
      <Avatar className="w-16 h-16">
        <AvatarFallback className="bg-wellness-sage/20">
          <User className="h-8 w-8 text-wellness-sage-dark" />
        </AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-wellness-sage-dark mb-2">{t('profile')}</h1>
      </div>
    </div>
  );
};

export default ProfileHeader;
