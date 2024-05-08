"use client";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "../ui/use-toast";
import { cn } from "@/lib/utils";

interface LoginDialogProps {
    children: React.ReactNode;
    className?: string;
};

const LoginDialog: React.FC<LoginDialogProps> = ({ children, className }) => {

    const router = useRouter();
    const serachParams = useSearchParams();
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const onSignIn = async (method: 'google' | 'github') => {
        setIsLoading(true);
        try {
            await signIn(method, {
                redirect: false
            });
            setOpenDialog(false);
        } catch (error) {
            console.log(error);
            toast({
                title: serachParams.get('error') || 'somethiong went wrong.',
                variant: "destructive",
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onLilkClick = (path: string) => {
        router.push(path);
        setOpenDialog(false);
    };

    return (
        <Dialog open={openDialog} onOpenChange={() => setOpenDialog(false)} >
            <div className={className} onClick={() => setOpenDialog(true)} >
                {children}
            </div>
            <DialogContent className="max-w-sm" >
                <DialogHeader>
                    <DialogTitle className="text-center" >Sign in</DialogTitle>
                    <DialogDescription className="text-center" >
                        To continue to the platform.
                    </DialogDescription>
                </DialogHeader>
                <div className="py-2 space-y-2" >
                    <Button
                        onClick={() => onSignIn('google')}
                        className={cn(
                            "w-full flex items-center justify-center gap-x-2",
                            isLoading && "cursor-not-allowed"
                        )}
                        variant={'outline'}
                        disabled={isLoading}
                    >
                        <FcGoogle className="mr-2 h-5 w-5" />
                        Continue with google
                    </Button>
                    <Button
                        onClick={() => onSignIn('github')}
                        className={cn(
                            "w-full flex items-center justify-center gap-x-2",
                            isLoading && "cursor-not-allowed"
                        )}
                        variant={'outline'}
                        disabled={isLoading}
                    >

                        <FaGithub className="mr-2 h-5 w-5 text-gray-800 dark:text-gray-200" />
                        Continue with github
                    </Button>
                </div>
                <DialogFooter>
                    <div className="text-xs text-gray-700 dark:text-gray-300 text-center">
                        By creating an account, you agree to our
                        {" "}
                        <span
                            onClick={() => onLilkClick(`/terms-and-conditions`)}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Terms of Service</span>
                        {" "}
                        and
                        {" "}
                        <span
                            onClick={() => onLilkClick(`/privacy-policy`)}
                            className="text-blue-500 hover:underline cursor-pointer"
                        >
                            Privacy Policy
                        </span>
                        .
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default LoginDialog;