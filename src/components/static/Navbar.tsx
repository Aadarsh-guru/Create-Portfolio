"use client";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Logo from "@/components/shared/Logo";
import LoginDialog from "@/components/shared/LoginDialog";
import ModeToggle from "@/components/shared/ModeToggle";
import TooltipContainer from "@/components/shared/TooltipContainer";

const Navbar = () => {

    const session = useSession();

    return (
        <nav className="border-b h-full flex justify-between items-center shadow-sm bg-white dark:bg-gray-950" >
            <div className="w-36 sm:w-56">
                <Logo
                    className="h-12 w-32 sm:h-14 sm:w-44"
                />
            </div>
            <div className="p-2 sm:p-4">
                <div className="flex gap-x-1 sm:gap-x-2 ml-auto">
                    {session.status === "authenticated" ? (
                        <>
                            <Image
                                src={session?.data?.user?.image!}
                                alt="User image"
                                width={40}
                                height={40}
                                className="rounded-full border-2 border-blue-300 "
                            />
                            <TooltipContainer content="Logout" >
                                <Button onClick={() => signOut()} size={'icon'} variant={'outline'} >
                                    <LogOut className="h-4 w-4 text-rose-500" />
                                </Button>
                            </TooltipContainer>
                        </>
                    ) : (
                        <LoginDialog>
                            <Button variant={'outline'}  >
                                <User className="mr-2 h-4 w-4" />
                                Sign in
                            </Button>
                        </LoginDialog>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;