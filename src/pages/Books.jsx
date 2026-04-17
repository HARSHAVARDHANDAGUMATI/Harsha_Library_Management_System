import React, { useState } from "react";
import { Search, SlidersHorizontal, ArrowUpDown, Plus, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { useLibrary } from "../context/LibraryContext";
import { useDebounce } from "../hooks/useDebounce";
import { cn } from "../utils/utils";

export function Books() {
  const { books } = useLibrary();
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const [activeFilter, setActiveFilter] = useState("All");

  const categories = ["All", "Philosophy", "History", "Architecture", "Science", "Linguistics", "Anatomy", "Mythology"];

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
    const matchesCategory =
      activeFilter === "All" || book.category === activeFilter;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <section className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h2 className="text-4xl font-serif font-bold text-foreground leading-tight">
            Library Catalog
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Explore {books.length} curated archival manuscripts and research volumes.
          </p>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="h-12 px-6 bg-secondary/50 hover:bg-secondary rounded-xl font-bold flex items-center gap-2 transition-all">
              <ArrowUpDown className="h-4 w-4" />
              <span>Sort</span>
           </button>
           <button className="h-12 px-6 bg-primary text-white shadow-lg rounded-xl font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all">
              <Plus className="h-5 w-5" />
              <span>Catalog New</span>
           </button>
        </div>
      </section>

      {/* Search and Filters */}
      <section className="space-y-6">
        <div className="relative group max-w-2xl">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          <input
            type="search"
            placeholder="Find by title, author, or publisher..."
            className="input-field pl-12 h-14 bg-card border-border/50 text-base"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide border-b border-border/20">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={cn(
                "px-5 py-3 rounded-t-xl text-[11px] font-bold uppercase tracking-[0.1em] whitespace-nowrap transition-all border-b-2",
                activeFilter === cat
                  ? "border-primary text-primary bg-primary/5"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Books Grid - Responsive (2-4 cols) */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-6 sm:gap-y-10">
        {filteredBooks.map((book) => (
          <Link 
            key={book.id} 
            to={`/books/${book.id}/edit`} 
            className="group flex flex-col h-full bg-card rounded-2xl sm:rounded-[2rem] border border-border/30 overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="aspect-[3/4] overflow-hidden relative">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute top-2 right-2 sm:top-4 sm:right-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className={cn(
                  "badge bg-white/95 backdrop-blur-sm shadow-xl py-0.5 px-2 sm:py-1 sm:px-3 font-bold text-[7px] sm:text-[9px] uppercase tracking-widest",
                  book.available > 0 ? "text-emerald-600" : "text-amber-600"
                )}>
                  {book.available > 0 ? "IN STOCK" : "ARCHIVED"}
                </span>
              </div>
            </div>
            
            <div className="p-3 sm:p-6 flex flex-col flex-1">
              <p className="text-[8px] sm:text-[10px] font-bold text-primary uppercase tracking-widest mb-1 opacity-60">
                {book.category}
              </p>
              <h3 className="text-sm sm:text-lg font-serif font-bold leading-tight mb-1 sm:mb-2 group-hover:text-primary transition-colors line-clamp-2">
                {book.title}
              </h3>
              <p className="text-[10px] sm:text-xs text-muted-foreground mb-2 sm:mb-4 line-clamp-1">
                {book.author}
              </p>
              
              <div className="mt-auto flex items-center justify-between pt-2 sm:pt-4 border-t border-border/20">
                <span className="text-[8px] sm:text-[10px] font-bold font-mono text-muted-foreground">{book.isbn.slice(0, 8)}</span>
                <span className="text-[8px] sm:text-[10px] font-bold text-foreground/40">{book.available} / {book.quantity}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="py-32 flex flex-col items-center justify-center text-center opacity-40">
          <Filter className="h-12 w-12 mb-4" />
          <p className="font-serif italic text-xl">No archival matches found.</p>
        </div>
      )}
    </div>
  );
}
