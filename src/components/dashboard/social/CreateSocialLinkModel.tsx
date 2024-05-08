import * as z from "zod"
import { SocialProviderEnum } from "@prisma/client";
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { createSocialLinkAction } from "@/actions/social";


const formSchema = z.object({
    url: z.string().url({ message: "Invalid url" }),
    provider: z.nativeEnum(SocialProviderEnum),
});


function CreateSocialLinkModel() {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: "",
            provider: "CUSTOM",
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async ({ url, provider }: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await createSocialLinkAction({ url, provider });
            if (success) {
                router.refresh();
                setOpen(false);
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
        };
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(false)}>
            <Button onClick={() => setOpen(true)} className="ml-auto" >
                <PlusCircle className="h-4 w-4 mr-2" />
                New Social Link
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Add new link</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form} >
                        <FormField
                            control={form.control}
                            name="provider"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Select disabled={field.disabled} value={field.value} onValueChange={(e) => field.onChange(e)} >
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Select social provider" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectGroup>
                                                    <SelectLabel>Providers</SelectLabel>
                                                    <SelectItem value={SocialProviderEnum.INSTAGRAM}>Instagram</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.GITHUB}>Github</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.LINKEDIN}>LinkedIn</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.FACEBOOK}>Facebook</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.DISCORD}>Discord</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.YOUTUBE}>YouTube</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.TWITTER}>Twitter</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.WHATSAPP}>WhatsApp</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.TELEGRAM}>Telegram</SelectItem>
                                                    <SelectItem value={SocialProviderEnum.CUSTOM}>Custom URL</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="url"
                            render={({ field }) => (
                                <FormItem className="mt-4" >
                                    <FormControl>
                                        <Input
                                            type="url"
                                            required
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'https://github.com/aadarsh-guru'"
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

export default CreateSocialLinkModel;