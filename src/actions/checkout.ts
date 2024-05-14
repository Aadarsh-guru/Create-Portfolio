"use server";
import { getServerSession } from 'next-auth';
import Stripe from "stripe";
import JWT from "jsonwebtoken";
import prisma from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const checkoutAction = async () => {
    try {
        const siteData = await prisma.siteData.findFirst({
            select: {
                premiumPrice: true,
            }
        });
        if (!siteData) {
            return {
                message: "Something went wrong.",
                success: false,
            };
        };
        const session = await getServerSession();
        if (!siteData?.premiumPrice || siteData?.premiumPrice === 0) {
            await prisma.user.update({
                where: {
                    email: session?.user?.email!
                },
                data: {
                    isPremiumUser: true,
                    premiumExpiry: new Date(Date.now() + 31536000000),
                }
            });
            return {
                message: "Premium subscription activated.",
                success: true,
                isFree: true,
            };
        };
        const token = await JWT.sign({ email: session?.user?.email! }, process.env.STRIPE_SECRET_KEY!, { expiresIn: 500 });
        const stripeSession = await stripe.checkout.sessions.create({
            line_items: [
                {
                    price_data: {
                        currency: "inr",
                        product_data: {
                            name: "Premium subscription",
                        },
                        unit_amount: siteData?.premiumPrice * 100,
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            customer_email: session?.user?.email!,
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/customize?token=${token}`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/customize?error=Payment failed`,
        });
        if (stripeSession?.status !== "open" || !stripeSession) {
            return {
                message: "Something went wrong.",
                success: false,
            };
        }
        return {
            message: 'Payment initiated successfully',
            success: true,
            url: stripeSession?.url,
        };
    } catch (error) {
        throw error;
    }
};


const verifyPaymentAction = async (token: string) => {
    try {
        if (!token) {
            return {
                success: false,
                message: "Payment verification failed."
            }
        }
        const session = await getServerSession();
        const isVerified = await JWT.verify(token, process.env.STRIPE_SECRET_KEY!);
        if (!isVerified) {
            return {
                success: false,
                message: "Payment verification failed."
            }
        }
        const siteData = await prisma.siteData.findFirst({
            select: {
                premiumPrice: true,
            }
        });
        const user = await prisma.user.update({
            where: {
                email: session?.user?.email!
            },
            data: {
                isPremiumUser: true,
                premiumExpiry: new Date(Date.now() + 31536000000),
            }
        });
        await prisma.purchase.create({
            data: {
                userId: user?.id!,
                price: siteData?.premiumPrice!,
            }
        });
        return {
            success: true,
            message: "Premium subscription activated.",
        };
    } catch (error) {
        throw error;
    }
};


export {
    checkoutAction,
    verifyPaymentAction,
};