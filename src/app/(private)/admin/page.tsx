import { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import RevenueChart from "@/components/admin/analytics/RevenuChart";
import { getRevenue, getUsers, getPremiumUsers } from "@/lib/queries";
import RefreshButton from "@/components/shared/RefreshButton";
import UsersChart from "@/components/admin/analytics/UsersChart";
import PremiumUsersChart from "@/components/admin/analytics/PremiumUsersChart";

export const metadata: Metadata = {
    title: `Analytics - Admin dashboard`,
};

const AdminPage = async () => {

    const revenueData = await getRevenue();
    const users = await getUsers();
    const premiumUsers = await getPremiumUsers();

    return (
        <div className="w-full h-full p-6">
            <div className="w-full flex items-center justify-between">
                <h3 className="font-bold text-xl lg:text-2xl text-blue-400" >User Signup&apos;s</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                    <RefreshButton />
                </div>
            </div>
            <div className="mt-5 md:mt-8 w-full md:w-[70%] md:mx-auto">
                <UsersChart data={users} />
            </div>
            <Separator className="my-4" />
            <div className="w-full flex items-center justify-between">
                <h3 className="font-bold text-xl lg:text-2xl text-blue-400" >Premium Users</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                    <RefreshButton />
                </div>
            </div>
            <div className="mt-5 md:mt-8 w-full md:w-[70%] md:mx-auto">
                <PremiumUsersChart data={{
                    activePremiumUsers: premiumUsers.totalPremiumUsers,
                    totalUsers: users.allTime
                }}
                />
            </div>
            <Separator className="my-4" />
            <div className="w-full flex items-center justify-between">
                <h3 className="font-bold text-xl lg:text-2xl text-blue-400" >Sells & Revenue</h3>
                <div className="flex items-center gap-1 sm:gap-2">
                    <RefreshButton />
                </div>
            </div>
            <div className="mt-5 md:mt-8 w-full md:w-[70%] md:mx-auto">
                <RevenueChart data={revenueData} />
            </div>
            <Separator className="my-4" />
        </div>
    );
};

export default AdminPage;