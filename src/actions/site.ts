"use server";
import prisma from "@/lib/prisma";

const editSiteDataAction = async (values: any) => {
    try {
        const siteData = await prisma.siteData.findFirst();
        if (siteData) {
            await prisma.siteData.update({
                where: {
                    id: siteData.id,
                },
                data: {
                    ...values,
                },
            });
        } else {
            await prisma.siteData.create({
                data: {
                    ...values,
                },
            });
        };
        return {
            success: true,
            message: "Site data updated successfully",
        };
    } catch (error) {
        throw error;
    }
};


export {
    editSiteDataAction,
};