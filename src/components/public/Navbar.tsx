import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import LoginDialog from "@/components/shared/LoginDialog";
import ModeToggle from "@/components/shared/ModeToggle";

const Navbar = () => {
    return (
        <nav className="h-full flex justify-between items-center bg-white dark:bg-gray-950" >
            <div className="w-36 sm:w-56">
                <Logo
                    borderBotton={false}
                    className="h-12 w-32 sm:h-14 sm:w-44"
                />
            </div>
            <div className="p-2 sm:p-4">
                <div className="flex gap-x-1 sm:gap-x-2 ml-auto">
                    <LoginDialog>
                        <Button variant={'outline'}  >
                            <User className="mr-2 h-4 w-4" />
                            Sign in
                        </Button>
                    </LoginDialog>
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;