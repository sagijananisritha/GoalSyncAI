"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Target, Zap, Bot, ArrowRight, CheckCircle2, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface AIGoalGeneratorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApplyGoal: (goalData: any) => void;
}

export function AIGoalGenerator({ open, onOpenChange, onApplyGoal }: AIGoalGeneratorProps) {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedGoal, setGeneratedGoal] = useState<any | null>(null);
  const [displayedText, setDisplayedText] = useState("");
  const [generationStep, setGenerationStep] = useState(0);

  // Mock streaming text effect
  useEffect(() => {
    if (!isGenerating && generatedGoal) {
      const fullText = generatedGoal.description;
      let i = 0;
      setDisplayedText("");
      const timer = setInterval(() => {
        setDisplayedText((prev) => prev + fullText.charAt(i));
        i++;
        if (i >= fullText.length) {
          clearInterval(timer);
        }
      }, 15);
      return () => clearInterval(timer);
    }
  }, [isGenerating, generatedGoal]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    setIsGenerating(true);
    setGenerationStep(1);
    setGeneratedGoal(null);
    setDisplayedText("");

    // Simulate AI thinking process with more steps
    setTimeout(() => setGenerationStep(2), 600);
    setTimeout(() => setGenerationStep(3), 1200);
    setTimeout(() => setGenerationStep(4), 1800);
    setTimeout(() => setGenerationStep(5), 2400);
    
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedGoal({
        title: `Improve ${prompt.substring(0, 20)}...`,
        description: `Implement a comprehensive strategy for "${prompt}" focusing on quantifiable metrics and measurable outcomes. This SMART goal includes: Specific objectives aligned with Q3 priorities, Measurable KPIs with weekly tracking, Achievable targets based on historical data, Relevant impact on team OKRs, and Time-bound milestones for Q3 completion. Regular check-ins will ensure accountability and early risk identification.`,
        thrustArea: "Performance Optimization",
        target: 25,
        uom: "%",
        weightage: 20,
        riskLevel: "Medium",
        milestones: [
          "Week 2: Baseline measurement",
          "Week 4: Initial implementation",
          "Week 8: Mid-quarter review",
          "Week 12: Final assessment"
        ],
        kpis: [
          "Customer satisfaction score",
          "Retention rate improvement",
          "Net Promoter Score (NPS)"
        ],
        recommendations: [
          "Schedule weekly sync meetings",
          "Implement automated tracking dashboard",
          "Assign clear ownership metrics"
        ]
      });
    }, 3000);
  };

  const handleApply = () => {
    if (generatedGoal) {
      onApplyGoal(generatedGoal);
      onOpenChange(false);
      // reset state for next time
      setTimeout(() => {
        setPrompt("");
        setGeneratedGoal(null);
        setDisplayedText("");
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] border-primary/20 shadow-2xl glass-card-premium">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <motion.div 
              className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-primary border border-primary/30 shadow-lg"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Bot className="h-6 w-6" />
            </motion.div>
            <div>
              <DialogTitle className="text-2xl flex items-center gap-2">
                AI Smart Goal Generator <Sparkles className="h-5 w-5 text-accent animate-pulse" />
              </DialogTitle>
              <DialogDescription className="text-base">
                Transform rough ideas into SMART, trackable enterprise goals with AI-powered insights.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Lightbulb className="h-4 w-4 text-accent" />
              What do you want to achieve?
            </label>
            <div className="flex gap-2">
              <Input
                placeholder="E.g. improve customer retention and reduce churn..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleGenerate()}
                className="bg-muted/50 border-border/50 h-12 text-base focus:border-primary/50 transition-colors"
                disabled={isGenerating}
              />
              <Button 
                onClick={handleGenerate} 
                disabled={!prompt.trim() || isGenerating}
                className="h-12 px-6 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all text-white shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 font-semibold"
              >
                {isGenerating ? <Loader2 className="h-5 w-5 animate-spin" /> : (
                  <>
                    Generate <Sparkles className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {isGenerating && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-xl p-8 flex flex-col items-center justify-center space-y-4 border border-primary/20"
              >
                <div className="relative h-20 w-20 flex items-center justify-center">
                  <div className="absolute inset-0 rounded-full border-t-2 border-primary animate-spin"></div>
                  <div className="absolute inset-3 rounded-full border-r-2 border-accent animate-spin-reverse"></div>
                  <div className="absolute inset-6 rounded-full border-b-2 border-success animate-spin"></div>
                  <Bot className="h-8 w-8 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <div className="text-sm font-semibold text-foreground animate-pulse">
                    {generationStep === 1 && "🔍 Analyzing your objective..."}
                    {generationStep === 2 && "📊 Researching industry benchmarks..."}
                    {generationStep === 3 && "🎯 Formulating SMART criteria..."}
                    {generationStep === 4 && "📈 Calculating optimal metrics..."}
                    {generationStep === 5 && "✨ Generating insights..."}
                  </div>
                  <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-primary to-accent"
                      initial={{ width: "0%" }}
                      animate={{ width: `${(generationStep / 5) * 100}%` }}
                      transition={{ duration: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {!isGenerating && generatedGoal && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 border border-primary/30 rounded-xl p-6 shadow-lg">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-primary/20 text-primary">
                      <Target className="h-5 w-5" />
                    </div>
                    <div className="space-y-1 flex-1">
                      <h4 className="font-bold text-xl text-foreground leading-tight">
                        {generatedGoal.title}
                      </h4>
                      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                        SMART Goal
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground min-h-[80px] leading-relaxed">
                    {displayedText}
                    <span className="inline-block w-1 h-4 bg-primary ml-1 animate-pulse align-middle"></span>
                  </p>
                  
                  <div className="mt-6 grid grid-cols-3 gap-3 border-t border-border/50 pt-4">
                    <div className="bg-background/80 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold flex items-center gap-1">
                        <Zap className="h-3 w-3 text-accent" /> Area
                      </div>
                      <div className="font-medium text-sm">{generatedGoal.thrustArea}</div>
                    </div>
                    <div className="bg-background/80 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold flex items-center gap-1">
                        <Target className="h-3 w-3 text-primary" /> Target
                      </div>
                      <div className="font-medium text-sm">{generatedGoal.target} {generatedGoal.uom}</div>
                    </div>
                    <div className="bg-background/80 rounded-lg p-3 border border-border/50 hover:border-primary/30 transition-colors">
                      <div className="text-xs text-muted-foreground mb-1 uppercase font-semibold flex items-center gap-1">
                        <CheckCircle2 className="h-3 w-3 text-success" /> Weight
                      </div>
                      <div className="font-medium text-sm text-success">{generatedGoal.weightage}%</div>
                    </div>
                  </div>
                </div>

                {/* Additional AI Insights */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <TrendingUp className="h-4 w-4 text-primary" />
                      <h5 className="font-semibold text-sm">Quarterly Milestones</h5>
                    </div>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      {generatedGoal.milestones.map((milestone: string, i: number) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="text-primary mt-0.5">•</span>
                          {milestone}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-4 w-4 text-warning" />
                      <h5 className="font-semibold text-sm">Risk Assessment</h5>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Risk Level</span>
                        <Badge variant={generatedGoal.riskLevel === "Low" ? "default" : generatedGoal.riskLevel === "Medium" ? "secondary" : "destructive"} className="text-xs">
                          {generatedGoal.riskLevel}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Based on historical data and current market conditions
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-center gap-2 mb-3">
                    <Lightbulb className="h-4 w-4 text-accent" />
                    <h5 className="font-semibold text-sm">AI Recommendations</h5>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {generatedGoal.recommendations.map((rec: string, i: number) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-success mt-0.5 flex-shrink-0" />
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <DialogFooter className="sm:justify-between border-t border-border/50 pt-4 mt-2">
          <Button variant="ghost" onClick={() => onOpenChange(false)} className="hover:bg-muted/80">Cancel</Button>
          <Button 
            onClick={handleApply} 
            disabled={!generatedGoal || isGenerating}
            className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white gap-2 shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-105 transition-all font-semibold"
          >
            Apply Goal <ArrowRight className="h-4 w-4" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
