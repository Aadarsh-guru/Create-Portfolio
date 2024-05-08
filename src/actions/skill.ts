"use server";
import { SkillEnum } from "@prisma/client";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "./user";
import { invalidateChache } from "@/lib/redis";


const createSkillAction = async ({ skillName, expertise }: { skillName: string, expertise: SkillEnum }) => {
    try {
        const user = await getCurrentUser();
        if (!user) {
            return {
                success: false,
                message: "You are not logged in",
            }
        }
        const skill = await prisma.skill.create({
            data: {
                userId: user?.id,
                skillName,
                expertise,
            }
        });
        await invalidateChache(user);
        return {
            success: true,
            message: "Skill created",
            skill,
        };
    } catch (error) {
        throw error;
    }
};


const editSkillAction = async ({ skillId, skillName, expertise }: { skillId: string, skillName: string, expertise: SkillEnum }) => {
    try {
        const skill = await prisma.skill.update({
            where: {
                id: skillId
            },
            data: {
                skillName,
                expertise,
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Skill updated",
            skill,
        };
    } catch (error) {
        throw error;
    }
};


const deleteSkillAction = async ({ skillId }: { skillId: string }) => {
    try {
        const skill = await prisma.skill.delete({
            where: {
                id: skillId
            }
        });
        await invalidateChache();
        return {
            success: true,
            message: "Skill deleted",
            skill,
        };
    } catch (error) {
        throw error;
    }
};


export {
    createSkillAction,
    editSkillAction,
    deleteSkillAction,
};