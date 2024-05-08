import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {

    const sitemapUrl = `${process.env.NEXT_PUBLIC_APP_URL}/sitemap.xml`;

    if (!sitemapUrl || !sitemapUrl.startsWith('https://') || !sitemapUrl.endsWith('.xml')) {
        console.warn('Invalid sitemap URL in robots.txt. Sitemap is not included.');
        return { rules: { userAgent: '*', allow: '/' } };
    };

    return {
        rules: [
            { userAgent: '*', allow: '/' },
            { userAgent: '*', disallow: ['/admin/', '/dashboard/'] },
        ],
        sitemap: sitemapUrl,
    };
};