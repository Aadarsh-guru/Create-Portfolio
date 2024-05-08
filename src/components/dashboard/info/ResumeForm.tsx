"use client"
import * as z from "zod";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { File, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { UserInfo } from "@prisma/client";
import { Input } from "@/components/ui/input";
import { updateUserInfoAction } from "@/actions/userinfo";
import uploadMedia from "@/lib/upload";
import Link from "next/link";
import { deleteMediaAction } from "@/actions/media";


interface ResumeFormProps {
    initialData: UserInfo;
    userId: string;
}

const formSchema = z.object({
    resume: z.string().optional(),
});

const ResumeForm = ({ initialData, userId }: ResumeFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [isDeleteing, setIsDeleting] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await updateUserInfoAction(userId, initialData?.id, values);
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

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            const { success, message } = await updateUserInfoAction(userId, initialData?.id, { resume: null });
            if (success) {
                const res = await deleteMediaAction(initialData?.resume!);
                if (res.success) {
                    router.refresh();
                    setIsEditing(false);
                    toast({
                        title: message,
                    });
                };
            };
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

    const hanldeUpload = async () => {
        setIsUploading(true);
        try {
            if (file) {
                const mediaUrl = await uploadMedia(file, 'resumes');
                if (mediaUrl) {
                    onSubmit({ resume: mediaUrl });
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
                Your Resume
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {(!isEditing && !initialData?.resume) && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add resume
                        </>
                    )}
                    {(!isEditing && initialData?.resume) && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {!initialData?.resume && (
                        <p className="text-sm mt-2 text-slate-500 italic" >
                            No resume added.
                        </p>
                    )}
                    {initialData?.resume && (
                        <div className="space-y-2">
                            <Link href={initialData?.resume} target="_blank" className="flex items-center p-3 w-full bg-sky-100 dark:bg-gray-700 border-sky-200 border text-sky-700 dark:text-gray-50 rounded-md">
                                <File className="h-4 w-4 mr-2 flex-shrink-0" />
                                <p className="text-xs line-clamp-1 hover:underline" >
                                    {initialData?.resume?.split('/').pop()}
                                </p>
                                {isDeleteing && (
                                    <div className="ml-auto" >
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    </div>
                                )}
                                {!isDeleteing && (
                                    <button
                                        onClick={onDelete}
                                        className="ml-auto hover:opacity-75 transition"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                )}
                            </Link>
                        </div>
                    )}
                </>
            )}
            {isEditing && (
                <div>
                    <div className="w-full flex items-center gap-4 py-4">
                        <Input
                            type="file"
                            disabled={isUploading}
                            onChange={(e) => setFile(e.target.files![0])}
                            accept="application/*"
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
                        Add your resume to showcase your worth.
                    </div>
                </div>
            )}
        </div>
    )
}

export default ResumeForm