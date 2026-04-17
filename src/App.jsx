import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { LibraryProvider } from "./context/LibraryContext";
import { MainLayout } from "./layouts/MainLayout";
import { Dashboard } from "./pages/Dashboard";
import { Books } from "./pages/Books";
import { Users } from "./pages/Users";
import { Profile } from "./pages/Profile";
import { EditBook } from "./pages/EditBook";
import { Reports } from "./pages/Reports";
import { Settings } from "./pages/Settings";
import { Login } from "./pages/Login";
import { AuthProvider, useAuth } from "./context/AuthContext";

// No longer used to force redirect, but can be kept for future restricted areas
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) return <div className="h-screen w-full flex items-center justify-center bg-background"><div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin"></div></div>;
  return children;
}

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <LibraryProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <MainLayout />
                }
              >
                <Route index element={<Dashboard />} />
                <Route path="books" element={<Books />} />
                <Route path="books/:id/edit" element={<EditBook />} />
                <Route path="users" element={<Users />} />
                <Route path="profile" element={<Profile />} />
                <Route path="reports" element={<Reports />} />
                <Route path="settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster
            position="bottom-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: "var(--card)",
                color: "var(--foreground)",
                border: "1px solid var(--border)",
              },
            }}
          />
        </LibraryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
