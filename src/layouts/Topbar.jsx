import React, { useState, useRef, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { Menu, Sun, Moon, Bell, User, Settings, LogOut, ChevronDown, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";

const routeTitles = {
  "/": "Dashboard",
  "/books": "Book Catalog",
  "/users": "User Directory",
  "/reports": "Analytics & Reports",
  "/settings": "System Settings",
  "/profile": "Admin Profile",
};

export function Topbar({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme();
  const { logout, user, isAuthenticated } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle dynamic titles for edit pages (e.g., /books/:id/edit)
  const getTitle = () => {
    if (location.pathname.includes("/edit")) return "Edit Record";
    return routeTitles[location.pathname] || "LMS Pro";
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 glass px-4 sm:px-6">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 sm:hidden"
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-bold tracking-tight animate-in fade-in slide-in-from-left-2 duration-300">
          {getTitle()}
        </h1>
      </div>

      <div className="flex items-center space-x-2">
        <Button variant="ghost" size="icon" className="relative hidden sm:flex">
          <Bell className="h-5 w-5" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive animate-pulse"></span>
        </Button>

        <Button variant="ghost" size="icon" onClick={toggleTheme}>
          {theme === "dark" ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
        </Button>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="group ml-2 flex items-center gap-2 rounded-full bg-primary/10 border border-primary/20 p-1 pr-3 hover:bg-primary/20 transition-all active:scale-95"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform overflow-hidden">
              {isAuthenticated && user?.avatar ? (
                <img src={user.avatar} className="h-full w-full object-cover" alt={user.name} />
              ) : (
                isAuthenticated ? (user?.name?.charAt(0) || "H") : <User className="h-3 w-3" />
              )}
            </div>
            <span className="hidden sm:inline text-xs font-bold text-foreground">
              {isAuthenticated ? (user?.name || "Harsha") : "Guest"}
            </span>
            <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-3 w-64 origin-top-right rounded-2xl border border-white/10 bg-card/95 backdrop-blur-xl p-2 shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="px-3 py-4 border-b border-white/5 mb-2">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 border border-primary/30 text-primary font-bold overflow-hidden">
                    {isAuthenticated && user?.avatar ? (
                      <img src={user.avatar} className="h-full w-full object-cover" alt={user.name} />
                    ) : (
                      isAuthenticated ? (user?.name?.charAt(0) || "H") : <User className="h-5 w-5" />
                    )}
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-bold truncate text-foreground">
                      {isAuthenticated ? (user?.name || "Harsha") : "Guest User"}
                    </span>
                    <span className="text-[10px] text-muted-foreground truncate flex items-center gap-1">
                      <Mail className="h-2 w-2" /> {isAuthenticated ? (user?.email || "harsha@lms.pro") : "Sign in for full access"}
                    </span>
                  </div>
                </div>
                {isAuthenticated && (
                  <div className="mt-3 flex items-center gap-2">
                    <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      {user?.role || "Administrator"}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-tighter">
                      Pro Plan
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-1">
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/profile"
                      onClick={() => setIsProfileOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all"
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </Link>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 transition-all outline-none"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="pt-1 border-t border-white/5 mt-1">
                      <button
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-all"
                        onClick={() => {
                          setIsProfileOpen(false);
                          logout();
                        }}
                      >
                        <LogOut className="h-4 w-4" />
                        Sign Out
                      </button>
                    </div>
                  </>
                ) : (
                  <Link
                    to="/login"
                    onClick={() => setIsProfileOpen(false)}
                    className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-bold text-primary hover:bg-primary/10 transition-all"
                  >
                    <LogOut className="h-4 w-4 rotate-180" />
                    Sign In to Account
                  </Link>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

