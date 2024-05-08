"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const ViewProjectButton = ({ projectId, username }: { projectId: string, username: string; }) => {

    const router = useRouter();

    let path: string = "";

    if (typeof window !== 'undefined') {
        if (window.location.href.includes(process.env.NEXT_PUBLIC_ROOT_DOMAIN as string)) {
            path = `/${username}/projects/${projectId}`;
        } else {
            path = `/projects/${projectId}`;
        }
    };

    return (
        <Button
            className="w-full text-gray-700 dark:text-gray-100"
            variant={'outline'}
            onClick={() => router.push(path)}
        >
            View Project
        </Button>
    );
};

export default ViewProjectButton;