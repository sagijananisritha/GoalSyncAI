"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, CheckCircle2, AlertCircle, Clock, TrendingUp, Sparkles, PieChart as PieChartIcon } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, BarChart, Bar, AreaChart, Area } from "@/components/ui/recharts-wrapper";
import { motion } from "framer-motion";

const dataTrend = [
  { name: 'Week 1', progress: 20 },
  { name: 'Week 2', progress: 35 },
  { name: 'Week 3', progress: 45 },
  { name: 'Week 4', progress: 68 },
];

const dataDistribution = [
  { name: 'Revenue', value: 40 },
  { name: 'Customer Success', value: 30 },
  { name: 'Product', value: 30 },
];

const COLORS = ['var(--primary)', 'var(--accent)', 'var(--success)'];

const dataBarChart = [
  { name: 'Q1', revenue: 65, product: 45, customer: 70 },
  { name: 'Q2', revenue: 72, product: 52, customer: 78 },
  { name: 'Q3', revenue: 68, product: 60, customer: 82 },
  { name: 'Q4', revenue: 85, product: 75, customer: 90 },
];

export default function EmployeeDashboard() {
  return (
    <div className="flex flex-col gap-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-2"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Welcome back, Sarah!</h1>
        <p className="text-muted-foreground text-base">Here is your performance overview for Q3 2026.</p>
      </motion.div>

      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { 
            title: "Overall Progress", 
            value: "68%", 
            icon: Target, 
            color: "text-primary",
            progress: 68,
            change: "+12% from last month",
            changeColor: "text-success"
          },
          { 
            title: "Active Goals", 
            value: "5", 
            icon: CheckCircle2, 
            color: "text-success",
            progress: null,
            change: "2 on track, 3 need attention",
            changeColor: "text-muted-foreground"
          },
          { 
            title: "Pending Approvals", 
            value: "1", 
            icon: Clock, 
            color: "text-warning",
            progress: null,
            change: "Q3 Check-in waiting for Manager",
            changeColor: "text-muted-foreground"
          },
          { 
            title: "Risk Alerts", 
            value: "2", 
            icon: AlertCircle, 
            color: "text-destructive",
            progress: null,
            change: "Goals at risk of missing target",
            changeColor: "text-muted-foreground"
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
                {stat.progress !== null && (
                  <Progress value={stat.progress} className="mt-2 h-2" />
                )}
                <p className={`text-xs mt-2 ${stat.changeColor}`}>{stat.change}</p>
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
                Goal Progress Overview
              </CardTitle>
              <CardDescription>
                Your performance across different thrust areas.
              </CardDescription>
            </CardHeader>
            <CardContent className="pl-2 pt-4">
              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={dataTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                    <defs>
                      <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} domain={[0, 100]} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}
                      itemStyle={{ color: 'var(--foreground)' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="progress" 
                      stroke="var(--primary)" 
                      strokeWidth={3}
                      fillOpacity={1}
                      fill="url(#colorProgress)"
                      dot={{ r: 6, fill: 'var(--background)', strokeWidth: 2 }}
                      activeDot={{ r: 8, stroke: 'var(--primary)', strokeWidth: 2 }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
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
                <Sparkles className="h-5 w-5 text-accent" />
                AI Insights
              </CardTitle>
              <CardDescription>
                Smart recommendations based on your activity.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 rounded-lg bg-gradient-to-r from-primary/10 to-transparent p-4 border border-primary/20 hover:border-primary/40 transition-all cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-primary/20 text-primary">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-semibold leading-none text-foreground">Goal at risk: "Customer Churn"</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      Based on your update frequency, this goal is projected to fall 15% short of the Q3 target. Consider adjusting the timeline.
                    </p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="flex items-start gap-4 rounded-lg bg-gradient-to-r from-success/10 to-transparent p-4 border border-success/20 hover:border-success/40 transition-all cursor-pointer"
                >
                  <div className="p-2 rounded-lg bg-success/20 text-success">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div className="space-y-1 flex-1">
                    <p className="text-sm font-semibold leading-none text-foreground">Great Momentum!</p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      You have achieved 90% of your "Product Launch" goal ahead of schedule. Excellent work!
                    </p>
                  </div>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Additional Analytics Section */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="glass-card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChartIcon className="h-5 w-5 text-accent" />
                Goal Distribution
              </CardTitle>
              <CardDescription>
                Breakdown by thrust area.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dataDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${((percent || 0) * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {dataDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
        >
          <Card className="glass-card-premium">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Quarterly Performance
              </CardTitle>
              <CardDescription>
                Performance trends across quarters.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dataBarChart}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" opacity={0.5} />
                    <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} />
                    <YAxis stroke="var(--muted-foreground)" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)', borderRadius: '8px', color: 'var(--foreground)' }}
                    />
                    <Bar dataKey="revenue" fill="var(--primary)" name="Revenue" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="product" fill="var(--accent)" name="Product" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="customer" fill="var(--success)" name="Customer" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
