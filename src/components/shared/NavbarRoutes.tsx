"use client";
import Image from "next/image";
import { LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import LoginDialog from "./LoginDialog";
import ModeToggle from "./ModeToggle";
import TooltipContainer from "./TooltipContainer";

interface NavbarRouteProps {
    isPremiumUser?: boolean;
    isSiteNavbar?: boolean;
};

const NavbarRoutes: React.FC<NavbarRouteProps> = ({ isPremiumUser, isSiteNavbar }) => {

    const session = useSession();

    return (
        <div className="flex gap-x-2 ml-auto">
            {!isSiteNavbar && (
                <>
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
                </>
            )}
            {(isSiteNavbar && !isPremiumUser) && (
                <>
                    {session.status === "authenticated" ? (
                        <>
                            <Image
                                src={session?.data?.user?.image!}
                                alt="User image"
                                width={40}
                                height={40}
                                className="rounded-full border-2 border-blue-300 "
                            />
                            <Button onClick={() => signOut()} size={'icon'} variant={'outline'} >
                                <LogOut className="h-4 w-4 text-rose-500" />
                            </Button>
                        </>
                    ) : (
                        <LoginDialog>
                            <Button variant={'outline'}  >
                                <User className="mr-2 h-4 w-4" />
                                Sign in
                            </Button>
                        </LoginDialog>
                    )}
                </>
            )}
            {(isSiteNavbar && isPremiumUser) && (
                <ModeToggle />
            )}
        </div>
    );
};

export default NavbarRoutes;