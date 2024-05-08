"use server";
import { SocialProviderEnum } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user";
import { invalidateChache } from "@/lib/redis";


const createSocialLinkAction = async ({ url, provider }: { url: string, provider: SocialProviderEnum }) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: "You are not logged in",
            }
        }
        const socialUrl = await prisma.socialUrl.create({
            data: {
                userId: user?.id,
                url,
                provider
            }
        });
        await invalidateChache(user);
        return {
            success: true,
            message: "Social link added.",
            socialUrl,
        };
    } catch (error) {
        throw error;
    }
};


const editSocialLinkAction = async ({ socialId, url, provider }: { socialId: string, url: string, provider: SocialProviderEnum }) => {
    try {
        const socialUrl = await prisma.socialUrl.update({
            where: {
                id: socialId
            },
            data: {
                url,
                provider,
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Social link updated.",
            socialUrl,
        };
    } catch (error) {
        throw error;
    }
};


const deleteSocialLinkAction = async ({ socialId }: { socialId: string }) => {
    try {
        const socialUrl = await prisma.socialUrl.delete({
            where: {
                id: socialId
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Social link deleted.",
            socialUrl,
        };
    } catch (error) {
        throw error;
    }
};


export {
    createSocialLinkAction,
    editSocialLinkAction,
    deleteSocialLinkAction,
};