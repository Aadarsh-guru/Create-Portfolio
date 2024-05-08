import Link from "next/link";
import { cn } from "@/lib/utils";

const Footer = ({ isPremiumUser, username }: { isPremiumUser?: boolean, username?: string }) => {

    const currentYear = new Date().getFullYear();

    return (
        <div
            className={cn(
                "w-full h-max lg:h-16 flex flex-col gap-5 lg:flex-row justify-between items-start lg:items-center px-5 py-5 lg:py-0 md:px-10",
                isPremiumUser && "justify-center flex-row"
            )}
        >
            {!isPremiumUser && (
                <>
                    <p className="text-xs text-gray-500 font-semibold" >© {currentYear} {process.env?.NEXT_PUBLIC_APP_NAME} All rights reserved.</p>
                    <div className="flex gap-5 flex-col lg:flex-row items-start lg:items-center gap-x-5">
                        <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/about'} >About</Link>
                        <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/contact'} >Contact</Link>
                        <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/terms-and-conditions'} >Terms of Service</Link>
                        <Link className="text-xs text-gray-500 font-semibold hover:underline" href={'/privacy-policy'} >Privacy Policy</Link>
                    </div>
                </>
            )}
            {isPremiumUser && (
                <p className="text-xs text-gray-500 font-semibold" >© {currentYear} {username?.charAt(0).toUpperCase() + username?.slice(1)!} All rights reserved.</p>
            )}
        </div>
    );
};

export default Footer;