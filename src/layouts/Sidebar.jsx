import React from "react";
import { NavLink, Link } from "react-router-dom";
import { 
  BookOpen, 
  LayoutDashboard, 
  Users, 
  Library, 
  BarChart3, 
  Settings, 
  LogOut,
  User
} from "lucide-react";
import { cn } from "../utils/utils";
import { useAuth } from "../context/AuthContext";

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Books", href: "/books", icon: BookOpen },
  { name: "Users & Issue Desk", href: "/users", icon: Users },
  { name: "Reports", href: "/reports", icon: BarChart3 },
];

export function Sidebar({ className }) {
  const { logout, user, isAuthenticated } = useAuth();
  return (
    <aside
      className={cn(
        "flex h-full w-64 flex-col border-r border-white/5 glass py-4",
        className
      )}
    >
      <div className="mb-8 flex items-center px-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Library className="h-6 w-6" />
        </div>
        <span className="ml-3 text-lg font-bold tracking-tight">LMS Pro</span>
      </div>

      <nav className="flex-1 space-y-1 px-3">
        {navItems.map((item) => (
          <NavLink
            key={item.href}
            to={item.href}
            className={({ isActive }) =>
              cn(
                "group flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200",
                isActive 
                  ? "bg-accent/50 text-accent-foreground border-l-4 border-primary rounded-r-md -ml-3" 
                  : "text-muted-foreground hover:bg-accent/30 hover:text-accent-foreground border-l-4 border-transparent"
              )
            }
          >
            <item.icon className={cn(
              "mr-3 h-5 w-5 flex-shrink-0 transition-colors",
              "group-hover:text-primary"
            )} />
            {item.name}
          </NavLink>
        ))}

        <div className="my-6 px-3">
          <hr className="border-white/10" />
        </div>

        <p className="px-6 mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/50">
          Configuration
        </p>
        
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn(
              "group flex items-center px-4 py-2.5 text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-accent/50 text-accent-foreground border-l-4 border-primary rounded-r-md -ml-3" 
                : "text-muted-foreground hover:bg-accent/30 hover:text-accent-foreground border-l-4 border-transparent"
            )
          }
        >
          <Settings className="mr-3 h-5 w-5 flex-shrink-0 group-hover:text-primary transition-colors" />
          Settings
        </NavLink>
      </nav>

      <div className="mt-auto px-4 py-4">
            {isAuthenticated ? (
              <div className="flex items-center justify-between gap-3 rounded-xl bg-accent/30 p-4 border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary overflow-hidden">
                    {user?.avatar ? (
                      <img src={user.avatar} className="h-full w-full object-cover" alt={user.name} />
                    ) : (
                      <User className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold truncate leading-none">{user?.name || "Archivist"}</span>
                    <span className="text-[10px] text-muted-foreground mt-1">{user?.role || "Administrator"}</span>
                  </div>
                </div>
                <button 
                  onClick={logout}
                  className="p-2 rounded-lg text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500 transition-all active:scale-90 tooltip"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <NavLink 
                to="/login"
                className="flex items-center justify-center gap-2 w-full bg-primary text-primary-foreground py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all"
              >
                <LogOut className="h-4 w-4 rotate-180" />
                Sign In
              </NavLink>
            )}
      </div>
    </aside>
  );
}

