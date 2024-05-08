import ThemeProvider from '@/providers/ThemeProvider';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/static/Navbar';

export default function StaticLayout({
    children,
}: {
    children: React.ReactNode,
}) {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey={`theme-${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
        >
            <div className="h-full">
                <header className="h-20 fixed inset-y-0 w-full z-50" >
                    <Navbar />
                </header>
                <main className="pt-20 min-h-full w-full container mx-auto" >
                    {children}
                </main>
                <footer className="w-full relative bottom-0 border-t" >
                    <Footer />
                </footer>
            </div>
        </ThemeProvider>
    );
};
