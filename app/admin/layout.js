// app/admin/layout.js
"use client";

import Header from "@/components/admin/Header/Header";
import Sidebar from "@/components/admin/Sidebar/Sidebar";
import { useAuth } from "@/contexts/authContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function AdminLayout({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Only redirect if loading is complete and user is not authenticated
    if (!loading && !isAuthenticated) {
      console.log('Not authenticated, redirecting to login');
      router.replace('/'); // Use replace instead of push
    }
  }, [isAuthenticated, loading, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render anything while redirecting
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="relative h-full min-h-screen w-full">
      <Header />
      <Sidebar />
      <div className="pt-[45px] sm:ml-52">
        <div className="fixed top-0 -z-20 h-screen w-full bg-gradient-to-r from-primary/40 via-secondary/30 to-primary/60 blur-[90px]" />
        <div className="p-2 sm:p-4">{children}</div>
      </div>
    </div>
  );
}