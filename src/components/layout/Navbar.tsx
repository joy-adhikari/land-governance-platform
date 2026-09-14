"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Search,
  Map,
  FlaskConical,
  Lightbulb,
  UserCircle,
  Menu,
  X,
  LogOut,
  Settings,
  User
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

const navItems = [
  { name: "Home", href: "/", icon: LayoutDashboard },
  { name: "Repository", href: "/repository", icon: BookOpen },
  { name: "AI Search", href: "/search", icon: Search },
  { name: "GIS Dashboard", href: "/gis", icon: Map },
  { name: "Simulation", href: "/simulate", icon: FlaskConical },
  { name: "Innovation", href: "/innovation", icon: Lightbulb },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout, isAuthenticated } = useAuth();

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2 font-bold text-xl tracking-tight">
            <div className="bg-primary text-primary-foreground p-1 rounded">
              <Map className="h-6 w-6" />
            </div>
            <span className="hidden sm:inline-block">LandGov <span className="text-primary">India</span></span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors rounded-md",
                  pathname === item.href
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <div className="hidden sm:flex items-center gap-4 ml-2">
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger className={cn(buttonVariants({ variant: "ghost" }), "gap-2 px-2 h-10")}>
                    <Avatar className="h-7 w-7">
                      <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email}`} />
                      <AvatarFallback>{user?.full_name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span className="text-sm font-medium">{user?.full_name}</span>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.full_name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <User className="h-4 w-4" /> Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="gap-2 cursor-pointer">
                      <Settings className="h-4 w-4" /> Account Settings
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="gap-2 text-destructive cursor-pointer focus:text-destructive"
                      onClick={() => logout()}
                    >
                      <LogOut className="h-4 w-4" /> Log out
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "ghost", size: "sm" }))}
                >
                  Sign In
                </Link>
                <Button size="sm">Get Started</Button>
              </>
            )}
          </div>

          <Sheet>
            <SheetTrigger className={cn(buttonVariants({ variant: "ghost" }), "md:hidden size-10 p-0")}>
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px] flex flex-col">
              <SheetHeader className="mb-6">
                <SheetTitle className="flex items-center gap-2 font-bold text-xl tracking-tight">
                  <div className="bg-primary text-primary-foreground p-1 rounded">
                    <Map className="h-5 w-5" />
                  </div>
                  LandGov <span className="text-primary">India</span>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-2 px-3 py-3 text-sm font-medium transition-colors rounded-md",
                      pathname === item.href
                        ? "bg-accent text-accent-foreground"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="mt-auto pt-6 flex flex-col gap-3 border-t">
                {isAuthenticated ? (
                  <Button variant="ghost" className="w-full justify-start gap-2" onClick={() => logout()}>
                    <LogOut className="h-4 w-4" /> Log out
                  </Button>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className={cn(buttonVariants({ variant: "outline" }), "w-full text-center")}
                    >
                      Sign In
                    </Link>
                    <Button className="w-full">Get Started</Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  );
}
