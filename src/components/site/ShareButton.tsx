"use client";
import {
    Share2,
    Copy,
} from "lucide-react";
import {
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton,
    TelegramShareButton,
    FacebookShareButton,
} from 'react-share';
import {
    BsTwitter,
    BsWhatsapp,
    BsLinkedin,
    BsTelegram,
    BsFacebook
} from 'react-icons/bs';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import TooltipContainer from "@/components/shared/TooltipContainer";

const ShareButton = ({ className }: { className: string; }) => {

    const title = "Hey! checkout my portfolio at -"

    let shareLink: string;

    if (typeof window !== "undefined") {
        shareLink = window?.location?.href;
    };

    const copyToClipboard = () => {
        navigator
            .clipboard
            .writeText(shareLink)
            .then(() => toast({
                title: "Copied to clipboard.",
            }))
            .catch((error) => console.error('Copy to clipboard failed: ', error));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className={className}>
                    <TooltipContainer content="Share" >
                        <Button size="icon" variant="outline">
                            <Share2 className="h-5 w-5 text-gray-700 dark:text-gray-100 transition-all duration-300" />
                        </Button>
                    </TooltipContainer>
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Share profile</DialogTitle>
                </DialogHeader>
                <div className="mb-10" >
                    <div className="mt-6 flex flex-wrap justify-evenly items-center gap-4">
                        <TwitterShareButton title={title} url={shareLink!} windowWidth={660} windowHeight={460}>
                            <BsTwitter className="text-3xl transition-all text-blue-400 hover:text-blue-600 cursor-pointer" />
                        </TwitterShareButton>
                        <WhatsappShareButton title={title} url={shareLink!} windowWidth={660} windowHeight={460}>
                            <BsWhatsapp className="text-3xl transition-all text-green-500 hover:text-green-600 cursor-pointer" />
                        </WhatsappShareButton>
                        <LinkedinShareButton title={title} url={shareLink!} windowWidth={660} windowHeight={460}>
                            <BsLinkedin className="text-3xl transition-all text-blue-600 hover:text-blue-800 cursor-pointer" />
                        </LinkedinShareButton>
                        <TelegramShareButton title={title} url={shareLink!} windowWidth={660} windowHeight={460}>
                            <BsTelegram className="text-3xl transition-all text-blue-400 hover:text-blue-600 cursor-pointer" />
                        </TelegramShareButton>
                        <FacebookShareButton title={title} url={shareLink!} windowWidth={660} windowHeight={460}>
                            <BsFacebook className="text-3xl transition-all text-blue-600 hover:text-blue-800 cursor-pointer" />
                        </FacebookShareButton>
                        <Button onClick={copyToClipboard} variant={'outline'} size={'icon'} >
                            <Copy className="text-gray-700 dark:text-gray-100 transition-all hover:text-gray-800" />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default ShareButton;