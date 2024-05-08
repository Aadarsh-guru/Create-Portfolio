import { AuthOptions } from "next-auth";
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import prisma from '@/lib/prisma';

const authOptions: AuthOptions = {
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
    callbacks: {
        async signIn({ user }) {
            try {
                if (user?.email) {
                    const exist = await prisma.user.findUnique({
                        where: {
                            email: user?.email
                        }
                    });
                    if (!exist) {
                        await prisma.user.create({
                            data: {
                                name: user?.name!,
                                email: user?.email,
                                image: user?.image!,
                            }
                        });
                        try {
                        } catch (error) {
                            console.log(error);
                        }
                    };
                    return true;
                } else {
                    return false
                }
            } catch (error: any) {
                return false;
            }
        },
    },
    pages: {
        error: '/',
        signIn: '/',
        signOut: '/',
    },
};

export default authOptions;