import React, { useState } from "react";
import { 
  UserPlus, 
  ArrowRightLeft, 
  CheckCircle, 
  Search, 
  Users as UsersIcon, 
  History,
  ShieldCheck,
  MoreVertical,
  Activity
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { Button } from "../components/ui/Button";
import { Modal } from "../components/ui/Modal";
import { useForm } from "react-hook-form";
import { cn } from "../utils/utils";

export function Users() {
  const { users, transactions, books, issueBook, returnBook } = useLibrary();
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [userSearch, setUserSearch] = useState("");

  const activeTransactions = transactions.filter((t) => t.status === "Issued" || t.status === "Overdue");

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(userSearch.toLowerCase()) || 
    u.email.toLowerCase().includes(userSearch.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight">Circulation Desk</h2>
          <p className="text-sm text-muted-foreground">Manage active lendings and curator registrations.</p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            <input 
              type="text" 
              placeholder="Filter members..." 
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
              className="h-11 w-full pl-10 pr-4 rounded-xl bg-card border border-border/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
            />
          </div>
          <Button onClick={() => setIsIssueModalOpen(true)} className="h-11 px-6 rounded-xl font-bold gap-2 shadow-lg w-full sm:w-auto">
            <ArrowRightLeft className="h-4 w-4" /> Issue Resource
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-5">
        {/* Active Transactions - 3 Columns */}
        <div className="lg:col-span-3 space-y-6">
          <section className="bg-card glass rounded-[2rem] border border-border/30 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border/20 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-500/10 p-2 rounded-lg">
                   <Activity className="h-5 w-5 text-blue-500" />
                </div>
                <h3 className="font-serif font-bold text-xl">Active Shipments</h3>
              </div>
              <span className="bg-blue-100 dark:bg-blue-500/20 text-blue-700 dark:text-blue-300 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-tight whitespace-nowrap">
                {activeTransactions.length} Pending
              </span>
            </div>
            
            <div className="divide-y divide-border/20">
              {activeTransactions.length > 0 ? (
                activeTransactions.map((tx) => {
                  const book = books.find((b) => b.id === tx.bookId);
                  const user = users.find((u) => u.id === tx.userId);
                  const isOverdue = tx.status === "Overdue";

                  return (
                    <div key={tx.id} className="p-4 sm:p-6 hover:bg-muted/30 transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0 w-full sm:w-auto">
                        <div className="h-16 w-12 rounded-lg overflow-hidden flex-shrink-0 shadow-sm border border-white/5">
                           <img src={book?.cover} className="h-full w-full object-cover" alt={book?.title} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-base sm:text-lg truncate leading-tight mb-1">{book?.title}</p>
                          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground font-medium">
                            <span className="text-foreground font-bold truncate">{user?.name}</span>
                            <span className="hidden sm:inline opacity-30">•</span>
                            <span className={cn("whitespace-nowrap", isOverdue && "text-rose-500 font-bold")}>
                               Due {new Date(tx.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        className="rounded-xl h-10 font-bold px-5 hover:bg-emerald-600 hover:text-white transition-all w-full sm:w-auto text-xs active:scale-95"
                        onClick={() => returnBook(tx.id)}
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Return
                      </Button>
                    </div>
                  );
                })
              ) : (
                <div className="p-16 text-center flex flex-col items-center opacity-40">
                  <History className="h-12 w-12 mb-4" />
                  <p className="font-serif italic text-lg text-balance">The archival records are currently balanced.</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Users List - 2 Columns */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-card glass rounded-[2rem] border border-border/30 overflow-hidden shadow-sm">
            <div className="p-6 border-b border-border/20 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="bg-amber-500/10 p-2 rounded-lg">
                   <UsersIcon className="h-5 w-5 text-amber-500" />
                </div>
                <h3 className="font-serif font-bold text-xl">Curators</h3>
              </div>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-accent h-10 w-10">
                <UserPlus className="h-5 w-5" />
              </Button>
            </div>
            
            <div className="divide-y divide-border/20 max-h-[500px] overflow-auto scrollbar-hide">
              {filteredUsers.map((user) => (
                <div key={user.id} className="flex items-center p-4 sm:p-5 hover:bg-muted/30 transition-colors">
                  <div className="relative shrink-0">
                    <img
                      src={user.avatar}
                      alt={user.name}
                      className="h-10 w-10 sm:h-11 sm:w-11 rounded-full border-2 border-background shadow-md object-cover"
                    />
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-card" />
                  </div>
                  <div className="ml-4 min-w-0 flex-1">
                    <p className="font-bold text-sm sm:text-base leading-none truncate mb-1">{user.name}</p>
                    <p className="text-[9px] sm:text-[10px] uppercase font-bold text-muted-foreground tracking-tighter truncate">{user.email}</p>
                  </div>
                  <div className="ml-3 shrink-0">
                    <span className={cn(
                      "inline-flex items-center rounded-full border px-2 py-0.5 text-[8px] sm:text-[9px] font-bold uppercase tracking-tighter",
                      user.role.includes("Gold") 
                        ? "bg-amber-500/10 text-amber-600 border-amber-500/20" 
                        : "bg-emerald-500/10 text-emerald-600 border-emerald-500/20"
                    )}>
                      {user.role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="p-6 bg-secondary/10 border-t border-border/20">
               <div className="flex items-center gap-3 text-xs font-semibold text-muted-foreground">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Verified Archive Access
               </div>
            </div>
          </section>
        </div>
      </div>

      <IssueBookModal
        isOpen={isIssueModalOpen}
        onClose={() => setIsIssueModalOpen(false)}
        books={books}
        users={users}
        onIssue={issueBook}
      />
    </div>
  );
}

function IssueBookModal({ isOpen, onClose, books, users, onIssue }) {
  const { register, handleSubmit, reset } = useForm();
  const availableBooks = books.filter((b) => b.available > 0);

  const onSubmit = (data) => {
    onIssue(data.bookId, data.userId);
    reset();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Issue Archival Resource">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 pt-2">
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Curator Account
          </label>
          <select
            className="w-full h-12 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
            {...register("userId", { required: true })}
          >
            <option value="">-- Choose Curator --</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name} ({u.role})
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground ml-1">
            Book Manuscript
          </label>
          <select
            className="w-full h-12 rounded-xl border border-border bg-background px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-primary/20 outline-none appearance-none cursor-pointer"
            {...register("bookId", { required: true })}
          >
            <option value="">-- Choose Volume --</option>
            {availableBooks.map((b) => (
              <option key={b.id} value={b.id}>
                {b.title} ({b.available} Available)
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-3 pt-6">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1 h-12 rounded-xl font-bold">
            Cancel
          </Button>
          <Button type="submit" className="flex-1 h-12 rounded-xl font-bold">Process Issue</Button>
        </div>
      </form>
    </Modal>
  );
}
