import React from "react";
import { 
  Award, 
  BookOpen, 
  Calendar, 
  ChevronRight, 
  Clock, 
  Edit3, 
  Star,
  Settings,
  MoreVertical
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { cn } from "../utils/utils";

export function Profile() {
  const { users, books, transactions } = useLibrary();
  const user = users[0]; // Primary user for profile view

  const activeBorrowings = transactions
    .filter(t => t.userId === user.id && t.status !== "Returned")
    .map(t => ({
      ...t,
      book: books.find(b => b.id === t.bookId)
    }));

  const history = [
    { title: "Loan Completed", detail: '"The Shape of Content" by Ben Shahn', date: "Returned Sep 12", points: "+25 Pts", status: "completed" },
    { title: "Loan Completed", detail: '"Interaction of Color" by Josef Albers', date: "Returned Aug 04", points: "+25 Pts", status: "completed" },
    { title: "Tier Upgraded", detail: "Silver to Gold Membership", date: "Effective July 15", status: "upgrade", icon: Star },
  ];

  return (
    <div className="space-y-10 pb-10 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <section className="relative px-2">
        <div className="card-premium rounded-[3rem] pt-36 pb-12 flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-48 bg-secondary/30 -z-10"></div>
          
          {/* Avatar Area */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="relative">
              <div className="h-28 w-28 rounded-full border-4 border-background overflow-hidden shadow-xl ring-4 ring-primary/5">
                <img src={user.avatar} className="h-full w-full object-cover" alt={user.name} />
              </div>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-emerald-500 text-[8px] font-bold text-white px-3 py-1 rounded-full uppercase tracking-tighter shadow-lg whitespace-nowrap">
                {user.role}
              </div>
            </div>
          </div>

          <h2 className="text-3xl font-serif font-bold text-foreground mt-4 mb-1">{user.name}</h2>
          <p className="text-sm font-medium text-muted-foreground mb-8">Member since {user.memberSince}</p>

          <div className="w-full grid grid-cols-3 gap-2 px-4 mb-8">
            <div className="flex flex-col items-center">
              <span className="text-base font-bold">{user.totalLoans}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1 text-center">Total Loans</span>
            </div>
            <div className="flex flex-col items-center border-x border-border/50">
              <span className="text-base font-bold">{user.activeLimit}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1 text-center">Active Limit</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-base font-bold text-emerald-600">{user.rewardPoints.toLocaleString()}</span>
              <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest leading-none mt-1 text-center">Reward Points</span>
            </div>
          </div>

          <button className="w-full bg-foreground text-background font-bold py-4 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all">
            <Edit3 className="h-4 w-4" />
            Edit Profile
          </button>
        </div>
      </section>

      {/* Active Borrowings */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-serif font-bold">Active Borrowings</h3>
          <button className="text-xs font-bold text-muted-foreground hover:text-foreground">View All</button>
        </div>
        
        <div className="space-y-4">
          {activeBorrowings.slice(0, 2).map((borrow, idx) => (
            <div key={borrow.id} className="bg-secondary/20 rounded-[2.5rem] p-5 flex gap-5 items-center">
              <div className="h-28 w-20 rounded-2xl overflow-hidden shadow-lg flex-shrink-0">
                <img src={borrow.book?.cover} className="h-full w-full object-cover" alt={borrow.book?.title} />
              </div>
              <div className="flex-1">
                <h4 className="font-serif font-bold text-lg leading-tight mb-1">{borrow.book?.title}</h4>
                <p className="text-xs text-muted-foreground mb-4">{borrow.book?.author}</p>
                
                <div className="flex flex-col gap-1">
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Due Date</p>
                  <div className={cn(
                    "flex items-center gap-1.5 text-xs font-bold",
                    borrow.status === "Overdue" ? "text-rose-600" : "text-foreground"
                  )}>
                    <Calendar className="h-3 w-3" />
                    {new Date(borrow.dueDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </div>
                  {borrow.status === "Overdue" && (
                    <div className="text-[9px] font-bold text-rose-600 uppercase tracking-tighter flex items-center gap-1 mt-1">
                      <Clock className="h-3 w-3" /> OVERDUE
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reservation Queue */}
      <section>
        <h3 className="text-xl font-serif font-bold mb-4">Reservation Queue</h3>
        <div className="bg-secondary/20 rounded-[2.5rem] p-2 space-y-2">
           {[
             { title: "Design as Art", author: "Bruno Munari", time: "3 Days", id: "01" },
             { title: "Ways of Seeing", author: "John Berger", time: "12 Days", id: "02" }
           ].map((res) => (
             <div key={res.id} className="bg-background rounded-[2rem] p-4 flex items-center gap-4">
               <div className="h-10 w-12 bg-secondary/50 rounded-xl flex items-center justify-center text-xs font-bold text-muted-foreground">
                 {res.id}
               </div>
               <div className="flex-1">
                 <h4 className="text-sm font-bold">{res.title}</h4>
                 <p className="text-[10px] text-muted-foreground">{res.author}</p>
               </div>
               <div className="text-right">
                 <p className="text-[8px] font-bold text-muted-foreground uppercase tracking-widest mb-0.5 whitespace-nowrap">Estimated</p>
                 <p className="text-xs font-bold">{res.time}</p>
               </div>
             </div>
           ))}
        </div>
      </section>

      {/* Reading Pace Card */}
      <section>
        <div className="bg-foreground rounded-[2.5rem] p-8 text-background relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10">
             <BookOpen className="h-32 w-32" />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-background/60 mb-2">Reading Pace</p>
          <p className="text-xs text-background/80 mb-8 leading-relaxed">
            You are in the <span className="text-emerald-400 font-bold">top 5%</span> of archivists this month.
          </p>
          <div className="flex items-baseline gap-2">
            <span className="text-6xl font-serif font-bold italic">4.2</span>
            <span className="text-xs font-bold text-background/60 uppercase tracking-widest">Books / Month</span>
          </div>
        </div>
      </section>

      {/* Membership History */}
      <section>
        <h3 className="text-xl font-serif font-bold mb-6">Membership History</h3>
        <div className="space-y-12 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-border/50">
          {history.map((item, idx) => (
            <div key={idx} className="relative pl-10">
              <div className={cn(
                "absolute left-0 top-1.5 h-6 w-6 rounded-full border-4 border-background flex items-center justify-center z-10",
                item.status === "upgrade" ? "bg-emerald-500" : "bg-foreground"
              )}>
                {item.icon && <item.icon className="h-2 w-2 text-white" />}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-sm font-bold text-foreground leading-tight">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">{item.detail}</p>
                  <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2">{item.date}</p>
                </div>
                {item.points && (
                  <span className="text-[10px] font-bold text-emerald-600">{item.points}</span>
                )}
                {item.status === "upgrade" && (
                   <div className="h-6 w-6 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                      <Star className="h-3 w-3 fill-current" />
                   </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
