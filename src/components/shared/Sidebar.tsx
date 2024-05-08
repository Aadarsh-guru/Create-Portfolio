import Logo from "../shared/Logo";
import SidebarRoutes from "./SidebarRoutes";

const Sidebar = ({ avalibleSections, customLogo }: { avalibleSections?: string[]; customLogo?: string; }) => {
    return (
        <div className="h-full border-r flex flex-col overflow-y-auto shadow-sm bg-white dark:bg-gray-950">
            <Logo customLogo={customLogo} />
            <div className="flex flex-col w-full">
                <SidebarRoutes avalibleSections={avalibleSections} />
            </div>
        </div>
    );
};

export default Sidebar;