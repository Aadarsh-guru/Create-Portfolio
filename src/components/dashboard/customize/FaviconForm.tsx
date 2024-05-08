"use client"
import * as z from "zod";
import Image from "next/image";
import { Loader, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import uploadMedia from "@/lib/upload";
import { customizeAction } from "@/actions/customize";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { deleteMediaAction } from "@/actions/media";
import ConfirmModel from "@/components/shared/ConfirmModel";

interface FaviconFormProps {
    favicon: string | null;
    userId: string;
};

const formSchema = z.object({
    customFavicon: z.string().url({ message: "Invalid URL." }),
});

const FaviconForm = ({ favicon, userId }: FaviconFormProps) => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await customizeAction(userId, values);
            if (success) {
                toast({
                    title: message,
                });
            };
            return router.refresh();
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        }
    };

    const onDelete = async () => {
        setIsDeleting(true);
        try {
            const { success } = await customizeAction(userId, { customFavicon: null });
            if (success) {
                const res = await deleteMediaAction(favicon!);
                if (res.success) {
                    router.refresh();
                    toast({
                        title: "Favicon deleted successfully.",
                    });
                };
            };
            return router.refresh();
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        } finally {
            setIsDeleting(false);
        };
    };

    const hanldeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        setError(null);
        const file = e.target.files && e.target.files[0];
        if (!file) return;
        if (file.size > 500000) {
            setError("Favicon should be less than 500 KB.");
            return;
        }
        setIsUploading(true);
        try {
            const mediaUrl = await uploadMedia(file, `favicons`);
            if (mediaUrl) {
                onSubmit({ customFavicon: mediaUrl });
            };
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        };
    };

    return (
        <div className="mt-6 border bg-slate-50 dark:bg-gray-900 rounded-md p-4">
            <div className="text-xl font-medium flex items-center">
                Add favicon
            </div>
            <div
                onClick={() => !isUploading && inputRef.current?.click()}
                className={cn(
                    "relative border cursor-pointer rounded-lg bg-transparent transition-all max-h-80 aspect-square mt-4",
                    (isUploading || isDeleting) && "opacity-50 cursor-not-allowed",
                    (!isUploading && !isDeleting) && "group"
                )}
            >
                {isUploading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader className="h-10 w-10 animate-spin duration-1000 text-gray-500" />
                    </div>
                )}
                {!isUploading && (
                    <>
                        <Image
                            alt="upload"
                            fill
                            className="object-cover rounded-md"
                            src={favicon ? favicon : "/icon.png"}
                        />
                        <div className="absolute inset-0 rounded-lg transition-all bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                            <UploadIcon className="h-20 w-20 text-slate-50" />
                            <p className="text-slate-50 text-sm font-semibold mt-2" >Upload new favicon</p>
                        </div>
                    </>
                )}
            </div>
            <Input
                ref={inputRef}
                type="file"
                disabled={isUploading}
                onChange={hanldeUpload}
                accept="image/*"
                className="hidden"
            />
            <div className="flex items-center justify-between mt-4 gap-x-2">
                <div className="text-sm font-semibold text-red-500">{error}</div>
                <ConfirmModel onConfirm={onDelete} >
                    <Button
                        type="button"
                        variant={'destructive'}
                        className="bg-red-600"
                        disabled={isDeleting || !favicon || isUploading}
                    >
                        Remove
                    </Button>
                </ConfirmModel>
            </div>
        </div>
    );
};

export default FaviconForm;