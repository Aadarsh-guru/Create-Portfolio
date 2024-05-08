import { notFound } from 'next/navigation';
import { redis } from "@/lib/redis";
import prisma from '@/lib/prisma';
import Footer from '@/components/shared/Footer';
import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import ThemeProvider from '@/providers/ThemeProvider';
import SectionProvider from '@/providers/SectionProvider';

export default async function SiteLayout({
    children,
    params: { identifier },
}: {
    children: React.ReactNode,
    params: { identifier: string }
}) {

    let user: any;

    const chachedUser = await redis?.get(`layout:${identifier}`);

    if (chachedUser) {
        user = await JSON.parse(chachedUser);
    } else {
        user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: identifier },
                    { domain: identifier }
                ]
            },
            include: {
                skills: {
                    select: { id: true },
                },
                projects: {
                    where: {
                        isPublished: true
                    },
                    select: {
                        id: true,
                    },
                },
            }
        });
    };

    if (!user) {
        return notFound();
    };

    const isPremiumValid = (user?.isPremiumUser && new Date(user?.premiumExpiry!) > new Date());

    if (isPremiumValid) {
        await redis?.setex(`layout:${identifier}`, 600, JSON.stringify(user));
    };

    const avalibleSections: string[] = ["home"];

    if (user?.skills?.length) {
        avalibleSections.push("skills");
    };

    if (user?.projects?.length) {
        avalibleSections.push("projects");
    };

    avalibleSections.push("contact");

    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            storageKey={`theme-${user?.domain || user?.username}`}
        >
            <SectionProvider>
                <div className="h-full">
                    <header className="h-20 md:pl-56 fixed inset-y-0 w-full z-50" >
                        <Navbar
                            isSiteNavbar={true}
                            isPremiumUser={user?.isPremiumUser}
                            avalibleSections={avalibleSections}
                            customLogo={user?.customLogo!}
                        />
                    </header>
                    <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
                        <Sidebar
                            customLogo={user?.customLogo!}
                            avalibleSections={avalibleSections}
                        />
                    </div>
                    <main className="md:pl-56 pt-20 min-h-full" >
                        {children}
                    </main>
                    <footer className="w-full md:pl-56 relative bottom-0 border-t" >
                        <Footer
                            username={user?.username!}
                            isPremiumUser={user?.isPremiumUser}
                        />
                    </footer>
                </div>
            </SectionProvider>
        </ThemeProvider>
    );
};
