import React, { useState } from "react";
import { Plus, BookOpen, Clock, LayoutGrid, ArrowRight, Users, Check, TrendingUp } from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { formatDistanceToNow } from "date-fns";
import { StatCard } from "../components/ui/StatCard";
import { BookForm } from "../components/books/BookForm";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { cn } from "../utils/utils";

export function Dashboard() {
  const { stats, transactions, books, users } = useLibrary();
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);

  const recentTransactions = [...transactions]
    .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
    .slice(0, 5);

  const newlyCurated = books.slice(0, 4);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Top Header Section */}
      <section className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <h2 className="text-4xl font-serif font-bold text-foreground">Library Overview</h2>
          <p className="text-muted-foreground mt-1">Welcome back, Administrator. Here's what's happening today.</p>
        </div>
        
        <div className="flex gap-3">
          <button 
            onClick={() => setIsBookModalOpen(true)}
            className="bg-primary text-primary-foreground font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg text-sm"
          >
            <Plus className="h-5 w-5" />
            Add New Record
          </button>
          <Link 
            to="/users"
            className="bg-secondary text-foreground font-bold px-6 py-3 rounded-xl flex items-center justify-center gap-2 border border-border/50 hover:bg-secondary/80 transition-all text-sm"
          >
            <LayoutGrid className="h-5 w-5" />
            Issue Desk
          </Link>
        </div>
      </section>

      <BookForm 
        isOpen={isBookModalOpen} 
        onClose={() => setIsBookModalOpen(false)} 
      />

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Collection" 
          value={stats.totalBooks.toLocaleString()} 
          icon={BookOpen} 
          description="+12% from last month"
          className="bg-primary/5"
          delay={0.1}
        />
        <StatCard 
          title="Active Issues" 
          value={stats.issuedBooks.toLocaleString()} 
          icon={TrendingUp} 
          description="Currently circulating"
          className="bg-blue-500/5"
          delay={0.2}
        />
        <StatCard 
          title="Available for Loan" 
          value={stats.availableBooks.toLocaleString()} 
          icon={Check} 
          description="Ready to browse"
          className="bg-emerald-500/5"
          delay={0.3}
        />
        <StatCard 
          title="Registrations" 
          value={stats.totalUsers.toLocaleString()} 
          icon={Users} 
          description="Active memberships"
          className="bg-amber-500/5"
          delay={0.4}
        />
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Newly Curated - Responsive Grid */}
        <section className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-serif font-bold">Newly Curated</h3>
            <Link to="/books" className="text-sm font-bold text-primary flex items-center gap-1 hover:underline">
              View All <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {newlyCurated.map((book) => (
              <div key={book.id} className="card-premium h-48 flex gap-4 overflow-hidden group">
                <div className="w-1/3 overflow-hidden">
                  <img src={book.cover} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700" alt={book.title} />
                </div>
                <div className="w-2/3 p-4 flex flex-col justify-center">
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">{book.category}</p>
                  <h4 className="font-serif font-bold text-lg leading-tight mb-1 truncate">{book.title}</h4>
                  <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{book.author}</p>
                  <div className="bg-secondary/50 text-[10px] font-bold px-2 py-1 rounded w-fit uppercase text-muted-foreground">
                    {book.edition}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Recent Archive Logs */}
        <section className="bg-card card-premium p-6 flex flex-col">
          <h3 className="text-xl font-serif font-bold mb-6">Recent Activity</h3>
          <div className="space-y-6 flex-1">
            {recentTransactions.map((tx, idx) => {
              const user = users.find(u => u.id === tx.userId);
              const book = books.find(b => b.id === tx.bookId);
              return (
                <div key={tx.id} className="flex gap-4 items-start relative">
                  {idx !== recentTransactions.length - 1 && (
                    <div className="absolute left-[13px] top-[30px] w-0.5 h-8 bg-border/40" />
                  )}
                  <div className={cn(
                    "p-1.5 rounded-full z-10",
                    tx.status === "Returned" ? "bg-emerald-100 text-emerald-600" :
                    tx.status === "Overdue" ? "bg-rose-100 text-rose-600" : "bg-blue-100 text-blue-600"
                  )}>
                    <Clock className="h-3.5 w-3.5" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs leading-relaxed">
                      <span className="font-bold text-foreground">{user?.name}</span>
                      <span className="text-muted-foreground mx-1">
                        {tx.status.toLowerCase()}
                      </span>
                      <span className="font-bold border-b border-primary/20">{book?.title}</span>
                    </p>
                    <p className="text-[10px] font-semibold text-muted-foreground mt-1 uppercase">
                      {formatDistanceToNow(new Date(tx.issueDate), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full bg-secondary text-foreground font-bold py-3 rounded-xl mt-8 text-[11px] uppercase tracking-widest hover:bg-border/40 transition-colors">
            Audit Trail
          </button>
        </section>
      </div>
    </div>
  );
}
