"use client"
import * as z from "zod";
import { Pencil } from "lucide-react";
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


interface EmailFormProps {
    initialData: UserInfo
    userId: string;
};

const formSchema = z.object({
    email: z.string().email({ message: "Email is required" })
});

const EmailForm = ({ initialData, userId }: EmailFormProps) => {

    const router = useRouter();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: initialData?.email!
        },
    });

    const { isSubmitting, isValid } = form.formState;

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

    return (
        <div className="mt-6 border bg-slate-100 dark:bg-gray-900 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Contact Email
                <Button onClick={() => setIsEditing(!isEditing)} variant={'outline'} >
                    {isEditing ?
                        (
                            <>Cancel</>
                        )
                        :
                        (
                            <>
                                <Pencil className="h-4 w-4 mr-2" />
                                Edit
                            </>
                        )}
                </Button>
            </div>
            {!isEditing && (
                <p className="text-sm mt-2" >
                    {initialData?.email || "No email"}
                </p>
            )}
            {isEditing && (
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4" >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'example@abc.com'"
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

export default EmailForm;