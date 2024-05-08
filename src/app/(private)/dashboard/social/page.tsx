import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user";
import SocialTable, { columns } from "@/components/dashboard/social/SocialTable";

export const metadata: Metadata = {
    title: `Social Links - Dashboard`,
};

const SocialLinksPage = async () => {

    const user = await getCurrentUser();

    const socialData = await prisma.socialUrl.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="p-6">
            <SocialTable
                columns={columns}
                data={socialData}
            />
        </div>
    );
};

export default SocialLinksPage;