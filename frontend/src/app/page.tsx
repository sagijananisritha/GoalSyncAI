"use client";

import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Target, BrainCircuit, BarChart3, Users, CheckCircle, Clock, Zap, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

function AnimatedCounter({ value, suffix = "" }: { value: number, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>{count}{suffix}</span>
  );
}

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      <header className="px-4 lg:px-8 h-16 flex items-center border-b border-border/40 bg-background/60 backdrop-blur-md sticky top-0 z-50">
        <Link className="flex items-center justify-center gap-2" href="#">
          <Target className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">GoalSync AI</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:flex" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors hidden sm:flex" href="#analytics">
            Analytics
          </Link>
          <Link href="/login">
            <Button variant="ghost" size="sm">Login</Button>
          </Link>
          <Link href="/employee">
            <Button size="sm" className="rounded-full px-6 shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">Launch Demo <ArrowRight className="ml-2 h-4 w-4" /></Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* HERO SECTION */}
        <section className="relative w-full py-16 md:py-24 lg:py-32 flex items-center justify-center overflow-hidden">
          {/* Animated Gradient Background and Grid */}
          <div className="absolute inset-0 -z-20 bg-background"></div>
          <div className="absolute inset-0 -z-10 hero-grid opacity-30"></div>
          <div className="absolute top-0 right-0 -z-10 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[128px] opacity-60 animate-pulse-slow mix-blend-multiply dark:mix-blend-screen"></div>
          <div className="absolute bottom-0 left-0 -z-10 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] opacity-60 mix-blend-multiply dark:mix-blend-screen"></div>
          
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center space-y-6 text-center max-w-4xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
                className="space-y-4"
              >
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary mb-2 backdrop-blur-md shadow-sm hover-lift cursor-default"
                >
                  <Sparkles className="mr-2 h-4 w-4" />
                  AtomQuest Hackathon 1.0 Finalist
                </motion.div>
                <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl text-foreground text-glow leading-tight">
                  Enterprise Goal Tracking <br className="hidden md:block"/>
                  Reimagined with <span className="text-gradient-premium">AI</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground text-lg md:text-xl/relaxed font-medium">
                  Create alignment, improve accountability, and drive performance with an intelligent, enterprise-grade goal management platform.
                </p>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
              >
                <Link href="/employee" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full h-14 px-8 text-base rounded-full shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:scale-105 transition-all bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-semibold">
                    Experience the Platform
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link href="/manager" className="w-full sm:w-auto">
                  <Button size="lg" variant="outline" className="w-full h-14 px-8 text-base rounded-full backdrop-blur-sm border-muted-foreground/20 hover:bg-muted/50 hover:border-primary/30 transition-all font-semibold">
                    View Manager Dashboard
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="w-full py-16 border-y border-border/40 bg-muted/30">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center divide-x divide-border/50">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="px-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gradient-premium"><AnimatedCounter value={98} suffix="%" /></h3>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Check-in Completion</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="px-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gradient-premium"><AnimatedCounter value={40} suffix="%" /></h3>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Faster Approvals</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="px-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gradient-premium"><AnimatedCounter value={10} suffix="x" /></h3>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Goal Visibility</p>
              </motion.div>
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="px-4">
                <h3 className="text-4xl md:text-5xl font-bold text-gradient-premium">Zero</h3>
                <p className="text-sm text-muted-foreground mt-2 uppercase tracking-wider font-medium">Missed Updates</p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FLOATING CARDS & FEATURES */}
        <section id="features" className="w-full py-20 lg:py-28 relative overflow-hidden">
          <div className="container px-4 md:px-6 mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-4 text-center mb-12"
            >
              <div className="space-y-3 max-w-3xl">
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Everything you need to align your team</h2>
                <p className="text-muted-foreground text-lg md:text-xl">Built for scale, designed for simplicity. GoalSync AI replaces spreadsheets with intelligent automation.</p>
              </div>
            </motion.div>
            
            <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Target, title: "Goal Management", desc: "Set SMART goals with custom weightages and formulas (Min, Max, Zero types)." },
                { icon: BrainCircuit, title: "AI Assistant", desc: "Get intelligent suggestions on goal phrasing and proactive risk prediction." },
                { icon: BarChart3, title: "Live Analytics", desc: "Visualize performance through real-time heatmaps and completion rings." },
                { icon: Clock, title: "Quarterly Check-ins", desc: "Seamless review cycles with automated progress calculation and evidence." },
                { icon: Users, title: "Team Tracking", desc: "Identify bottlenecks and view full team performance at a glance." },
                { icon: CheckCircle, title: "Escalation Engine", desc: "Automated alerts for missing updates and delayed approvals." },
              ].map((feature, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full glass-card-premium cursor-pointer group overflow-hidden relative hover-lift">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <CardContent className="p-6 md:p-8 flex flex-col items-start gap-4 relative z-10">
                      <div className="p-3 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm group-hover:shadow-primary/30">
                        <feature.icon className="h-6 w-6 md:h-7 md:w-7" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="font-bold text-lg md:text-xl tracking-tight">{feature.title}</h3>
                        <p className="text-muted-foreground leading-relaxed text-sm md:text-base">{feature.desc}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>
      <footer className="py-8 w-full border-t border-border/40 bg-muted/20">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            <span className="font-semibold text-lg">GoalSync AI</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 GoalSync AI. AtomQuest Hackathon 1.0 Finalist.</p>
          <nav className="flex gap-4">
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Terms</Link>
            <Link className="text-sm text-muted-foreground hover:text-foreground transition-colors" href="#">Privacy</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
