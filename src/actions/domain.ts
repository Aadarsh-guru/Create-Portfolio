"use server";
import prisma from "@/lib/prisma";
import { DomainVerificationStatusProps } from "@/lib/types";
import {
    addDomainToVercel,
    getConfigResponse,
    getDomainResponse,
    verifyDomain,
    removeDomainFromVercelProject,
    validDomainRegex,
    removeDomainFromVercelTeam,
} from "@/lib/domain";
import { invalidateChache } from "@/lib/redis";


const verifyDomainAction = async (domain: string) => {
    try {
        let status: DomainVerificationStatusProps;
        const [domainJson, configJson] = await Promise.all([
            getDomainResponse(domain),
            getConfigResponse(domain),
        ]);
        if (domainJson?.error?.code === "not_found") {
            // domain not found on Vercel project
            status = "Domain Not Found";
            // unknown error
        } else if (domainJson.error) {
            status = "Unknown Error";
            // if domain is not verified, we try to verify now
        } else if (!domainJson.verified) {
            status = "Pending Verification";
            const verificationJson = await verifyDomain(domain);
            // domain was just verified
            if (verificationJson && verificationJson.verified) {
                status = "Valid Configuration";
            }
        } else if (configJson.misconfigured) {
            status = "Invalid Configuration";
        } else {
            status = "Valid Configuration";
        }
        return {
            success: true,
            status,
            domainJson,
        };
    } catch (error) {
        throw error;
    }
};


const addDomainAction = async (userId: string, domain: string) => {
    try {
        if (domain.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
            return {
                success: false,
                message: "Cannot add root domain"
            };
        };
        if (!validDomainRegex.test(domain)) {
            return {
                success: false,
                message: "Invalid domain"
            };
        };
        await addDomainToVercel(domain);
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                domain: domain
            },
        });
        await invalidateChache(user);
        return {
            success: true,
            message: "Domain added successfully",
        };
    } catch (error) {
        throw error;
    }
};


const removeDomainAction = async (userId: string, domain: string) => {
    try {
        await Promise.all([
            removeDomainFromVercelProject(domain),
            removeDomainFromVercelTeam(domain),
        ]);
        const user = await prisma.user.update({
            where: {
                id: userId
            },
            data: {
                domain: null
            },
        });
        await invalidateChache(user);
        return {
            success: true,
            message: "Domain removed successfully",
        };
    } catch (error) {
        throw error;
    }
};


export {
    verifyDomainAction,
    addDomainAction,
    removeDomainAction,
};