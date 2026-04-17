import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Camera, 
  CheckCircle2, 
  Trash2, 
  ChevronDown,
  Save,
  X,
  AlertCircle
} from "lucide-react";
import { useLibrary } from "../context/LibraryContext";
import { useForm } from "react-hook-form";
import { cn } from "../utils/utils";

export function EditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { books, editBook, deleteBook } = useLibrary();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const book = books.find(b => b.id === id);

  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    if (book) reset(book);
  }, [book, reset]);

  if (!book) return <div className="p-20 text-center font-serif">Record not found.</div>;

  const onSubmit = (data) => {
    editBook(id, data);
    navigate("/books");
  };

  const handleDelete = () => {
    deleteBook(id);
    navigate("/books");
  };

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto">
      {/* Back Navigation */}
      <Link 
        to="/books" 
        className="flex items-center gap-2 text-xs font-bold text-muted-foreground hover:text-foreground transition-colors uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Catalog
      </Link>

      {/* Book Cover Image - Resized for better desktop experience */}
      <section className="relative flex justify-center">
        <div className="w-full max-w-[320px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl relative bg-secondary/20 group">
          <img src={book.cover} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={book.title} />
          <button className="absolute bottom-4 right-4 h-11 w-11 bg-white/90 backdrop-blur-sm text-foreground rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-all">
            <Camera className="h-5 w-5" />
          </button>
        </div>
      </section>

      {/* Metadata Status Card - More Compact */}
      <section className="bg-secondary/20 rounded-[1.5rem] p-5 space-y-3">
        <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Metadata Status</p>
        <div className="flex items-center justify-between">
           <span className="text-sm font-medium">Archival Integrity</span>
           <span className="bg-emerald-400 text-white text-[10px] font-bold px-3 py-1 rounded uppercase tracking-tighter flex items-center gap-1">
              Verified
           </span>
        </div>
        <div className="flex items-center justify-between border-t border-border/50 pt-4">
           <span className="text-sm font-medium">Last Edited</span>
           <span className="text-sm font-bold text-foreground">Oct 24, 2023</span>
        </div>
      </section>

      {/* Form Section */}
      <section className="space-y-6 pt-2">
        <div>
          <h2 className="text-2xl font-serif font-bold text-foreground mb-1">Edit Archive Record</h2>
          <p className="text-xs text-muted-foreground">Modify the bibliographical metadata for this collection item.</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Title</label>
             <input 
               {...register("title")}
               className="input-field bg-secondary/20 border-none h-14 font-medium"
             />
          </div>

          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Author</label>
             <input 
               {...register("author")}
               className="input-field bg-secondary/20 border-none h-14 font-medium"
             />
          </div>

          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Genre</label>
             <div className="relative">
                <select 
                  {...register("genre")}
                  className="input-field bg-secondary/20 border-none h-14 font-medium appearance-none"
                >
                   <option>Historical Non-Fiction</option>
                   <option>Philosophy</option>
                   <option>Science</option>
                </select>
                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground pointer-events-none" />
             </div>
          </div>

          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">ISBN-13</label>
             <input 
               {...register("isbn")}
               className="input-field bg-secondary/20 border-none h-14 font-medium"
             />
          </div>

          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Edition</label>
             <input 
               {...register("edition")}
               className="input-field bg-secondary/20 border-none h-14 font-medium"
             />
          </div>

          <div className="space-y-1.5">
             <label className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest pl-1">Description</label>
             <textarea 
               {...register("description")}
               rows={6}
               className="input-field bg-secondary/20 border-none py-4 font-medium leading-relaxed resize-none"
             />
          </div>

          {/* Delete Action - Triggering Custom Modal */}
          <button 
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center justify-center gap-2 text-rose-500 font-bold text-xs uppercase tracking-widest w-full py-6 mt-4 hover:text-rose-400 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
            Delete Book Record
          </button>

          {/* Fixed Footer Buttons matching Screenshot 3 */}
          <div className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-md border-t border-border/50 p-6 flex gap-4 z-50 sm:relative sm:bg-transparent sm:border-none sm:p-0">
             <button 
               type="button"
               onClick={() => navigate("/books")}
               className="flex-1 font-bold text-sm bg-secondary h-14 rounded-2xl hover:bg-border/40 transition-colors"
             >
                Cancel
             </button>
             <button 
               type="submit"
               className="flex-1 bg-emerald-600 text-white font-bold text-sm h-14 rounded-2xl flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all shadow-lg"
             >
                <CheckCircle2 className="h-4 w-4" />
                Save
             </button>
          </div>
        </form>
      </section>

      {/* Custom Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-300">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-md"
            onClick={() => setShowDeleteConfirm(false)}
          />
          <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-card border border-white/10 glass shadow-2xl animate-in zoom-in-95 duration-300">
            <div className="px-8 pt-10 pb-6 text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-rose-500/10 text-rose-500">
                <AlertCircle className="h-8 w-8" />
              </div>
              <h3 className="mb-2 text-xl font-bold tracking-tight">Archival Removal</h3>
              <p className="text-sm text-muted-foreground leading-relaxed px-2">
                This action is permanent and will remove all metadata for this record. Are you sure?
              </p>
            </div>
            <div className="flex flex-col gap-2 p-6 pt-0">
              <button
                onClick={handleDelete}
                className="w-full rounded-2xl bg-rose-500 py-4 text-sm font-bold text-white shadow-lg shadow-rose-500/20 hover:bg-rose-600 active:scale-[0.98] transition-all"
              >
                Confirm Deletion
              </button>
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="w-full rounded-2xl py-4 text-sm font-bold text-muted-foreground hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
