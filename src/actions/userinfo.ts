"use server";
import prisma from "@/lib/prisma";
import { deleteMediaAction } from "./media";
import { invalidateChache } from "@/lib/redis";

const updateUserInfoAction = async (userId: string, userInfoId: string, values: any) => {
    try {

        if (values.image) {
            const previousImage = await prisma.userInfo.findUnique({
                where: {
                    id: userInfoId,
                    userId,
                },
                select: {
                    image: true,
                }
            });
            if (previousImage?.image) {
                await deleteMediaAction(previousImage.image);
            }
        }

        if (values.resume) {
            const previousImage = await prisma.userInfo.findUnique({
                where: {
                    id: userInfoId,
                    userId,
                },
                select: {
                    resume: true,
                }
            });
            if (previousImage?.resume) {
                await deleteMediaAction(previousImage.resume);
            }
        }
        const userInfo = await prisma.userInfo.update({
            where: {
                id: userInfoId,
                userId: userId,
            },
            data: {
                ...values,
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Info updated successfully",
            userInfo,
        };
    } catch (error) {
        throw error;
    }
};


const publishUserInfoAction = async (userId: string, userInfoId: string) => {
    try {
        const userInfo = await prisma.userInfo.update({
            where: {
                id: userInfoId,
                userId: userId,
            },
            data: {
                isPublished: true,
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Info published successfully",
            userInfo,
        };
    } catch (error) {
        throw error;
    }
};


const unpublishUserInfoAction = async (userId: string, userInfoId: string) => {
    try {
        const userInfo = await prisma.userInfo.update({
            where: {
                id: userInfoId,
                userId: userId,
            },
            data: {
                isPublished: false,
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Info unpublished successfully",
            userInfo,
        };
    } catch (error) {
        throw error;
    }
};



export {
    updateUserInfoAction,
    publishUserInfoAction,
    unpublishUserInfoAction,
};