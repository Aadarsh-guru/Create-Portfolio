"use client"
import * as z from "zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Project } from "@prisma/client";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ImageIcon, Loader2, Pencil, PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import uploadMedia from "@/lib/upload";
import { updateProjectAction } from "@/actions/project";


interface ImageFormProps {
    initialData: Project;
    userId: string;
    projectId: string;
}

const formSchema = z.object({
    image: z.string().min(1, { message: "Image is required" })
});

const ImageForm = ({ initialData, userId, projectId }: ImageFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await updateProjectAction(projectId, userId, values);
            if (success) {
                router.refresh();
                setIsEditing(false);
                toast({
                    title: message,
                });
            }
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        }
    };

    const hanldeUpload = async () => {
        setIsUploading(true);
        try {
            if (file) {
                const mediaUrl = await uploadMedia(file, 'projects');
                if (mediaUrl) {
                    onSubmit({ image: mediaUrl });
                };
            };
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-gray-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-2">
                Project image
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && !initialData?.image && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add an image
                        </>
                    )}
                    {!isEditing && initialData?.image && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit image
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                !initialData?.image ?
                    (
                        <div className="flex items-center justify-center h-60 bg-slate-200 dark:bg-gray-700 rounded-md">
                            <ImageIcon className="h-10 w-10 text-slate-500" />
                        </div>
                    )
                    :
                    (
                        <div className="relative aspect-video mt-2">
                            <Image
                                alt="upload"
                                fill
                                className="object-cover rounded-md"
                                src={initialData?.image}
                            />
                        </div>
                    )
            )}
            {isEditing && (
                <div>
                    <div className="w-full flex items-center gap-4 py-4">
                        <Input
                            type="file"
                            disabled={isUploading}
                            onChange={(e) => setFile(e.target.files![0])}
                            accept="image/*"
                        />
                        <Button
                            type="button"
                            disabled={!file || isUploading}
                            onClick={hanldeUpload}
                        >
                            {isUploading ? (
                                <Loader2 className="h-5 w-5 animate-spin" />
                            )
                                :
                                "Upload"}
                        </Button>
                    </div>
                    <div className="text-xs text-muted-foreground mt-4">
                        16:9 aspect ratio recommended.
                    </div>
                </div>
            )}
        </div>
    );
};

export default ImageForm;