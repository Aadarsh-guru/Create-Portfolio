"use server";
import prisma from "@/lib/prisma";
import { deleteMediaAction } from "./media";
import { getCurrentUser } from "./user";
import { invalidateChache } from "@/lib/redis";

const createProjectModel = async ({ title, category }: { title: string, category: string }) => {
    try {
        const user = await getCurrentUser();
        const project = await prisma.project.create({
            data: {
                title,
                userId: user?.id!,
                category,
            },
        });
        await invalidateChache(user!);
        return {
            success: true,
            message: "Project created successfully",
            project,
        };
    } catch (error) {
        throw error;
    }
};


const updateProjectAction = async (projectId: string, userId: string, values: any) => {
    try {
        if (values.image) {
            const previousImage = await prisma.project.findUnique({
                where: {
                    id: projectId,
                    userId,
                },
                select: {
                    image: true,
                }
            });
            await deleteMediaAction(previousImage?.image!);
        };
        const project = await prisma.project.update({
            where: {
                id: projectId,
                userId,
            },
            data: {
                ...values
            }
        });
        if (values?.isCompleted && !project?.endDate && project?.isPublished) {
            await prisma.project.update({
                where: {
                    id: projectId,
                    userId,
                },
                data: {
                    isPublished: false,
                }
            });
        };
        await invalidateChache();
        return {
            success: true,
            message: "Project updated successfully",
            project,
        };
    } catch (error) {
        throw error;
    }
};


const deleteProjectAction = async (projectId: string, userId: string) => {
    try {
        const project = await prisma.project.delete({
            where: {
                id: projectId,
                userId,
            }
        });
        await deleteMediaAction(project.image!);
        await invalidateChache();
        return {
            success: true,
            message: "Project deleted successfully",
            project,
        };
    } catch (error) {
        throw error;
    }
};


const publishProjectAction = async (projectId: string, userId: string) => {
    try {
        const project = await prisma.project.update({
            where: {
                id: projectId,
                userId,
            },
            data: {
                isPublished: true,
            },
        });
        await invalidateChache();
        return {
            success: true,
            message: "Project published successfully",
            project,
        };
    } catch (error) {
        throw error;
    }
};


const unpublishProjectAction = async (projectId: string, userId: string) => {
    try {
        const project = await prisma.project.update({
            where: {
                id: projectId,
                userId,
            },
            data: {
                isPublished: false,
            },
        });
        await invalidateChache();
        return {
            success: true,
            message: "Project unpublished successfully",
            project,
        };
    } catch (error) {
        throw error;
    }
};


export {
    createProjectModel,
    updateProjectAction,
    deleteProjectAction,
    publishProjectAction,
    unpublishProjectAction,
};