
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { useCompletedTasks } from "@/hooks/useCompletedTasks";
import { useTranslations } from "@/hooks/useTranslations";

const TasksCompletedSection = () => {
  const { t } = useTranslations();
  const { completedTasks, getTasksCount } = useCompletedTasks();

  return (
    <div className="px-4">
      <Card className="glass-morphism border-wellness-peach/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-wellness-peach-dark flex items-center gap-2">
              <CheckCircle className="h-5 w-5" />
              {t('tasksCompleted')} ({getTasksCount()})
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {completedTasks.length === 0 ? (
              <p className="text-wellness-sage-dark/70 text-center py-4">
                No tasks completed yet.
              </p>
            ) : (
              completedTasks.slice(0, 10).map((task) => (
                <div key={task.id} className="flex items-center justify-between p-3 bg-wellness-peach/10 rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium text-wellness-sage-dark">{task.name}</h4>
                    <p className="text-sm text-wellness-sage-dark/70">
                      {task.date} • {task.completionTime}
                    </p>
                  </div>
                  <Badge className="bg-wellness-peach/20 text-wellness-peach-dark border-wellness-peach/30 capitalize">
                    {task.type}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TasksCompletedSection;
