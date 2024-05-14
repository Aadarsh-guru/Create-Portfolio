"use client";
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { checkoutAction, verifyPaymentAction } from '@/actions/checkout';
import { cn } from '@/lib/utils';

interface PaymentButtonProps {
    text: string;
    className?: string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ text, className }) => {

    const router = useRouter();
    const session = useSession();
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const paymentError = searchParams.get('error');
    const [loading, setLoading] = useState<boolean>(false);
    const [veryfying, setVeryfying] = useState<boolean>(false);

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
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something went wrong!",
                variant: 'destructive',
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (token) {
            setVeryfying(true);
            verifyPaymentAction(token)
                .then(({ success, message }) => {
                    if (success) {
                        router.refresh();
                        return toast({
                            title: message,
                        });
                    } else {
                        return toast({
                            title: message,
                            variant: "destructive",
                        });
                    }
                })
                .catch((error: any) => {
                    console.log(error);
                    return toast({
                        title: "Something went wrong!",
                        variant: "destructive",
                    });
                })
                .finally(() => {
                    setLoading(false);
                    setVeryfying(false);
                });
        }
        if (paymentError) {
            toast({
                title: paymentError,
                variant: "destructive",
            });
        };
    }, [token, paymentError, router]);

    return (
        <Button
            type="button"
            className={cn('w-full bg-sky-600 text-white transition-all hover:bg-sky-500 active:scale-[98%]', className)}
            onClick={handleCheckout}
            disabled={loading || veryfying}
        >
            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Processing..
                </>
            ) : veryfying ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Verifying..
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