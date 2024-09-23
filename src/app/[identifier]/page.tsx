import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import {
    FileText,
    Mail,
    Phone,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { redis } from "@/lib/redis";
import { Button } from "@/components/ui/button";
import SocialIcon from "@/components/site/SocialIcon";
import Description from "@/components/site/Description";
import SkillItem from "@/components/site/SkillItem";
import ProjectCard from "@/components/site/ProjectCard";
import ContactForm from "@/components/site/ContactForm";
import ShareButton from "@/components/site/ShareButton";

export async function generateMetadata({ params }: { params: { identifier: string } }) {
    let metadata: any;
    const chachedMetadata = await redis?.get(`metadata:${params.identifier}`);
    if (chachedMetadata) {
        metadata = await JSON.parse(chachedMetadata);
    } else {
        metadata = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: params.identifier },
                    { domain: params.identifier }
                ]
            },
            include: {
                userInfo: {
                    select: {
                        image: true,
                        heading: true,
                        keywords: true,
                        description: true,
                    }
                }
            }
        });
    };
    const isPremiumValid = (metadata?.isPremiumUser && new Date(metadata?.premiumExpiry!) > new Date());
    if (isPremiumValid) {
        await redis?.setex(`metadata:${params.identifier}`, 600, JSON.stringify(metadata));
    };
    const linkUrl = metadata?.domain ? `https://${metadata?.domain}` : `${process.env.NEXT_PUBLIC_APP_URL}/${metadata?.username}`;
    const metaDataObj: Metadata = {
        title: metadata?.username?.charAt(0).toUpperCase() + metadata?.username?.slice(1)!,
        description: metadata?.userInfo[0]?.description,
        keywords: metadata?.userInfo[0]?.keywords.toString(),
        openGraph: {
            title: metadata?.userInfo[0]?.heading!,
            description: metadata?.userInfo[0]?.heading!,
            images: [metadata?.userInfo[0]?.image!],
        },
        twitter: {
            card: "summary_large_image",
            title: metadata?.userInfo[0]?.heading!,
            description: metadata?.userInfo[0]?.heading!,
            images: [metadata?.userInfo[0]?.image!],
            creator: "@createportfolio",
        },
        metadataBase: new URL(linkUrl),
    };
    if (metadata?.customFavicon) {
        metaDataObj.icons = [metadata?.customFavicon];
    };
    return metaDataObj;
};

