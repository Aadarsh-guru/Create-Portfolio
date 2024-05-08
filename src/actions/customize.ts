"use server";
import prisma from "@/lib/prisma";
import { deleteMediaAction } from "./media";
import { invalidateChache } from "@/lib/redis";

const customizeAction = async (userId: string, values: any) => {
    try {
        const user = await prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user?.isPremiumUser) {
            return {
                success: false,
                message: "Unauthorized.",
            };
        }
        if (values?.customFavicon && user?.customFavicon) {
            await deleteMediaAction(user?.customFavicon);
        };
        if (values?.customLogo && user?.customLogo) {
            await deleteMediaAction(user?.customLogo);
        };
        await prisma.user.update({
            where: { id: userId },
            data: { ...values },
        });
        await invalidateChache(user);
        return {
            success: true,
            message: "Updated successfully.",
        };
    } catch (error) {
        throw error;
    }
};

export {
    customizeAction,
};