import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import ThemeProvider from '@/providers/ThemeProvider';

export default async function PrivateLayout({
    children,
}: {
    children: React.ReactNode
}) {

    const session = await getServerSession();

    if (!session) {
        redirect("/");
    };

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey={`theme-${process.env.NEXT_PUBLIC_ROOT_DOMAIN}`}
        >
            <div className="h-full">
                {children}
            </div>
        </ThemeProvider>
    );
};