const UserSitePage = async ({ params }: { params: { identifier: string } }) => {

    let user: any;

    const chachedUser = await redis?.get(`user:${params.identifier}`);

    if (chachedUser) {
        user = await JSON.parse(chachedUser);
    } else {
        user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: params.identifier },
                    { domain: params.identifier }
                ]
            },
            include: {
                skills: {
                    select: {
                        id: true,
                        expertise: true,
                        skillName: true,
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
                socialUrls: {
                    select: {
                        id: true,
                        url: true,
                        provider: true,
                    },
                    orderBy: {
                        updatedAt: "desc",
                    },
                },
                projects: {
                    where: {
                        isPublished: true,
                    },
                    orderBy: {
                        updatedAt: "desc",
                    }
                },
                userInfo: {
                    where: {
                        isPublished: true
                    },
                },
            }
        });
    };

    if (!user || !user?.userInfo?.length || !user?.userInfo[0]?.isPublished) {
        return notFound();
    };

    const isPremiumValid = (user?.isPremiumUser && new Date(user?.premiumExpiry!) > new Date());

    if (params?.identifier === user?.domain && !isPremiumValid) {
        return notFound();
    };

    if (isPremiumValid) {
        await redis?.setex(`user:${params.identifier}`, 600, JSON.stringify(user));
    };

    const ip = (headers().get('x-forwarded-for') ?? '127.0.0.1');
    const alreadyViewed = await redis.get(`view:${user.id}:${ip}`);

    if (!alreadyViewed && ip) {
        await prisma.view.create({
            data: {
                userId: user.id,
                ipAddress: ip
            },
        });
        await redis.setex(`view:${user.id}:${ip}`, 86400, 'true');
    };

    const socialUrls = user?.socialUrls;
    const infoData = user?.userInfo[0];
    const projects = user?.projects;
    const skills = user?.skills;

    return (
        <div className="w-full flex flex-col">
            <section id="home" className="section w-full p-5 flex gap-5 lg:gap-0 flex-col-reverse lg:flex-row items-center relative" >
                <ShareButton className="absolute top-4 right-4 md:top-12 md:right-7 z-10" />
                <div className="w-full h-full flex flex-col justify-center">
                    <h1 className="text-2xl lg:text-3xl font-semibold text-sky-500 py-2" >{infoData?.heading}</h1>
                    <h3 className="text-xs lg:text-sm font-semibold text-gray-700 dark:text-gray-500" >{infoData?.subHeading}</h3>
                    <p className="hidden lg:block text-base dark:text-gray-100 mt-5" >{infoData?.description}</p>
                    <Description description={infoData?.description!} />
                    <div className="w-full mt-3 lg:mt-5 flex justify-start items-center">
                        <h4 className="text-base lg:text-lg font-semibold text-sky-600" >Connect with me -</h4>
                    </div>
                    <div className="w-full mt-4 flex flex-col lg:flex-row lg:flex-wrap gap-4 lg:items-center">
                        {infoData?.phone && (
                            <div className="w-full lg:w-auto flex items-center">
                                <Phone className="mr-2 h-5 w-5" />
                                <p className="text-base">{infoData?.phone}</p>
                            </div>
                        )}
                        <div className="w-full lg:w-auto flex items-center">
                            <Mail className="mr-2 h-5 w-5" />
                            <p className="text-base">{infoData?.email}</p>
                        </div>
                        {infoData?.resume && (
                            <Link href={infoData?.resume!} target="_blank" >
                                <Button className="w-full lg:w-auto bg-sky-500 dark:text-gray-100 transition-all hover:bg-sky-600 active:scale-95" >
                                    <FileText className="mr-2 h-5 w-5" />
                                    Resume
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
                <div className="w-full h-full flex flex-col justify-center items-center">
                    <Link href={infoData?.image!} target="_blank" >
                        <Image
                            height={500}
                            width={500}
                            src={infoData?.image!}
                            alt="Profile"
                            className="my-0 aspect-square mx-auto rounded-full border-2 border-sky-500/50"
                        />
                    </Link>
                    <div className="mt-5 lg:mt-10 w-full flex flex-wrap justify-center items-center gap-5">
                        {socialUrls?.map((socialUrl: any) => (
                            <Link key={socialUrl?.id} href={socialUrl?.url} target="_blank" >
                                <SocialIcon provider={socialUrl?.provider} />
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
            {skills?.length > 0 && (
                <section id="skills" className="section w-full" >
                    <div className="w-full flex flex-col p-4 gap-4" >
                        <h4 className="text-lg lg:text-xl font-semibold text-sky-500" >Skills -</h4>
                        <div className="w-full flex items-center lg:justify-center gap-2 lg:gap-4 flex-wrap border shadow-sm p-4 rounded-lg">
                            {skills?.map((skill: any) => (
                                <SkillItem key={skill?.id} skillName={skill?.skillName} expertise={skill?.expertise} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            {projects?.length > 0 && (
                <section id="projects" className="section w-full" >
                    <div className="w-full flex flex-col p-4 gap-4" >
                        <h4 className="text-lg lg:text-xl font-semibold text-sky-500" >Projects -</h4>
                        <div className="w-full grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-2 lg:gap-4 border shadow-sm p-4 rounded-lg">
                            {projects?.map((project: any) => (
                                <ProjectCard username={user?.username!} key={project.id} project={project} />
                            ))}
                        </div>
                    </div>
                </section>
            )}
            <section id="contact" className="section w-full" >
                <div className="w-full flex flex-col p-4 gap-4" >
                    <h4 className="text-lg lg:text-xl font-semibold text-sky-500" >Contact -</h4>
                    <div className="w-full flex justify-center items-center border shadow-sm p-4 rounded-lg">
                        <ContactForm email={infoData?.email!} />
                    </div>
                </div>
            </section>
        </div>
    );
};

export default UserSitePage;