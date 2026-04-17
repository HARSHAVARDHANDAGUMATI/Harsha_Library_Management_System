import React from "react";
import { BarChart3, TrendingUp, Users, BookOpen, Clock, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { name: "Total Loans", value: "1,284", icon: BookOpen, change: "+12.5%", color: "blue" },
  { name: "Active Users", value: "482", icon: Users, change: "+5.2%", color: "green" },
  { name: "Overdue Items", value: "24", icon: Clock, change: "-2.1%", color: "red" },
  { name: "New Admissions", value: "12", icon: TrendingUp, change: "+18.3%", color: "purple" },
];

const colorMapper = {
  blue: "from-blue-500 to-blue-600 shadow-blue-500/20",
  green: "from-emerald-500 to-emerald-600 shadow-emerald-500/20",
  red: "from-rose-500 to-rose-600 shadow-rose-500/20",
  purple: "from-violet-500 to-violet-600 shadow-violet-500/20",
};

export function Reports() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Library Analytics</h1>
          <p className="text-muted-foreground mt-1">Detailed reports and performance metrics.</p>
        </div>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium text-sm flex items-center gap-2 hover:opacity-90 transition-opacity">
          <BarChart3 className="h-4 w-4" />
          Export Data
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -5 }}
            className="p-6 rounded-3xl glass-premium flex flex-col gap-6 group transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <div className={`p-3 rounded-2xl bg-gradient-to-br ${colorMapper[stat.color]} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
              <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold ${
                stat.change.startsWith('+') ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
              }`}>
                {stat.change.startsWith('+') ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                {stat.change}
              </div>
            </div>
            <div>
              <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-wider mb-1">{stat.name}</p>
              <h3 className="text-3xl font-serif-display font-bold leading-none">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="lg:col-span-2 p-8 rounded-3xl glass-premium flex flex-col relative overflow-hidden group"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-xl font-serif-display font-bold">Circulation Trends</h3>
              <p className="text-xs text-muted-foreground mt-1">Monthly metrics for library circulation.</p>
            </div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                <div className="h-2 w-2 rounded-full bg-primary" />
                Issues
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-muted-foreground/30" />
                Returns
              </div>
            </div>
          </div>

          <div className="flex-1 flex items-end justify-between gap-1 sm:gap-2 h-48 mb-4 px-2">
            {[90, 140, 80, 180, 120, 160, 100, 190, 130, 170, 90, 150].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end items-center group/bar h-full">
                <motion.div 
                  initial={{ height: 0 }}
                  animate={{ height: h }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.8 }}
                  style={{ width: '100%' }}
                  className="bg-emerald-500 rounded-t-sm sm:rounded-t-md relative hover:bg-emerald-400 transition-all shadow-lg"
                >
                  <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-popover text-[10px] font-bold px-2 py-1.5 rounded-lg opacity-0 group-hover/bar:opacity-100 transition-all whitespace-nowrap border border-border shadow-2xl z-30">
                    {h * 5} units
                  </div>
                </motion.div>
                <div className="mt-3 text-[8px] sm:text-[10px] font-bold text-muted-foreground/40">{['J','F','M','A','M','J','J','A','S','O','N','D'][i]}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="p-8 rounded-3xl glass-premium flex flex-col"
        >
          <h3 className="text-xl font-serif-display font-bold mb-8">Popular Categories</h3>
          <div className="space-y-8 flex-1">
            {[
              { name: "Philosophy", percent: 85, color: "bg-blue-500" },
              { name: "Science", percent: 72, color: "bg-emerald-500" },
              { name: "History", percent: 64, color: "bg-rose-500" },
              { name: "Classics", percent: 45, color: "bg-violet-500" },
              { name: "Tech", percent: 38, color: "bg-amber-500" },
            ].map((cat, i) => (
              <div key={cat.name} className="space-y-3">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-wider">
                  <span className="text-muted-foreground">{cat.name}</span>
                  <span className="text-foreground">{cat.percent}%</span>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-[1px]">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${cat.percent}%` }}
                    transition={{ delay: 0.8 + i * 0.1, duration: 1 }}
                    className={`h-full ${cat.color} rounded-full shadow-[0_0_10px_rgba(0,0,0,0.2)]`}
                  />
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-4 rounded-2xl bg-secondary/50 text-[11px] font-bold uppercase tracking-widest hover:bg-secondary transition-colors border border-white/5">
            Full Inventory
          </button>
        </motion.div>
      </div>
    </div>
  );
}

export default Reports;
