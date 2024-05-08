import Link from "next/link";
import { redirect } from "next/navigation";
import {
    ArrowLeft,
    Calendar,
    CalendarPlus,
    CheckCheck,
    FolderGit2,
    Heading1,
    Image,
    LayoutList,
    LinkIcon,
    Text,
} from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user";
import Banner from "@/components/shared/Banner";
import ProjectActions from "@/components/dashboard/projects/ProjectActions";
import IconBadge from "@/components/shared/IconBadge";
import TitleForm from "@/components/dashboard/projects/TitleForm";
import DescriptionForm from "@/components/dashboard/projects/DescriptionForm";
import ImageForm from "@/components/dashboard/projects/ImageForm";
import CategoryForm from "@/components/dashboard/projects/CategoryForm";
import RepoForm from "@/components/dashboard/projects/RepoForm";
import ProjectUrlForm from "@/components/dashboard/projects/ProjectUrlFrom";
import IsCompleteForm from "@/components/dashboard/projects/IsCompleteForm";
import StartDateForm from "@/components/dashboard/projects/StartDateForm";
import EndDateForm from "@/components/dashboard/projects/EndDateForm";


export async function generateMetadata({ params }: { params: { projectId: string } }) {
    const project = await prisma.project.findUnique({
        where: {
            id: params.projectId,
        },
        select: {
            title: true,
        }
    })
    return {
        title: project?.title,
    };
};

const ProjectIdPage = async ({ params: { projectId } }: { params: { projectId: string } }) => {

    const user = await getCurrentUser();

    const project = await prisma.project.findUnique({
        where: {
            id: projectId,
            userId: user?.id,
        }
    });

    if (!project) {
        return redirect("/dashboard/projects");
    };

    const requiredFeilds = [
        project?.title,
        project?.description,
        project?.image,
        project?.category,
        project?.startDate,
    ];

    if (project?.isCompleted) {
        requiredFeilds.push(project?.endDate);
    };

    const totalFeilds = requiredFeilds.length;
    const completedFeilds = requiredFeilds.filter(Boolean).length;

    const completionText = `(${completedFeilds}/${totalFeilds})`;

    const isComplete = requiredFeilds.every(Boolean);

    return (
        <>
            {!project?.isPublished && (
                <Banner
                    label="This project is unpublished. it will not be visible in your portfolio."
                />
            )}
            <div className="p-6">
                <Link
                    href={`/dashboard/projects`}
                    className="flex items-center text-sm hover:opacity-75 transition mb-6"
                >
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to projects
                </Link>
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-y-2">
                        <h2 className="text-2xl font-medium">
                            Project setup
                        </h2>
                        <span className="text-sm text-slate-700 dark:text-slate-400" >
                            Required feilds {completionText}
                        </span>
                    </div>
                    <ProjectActions
                        disabled={!isComplete}
                        projectId={projectId}
                        userId={user?.id!}
                        isPublished={project?.isPublished!}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Heading1} />
                                <h2 className="text-lg" >
                                    Add Title
                                </h2>
                            </div>
                            <TitleForm
                                userId={user?.id!}
                                projectId={projectId}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LayoutList} />
                                <h2 className="text-lg" >
                                    Add Category
                                </h2>
                            </div>
                            <CategoryForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Text} />
                                <h2 className="text-lg" >
                                    Add description
                                </h2>
                            </div>
                            <DescriptionForm
                                userId={user?.id!}
                                projectId={projectId}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Image} />
                                <h2 className="text-lg" >
                                    Add image
                                </h2>
                            </div>
                            <ImageForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={FolderGit2} />
                                <h2 className="text-lg" >
                                    Repository URL (Optional)
                                </h2>
                            </div>
                            <RepoForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={LinkIcon} />
                                <h2 className="text-lg" >
                                    Project URL (Optional)
                                </h2>
                            </div>
                            <ProjectUrlForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CheckCheck} />
                                <h2 className="text-lg" >
                                    Project Completion
                                </h2>
                            </div>
                            <IsCompleteForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={CalendarPlus} />
                                <h2 className="text-lg" >
                                    Project start date
                                </h2>
                            </div>
                            <StartDateForm
                                projectId={projectId}
                                userId={user?.id!}
                                initialData={project}
                            />
                        </div>
                        {project?.isCompleted && (
                            <div>
                                <div className="flex items-center gap-x-2">
                                    <IconBadge icon={Calendar} />
                                    <h2 className="text-lg" >
                                        Project end date
                                    </h2>
                                </div>
                                <EndDateForm
                                    projectId={projectId}
                                    userId={user?.id!}
                                    initialData={project}
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProjectIdPage;