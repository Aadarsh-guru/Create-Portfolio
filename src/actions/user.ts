"use server";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { deleteMediaAction } from "./media";


const createUsernameAction = async ({ username }: { username: string }) => {
    try {
        const session = await getServerSession();
        if (!session) {
            return {
                success: false,
                message: "You are not logged in",
            }
        }
        const isUsernameExist = await prisma.user.findUnique({
            where: {
                username,
                NOT: {
                    email: session.user?.email!,
                }
            }
        });
        if (isUsernameExist) {
            return {
                success: false,
                message: "Username already exist",
            }
        }
        const user = await prisma.user.update({
            where: {
                email: session.user?.email!
            },
            data: {
                username,
            },
        });
        return {
            success: true,
            message: "Username created successfully.",
            username: user.username,
        };
    } catch (error) {
        throw error;
    }
};


const getCurrentUser = async () => {
    try {
        const session = await getServerSession();
        if (!session) {
            return null;
        }
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session?.user?.email!
            },
        });
        return currentUser;
    } catch (error) {
        throw error;
    }
};


const deleteUserAccountAction = async (userId: string, email: string) => {
    try {
        const user = await prisma.user.delete({
            where: {
                id: userId,
                email,
            },
            include: {
                projects: {
                    select: {
                        image: true
                    }
                },
                userInfo: {
                    select: {
                        image: true,
                        resume: true,
                    }
                }
            }
        });

        await deleteMediaAction(user.userInfo[0]?.image!);
        await deleteMediaAction(user.userInfo[0]?.resume!);

        user?.projects?.map(async ({ image }) => {
            try {
                await deleteMediaAction(image!);
            } catch (error) {
                throw error;
            }
        })
        return {
            success: true,
            message: "Account deleted successfully",
            user,
        }
    } catch (error) {
        throw error;
    }
};


export {
    createUsernameAction,
    getCurrentUser,
    deleteUserAccountAction,
};
