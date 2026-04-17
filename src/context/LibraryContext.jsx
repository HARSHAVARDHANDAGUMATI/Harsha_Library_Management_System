import { createContext, useContext, useState, useEffect } from "react";
import { initialBooks, initialUsers, initialTransactions } from "../data/mockData";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const LibraryContext = createContext();

export function LibraryProvider({ children }) {
  const DATA_VERSION = "archivist_final_v3";

  const getInitialData = (key, fallback) => {
    const localData = localStorage.getItem(key);
    const version = localStorage.getItem("data_version");
    if (version !== DATA_VERSION) return fallback;
    return localData ? JSON.parse(localData) : fallback;
  };

  const [books, setBooks] = useState(() => getInitialData("books", initialBooks));
  const [users, setUsers] = useState(() => getInitialData("users", initialUsers));
  const [transactions, setTransactions] = useState(() => getInitialData("transactions", initialTransactions));

  useEffect(() => {
    localStorage.setItem("data_version", DATA_VERSION);
  }, []);

  useEffect(() => {
    localStorage.setItem("books", JSON.stringify(books));
  }, [books]);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const stats = {
    totalBooks: books.reduce((acc, book) => acc + book.quantity, 0),
    availableBooks: books.reduce((acc, book) => acc + book.available, 0),
    issuedBooks: books.reduce((acc, book) => acc + (book.quantity - book.available), 0),
    totalUsers: users.length,
  };

  const addBook = (bookData) => {
    const newBook = {
      ...bookData,
      id: uuidv4(),
      available: bookData.quantity,
      coverColor: [
        "https://images.unsplash.com/photo-1589829085413-56de8ae18c73?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1476275466078-4007374efacb?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1629196914275-c99e900c3b5d?q=80&w=600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=600&auto=format&fit=crop"
      ][Math.floor(Math.random() * 5)]
    };
    setBooks([...books, newBook]);
    toast.success("Book added successfully!");
  };

  const editBook = (id, updatedData) => {
    setBooks(
      books.map((book) => {
        if (book.id === id) {
          const quantityDiff = updatedData.quantity - book.quantity;
          return { ...book, ...updatedData, available: book.available + quantityDiff };
        }
        return book;
      })
    );
    toast.success("Book updated successfully!");
  };

  const deleteBook = (id) => {
    setBooks(books.filter((b) => b.id !== id));
    toast.success("Book deleted successfully!");
  };

  const issueBook = (bookId, userId) => {
    const book = books.find((b) => b.id === bookId);
    if (!book || book.available <= 0) {
      toast.error("Book is not available!");
      return;
    }

    setBooks(
      books.map((b) =>
        b.id === bookId ? { ...b, available: b.available - 1 } : b
      )
    );

    setTransactions([
      ...transactions,
      {
        id: uuidv4(),
        bookId,
        userId,
        issueDate: new Date().toISOString(),
        returnDate: null,
        status: "Issued",
      },
    ]);
    toast.success("Book issued successfully!");
  };

  const returnBook = (transactionId) => {
    const transaction = transactions.find((t) => t.id === transactionId);
    if (!transaction || transaction.status === "Returned") {
      toast.error("Invalid transaction!");
      return;
    }

    setTransactions(
      transactions.map((t) =>
        t.id === transactionId
          ? { ...t, returnDate: new Date().toISOString(), status: "Returned" }
          : t
      )
    );

    setBooks(
      books.map((b) =>
        b.id === transaction.bookId ? { ...b, available: b.available + 1 } : b
      )
    );
    toast.success("Book returned successfully!");
  };

  return (
    <LibraryContext.Provider
      value={{
        books,
        users,
        transactions,
        stats,
        addBook,
        editBook,
        deleteBook,
        issueBook,
        returnBook,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
}

export const useLibrary = () => {
  const context = useContext(LibraryContext);
  if (context === undefined)
    throw new Error("useLibrary must be used within a LibraryProvider");
  return context;
};
