import { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/actions/user';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';

export const metadata: Metadata = {
    title: `Admin dashboard - ${process.env.NEXT_PUBLIC_APP_NAME as string}`,
};

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const user = await getCurrentUser();

    if (user?.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID as string) {
        return redirect("/");
    };

    return (
        <div className="h-full">
            <header className="h-20 md:pl-56 fixed inset-y-0 w-full z-50" >
                <Navbar />
            </header>
            <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                <Sidebar />
            </div>
            <main className="md:pl-56 pt-20 min-h-full" >
                {children}
            </main>
            <footer className="w-full md:pl-56 relative bottom-0 border-t" >
                <Footer />
            </footer>
        </div>
    );
};
