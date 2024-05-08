import {
    FaInstagram,
    FaFacebookF,
    FaGithub,
    FaLinkedin,
    FaTwitter,
    FaYoutube,
    FaDiscord,
    FaWhatsapp,
    FaTelegram,
    FaGlobe,
} from "react-icons/fa";
import { SocialProviderEnum } from "@prisma/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import TooltipContainer from "../shared/TooltipContainer";

interface SocialIconProps {
    provider: SocialProviderEnum;
};

const socialIconMapping: Partial<Record<SocialProviderEnum, { icon: React.ElementType; className?: string }>> = {
    [SocialProviderEnum.INSTAGRAM]: { icon: FaInstagram, className: "text-pink-500" },
    [SocialProviderEnum.FACEBOOK]: { icon: FaFacebookF, className: "text-blue-500" },
    [SocialProviderEnum.GITHUB]: { icon: FaGithub, className: "text-gray-800 dark:text-gray-200" },
    [SocialProviderEnum.LINKEDIN]: { icon: FaLinkedin, className: "text-blue-600" },
    [SocialProviderEnum.TWITTER]: { icon: FaTwitter, className: "text-sky-500" },
    [SocialProviderEnum.YOUTUBE]: { icon: FaYoutube, className: "text-red-500" },
    [SocialProviderEnum.DISCORD]: { icon: FaDiscord, className: "text-purple-700" },
    [SocialProviderEnum.WHATSAPP]: { icon: FaWhatsapp, className: "text-green-500" },
    [SocialProviderEnum.TELEGRAM]: { icon: FaTelegram, className: "text-sky-700" },
    [SocialProviderEnum.CUSTOM]: { icon: FaGlobe, className: "text-blue-500" },
};

const SocialIcon: React.FC<SocialIconProps> = ({ provider }) => {

    const { icon: IconComponent, className } = socialIconMapping[provider] || {};

    return (
        <TooltipContainer content={String(provider)?.charAt(0).toUpperCase() + String(provider).slice(1).toLowerCase()} >
            <Button size="icon" variant="ghost">
                {IconComponent && <IconComponent className={cn(
                    className,
                    "h-8 w-8 transition-all duration-300 hover:scale-110 active:scale-95"
                )} />}
            </Button>
        </TooltipContainer>
    );
};

export default SocialIcon;