"use client"
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { publishUserInfoAction, unpublishUserInfoAction } from "@/actions/userinfo";
import TooltipContainer from "@/components/shared/TooltipContainer";

interface CourseActionsProps {
    disabled: boolean;
    infoId: string;
    isPublished: boolean;
    userId: string;
    username: string;
    domain: string | null | undefined;
};

const InfoActions = ({ disabled, infoId, userId, isPublished, username, domain }: CourseActionsProps) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const onPublish = async () => {
        setIsLoading(true)
        try {
            if (isPublished) {
                const { success, message } = await unpublishUserInfoAction(userId, infoId);
                if (success) {
                    toast({
                        title: message,
                    });
                }
            } else {
                const { success, message } = await publishUserInfoAction(userId, infoId);
                if (success) {
                    toast({
                        title: message,
                    });
                }
            }
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

    const externalLinkUrl = domain ? `https://${domain}` : `${process.env.NEXT_PUBLIC_APP_URL}/${username}`;

    return (
        <div className="flex items-center gap-x-2">
            {isPublished && (
                <TooltipContainer content="View" >
                    <Link href={externalLinkUrl} target="_blank" >
                        <Button variant={'outline'} disabled={disabled || isLoading} size={'sm'} >
                            <ExternalLink className="h-5 w-5 text-sky-700" />
                        </Button>
                    </Link>
                </TooltipContainer>
            )}
            <Button
                onClick={onPublish}
                variant={'outline'}
                disabled={disabled || isLoading}
                size={'sm'}
            >
                {isPublished ? "Unpublish" : "Publish"}
            </Button>
        </div>
    );
};

export default InfoActions;