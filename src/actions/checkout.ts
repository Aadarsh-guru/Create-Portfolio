"use server";
import { getServerSession } from 'next-auth';
import prisma from "@/lib/prisma";

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
        if (!siteData?.premiumPrice || siteData?.premiumPrice === 0) {
            const session = await getServerSession();
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
                    userId: user?.id,
                    price: siteData?.premiumPrice
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
            url: "",
        };
    } catch (error) {
        throw error;
    }
};


export {
    checkoutAction,
};