"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useGoalStore } from "@/store/goalStore";
import { Upload, CheckCircle2, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

export default function CheckInsPage() {
  const { goals } = useGoalStore();
  const activeGoals = goals.filter((g) => g.employeeId === "emp-1" && g.status === "Approved");

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Quarterly Check-ins</h1>
        <p className="text-muted-foreground">Update your progress for Q3. Submit planned vs actual achievements.</p>
      </div>

      <div className="grid gap-6">
        {activeGoals.length === 0 ? (
          <Card className="border-dashed border-2 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <h3 className="font-semibold text-lg text-muted-foreground">No active goals available for check-in</h3>
            </CardContent>
          </Card>
        ) : (
          activeGoals.map((goal, idx) => {
            // Mock random progress for demo purposes
            const mockActual = Math.floor(goal.target * 0.7);
            const progressPercent = Math.min((mockActual / goal.target) * 100, 100);

            return (
              <Card key={goal.id} className="overflow-hidden">
                <div className="bg-muted/30 px-6 py-4 border-b flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="bg-background">{goal.thrustArea}</Badge>
                    <h3 className="font-semibold text-lg">{goal.title}</h3>
                  </div>
                  <Badge variant="secondary" className="flex items-center gap-1 text-warning-foreground bg-warning/20 border-warning/30">
                    <Clock className="w-3 h-3" /> Due in 5 days
                  </Badge>
                </div>
                
                <CardContent className="p-6 grid gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Current Progress</span>
                        <span className="font-medium">{progressPercent.toFixed(0)}%</span>
                      </div>
                      <Progress value={progressPercent} className="h-2" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Planned Target</label>
                        <div className="text-xl font-bold">{goal.target} <span className="text-sm font-normal text-muted-foreground">{goal.uom}</span></div>
                      </div>
                      <div className="space-y-1">
                        <label className="text-xs text-muted-foreground">Weightage</label>
                        <div className="text-xl font-bold">{goal.weightage}%</div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t md:border-t-0 md:border-l pt-4 md:pt-0 md:pl-6 border-border/50">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Actual Achievement (Q3)</label>
                      <div className="flex gap-2">
                        <Input type="number" defaultValue={mockActual} />
                        <Input disabled value={goal.uom} className="w-16 bg-muted" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Manager Update Note</label>
                      <Textarea placeholder="Explain your progress, challenges, and next steps..." className="h-20 resize-none" />
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-muted-foreground"
                        onClick={() => {
                          const input = document.createElement('input');
                          input.type = 'file';
                          input.onchange = (e) => {
                            if ((e.target as HTMLInputElement).files?.length) {
                              window.alert("Evidence file attached successfully!");
                            }
                          };
                          input.click();
                        }}
                      >
                        <Upload className="w-4 h-4 mr-2" /> Attach Evidence
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => window.alert("Check-in update submitted successfully!")}
                      >
                        <CheckCircle2 className="w-4 h-4 mr-2" /> Submit Update
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>
    </div>
  );
}
