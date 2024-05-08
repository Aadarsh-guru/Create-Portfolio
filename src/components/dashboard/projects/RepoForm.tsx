"use client"
import * as z from "zod";
import { Link2, Loader2, Pencil, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Project } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { updateProjectAction } from "@/actions/project";
import Link from "next/link";


interface RepoFormProps {
    initialData: Project;
    projectId: string;
    userId: string;
};

const formSchema = z.object({
    repoUrl: z.string().url({ message: "Invalid URL" }).optional()
});

const RepoForm = ({ initialData, projectId, userId }: RepoFormProps) => {

    const router = useRouter();
    const [isDeleteing, setIsDeleting] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            repoUrl: initialData?.repoUrl || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

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

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            const { success, message } = await updateProjectAction(projectId, userId, { repoUrl: null });
            if (success) {
                router.refresh();
                setIsEditing(false);
                toast({
                    title: message,
                });
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

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-gray-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between mb-4">
                Repository URL
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {(!isEditing && !initialData?.repoUrl) && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add URL
                        </>
                    )}
                    {(!isEditing && initialData?.repoUrl) && (
                        <>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit URL
                        </>
                    )}
                </Button>
            </div>
            {!isEditing && (
                <>
                    {!initialData?.repoUrl && (
                        <p className="text-sm mt-2 text-slate-500 italic" >
                            Not Set.
                        </p>
                    )}
                    {initialData?.repoUrl && (
                        <div className="space-y-2">
                            <Link href={initialData?.repoUrl} target="_blank" className="flex items-center p-3 w-full bg-sky-100 dark:bg-gray-700 border-sky-200 border text-sky-700 dark:text-gray-50 rounded-md">
                                <Link2 className="h-4 w-4 mr-2 flex-shrink-0" />
                                <p className="text-xs line-clamp-1 hover:underline" >
                                    {initialData?.repoUrl}
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
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField
                            control={form.control}
                            name="repoUrl"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="url"
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'https://github.com/aadarsh-guru/...'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex items-center gap-x-2">
                            <Button type="submit" disabled={!isValid || isSubmitting} >
                                Save
                            </Button>
                        </div>
                    </form>
                </Form>
            )}
        </div>
    );
};

export default RepoForm;