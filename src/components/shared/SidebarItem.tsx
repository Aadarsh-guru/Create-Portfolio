"use client"
import { LucideIcon } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface SidebarItemProps {
    icon: LucideIcon;
    label: string;
    href: string;
};

const SidebarItem = ({ icon: Icon, label, href }: SidebarItemProps) => {

    const pathname = usePathname();
    const router = useRouter();
    const isActive = (pathname === "/" && href === "/") || pathname === href;

    const onClick = () => {
        router.push(href);
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-x-2 to-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 dark:hover:text-slate-400 hover:bg-slate-300/20",
                isActive && "text-sky-700 dark:text-sky-500 bg-sky-200/20 hover:text-sky-700 dark:hover:text-sky-500 hover:bg-sky-200/20"
            )}
        >
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-sky-700 dark:text-sky-500"
                    )}
                />
                {label}
            </div>
            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 dark:border-sky-500 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    );
};

export default SidebarItem;