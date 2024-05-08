import { Menu } from "lucide-react";
import Sidebar from "./Sidebar";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";

const MobileSidebar = ({ avalibleSections, customLogo }: { avalibleSections?: string[], customLogo?: string; }) => {
    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition" >
                <Menu />
            </SheetTrigger>
            <SheetContent side={'left'} className="p-0" >
                <SheetClose asChild>
                    <Sidebar
                        avalibleSections={avalibleSections}
                        customLogo={customLogo}
                    />
                </SheetClose>
            </SheetContent>
        </Sheet>
    );
};

export default MobileSidebar;