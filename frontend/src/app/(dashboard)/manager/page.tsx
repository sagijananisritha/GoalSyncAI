"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, AlertTriangle, CheckCircle, Clock, MessageSquare, TrendingUp, X, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ToastComponent, Toast } from "@/components/ui/toast";

const heatmapData = [
  { name: 'Sarah C.', revenue: 90, product: 85, customer: 95 },
  { name: 'John D.', revenue: 40, product: 60, customer: 80 },
  { name: 'Alice S.', revenue: 10, product: 30, customer: 20 },
  { name: 'Bob J.', revenue: 75, product: 90, customer: 60 },
];

const getHeatmapColor = (value: number) => {
  if (value >= 80) return 'bg-success/90 text-success-foreground hover:bg-success';
  if (value >= 50) return 'bg-warning/90 text-warning-foreground hover:bg-warning';
  return 'bg-destructive/90 text-destructive-foreground hover:bg-destructive';
};

const approvalItems = [
  { id: 1, name: "John Doe", type: "Goal Creation", time: "2h ago", status: "pending" },
  { id: 2, name: "Alice Smith", type: "Q3 Update", time: "4h ago", status: "pending" },
  { id: 3, name: "Bob Johnson", type: "Goal Creation", time: "1d ago", status: "pending" },
];

export default function ManagerDashboard() {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [comment, setComment] = useState("");
  const [approvals, setApprovals] = useState(approvalItems);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (variant: Toast["variant"], title: string, description?: string) => {
    const id = Math.random().toString(36).substring(7);
    setToasts(prev => [...prev, { id, variant, title, description }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handleApprove = (id: number) => {
    setApprovals(prev => prev.map(item => 
      item.id === id ? { ...item, status: "approved" } : item
    ));
    addToast("success", "Goal Approved", "The goal has been successfully approved and is now active.");
    setSelectedItem(null);
    setComment("");
  };

  const handleReject = (id: number) => {
    setApprovals(prev => prev.map(item => 
      item.id === id ? { ...item, status: "rejected" } : item
    ));
    addToast("error", "Goal Rejected", comment || "The goal has been rejected. The employee will be notified.");
    setSelectedItem(null);
    setComment("");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-success/10 text-success border-success/30">Approved</Badge>;
      case "rejected":
        return <Badge className="bg-destructive/10 text-destructive border-destructive/30">Rejected</Badge>;
      default:
        return <Badge variant="outline" className="bg-warning/10 text-warning border-warning/30">Pending</Badge>;
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Team Overview</h1>
        <p className="text-muted-foreground text-base">Monitor performance, approvals, and bottlenecks across your team.</p>
      </motion.div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            title: "Team Completion Rate", 
            value: "74%", 
            icon: Users, 
            color: "text-primary",
            desc: "Across 12 team members"
          },
          { 
            title: "Pending Approvals", 
            value: "8", 
            icon: Clock, 
            color: "text-warning",
            desc: "Requires your attention"
          },
          { 
            title: "Goals at Risk", 
            value: "3", 
            icon: AlertTriangle, 
            color: "text-destructive",
            desc: "Missing recent updates"
          },
          { 
            title: "Top Performers", 
            value: "4", 
            icon: CheckCircle, 
            color: "text-success",
            desc: "Exceeding targets"
          },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card-premium hover-lift">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                <stat.icon className={`h-4 w-4 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2">{stat.desc}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-7">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="col-span-1 lg:col-span-4"
        >
          <Card className="glass-card-premium h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Team Performance Heatmap
              </CardTitle>
              <CardDescription>
                Goal progress distributed by employee and thrust area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="w-full mt-4 flex flex-col gap-2">
                <div className="grid grid-cols-4 gap-2 text-xs text-muted-foreground text-center font-medium mb-2">
                  <div className="text-left">Employee</div>
                  <div>Revenue</div>
                  <div>Product</div>
                  <div>Customer</div>
                </div>
                {heatmapData.map((row, idx) => (
                  <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="grid grid-cols-4 gap-2 items-center"
                  >
                    <div className="text-sm font-medium">{row.name}</div>
                    <div className={`h-12 rounded-md flex items-center justify-center text-xs font-bold transition-all hover:scale-105 cursor-pointer ${getHeatmapColor(row.revenue)}`}>
                      {row.revenue}%
                    </div>
                    <div className={`h-12 rounded-md flex items-center justify-center text-xs font-bold transition-all hover:scale-105 cursor-pointer ${getHeatmapColor(row.product)}`}>
                      {row.product}%
                    </div>
                    <div className={`h-12 rounded-md flex items-center justify-center text-xs font-bold transition-all hover:scale-105 cursor-pointer ${getHeatmapColor(row.customer)}`}>
                      {row.customer}%
                    </div>
                  </motion.div>
                ))}
                <div className="flex items-center gap-4 mt-6 text-xs text-muted-foreground justify-center">
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-success/90"></div> On Track (≥80%)</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-warning/90"></div> At Risk (50-79%)</div>
                  <div className="flex items-center gap-1"><div className="w-3 h-3 rounded-full bg-destructive/90"></div> Off Track (&lt;50%)</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="col-span-1 lg:col-span-3"
        >
          <Card className="glass-card-premium h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-accent" />
                Approval Queue
              </CardTitle>
              <CardDescription>
                Recent goal submissions and check-ins requiring review.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {approvals.map((item, i) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <div>{item.name}</div>
                        <div className="text-xs text-muted-foreground font-normal">{item.time}</div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.type}</Badge>
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(item.status)}
                      </TableCell>
                      <TableCell className="text-right">
                        {item.status === "pending" && (
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => setSelectedItem(item)}
                            className="hover:bg-primary/10 hover:text-primary"
                          >
                            Review
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Review Dialog */}
      <Dialog open={!!selectedItem} onOpenChange={() => setSelectedItem(null)}>
        <DialogContent className="sm:max-w-[500px] glass-card-premium">
          <DialogHeader>
            <DialogTitle className="text-xl">Review {selectedItem?.type}</DialogTitle>
            <DialogDescription>
              {selectedItem?.name} • {selectedItem?.time}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Add a comment (optional)</label>
              <Textarea
                placeholder="Enter your feedback or reason for approval/rejection..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="min-h-[100px] bg-muted/50 border-border/50"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10 hover:border-destructive"
                onClick={() => selectedItem && handleReject(selectedItem.id)}
              >
                <X className="h-4 w-4 mr-2" />
                Reject
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-success to-emerald-600 hover:from-success/90 hover:to-emerald-600/90 text-white shadow-lg shadow-success/20"
                onClick={() => selectedItem && handleApprove(selectedItem.id)}
              >
                <Check className="h-4 w-4 mr-2" />
                Approve
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        <AnimatePresence>
          {toasts.map(toast => (
            <ToastComponent key={toast.id} toast={toast} onClose={removeToast} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
