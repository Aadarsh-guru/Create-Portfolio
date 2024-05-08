"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { User } from "@prisma/client";
import { useState } from "react";
import { signOut } from "next-auth/react";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { createUsernameAction, deleteUserAccountAction } from "@/actions/user";
import ConfirmModel from "@/components/shared/ConfirmModel";



const formSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username is required" })
        .max(20, { message: "Username is too long" })
        .regex(/^[a-z0-9]+$/, { message: "Username should be in lower characters and without any space." })
        .toLowerCase()
        .trim(),
});

const UpdateAndDeleteUsername = ({ user }: { user: User }) => {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: user.username || "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await createUsernameAction(values);
            if (success) {
                toast({ title: "Username updated successfully." });
                router.refresh();
            } else {
                form.setError('username', {
                    message: message || "something went wrong.",
                });
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "something went wrong.",
                variant: 'destructive'
            });
        }
    };

    const onDelete = async () => {
        setIsLoading(true);
        try {
            const { success, message } = await deleteUserAccountAction(user?.id, user?.email);
            if (success) {
                toast({
                    title: message,
                });
                await signOut();
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message || "Something went wrong!",
                variant: "destructive"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1 className="text-2xl" >
                Update your username
            </h1>
            <p className="text-sm text-slate-500" >
                Username must be unique.
            </p>
            <Form {...form} >
                <form
                    className="space-y-8 mt-8"
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Your username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'abc123'"
                                    />
                                </FormControl>
                                <FormDescription>
                                    Username should be in lower characters and without any space.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex justify-between items-center gap-x-2">
                        <Button type="submit" disabled={!isValid || isSubmitting || isLoading} >
                            Update
                        </Button>
                        <ConfirmModel onConfirm={onDelete} >
                            <Button variant={'outline'} disabled={isSubmitting || isLoading} >
                                Delete Account
                            </Button>
                        </ConfirmModel>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default UpdateAndDeleteUsername;