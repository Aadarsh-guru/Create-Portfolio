"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
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
import { createUsernameAction } from "@/actions/user";


const formSchema = z.object({
    username: z
        .string()
        .min(3, { message: "Username is required" })
        .max(20, { message: "Username is too long" })
        .regex(/^[a-z0-9]+$/, { message: "Username should be in lower characters and without any space." })
        .toLowerCase()
        .trim(),
});

const CreateUsername = () => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await createUsernameAction(values);
            if (success) {
                toast({ title: message });
                router.refresh();
                form.reset();
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

    return (
        <div>
            <h1 className="text-2xl" >
                Create your username
            </h1>
            <p className="text-sm text-slate-500" >
                Username must be unique and you can change it later.
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
                                    Enter Username
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
                    <div className="flex items-center gap-x-2">
                        <Button type="submit" disabled={!isValid || isSubmitting} >
                            Create
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CreateUsername;