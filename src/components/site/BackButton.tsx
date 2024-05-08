"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const BackButton = () => {

    const router = useRouter();

    return (
        <Button
            variant={"link"}
            onClick={() => router.back()}
            className="flex items-center text-sky-700 hover:underline"
        >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
        </Button>
    );
};

export default BackButton;