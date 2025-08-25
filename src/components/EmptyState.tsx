import { Calendar, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  onAddActivity: () => void;
}

export const EmptyState = ({ onAddActivity }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="relative mb-8">
        <div className="w-24 h-24 bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl flex items-center justify-center">
          <Calendar className="w-12 h-12 text-red-400" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent-green rounded-full flex items-center justify-center">
          <Plus className="w-5 h-5 text-white" />
        </div>
      </div>
      
      <h3 className="text-xl font-semibold text-foreground mb-2">
        There is nothing scheduled
      </h3>
      
      <p className="text-text-gray text-center max-w-sm">
        Try adding new activities
      </p>
    </div>
  );
};