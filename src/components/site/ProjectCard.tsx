import Link from "next/link";
import Image from "next/image";
import { Project } from "@prisma/client";
import { Code2, LinkIcon } from "lucide-react";
import IconBadge from "@/components/shared/IconBadge";
import ViewProjectButton from "@/components/site/ViewProjectButton";

interface ProjectCardProps {
    project: Project;
    username: string;
};

const ProjectCard = ({ project, username }: ProjectCardProps) => {

    return (
        <div className="group transition-all hover:shadow-md overflow-hidden border rounded-lg p-3 h-full">
            <Link target="_blank" href={project?.projectUrl ?? (project?.repoUrl ?? "#")}>
                <div className="relative w-full aspect-video shadow-sm rounded-md overflow-hidden border">
                    <Image
                        fill
                        className="object-cover"
                        alt={project.title}
                        src={project?.image!}
                    />
                </div>
            </Link>
            <div className="flex flex-col pt-2">
                <Link target="_blank" href={project?.projectUrl ?? (project?.repoUrl ?? "#")} className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {project.title}
                </Link>
                <p className="text-xs text-muted-foreground">
                    {project.category}
                </p>
                <div className="my-3 flex items-center justify-between gap-x-2">
                    <Link target="_blank" href={project?.repoUrl ?? "#"} >
                        <div className="flex items-center gap-x-1">
                            <IconBadge variant={'success'} size="sm" icon={Code2} />
                            <span className="text-xs font-medium text-emerald-500 transition-opacity hover:text-opacity-75" >
                                View Code
                            </span>
                        </div>
                    </Link>
                    <Link target="_blank" href={project?.projectUrl ?? "#"} >
                        <div className="flex items-center gap-x-1">
                            <IconBadge size="sm" icon={LinkIcon} />
                            <span className="text-xs font-medium text-sky-500 transition-opacity hover:text-opacity-75" >
                                Visit Project
                            </span>
                        </div>
                    </Link>
                </div>
                <ViewProjectButton projectId={project?.id} username={username} />
            </div >
        </div >
    );
};

export default ProjectCard;