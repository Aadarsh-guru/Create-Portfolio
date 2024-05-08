import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ThemeProvider from '@/providers/ThemeProvider';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/public/Navbar';

export default async function StaticLayout({
    children,
}: {
    children: React.ReactNode,
}) {

    const session = await getServerSession();

    if (session) {
        return redirect("/dashboard");
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey={`theme-${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
        >
            <div className="h-full">
                <header className="h-20 inset-y-0 w-full z-50" >
                    <Navbar />
                </header>
                <main className="min-h-full w-full container mx-auto" >
                    {children}
                </main>
                <footer className="w-full relative bottom-0 border-t" >
                    <Footer />
                </footer>
            </div>
        </ThemeProvider>
    );
};
