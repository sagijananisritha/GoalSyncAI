"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Target, Lock, ArrowRight, Eye, EyeOff, Loader2, Mail, CheckCircle2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setIsLoading(true);
    
    // Simulate network request and role-based routing based on email
    setTimeout(() => {
      setSuccess("Authentication successful! Redirecting...");
      setTimeout(() => {
        if (email.toLowerCase().includes("manager")) {
          router.push("/manager");
        } else {
          router.push("/employee");
        }
      }, 800);
    }, 1500);
  };

  const handleGoogleLogin = () => {
    setShowGoogleModal(true);
  };

  const simulateGoogleAuth = (role: "employee" | "manager") => {
    setIsGoogleLoading(true);
    setTimeout(() => {
      setShowGoogleModal(false);
      setIsGoogleLoading(false);
      if (role === "employee") router.push("/employee");
      if (role === "manager") router.push("/manager");
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 p-4 relative overflow-hidden">
      {/* Background aesthetics */}
      <div className="absolute inset-0 -z-20 bg-background"></div>
      <div className="absolute inset-0 -z-10 hero-grid opacity-20"></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/10 blur-[120px] animate-pulse-slow" />
        <div className="absolute top-[60%] -right-[10%] w-[40%] h-[40%] rounded-full bg-accent/10 blur-[120px] animate-pulse-slow" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-[420px]"
      >
        <Card className="w-full shadow-2xl glass-card-premium">
          <CardHeader className="space-y-4 items-center pt-8 pb-4">
            <motion.div 
              className="h-14 w-14 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner border border-white/10"
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
            >
              <Target className="h-7 w-7" />
            </motion.div>
            <div className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold tracking-tight">Welcome back</CardTitle>
              <CardDescription className="text-base">Sign in to your GoalSync AI account</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <form className="grid gap-4" onSubmit={handleLogin}>
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-destructive/10 text-destructive text-sm p-3 rounded-md border border-destructive/20 flex items-center gap-2"
                  >
                    <AlertCircle className="h-4 w-4 flex-shrink-0" />
                    {error}
                  </motion.div>
                )}
                {success && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }} 
                    animate={{ opacity: 1, height: "auto" }} 
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-success/10 text-success text-sm p-3 rounded-md border border-success/20 flex items-center gap-2"
                  >
                    <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                    {success}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="grid gap-2">
                <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError("");
                    }}
                    className={`pl-9 h-11 bg-background/50 focus:bg-background transition-colors ${error && !validateEmail(email) && email ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <label htmlFor="password" className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError("");
                    }}
                    className={`pl-9 pr-9 h-11 bg-background/50 focus:bg-background transition-colors ${error && password.length < 6 && password ? "border-destructive" : ""}`}
                    disabled={isLoading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-border/50 text-primary focus:ring-primary bg-background/50 w-4 h-4 cursor-pointer" 
                  />
                  <span className="text-muted-foreground group-hover:text-foreground transition-colors">Remember me</span>
                </label>
                <a href="#" className="text-primary hover:underline font-medium transition-colors">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full h-11 font-medium text-base shadow-lg shadow-primary/20 hover:shadow-primary/40 hover:scale-[1.02] transition-all mt-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/60" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-3 text-muted-foreground font-medium">Or continue with</span>
              </div>
            </div>

            <Button 
              variant="outline" 
              className="w-full h-11 flex items-center justify-center gap-2 font-medium border-border/60 bg-background/50 hover:bg-muted/80 hover:border-primary/30 hover:scale-[1.02] transition-all"
              onClick={handleGoogleLogin}
              disabled={isLoading}
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </Button>
            
            <div className="bg-muted/30 p-4 rounded-lg border border-border/50 text-sm">
              <p className="font-medium mb-2 text-foreground/80 flex items-center gap-2">
                <Target className="h-4 w-4 text-primary" />
                Demo Credentials:
              </p>
              <ul className="text-muted-foreground space-y-1 ml-6 list-disc">
                <li>Email: <strong className="text-foreground">employee@demo.com</strong> (Employee View)</li>
                <li>Email: <strong className="text-foreground">manager@demo.com</strong> (Manager View)</li>
                <li>Password: Any text works (min 6 chars)</li>
              </ul>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col gap-4 text-center pb-8 pt-0">
            <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground font-medium">
              <Lock className="w-3.5 h-3.5" />
              Secure Enterprise Authentication
            </div>
          </CardFooter>
        </Card>
      </motion.div>

      {/* Mock Google Login Modal */}
      <Dialog open={showGoogleModal} onOpenChange={setShowGoogleModal}>
        <DialogContent className="sm:max-w-[425px] border-border/50 shadow-2xl glass-card-premium">
          <DialogHeader className="space-y-4">
            <div className="flex justify-center mb-2">
              <svg viewBox="0 0 24 24" className="w-10 h-10" aria-hidden="true">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
            </div>
            <DialogTitle className="text-center text-xl">Sign in with Google</DialogTitle>
            <DialogDescription className="text-center">
              Choose an account to continue to GoalSync AI
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-3 py-4">
            {isGoogleLoading ? (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">Connecting to Google...</p>
              </div>
            ) : (
              <>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => simulateGoogleAuth("employee")}
                >
                  <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                    ED
                  </div>
                  <div>
                    <p className="font-medium text-sm">Employee User</p>
                    <p className="text-xs text-muted-foreground">employee@demo.com</p>
                  </div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-4 p-3 border border-border rounded-lg hover:bg-muted cursor-pointer transition-colors"
                  onClick={() => simulateGoogleAuth("manager")}
                >
                  <div className="h-10 w-10 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold">
                    MD
                  </div>
                  <div>
                    <p className="font-medium text-sm">Manager User</p>
                    <p className="text-xs text-muted-foreground">manager@demo.com</p>
                  </div>
                </motion.div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
