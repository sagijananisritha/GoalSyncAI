"use client";

import { useState, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGoalStore } from "@/store/goalStore";
import { Target, Plus, Trash2, AlertCircle, Save, Send, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { AIGoalGenerator } from "@/components/ai-goal-generator";

const CURRENT_EMPLOYEE_ID = "emp-1";

export default function GoalsPage() {
  const { goals, addGoal, removeGoal, updateGoal, submitGoalsForApproval } = useGoalStore();
  const [showAIModal, setShowAIModal] = useState(false);
  
  // Filter only draft goals for the current employee to show in the builder
  const draftGoals = goals.filter((g) => g.employeeId === CURRENT_EMPLOYEE_ID && g.status === "Draft");
  
  // Analytics
  const totalWeightage = useMemo(() => draftGoals.reduce((sum, g) => sum + (Number(g.weightage) || 0), 0), [draftGoals]);
  const goalCount = draftGoals.length;
  
  // Validations
  const isWeightageValid = totalWeightage === 100;
  const isGoalCountValid = goalCount > 0 && goalCount <= 8;
  const allGoalsHaveMinWeightage = draftGoals.every((g) => Number(g.weightage) >= 10);
  const canSubmit = isWeightageValid && isGoalCountValid && allGoalsHaveMinWeightage;

  const handleAddGoal = () => {
    if (goalCount >= 8) return;
    addGoal({
      title: "",
      description: "",
      thrustArea: "Revenue",
      target: 0,
      uom: "%",
      weightage: 10,
      employeeId: CURRENT_EMPLOYEE_ID,
      managerId: "mgr-1",
      employeeName: "Sarah Connor"
    });
  };

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Goal Creation Plan</h1>
        <p className="text-muted-foreground">Draft and submit your goals for Q3. Ensure total weightage is exactly 100%.</p>
      </div>

      {/* Progress & Validation Summary */}
      <Card className="sticky top-20 z-10 shadow-sm border-primary/20 backdrop-blur-md bg-background/90">
        <CardContent className="p-4 flex flex-col md:flex-row items-center gap-4 justify-between">
          <div className="flex-1 w-full space-y-2">
            <div className="flex justify-between text-sm font-medium">
              <span>Total Weightage</span>
              <span className={totalWeightage > 100 ? "text-destructive" : totalWeightage === 100 ? "text-success" : ""}>
                {totalWeightage}% / 100%
              </span>
            </div>
            <Progress value={Math.min(totalWeightage, 100)} className={totalWeightage > 100 ? "bg-destructive/20" : ""} />
          </div>
          
          <div className="flex flex-col gap-1 text-xs">
            <span className={`flex items-center gap-1 ${isWeightageValid ? "text-success" : "text-destructive"}`}>
              {isWeightageValid ? <Target className="w-3 h-3"/> : <AlertCircle className="w-3 h-3"/>}
              Total weightage must be 100%
            </span>
            <span className={`flex items-center gap-1 ${allGoalsHaveMinWeightage ? "text-success" : "text-destructive"}`}>
              {allGoalsHaveMinWeightage ? <Target className="w-3 h-3"/> : <AlertCircle className="w-3 h-3"/>}
              Min 10% per goal
            </span>
            <span className={`flex items-center gap-1 ${isGoalCountValid ? "text-success" : "text-destructive"}`}>
              {isGoalCountValid ? <Target className="w-3 h-3"/> : <AlertCircle className="w-3 h-3"/>}
              Max 8 goals (Current: {goalCount})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => setShowAIModal(true)} disabled={goalCount >= 8} className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              <Sparkles className="w-4 h-4 mr-2" /> AI Generator
            </Button>
            <Button variant="outline" size="sm" onClick={handleAddGoal} disabled={goalCount >= 8}>
              <Plus className="w-4 h-4 mr-2" /> Add Goal
            </Button>
            <Button size="sm" disabled={!canSubmit} onClick={() => {
              submitGoalsForApproval(CURRENT_EMPLOYEE_ID);
              window.alert("Goals successfully submitted for approval!");
            }}>
              <Send className="w-4 h-4 mr-2" /> Submit for Approval
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Goals List */}
      <div className="space-y-4">
        {draftGoals.length === 0 ? (
          <Card className="border-dashed border-2 bg-transparent shadow-none">
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <Target className="w-12 h-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="font-semibold text-lg">No Goals Drafted</h3>
              <p className="text-muted-foreground mb-4">Start aligning your performance journey.</p>
              <Button onClick={handleAddGoal}><Plus className="w-4 h-4 mr-2" /> Create First Goal</Button>
            </CardContent>
          </Card>
        ) : (
          draftGoals.map((goal, index) => (
            <Card key={goal.id} className="relative overflow-hidden transition-all hover:border-primary/30">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary"></div>
              <CardHeader className="pb-3 flex flex-row items-start justify-between">
                <div>
                  <CardTitle className="text-lg">Goal {index + 1}</CardTitle>
                  <CardDescription>Draft</CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => removeGoal(goal.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-12">
                <div className="lg:col-span-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium">Title</label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-2 text-[10px] text-primary hover:text-primary hover:bg-primary/10"
                      onClick={() => updateGoal(goal.id, { 
                        title: goal.title ? `Improve ${goal.title.toLowerCase()} by focusing on core KPIs` : "Enhance Customer Retention by 15%",
                        thrustArea: "Customer Success",
                        target: 15,
                        uom: "%"
                      })}
                    >
                      <Sparkles className="w-3 h-3 mr-1" /> AI Suggest
                    </Button>
                  </div>
                  <Input 
                    placeholder="E.g. Increase Q3 Sales" 
                    value={goal.title}
                    onChange={(e) => updateGoal(goal.id, { title: e.target.value })}
                  />
                </div>
                <div className="lg:col-span-3 space-y-2">
                  <label className="text-xs font-medium mt-[20px] block">Thrust Area</label>
                  <Input 
                    value={goal.thrustArea}
                    onChange={(e) => updateGoal(goal.id, { thrustArea: e.target.value })}
                  />
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-xs font-medium mt-[20px] block">Target & UoM</label>
                  <div className="flex gap-2">
                    <Input 
                      type="number" 
                      value={goal.target || ""}
                      onChange={(e) => updateGoal(goal.id, { target: Number(e.target.value) })}
                    />
                    <Input 
                      className="w-16" 
                      placeholder="%"
                      value={goal.uom}
                      onChange={(e) => updateGoal(goal.id, { uom: e.target.value })}
                    />
                  </div>
                </div>
                <div className="lg:col-span-2 space-y-2">
                  <label className="text-xs font-medium mt-[20px] block">Weightage (%)</label>
                  <Input 
                    type="number" 
                    value={goal.weightage || ""}
                    onChange={(e) => updateGoal(goal.id, { weightage: Number(e.target.value) })}
                    className={Number(goal.weightage) < 10 ? "border-destructive text-destructive" : ""}
                  />
                  {Number(goal.weightage) < 10 && <span className="text-[10px] text-destructive absolute">Min 10% required</span>}
                </div>
                <div className="lg:col-span-12 space-y-2 mt-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-medium">Description (Optional)</label>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-5 px-2 text-[10px] text-accent hover:text-accent hover:bg-accent/10"
                      onClick={() => updateGoal(goal.id, { 
                        description: "Implement a robust feedback loop and proactive outreach strategy to ensure client satisfaction and reduce churn rates." 
                      })}
                    >
                      <Sparkles className="w-3 h-3 mr-1" /> Make it SMART
                    </Button>
                  </div>
                  <Input 
                    placeholder="Detailed description of how to achieve this goal..."
                    value={goal.description}
                    onChange={(e) => updateGoal(goal.id, { description: e.target.value })}
                  />
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Submitted Goals Section */}
      {goals.filter(g => g.employeeId === CURRENT_EMPLOYEE_ID && g.status !== "Draft").length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Submitted & Active Goals</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {goals.filter(g => g.employeeId === CURRENT_EMPLOYEE_ID && g.status !== "Draft").map(goal => (
              <Card key={goal.id} className="opacity-75">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-base">{goal.title}</CardTitle>
                    <Badge variant={goal.status === "Approved" ? "default" : goal.status === "Pending Approval" ? "secondary" : "destructive"}>
                      {goal.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="text-sm">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Weightage: {goal.weightage}%</span>
                    <span>Target: {goal.target} {goal.uom}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <AIGoalGenerator 
        open={showAIModal} 
        onOpenChange={setShowAIModal} 
        onApplyGoal={(goalData) => {
          if (goalCount >= 8) return;
          addGoal({
            ...goalData,
            employeeId: CURRENT_EMPLOYEE_ID,
            managerId: "mgr-1",
            employeeName: "Sarah Connor"
          });
        }} 
      />
    </div>
  );
}
