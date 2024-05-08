"use client";
import { usePathname } from "next/navigation";
import {
    BarChart,
    Layout,
    List,
    Rocket,
    Rss,
    Settings,
    Settings2,
    User,
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import SidebarSiteItem from "./SidebarSiteItem";

const dashboardRoutes = [
    {
        icon: BarChart,
        label: "Analytics",
        href: "/dashboard"
    },
    {
        icon: User,
        label: "Your Info",
        href: "/dashboard/info"
    },
    {
        icon: Rss,
        label: "Social Links",
        href: "/dashboard/social"
    },
    {
        icon: Rocket,
        label: "Your Skills",
        href: "/dashboard/skills"
    },
    {
        icon: List,
        label: "Projects",
        href: "/dashboard/projects"
    },
    {
        icon: Settings2,
        label: "Customize",
        href: "/dashboard/customize",
    },
    {
        icon: Settings,
        label: "Settings",
        href: "/dashboard/settings"
    },
];

const adminRoutes = [
    {
        icon: BarChart,
        label: "Site Analytics",
        href: "/admin"
    },
    {
        icon: Settings,
        label: "Site Settings",
        href: "/admin/settings"
    },
];

const SidebarRoutes = ({ avalibleSections }: { avalibleSections?: string[] }) => {

    const pathname = usePathname();
    const isDashboard = pathname.startsWith("/dashboard");
    const isAdmin = pathname.startsWith("/admin");

    return (
        <div className="flex flex-col w-full">
            {isDashboard && (
                dashboardRoutes.map((route, index) => (
                    <SidebarItem
                        key={index}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            )}
            {isAdmin && (
                adminRoutes.map((route, index) => (
                    <SidebarItem
                        key={index}
                        icon={route.icon}
                        label={route.label}
                        href={route.href}
                    />
                ))
            )}
            {!isDashboard && (
                avalibleSections?.map((route, index) => (
                    <SidebarSiteItem
                        key={index}
                        section={route}
                    />
                ))
            )}
        </div>
    );
};

export default SidebarRoutes;