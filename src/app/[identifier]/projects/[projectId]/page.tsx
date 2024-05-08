import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    CheckCircle,
    Clock,
    ExternalLink,
    FolderGit2,
} from "lucide-react";
import { format } from "date-fns";
import prisma from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import TooltipContainer from "@/components/shared/TooltipContainer";
import Preview from "@/components/dashboard/projects/Preview";
import IconBadge from "@/components/shared/IconBadge";
import { cn } from "@/lib/utils";
import BackButton from "@/components/site/BackButton";

export async function generateMetadata({ params }: { params: { projectId: string } }) {
    const projectMetadata = await prisma.project.findUnique({
        where: {
            id: params.projectId,
        },
        select: {
            title: true,
        }
    });
    return {
        title: projectMetadata?.title,
    };
};

const SiteProjectId = async ({ params }: { params: { projectId: string, identifier: string } }) => {

    const project = await prisma.project.findUnique({
        where: {
            id: params.projectId,
        },
    });

    if (!project) {
        return notFound();
    };

    return (
        <div className="p-6">
            <div className="flex items-center justify-between">
                <TooltipContainer content="Go back">
                    <BackButton />
                </TooltipContainer>
                <div className="flex items-center gap-x-2">
                    {project?.projectUrl && (
                        <TooltipContainer content="Project URL" >
                            <Link href={project?.projectUrl!} target="_blank" >
                                <Button variant={'outline'} size={'icon'} >
                                    <ExternalLink className="h-5 w-5 text-sky-700" />
                                </Button>
                            </Link>
                        </TooltipContainer>
                    )}
                    {project?.repoUrl && (
                        <TooltipContainer content="Repo URL" >
                            <Link href={project?.repoUrl!} target="_blank">
                                <Button variant={'outline'} size={'icon'} >
                                    <FolderGit2 className="h-5 w-5 text-sky-700" />
                                </Button>
                            </Link>
                        </TooltipContainer>
                    )}
                </div>
            </div>
            <div className="mt-5 w-full">
                <div className="relative aspect-video rounded-lg shadow-sm border">
                    <Image
                        src={project?.image!}
                        className="object-cover rounded-lg"
                        alt="course-image"
                        fill
                    />
                </div>
                <h1 className="text-2xl font-bold mt-4 text-sky-700">{project?.title}</h1>
                <div className="mt-4 w-full flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                    <div className="flex items-center gap-x-1">
                        <TooltipContainer content={project?.isCompleted ? "Project completed." : "Not completed yet."} >
                            <IconBadge variant={project?.isCompleted ? 'success' : 'default'} size="default" icon={project?.isCompleted ? CheckCircle : Clock} />
                        </TooltipContainer>
                        <span className={cn(
                            "text-lg font-medium text-slate-700",
                            project?.isCompleted && "text-emerald-700"
                        )} >
                            {project?.isCompleted ? "Completed" : "In progress"}
                        </span>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <TooltipContainer content={project?.isCompleted ? "Completed date" : "Start date"} >
                            <IconBadge size="default" icon={Calendar} />
                        </TooltipContainer>
                        <span className={cn(
                            "text-lg font-medium text-slate-700",
                            project?.isCompleted && "text-sky-500"
                        )} >
                            {project?.isCompleted ? format(project?.endDate!, "PPP") : format(project?.startDate!, "PPP")}
                        </span>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="w-full flex items-center">
                        <h4 className="text-lg lg:text-xl font-semibold text-sky-500" >Description -</h4>
                    </div>
                    <div className="mt-4">
                        <Preview
                            value={project?.description!}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteProjectId;