import Image from "next/image";
import { format } from "date-fns";
import { Project } from "@prisma/client";
import {
    Clock,
    CheckCircle,
    Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import IconBadge from "@/components/shared/IconBadge";
import ViewProjectButton from "./ViewProjectButton";

interface ProjectCardProps {
    project: Project;
    username: string;
};

const ProjectCard = ({ project, username }: ProjectCardProps) => {

    return (
        <div className="group transition-all hover:shadow-md overflow-hidden border rounded-lg p-3 h-full">
            <div className="relative w-full aspect-video shadow-sm rounded-md overflow-hidden border">
                <Image
                    fill
                    className="object-cover"
                    alt={project.title}
                    src={project?.image!}
                />
            </div>
            <div className="flex flex-col pt-2">
                <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition line-clamp-2">
                    {project.title}
                </div>
                <p className="text-xs text-muted-foreground">
                    {project.category}
                </p>
                <div className="my-3 flex items-center justify-between gap-x-2">
                    <div className="flex items-center gap-x-1">
                        <IconBadge variant={project?.isCompleted ? 'success' : 'default'} size="sm" icon={project?.isCompleted ? CheckCircle : Clock} />
                        <span className={cn(
                            "text-xs font-medium text-slate-700",
                            project?.isCompleted && "text-emerald-700"
                        )} >
                            {project?.isCompleted ? "Completed" : "In progress"}
                        </span>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <IconBadge size="sm" icon={Calendar} />
                        <span className={cn(
                            "text-xs font-medium text-slate-700",
                            project?.isCompleted && "text-sky-500"
                        )} >
                            {project?.isCompleted ? format(project?.endDate!, "PPP") : format(project?.startDate!, "PPP")}
                        </span>
                    </div>
                </div>
                <ViewProjectButton projectId={project?.id} username={username} />
            </div>
        </div>
    );
};

export default ProjectCard;