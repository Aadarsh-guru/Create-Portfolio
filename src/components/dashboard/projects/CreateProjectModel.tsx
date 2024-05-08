import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createProjectModel } from "@/actions/project";


const formSchema = z.object({
    title: z.string().min(3, { message: "Title is required" }),
    category: z.string().min(3, { message: "Category is required" }),
});


function CreateProjectModel() {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: ""
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async ({ title, category }: z.infer<typeof formSchema>) => {
        try {
            const { success, message, project } = await createProjectModel({ title, category });
            if (success) {
                router.refresh();
                setOpen(false);
                toast({
                    title: message,
                });
                return router.push(`/dashboard/projects/${project?.id}`);
            }
        } catch (error: any) {
            console.log(error);
            return toast({
                title: "Something wemt wrong!",
                variant: "destructive"
            });
        };
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <Button onClick={() => setOpen(true)} className="ml-auto" >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Project
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new Project</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form} >
                        <FormField
                            control={form.control}
                            name="title"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            required
                                            disabled={isSubmitting}
                                            placeholder="Enter your project title"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem className="mt-4" >
                                    <FormControl>
                                        <Input
                                            required
                                            disabled={isSubmitting}
                                            placeholder="Enter your project category"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting || !isValid} >
                        Create
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default CreateProjectModel;