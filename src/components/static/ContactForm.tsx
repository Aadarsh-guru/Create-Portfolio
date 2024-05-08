"use client";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { sendContactMailAction } from "@/actions/mail";

const formSchema = z.object({
    name: z.string().min(3, { message: "Name is required" }),
    email: z.string().email({ message: "Email is required" }),
    message: z.string().min(3, { message: "Message is required" }),
});

const ContactForm = () => {

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            email: "",
            message: "",
        },
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await sendContactMailAction({
                to: process.env.NEXT_PUBLIC_ADMIN_EMAIL_ID as string,
                name: values.name,
                email: values.email,
                message: values.message,
            });
            if (success) {
                toast({ title: message });
                return form.reset();
            };
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.message,
                variant: 'destructive'
            });
        };
    };

    return (
        <div className="w-full mt-5">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sky-600" >
                                        Enter name
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="text"
                                            disabled={isSubmitting}
                                            className="outline-none focus-visible:outline-sky-300"
                                            placeholder="Enter your name"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-sky-600" >
                                        Enter email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            {...field}
                                            type="email"
                                            disabled={isSubmitting}
                                            className="outline-none focus-visible:outline-sky-300"
                                            placeholder="Enter your email"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="space-y-2">
                        <div className="space-y-2">
                            <FormField
                                control={form.control}
                                name="message"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="text-sky-600" >
                                            Message
                                        </FormLabel>
                                        <FormControl>
                                            <Textarea
                                                {...field}
                                                rows={5}
                                                disabled={isSubmitting}
                                                className="outline-none focus-visible:outline-sky-300"
                                                placeholder="Enter the message you want to convey."
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <Button
                        className="bg-sky-500 w-full transition-all active:scale-95 hover:bg-sky-600"
                        type="submit"
                        disabled={!isValid || isSubmitting}
                    >
                        Submit
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ContactForm;