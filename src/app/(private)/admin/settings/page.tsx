import { Metadata } from "next";
import prisma from "@/lib/prisma";
import PremiumPriceForm from "@/components/admin/settings/PremiumPriceForm";
import FrontImageForm from "@/components/admin/settings/FrontImageForm";

export const metadata: Metadata = {
    title: `Settings - Admin dashboard`,
};

const SiteSettings = async () => {

    const siteData = await prisma.siteData.findFirst();

    return (
        <div className="w-full min-h-screen p-6 space-y-6">
            <PremiumPriceForm premiumPrice={siteData?.premiumPrice || 0} />
            <FrontImageForm frontImage={siteData?.frontImage!} />
        </div>
    );
};

export default SiteSettings;