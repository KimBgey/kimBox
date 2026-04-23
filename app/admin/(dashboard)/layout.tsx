import type { Metadata } from "next";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata: Metadata = {
  title: "Admin — KIM",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#f4f3f0]">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-5 md:p-8 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
