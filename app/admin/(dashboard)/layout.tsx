import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Admin — KIM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f3f0]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-5 md:p-8">
        {children}
      </main>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: { fontFamily: "inherit", fontSize: "0.875rem" },
          classNames: {
            toast: "rounded-xl! border! border-black/[0.06]! shadow-lg!",
            success: "border-l-[3px]! border-l-emerald-500!",
            error: "border-l-[3px]! border-l-[var(--color-red)]!",
          },
        }}
      />
    </div>
  );
}
