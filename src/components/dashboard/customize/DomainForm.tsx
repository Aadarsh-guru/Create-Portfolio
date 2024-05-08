"use client"
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ConfirmModel from "@/components/shared/ConfirmModel";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { addDomainAction, removeDomainAction } from "@/actions/domain";
import DomainConfiguration from "./DomainConfigration";

interface DomainFormProps {
    domain: string | null;
    userId: string;
};

const formSchema = z.object({
    domain: z.string().regex(/^[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}$/, { message: "Invalid domain." }),
});

const DomainForm = ({ domain, userId }: DomainFormProps) => {

    const router = useRouter();
    const [isDeleting, setIsDeleting] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            domain: domain ?? "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await addDomainAction(userId, values.domain);
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

    const onDelete = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        setIsDeleting(true);
        try {
            const { success, message } = await removeDomainAction(userId, domain!);
            if (success) {
                form.reset();
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
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="mt-6 border bg-slate-50 dark:bg-gray-900 rounded-md p-4">
            <div className="text-xl font-medium flex items-center">
                Add domain
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4" >
                    <FormField
                        control={form.control}
                        name="domain"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        maxLength={64}
                                        disabled={isSubmitting || (domain ? true : false)}
                                        placeholder="e.g. 'yourdomain.com'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {domain && <DomainConfiguration domain={domain} />}
                    <div className="flex items-center justify-between gap-x-2">
                        <ConfirmModel onConfirm={onDelete}>
                            <Button
                                type="button"
                                onClick={onDelete}
                                variant={'destructive'}
                                className="dark:bg-red-600"
                                disabled={isDeleting || !domain || isSubmitting}
                            >
                                Remove
                            </Button>
                        </ConfirmModel>
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting || (domain ? true : false)}
                        >
                            {domain ? "Added" : "Add domain"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default DomainForm;