"use server";
import prisma from "@/lib/prisma";
import { getServerSession } from 'next-auth';

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
        return {
            message: 'Payment initiated successfully',
            success: true,
            premiumPrice: siteData?.premiumPrice,
        };
    } catch (error) {
        throw error;
    }
};


const verifyPaymentAction = async (paymentId: string, amount: number, provider: string, status: string, metadata: string) => {
    try {
        console.log("Payment data: ", paymentId, amount, provider, status, metadata);
        const session = await getServerSession();
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