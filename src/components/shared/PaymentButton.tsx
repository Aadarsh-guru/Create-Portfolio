"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { checkoutAction } from '@/actions/checkout';
import { cn } from '@/lib/utils';

interface PaymentButtonProps {
    text: string;
    className?: string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ text, className }) => {

    const session = useSession();
    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(false);

    const handleCheckout = async () => {
        if (session.status !== 'authenticated') {
            return toast({
                title: "Please login to continue.",
            });
        }
        setLoading(true);
        try {
            const { success, message, isFree, url } = await checkoutAction();
            if (!success) {
                return toast({
                    title: "Something went wrong.",
                    variant: "destructive",
                });
            }
            if (isFree) {
                router.refresh();
                return toast({
                    title: message,
                });
            }
            if (url) {
                router.push(url);
            }
            return toast({ title: message });
        } catch (error: any) {
            console.log(error);
            return toast({
                title: error.message,
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Button
            type="button"
            className={cn(
                'w-full bg-sky-600 text-white transition-all hover:bg-sky-500 active:scale-[98%]',
                className,
            )}
            onClick={handleCheckout}
            disabled={loading}
        >
            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    {loading && 'Processing..'}
                </>
            ) : (
                <>
                    {text}
                </>
            )}
        </Button>
    );
};

export default PaymentButton;