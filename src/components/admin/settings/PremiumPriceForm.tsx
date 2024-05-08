"use client"
import * as z from "zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { editSiteDataAction } from "@/actions/site";

const formSchema = z.object({
    premiumPrice: z.coerce.number().min(0, { message: "Price can't be empty." }),
});

const PremiumPriceForm = ({ premiumPrice }: { premiumPrice: number }) => {

    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            premiumPrice: premiumPrice || 0,
        },
    });

    const { isSubmitting, isValid } = form.formState;

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

    return (
        <div className="mt-6 border bg-slate-50 dark:bg-gray-900 rounded-md p-4">
            <div className="text-xl font-medium flex items-center">
                Premium price
            </div>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 mt-4" >
                    <FormField
                        control={form.control}
                        name="premiumPrice"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        disabled={isSubmitting}
                                        placeholder="e.g. '499'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex items-center justify-end gap-x-2">
                        <Button
                            type="submit"
                            disabled={!isValid || isSubmitting}
                        >
                            {premiumPrice ? "Update" : "Add price"}
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default PremiumPriceForm;