import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Target, AlertCircle, MessageSquare, Clock, User, ArrowRight } from "lucide-react";

export default function ActivityPage() {
  const activities = [
    {
      id: 1,
      type: "approval",
      title: "Goal Approved",
      description: "Manager 'Alex M.' approved your goal 'Increase Q3 Sales'.",
      time: "2 hours ago",
      icon: CheckCircle2,
      color: "text-success",
      bg: "bg-success/10",
    },
    {
      id: 2,
      type: "comment",
      title: "Manager Commented",
      description: "Alex M. left a comment on your Q2 Check-in for 'Customer Churn'.",
      time: "1 day ago",
      icon: MessageSquare,
      color: "text-primary",
      bg: "bg-primary/10",
    },
    {
      id: 3,
      type: "alert",
      title: "Escalation Warning",
      description: "Your Q2 update for 'Product Launch' is overdue by 3 days.",
      time: "3 days ago",
      icon: AlertCircle,
      color: "text-destructive",
      bg: "bg-destructive/10",
    },
    {
      id: 4,
      type: "goal",
      title: "Goal Submitted",
      description: "You submitted 4 new goals for Q3 approval.",
      time: "1 week ago",
      icon: Target,
      color: "text-accent",
      bg: "bg-accent/10",
    },
    {
      id: 5,
      type: "system",
      title: "Cycle Started",
      description: "HR Admin opened the Q3 Performance Cycle.",
      time: "2 weeks ago",
      icon: Clock,
      color: "text-muted-foreground",
      bg: "bg-muted",
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Activity Timeline</h1>
        <p className="text-muted-foreground">Comprehensive audit log of your performance journey.</p>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-border before:to-transparent">
            {activities.map((activity, index) => (
              <div key={activity.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                {/* Icon */}
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-background shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm ${activity.bg} ${activity.color} z-10`}>
                  <activity.icon className="w-4 h-4" />
                </div>
                
                {/* Card */}
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
                  <div className="flex items-center justify-between space-x-2 mb-1">
                    <div className="font-bold text-sm">{activity.title}</div>
                    <time className="text-xs font-medium text-muted-foreground">{activity.time}</time>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {activity.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
