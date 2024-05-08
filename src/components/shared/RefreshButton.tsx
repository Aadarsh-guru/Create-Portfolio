"use client";
import { useState } from "react";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import TooltipContainer from "@/components/shared/TooltipContainer";

const RefreshButton = ({ className }: { className?: string }) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handleOnRefresh = () => {
        setIsLoading(true);
        try {
            router.refresh();
            return setTimeout(() => setIsLoading(false), 1000);
        } catch (error: any) {
            console.log(error);
            return toast({
                title: error.message || "Something went wrong."
            });
        }
    };

    return (
        <TooltipContainer content="Refresh" >
            <Button
                onClick={handleOnRefresh}
                disabled={isLoading}
                variant={'outline'}
                size={'icon'}
            >
                <RefreshCw className={cn(
                    "h-5 w-5 text-sky-700",
                    className,
                    isLoading && "animate-spin cursor-not-allowed",
                )} />
            </Button>
        </TooltipContainer>
    );
};

export default RefreshButton;