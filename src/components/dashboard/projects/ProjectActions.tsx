"use client"
import { useState } from "react";
import { Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
    deleteProjectAction,
    publishProjectAction,
    unpublishProjectAction,
} from "@/actions/project";
import ConfirmModel from "@/components/shared/ConfirmModel";

interface ProjectActionsProps {
    disabled: boolean;
    projectId: string;
    userId: string;
    isPublished: boolean;
};

const ProjectActions = ({ disabled, projectId, userId, isPublished }: ProjectActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onDelete = async () => {
        setIsLoading(true);
        try {
            const { success, message } = await deleteProjectAction(projectId, userId);
            if (success) {
                toast({
                    title: message,
                });
                router.push(`/dashboard/projects`);
                router.refresh();
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Something went wrong!",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    const onPublish = async () => {
        setIsLoading(true)
        try {
            if (isPublished) {
                const { success, message } = await unpublishProjectAction(projectId, userId);
                if (success) {
                    toast({
                        title: message,
                    });
                }
            } else {
                const { success, message } = await publishProjectAction(projectId, userId);
                if (success) {
                    toast({
                        title: message,
                    });
                }
            }
            router.push(`/dashboard/projects`);
            return router.refresh();
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Something went wrong!",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center gap-x-2">
            <Button
                onClick={onPublish}
                variant={'outline'}
                disabled={disabled || isLoading}
                size={'sm'}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
            <ConfirmModel onConfirm={onDelete} >
                <Button disabled={isLoading} size={'sm'} >
                    <Trash className="h-4 w-4" />
                </Button>
            </ConfirmModel>
        </div>
    );
};

export default ProjectActions;