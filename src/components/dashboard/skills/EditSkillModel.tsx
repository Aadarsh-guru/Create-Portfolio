import * as z from "zod"
import { SkillEnum } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Pencil } from "lucide-react";
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
import { editSkillAction } from "@/actions/skill";


const formSchema = z.object({
    skillName: z.string().min(1, { message: "Skill name is required" }),
    expertise: z.nativeEnum(SkillEnum),
});

interface EditSkillModelProps {
    skillId: string;
    skillName: string;
    expertise: SkillEnum;
};

function EditSkillModel({ skillId, skillName, expertise }: EditSkillModelProps) {

    const router = useRouter();
    const [open, setOpen] = useState<boolean>(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            skillName: skillName,
            expertise: expertise,
        }
    });

    const { isSubmitting, isValid } = form.formState;

    const onSubmit = async ({ skillName, expertise }: z.infer<typeof formSchema>) => {
        try {
            const { success, message } = await editSkillAction({ skillName, expertise, skillId });
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
            <Button onClick={() => setOpen(true)} variant={'ghost'} size={'icon'} >
                <Pencil className="h-4 w-4" />
            </Button>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit skill</DialogTitle>
                </DialogHeader>
                <div className="py-4">
                    <Form {...form} >
                        <FormField
                            control={form.control}
                            name="skillName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            required
                                            disabled={isSubmitting}
                                            placeholder="e.g. 'Engineering'"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="expertise"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl >
                                        <Select disabled={field.disabled} value={field.value} onValueChange={(e) => field.onChange(e)} >
                                            <SelectTrigger className="w-full mt-4">
                                                <SelectValue placeholder="Select skill expertise" />
                                            </SelectTrigger>
                                            <SelectContent >
                                                <SelectGroup>
                                                    <SelectLabel>Expertise</SelectLabel>
                                                    <SelectItem value={SkillEnum.BEGINNER}>Beginner</SelectItem>
                                                    <SelectItem value={SkillEnum.INTERMEDIATE}>Intermediate</SelectItem>
                                                    <SelectItem value={SkillEnum.EXPERT}>Expert</SelectItem>
                                                </SelectGroup>
                                            </SelectContent>
                                        </Select>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </Form>
                </div>
                <DialogFooter>
                    <Button onClick={form.handleSubmit(onSubmit)} disabled={isSubmitting || !isValid} >
                        Edit
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};

export default EditSkillModel;