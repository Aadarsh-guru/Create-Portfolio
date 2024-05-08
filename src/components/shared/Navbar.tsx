import MobileSidebar from "./MobileSidebar";
import NavbarRoutes from "./NavbarRoutes";

interface NavbarProps {
    avalibleSections?: string[];
    isPremiumUser?: boolean;
    isSiteNavbar?: boolean;
    customLogo?: string;
};

const Navbar: React.FC<NavbarProps> = ({ avalibleSections, isPremiumUser, isSiteNavbar, customLogo }) => {
    return (
        <nav className="p-4 border-b h-full flex items-center shadow-sm bg-white dark:bg-gray-950" >
            <MobileSidebar avalibleSections={avalibleSections} customLogo={customLogo} />
            <NavbarRoutes isPremiumUser={isPremiumUser} isSiteNavbar={isSiteNavbar} />
        </nav>
    );
};

export default Navbar;