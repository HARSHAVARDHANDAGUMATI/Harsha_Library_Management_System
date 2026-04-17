import React from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  BarChart3 
} from "lucide-react";
import { cn } from "../utils/utils";

const items = [
  { name: "Dash", href: "/", icon: LayoutDashboard },
  { name: "Books", href: "/books", icon: BookOpen },
  { name: "Users", href: "/users", icon: Users },
  { name: "Stats", href: "/reports", icon: BarChart3 },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex h-16 w-full items-center justify-around border-t border-white/5 glass px-2 sm:hidden">
      {items.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          className={({ isActive }) =>
            cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 text-[10px] font-bold uppercase tracking-tighter transition-all duration-300",
              isActive 
                ? "text-primary scale-110" 
                : "text-muted-foreground opacity-70"
            )
          }
        >
          <item.icon className="h-5 w-5" />
          <span>{item.name}</span>
        </NavLink>
      ))}
    </nav>
  );
}
