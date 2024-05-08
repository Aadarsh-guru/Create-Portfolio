import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user";
import ProjectsTable, { columns } from "@/components/dashboard/projects/ProjectsTable";

export const metadata: Metadata = {
    title: `Projects - Dashboard`,
};

const Projects = async () => {

    const user = await getCurrentUser();

    const projectData = await prisma.project.findMany({
        where: {
            userId: user?.id
        },
        orderBy: {
            createdAt: 'desc',
        },
    });


    return (
        <div className="p-6">
            <ProjectsTable
                columns={columns}
                data={projectData}
            />
        </div>
    );
};

export default Projects;