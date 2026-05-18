"use client";

import Link from "next/link";
import { Bell, Search, User, Settings, LogOut, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { LayoutDashboard, Target, Activity, Users, CheckSquare, Menu } from "lucide-react";
import { usePathname } from "next/navigation";

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

export function Topbar() {
  const pathname = usePathname();
  const isManager = pathname?.startsWith("/manager");
  const links = isManager ? managerLinks : employeeLinks;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background/95 backdrop-blur px-6 shadow-sm">
      <Sheet>
        <SheetTrigger
          render={
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          }
        />
        <SheetContent side="left" className="w-[240px] sm:w-[300px]">
          <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
          <div className="flex h-16 items-center border-b pb-4 mt-2">
            <Link href="/" className="flex items-center gap-2 font-bold tracking-tight text-xl text-primary">
              <Target className="h-6 w-6" />
              <span>GoalSync AI</span>
            </Link>
          </div>
          <nav className="grid gap-2 text-lg font-medium mt-6">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary ${
                    isActive ? "bg-muted text-primary" : "text-muted-foreground"
                  }`}
                >
                  <link.icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search goals, users, or metrics..."
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />
          </div>
        </form>
        <ThemeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground h-9 w-9">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1.5 right-2 h-2 w-2 rounded-full bg-destructive animate-pulse" />
            <span className="sr-only">Toggle notifications</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <div className="max-h-[300px] overflow-auto">
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center gap-2 font-medium">
                  <CheckCircle className="h-4 w-4 text-success" />
                  Goal Approved
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  Your manager approved "Increase Q3 Sales".
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">2 mins ago</div>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="flex flex-col items-start gap-1 p-3 cursor-pointer">
                <div className="flex items-center gap-2 font-medium">
                  <Bell className="h-4 w-4 text-warning" />
                  Check-in Reminder
                </div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  Your Q3 check-in for "Customer Churn" is due in 3 days.
                </div>
                <div className="text-[10px] text-muted-foreground mt-1">1 hour ago</div>
              </DropdownMenuItem>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="w-full text-center text-xs justify-center text-primary cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className="relative inline-flex items-center justify-center rounded-full text-sm font-medium transition-colors bg-secondary text-secondary-foreground hover:bg-secondary/80 h-9 w-9">
            <User className="h-5 w-5" />
            <span className="sr-only">Toggle user menu</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem><Settings className="h-4 w-4 mr-2"/> Settings</DropdownMenuItem>
            <DropdownMenuItem><User className="h-4 w-4 mr-2"/> Profile</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive cursor-pointer p-0">
              <Link href="/login" className="flex w-full items-center px-1.5 py-1 text-sm">
                <LogOut className="h-4 w-4 mr-2"/> Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
