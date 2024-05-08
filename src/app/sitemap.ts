import { MetadataRoute } from 'next';
import { headers } from "next/headers";
import prisma from '@/lib/prisma';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    const headersList = headers();
    const hostname = headersList.get("host");
    const protocol = headersList.get("x-forwarded-proto");
    const appUrl = process.env.NEXT_PUBLIC_APP_URL as string;
    const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN as string;

    let tenentData: any = null;

    if (!hostname?.includes(rootDomain)) {
        tenentData = await prisma?.user?.findUnique({
            where: {
                domain: hostname as string,
            },
            include: {
                projects: {
                    where: {
                        isPublished: true,
                    },
                    select: {
                        id: true,
                    },
                },
            },
        });
    };

    const tanentSitemapData: MetadataRoute.Sitemap = [
        {
            url: `${protocol}://${hostname}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
    ];

    if (tenentData) {
        const additionalSitemapData = tenentData?.projects?.map((project: any) => ({
            url: `${protocol}://${hostname}/projects/${project?.id}`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        }))
        tanentSitemapData.push(...additionalSitemapData);
    };

    const rootSitemapData: MetadataRoute.Sitemap = [
        {
            url: `${appUrl}`,
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 1,
        },
        {
            url: `${appUrl}/about`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${appUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
        {
            url: `${appUrl}/privacy-policy`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${appUrl}/terms-and-conditions`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
    ];

    return (hostname === rootDomain) ? rootSitemapData : tanentSitemapData;
};