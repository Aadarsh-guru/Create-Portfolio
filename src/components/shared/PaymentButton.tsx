"use client";
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Loader2 } from "lucide-react";
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from "@/components/ui/button";
import { toast } from '@/components/ui/use-toast';
import { PayPalButtons } from "@paypal/react-paypal-js";
import { checkoutAction, verifyPaymentAction } from '@/actions/checkout';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface PaymentButtonProps {
    text: string;
    className?: string;
};

const PaymentButton: React.FC<PaymentButtonProps> = ({ text, className }) => {

    const router = useRouter();
    const session = useSession();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [premiumPrice, setPremiumPrice] = useState<number>(0);

    const handleCheckout = async () => {
        if (session.status !== 'authenticated') {
            return toast({
                title: "Please login to continue.",
            });
        }
        setLoading(true);
        try {
            const { success, message, isFree, premiumPrice } = await checkoutAction();
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
            };
            if (premiumPrice) {
                setPremiumPrice(premiumPrice);
                setOpen(true);
            };
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

    const handleCreateOrder = (_: any, actions: any) => {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: premiumPrice,
                    currency_code: "USD"
                },
                description: "Premium Plan Payment.",
            }],
            application_context: {
                shipping_preference: "NO_SHIPPING",
            },
            intent: "CAPTURE",
        });
    };

    const handleOnApprove = async (_: any, actions: any) => {
        try {
            const details = await actions?.order?.capture();
            if (details.status === "COMPLETED") {
                setLoading(true);
                // Call the API route instead of the server action
                const result = await verifyPaymentAction(
                    details.id,
                    details.purchase_units[0].amount.value,
                    "paypal", details.status,
                    JSON.stringify(details)
                );
                if (result.success) {
                    toast({
                        title: result.message,
                    });
                    router.refresh();
                    setOpen(false);
                } else {
                    toast({
                        variant: "destructive",
                        title: result.message,
                    });
                };
            } else {
                toast({
                    variant: "destructive",
                    title: "Payment was not successful. Please try again.",
                });
                console.error("Payment not completed. Status:", details.status);
            };
        } catch (error) {
            toast({
                variant: "destructive",
                title: "There was a problem processing your payment. Please try again.",
            });
            console.error("Error on OnApprove: ", error);
        } finally {
            setLoading(false);
            setOpen(false);
        }
    };

    const handleOnError = (error: any) => {
        toast({
            variant: "destructive",
            title: "There was a problem processing your payment. Please try again.",
        });
        console.error("PayPal error:", error);
        setOpen(false);
    };

    const handleOnCancel = () => {
        toast({
            variant: "destructive",
            title: "Your payment was cancelled. Please try again.",
        });
        setOpen(false);
    };

    return (
        <>
            <Button
                type="button"
                className={cn('w-full bg-sky-600 text-white transition-all hover:bg-sky-500 active:scale-[98%]', className)}
                onClick={handleCheckout}
                disabled={loading}
            >
                {loading ? (
                    <>
                        <Loader2 className="h-4 w-4 animate-spin mr-2" />
                        Processing..
                    </>
                ) : text}
            </Button>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[425px] border-2 border-primary/10">
                    <DialogHeader>
                        <DialogTitle>Complete Payment</DialogTitle>
                        <DialogDescription>
                            Pay securely using PayPal or your credit/debit card.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4">
                        {loading ? (
                            <Button disabled className="w-full flex justify-center items-center p-4 bg-sky-600 hover:bg-sky-500 text-white">
                                <Loader2 className='animate-spin size-5 mr-2' />
                                Processing...
                            </Button>
                        ) : (
                            <PayPalButtons
                                onError={handleOnError}
                                onCancel={handleOnCancel}
                                onApprove={handleOnApprove}
                                createOrder={handleCreateOrder}
                                style={{ layout: "vertical" }}
                            />
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default PaymentButton;