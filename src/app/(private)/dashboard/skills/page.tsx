import { Metadata } from "next";
import prisma from "@/lib/prisma";
import SkillsTable, { columns } from "@/components/dashboard/skills/SkillsTable";
import { getCurrentUser } from "@/actions/user";

export const metadata: Metadata = {
    title: `Skills - Dashboard`,
};

const SkillsPage = async () => {

    const user = await getCurrentUser();

    const skillsData = await prisma.skill.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: 'desc',
        },
    });

    return (
        <div className="p-6">
            <SkillsTable
                columns={columns}
                data={skillsData}
            />
        </div>
    );
};

export default SkillsPage;