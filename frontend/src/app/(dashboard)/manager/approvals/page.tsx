"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useGoalStore } from "@/store/goalStore";
import { Check, X, Edit2, Save, AlertTriangle, ShieldAlert } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ApprovalsPage() {
  const { goals, approveGoal, rejectGoal, updateGoal } = useGoalStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editWeightage, setEditWeightage] = useState<number>(0);
  const [toast, setToast] = useState<{message: string, type: "success" | "error" | "warning"} | null>(null);

  const showToast = (message: string, type: "success" | "error" | "warning") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // We are mocking manager view for "mgr-1"
  const pendingGoals = goals.filter((g) => g.managerId === "mgr-1" && g.status === "Pending Approval");
  
  const handleEditClick = (id: string, currentWeightage: number) => {
    setEditingId(id);
    setEditWeightage(currentWeightage);
  };

  const handleSaveClick = (id: string) => {
    updateGoal(id, { weightage: editWeightage });
    setEditingId(null);
    showToast("Weightage updated successfully", "success");
  };

  const handleApprove = (id: string) => {
    approveGoal(id);
    showToast("Goal approved and activated", "success");
  };

  const handleReject = (id: string) => {
    rejectGoal(id);
    showToast("Goal sent back for rework", "warning");
  };

  const handleEscalate = (id: string) => {
    // Mock escalation
    showToast("Issue escalated to HR/Leadership", "error");
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Pending Approvals</h1>
        <p className="text-muted-foreground">Review, edit weightages, and approve employee goal submissions.</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Goal Submissions Queue</CardTitle>
          <CardDescription>
            You have {pendingGoals.length} goals waiting for your review.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {pendingGoals.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              No pending approvals at the moment.
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Goal Title</TableHead>
                    <TableHead>Thrust Area</TableHead>
                    <TableHead>Target</TableHead>
                    <TableHead className="w-[150px]">Weightage</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingGoals.map((goal) => (
                    <TableRow key={goal.id}>
                      <TableCell className="font-medium">{goal.employeeName}</TableCell>
                      <TableCell>{goal.title}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{goal.thrustArea}</Badge>
                      </TableCell>
                      <TableCell>{goal.target} {goal.uom}</TableCell>
                      <TableCell>
                        {editingId === goal.id ? (
                          <div className="flex items-center gap-2">
                            <Input 
                              type="number" 
                              className="w-16 h-8 p-1 text-center" 
                              value={editWeightage}
                              onChange={(e) => setEditWeightage(Number(e.target.value))}
                            />
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-success" onClick={() => handleSaveClick(goal.id)}>
                              <Save className="h-4 w-4" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2 group">
                            <span>{goal.weightage}%</span>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                              onClick={() => handleEditClick(goal.id, goal.weightage)}
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="text-muted-foreground hover:text-foreground hover:bg-muted"
                            onClick={() => handleEscalate(goal.id)}
                            title="Escalate Issue"
                          >
                            <ShieldAlert className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-destructive border-destructive/30 hover:bg-destructive/10"
                            onClick={() => handleReject(goal.id)}
                          >
                            <X className="h-4 w-4 mr-1" /> Rework
                          </Button>
                          <Button 
                            size="sm" 
                            className="bg-success text-success-foreground hover:bg-success/90 shadow-lg shadow-success/20"
                            onClick={() => handleApprove(goal.id)}
                          >
                            <Check className="h-4 w-4 mr-1" /> Approve
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
      
      {/* Recently Processed block */}
      <Card className="opacity-90 border-t-4 border-t-muted">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            Approval Timeline <span className="flex h-2 w-2 rounded-full bg-success"></span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {goals.filter(g => g.status === "Approved" || g.status === "Returned for Rework").length === 0 ? (
              <div className="text-sm text-muted-foreground italic">
                Approval logs will appear here.
              </div>
            ) : (
              goals.filter(g => g.status === "Approved" || g.status === "Returned for Rework").map((goal, idx) => (
                <div key={idx} className="flex items-center gap-4 text-sm border-b border-border/40 pb-3 last:border-0 last:pb-0">
                  <div className={`p-2 rounded-full ${goal.status === "Approved" ? "bg-success/20 text-success" : "bg-destructive/20 text-destructive"}`}>
                    {goal.status === "Approved" ? <Check className="h-4 w-4" /> : <X className="h-4 w-4" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-foreground">You {goal.status === "Approved" ? "approved" : "rejected"} goal from {goal.employeeName}</p>
                    <p className="text-muted-foreground">{goal.title}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">Just now</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Floating Toast Mock */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border backdrop-blur-xl ${
              toast.type === "success" ? "bg-success/10 border-success/30 text-success-foreground" :
              toast.type === "error" ? "bg-destructive/10 border-destructive/30 text-destructive-foreground" :
              "bg-warning/10 border-warning/30 text-warning-foreground"
            }`}
          >
            {toast.type === "success" && <Check className="h-5 w-5 text-success" />}
            {toast.type === "error" && <ShieldAlert className="h-5 w-5 text-destructive" />}
            {toast.type === "warning" && <AlertTriangle className="h-5 w-5 text-warning" />}
            <span className="font-semibold">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
