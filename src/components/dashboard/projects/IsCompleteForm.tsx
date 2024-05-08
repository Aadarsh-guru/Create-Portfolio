"use client"
import * as z from "zod";
import { Pencil } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Project } from "@prisma/client";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
} from "@/components/ui/form";
import { updateProjectAction } from "@/actions/project";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";


interface IsCompleteFormProps {
    initialData: Project;
    projectId: string;
    userId: string;
};

const formSchema = z.object({
    isCompleted: z.boolean().default(false),
});

const IsCompleteForm = ({ initialData, projectId, userId }: IsCompleteFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            isCompleted: initialData?.isCompleted || false,
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

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-gray-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Project completion
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing ?
                        (
                            <>Cancel</>
                        )
                        :
                        (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit access
                            </>
                        )}
                </Button>
            </div>
            {!isEditing && (
                <p className={cn(
                    "text-sm mt-2",
                    !initialData?.isCompleted && "text-slate-500 italic"
                )}
                >
                    {initialData?.isCompleted ? (
                        <>
                            This project is completed.
                        </>
                    ) : (
                        <>
                            This project is not completed yet.
                        </>
                    )}
                </p>
            )}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField
                            control={form.control}
                            name="isCompleted"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4" >
                                    <FormControl>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                    <div className="space-y-1 leading-none">
                                        <FormDescription>
                                            Check this box if you have completed this project.
                                        </FormDescription>
                                    </div>
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

export default IsCompleteForm;