"use client"
import {
    Home,
    Rocket,
    Mail,
    List,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useSection } from "@/providers/SectionProvider";

const sectionIconMapping = {
    "home": {
        Icon: Home,
        label: "Home",
    },
    "skills": {
        Icon: Rocket,
        label: "Skills",
    },
    "projects": {
        Icon: List,
        label: "Projects",
    },
    "contact": {
        Icon: Mail,
        label: "Contact"
    },
};

type SectionTypes = "home" | "skills" | "projects" | "contact";

const SidebarItem = ({ section }: { section: string }) => {

    const { Icon, label } = sectionIconMapping[section as SectionTypes];

    const { activeSection } = useSection();

    const isActive = (activeSection === section);

    const onClick = () => {
        const sectionRef = document.getElementById(section);
        if (sectionRef) {
            const sectionTop = sectionRef.getBoundingClientRect().top;
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollOffset = sectionTop + scrollTop - window.innerHeight / 2 + sectionRef.clientHeight / 2;
            window.scrollTo({
                top: scrollOffset,
                behavior: 'smooth'
            });
        }
    };

    return (
        <button
            type="button"
            onClick={onClick}
            className={cn(
                "flex items-center gap-x-2 to-slate-500 text-sm font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
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