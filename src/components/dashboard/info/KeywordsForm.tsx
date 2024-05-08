"use client"
import * as z from "zod";
import { Loader2, PlusCircle, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { UserInfo } from "@prisma/client";
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
import { updateUserInfoAction } from "@/actions/userinfo";


interface DescriptionFormProps {
    initialData: UserInfo
    userId: string;
};

const formSchema = z.object({
    keyword: z.string().optional(),
});

const KeywordsForm = ({ initialData, userId }: DescriptionFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [deletingIndex, setDeletingIndex] = useState<number | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async ({ keyword }: z.infer<typeof formSchema>) => {
        try {
            const { success } = await updateUserInfoAction(userId, initialData?.id, {
                keywords: [keyword, ...initialData?.keywords],
            });
            if (success) {
                router.refresh();
                setIsEditing(false);
                form.reset();
            }
        } catch (error: any) {
            console.log(error);
            return toast({
                title: error.message || "Something wemt wrong!",
                variant: "destructive"
            });
        }
    };

    const onDelete = async (keywordIndex: number) => {
        setDeletingIndex(keywordIndex);
        try {
            const { success } = await updateUserInfoAction(userId, initialData?.id, {
                keywords: [...initialData?.keywords?.filter((_, index) => index !== keywordIndex)],
            });
            if (success) {
                router.refresh();
                setIsEditing(false);
            }
        } catch (error: any) {
            console.log(error);
            return toast({
                title: error.message || "Something wemt wrong!",
                variant: "destructive"
            });
        } finally {
            setDeletingIndex(null);
        }
    };

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-gray-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Search keywords
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing && (
                        <>Cancel</>
                    )}
                    {!isEditing && (
                        <>
                            <PlusCircle className="h-4 w-4 mr-2" />
                            Add
                        </>
                    )}
                </Button>
            </div>
            {(!isEditing && initialData?.keywords?.length === 0) && (
                <div className="mt-2 text-sm text-slate-500 italic">
                    No keywords.
                </div>
            )}
            {(!isEditing && initialData?.keywords?.length !== 0) && (
                <div className="mt-2 w-full flex gap-2 flex-wrap items-center">
                    {initialData?.keywords.map((keyword, index) => (
                        <div key={index} className="flex items-center gap-4 py-2 px-3 bg-sky-100 dark:bg-gray-700 border-sky-200 border text-sky-700 dark:text-gray-50 rounded-md">
                            <p className="text-sm line-clamp-1" >
                                {keyword}
                            </p>
                            {deletingIndex === index && (
                                <div className="ml-auto" >
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                </div>
                            )}
                            {(deletingIndex !== index || deletingIndex === null) && (
                                <button
                                    onClick={() => onDelete(index)}
                                    className="ml-auto hover:opacity-75 transition"
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField
                            control={form.control}
                            name="keyword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Anything which can help SEO.'"
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

export default KeywordsForm;