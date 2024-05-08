import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getCurrentUser } from "@/actions/user";
import UpdateAndDeleteUsername from "@/components/dashboard/user/UpdateAndDeleteUsername";

export const metadata: Metadata = {
    title: `Settings - Dashboard`,
};

const SettingsPage = async () => {

    const user = await getCurrentUser();

    if (!user) {
        return redirect("/");
    };

    if (!user?.username) {
        return redirect("/dashboard");
    };

    return (
        <div className="max-w-5xl h-full mx-auto flex md:items-center md:justify-center p-6">
            <UpdateAndDeleteUsername user={user!} />
        </div>
    );
};

export default SettingsPage;