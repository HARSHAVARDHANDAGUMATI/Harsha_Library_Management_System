import React from "react";
import { Settings as SettingsIcon, Bell, Lock, Shield, Globe, Database } from "lucide-react";

const sections = [
  {
    title: "General Configuration",
    icon: Globe,
    items: [
      { label: "Library Name", value: "Harsha Central Library", type: "text" },
      { label: "Location", value: "Downtown Administrative Block", type: "text" },
      { label: "Timezone", value: "UTC+5:30 (India Standard Time)", type: "select" },
    ]
  },
  {
    title: "Security & Access",
    icon: Lock,
    items: [
      { label: "Admin Access Level", value: "Root Administrator", type: "badge" },
      { label: "Two-Factor Authentication", value: "Enabled", type: "toggle" },
      { label: "Session Timeout", value: "30 Minutes", type: "select" },
    ]
  },
  {
    title: "Notification Settings",
    icon: Bell,
    items: [
      { label: "Email Alerts", value: "Enabled", type: "toggle" },
      { label: "Due Date Reminders", value: "48 hours before", type: "select" },
      { label: "Overdue Notifications", value: "Daily", type: "select" },
    ]
  }
];

export function Settings() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-0 space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
        <p className="text-muted-foreground mt-1">Manage library configurations and administrative preferences.</p>
      </div>

      <div className="space-y-4 sm:space-y-6">
        {sections.map((section) => (
          <div key={section.title} className="p-5 sm:p-8 rounded-2xl bg-card border border-white/5 glass">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                <section.icon className="h-5 w-5" />
              </div>
              <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              {section.items.map((item) => (
                <div key={item.label} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4 border-b border-white/5 last:border-0 hover:bg-white/[0.02] -mx-4 px-4 transition-colors rounded-lg">
                  <div className="space-y-0.5">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">Modify the system-wide {item.label.toLowerCase()} setting.</p>
                  </div>
                  
                  {item.type === "toggle" ? (
                    <div className="w-10 h-5 bg-primary/20 rounded-full relative cursor-pointer border border-primary/20">
                      <div className="absolute right-0.5 top-0.5 h-3.5 w-3.5 bg-primary rounded-full shadow-lg"></div>
                    </div>
                  ) : item.type === "badge" ? (
                    <span className="px-3 py-1 bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider rounded-full border border-primary/20">
                      {item.value}
                    </span>
                  ) : (
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                      {item.value}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 p-5 sm:p-6 bg-accent/30 rounded-2xl border border-white/5 glass">
        <button className="w-full sm:w-auto px-6 py-3 rounded-xl text-sm font-bold hover:bg-white/5 transition-colors border border-white/5">
          Discard Changes
        </button>
        <button className="w-full sm:w-auto px-6 py-3 bg-primary text-primary-foreground rounded-xl text-sm font-bold shadow-lg shadow-primary/20 hover:brightness-110 active:scale-95 transition-all">
          Save Configuration
        </button>
      </div>
    </div>
  );
}

export default Settings;
