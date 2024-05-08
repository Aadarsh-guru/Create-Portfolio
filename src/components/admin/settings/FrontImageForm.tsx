"use client"
import * as z from "zod";
import Image from "next/image";
import { Loader, UploadIcon } from "lucide-react";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import uploadMedia from "@/lib/upload";
import { editSiteDataAction } from "@/actions/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { deleteMediaAction } from "@/actions/media";
import ConfirmModel from "@/components/shared/ConfirmModel";

const formSchema = z.object({
    frontImage: z.string().url({ message: "Invalid URL." }),
});

const FrontImageForm = ({ frontImage }: { frontImage: string }) => {

    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const inputRef = useRef<HTMLInputElement>(null);

    const alternativeImageUrl = "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjF8fHBlb3BsZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60";

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await editSiteDataAction(values);
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
            const { success } = await editSiteDataAction({ frontImage: null });
            if (success) {
                const res = await deleteMediaAction(frontImage);
                if (res.success) {
                    router.refresh();
                    toast({
                        title: "Front image deleted successfully.",
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
        if (file.size > 1000000) {
            setError("Front image should be less than 1 MB.");
            return;
        }
        setIsUploading(true);
        try {
            const mediaUrl = await uploadMedia(file, `site`);
            if (mediaUrl) {
                onSubmit({ frontImage: mediaUrl });
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
                Add front image
            </div>
            <div
                onClick={() => !isUploading && inputRef.current?.click()}
                className={cn(
                    "relative border cursor-pointer rounded-lg bg-transparent transition-all max-h-80 aspect-video mt-4",
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
                            src={frontImage ? frontImage : alternativeImageUrl}
                        />
                        <div className="absolute inset-0 rounded-lg transition-all bg-black/75 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100">
                            <UploadIcon className="h-20 w-20 text-slate-50" />
                            <p className="text-slate-50 text-sm font-semibold mt-2" >Upload new image</p>
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
            <div className="flex items-center justify-end mt-4 gap-x-2">
                <div className="text-sm font-semibold text-red-500">{error}</div>
                <ConfirmModel onConfirm={onDelete} >
                    <Button
                        type="button"
                        variant={'destructive'}
                        className="bg-red-600"
                        disabled={isDeleting || !frontImage || isUploading}
                    >
                        Remove
                    </Button>
                </ConfirmModel>
            </div>
        </div>
    );
};

export default FrontImageForm;