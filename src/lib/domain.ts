import {
    DomainResponse,
    DomainConfigResponse,
    DomainVerificationResponse,
} from "@/lib/types";

const projectId = process.env.PROJECT_ID_VERCEL as string;
const teamId = process.env.TEAM_ID_VERCEL as string;
const authToken = `Bearer ${process.env.AUTH_BEARER_TOKEN as string}`;

const addDomainToVercel = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v10/projects/${projectId}/domains?teamId=${teamId}`,
        {
            method: "POST",
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: domain }),
        },
    ).then((res) => res.json());
};

const removeDomainFromVercelProject = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains/${domain}?teamId=${teamId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: authToken,
            },
        },
    ).then((res) => res.json());
};

const removeDomainFromVercelTeam = async (domain: string) => {
    return await fetch(`https://api.vercel.com/v6/domains/${domain}?teamId=${teamId}`,
        {
            method: "DELETE",
            headers: {
                Authorization: authToken,
            },
        },
    ).then((res) => res.json());
};

const getDomainResponse = async (domain: string): Promise<DomainResponse & { error: { code: string; message: string } }> => {
    return await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains/${domain}?teamId=${teamId}`,
        {
            method: "GET",
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        },
    ).then((res) => res.json());
};

const getConfigResponse = async (domain: string): Promise<DomainConfigResponse> => {
    return await fetch(`https://api.vercel.com/v6/domains/${domain}/config?teamId=${teamId}`,
        {
            method: "GET",
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        },
    ).then((res) => res.json());
};

const verifyDomain = async (domain: string): Promise<DomainVerificationResponse> => {
    return await fetch(`https://api.vercel.com/v9/projects/${projectId}/domains/${domain}/verify?teamId=${teamId}`,
        {
            method: "POST",
            headers: {
                Authorization: authToken,
                "Content-Type": "application/json",
            },
        },
    ).then((res) => res.json());
};

const getSubdomain = (name: string, apexName: string) => {
    if (name === apexName) return null;
    return name.slice(0, name.length - apexName.length - 1);
};

const validDomainRegex = new RegExp(/^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/);

export {
    addDomainToVercel,
    removeDomainFromVercelProject,
    removeDomainFromVercelTeam,
    getDomainResponse,
    getConfigResponse,
    verifyDomain,
    getSubdomain,
    validDomainRegex,
};