import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/user";
import prisma from "@/lib/prisma";
import PremiumCard from "@/components/dashboard/customize/PremiumCard";
import RenewPremiumCard from "@/components/dashboard/customize/RenewPremiumCard";
import DomainForm from "@/components/dashboard/customize/DomainForm";
import FaviconForm from "@/components/dashboard/customize/FaviconForm";
import LogoForm from "@/components/dashboard/customize/LogoForm";

export const metadata: Metadata = {
    title: `Customize - Dashboard`,
};

const CustomizePage = async () => {

    const user = await getCurrentUser();

    if (!user?.username) {
        redirect("/dashboard");
    };

    const siteData = await prisma.siteData.findFirst({
        select: {
            premiumPrice: true,
        },
    });

    if (!siteData) {
        redirect("/dashboard?message=something-went-wrong");
    };

    const isPremiumValid = (user?.isPremiumUser && new Date(user?.premiumExpiry!) > new Date());

    return (
        <>
            {(user?.isPremiumUser && isPremiumValid) ? (
                <div className="w-full min-h-screen p-6 space-y-6">
                    <DomainForm
                        userId={user?.id}
                        domain={user?.domain}
                    />
                    <FaviconForm userId={user?.id} favicon={user?.customFavicon} />
                    <LogoForm userId={user?.id} logo={user?.customLogo} />
                </div>
            ) : (user?.isPremiumUser && !isPremiumValid) ? (
                <div className="w-full min-h-screen p-6">
                    <RenewPremiumCard price={siteData?.premiumPrice} />
                </div>
            ) : (
                <div className="w-full min-h-screen p-6">
                    <PremiumCard price={siteData?.premiumPrice} />
                </div>
            )}
        </>
    );
};

export default CustomizePage;