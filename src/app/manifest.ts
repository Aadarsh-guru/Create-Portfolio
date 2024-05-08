import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: process.env.NEXT_PUBLIC_APP_NAME as string,
        short_name: process.env.NEXT_PUBLIC_APP_NAME as string,
        description: process.env.NEXT_PUBLIC_APP_DESCRIPTION as string,
        start_url: '/',
        display: 'standalone',
        background_color: '#fff',
        theme_color: '#fff',
        icons: [
            {
                src: '/favicon.ico',
                sizes: 'any',
                type: 'image/x-icon',
            },
        ],
    };
};