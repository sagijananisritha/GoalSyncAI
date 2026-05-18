"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Target, Activity, Settings, Users, LogOut, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";

const employeeLinks = [
  { name: "Dashboard", href: "/employee", icon: LayoutDashboard },
  { name: "My Goals", href: "/employee/goals", icon: Target },
  { name: "Check-ins", href: "/employee/check-ins", icon: CheckSquare },
  { name: "Activity", href: "/employee/activity", icon: Activity },
];

const managerLinks = [
  { name: "Team Dashboard", href: "/manager", icon: LayoutDashboard },
  { name: "Approvals", href: "/manager/approvals", icon: CheckSquare },
  { name: "Team Performance", href: "/manager/performance", icon: Users },
];

export function Sidebar({ role = "employee" }: { role?: "employee" | "manager" | "admin" }) {
  const pathname = usePathname();
  const links = role === "employee" ? employeeLinks : managerLinks;

  return (
    <div className="hidden lg:block border-r bg-muted/20 w-[240px] flex-shrink-0">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-xl text-primary">
            <Target className="h-6 w-6" />
            <span className="hidden sm:inline">GoalSync AI</span>
          </Link>
        </div>
        <div className="flex-1 overflow-auto py-2">
          <nav className="grid items-start px-4 text-sm font-medium gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary hover:bg-primary/5",
                    isActive ? "bg-primary/10 text-primary font-semibold" : "text-muted-foreground"
                  )}
                >
                  <link.icon className="h-4 w-4" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="mt-auto p-4">
          <nav className="grid items-start text-sm font-medium gap-1">
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary hover:bg-primary/5"
            >
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-destructive transition-all hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Logout</span>
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
