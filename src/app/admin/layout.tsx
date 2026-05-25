import { AuthProvider } from "@/components/admin/AuthProvider";
import { AdminShell } from "@/components/admin/AdminShell";
import { auth } from "@/auth";

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  return (
    <AuthProvider>
      <AdminShell session={session}>{children}</AdminShell>
    </AuthProvider>
  );
}
