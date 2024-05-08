import Link from "next/link";
import { Metadata } from "next";
import { ExternalLink } from "lucide-react";
import { FaCrown } from "react-icons/fa";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user";
import { getViews } from "@/lib/queries";
import { Button } from "@/components/ui/button";
import CreateUsername from "@/components/dashboard/user/CreateUsername";
import ViewChart from "@/components/dashboard/analytics/ViewChart";
import RefreshButton from "@/components/shared/RefreshButton";
import TooltipContainer from "@/components/shared/TooltipContainer";

export const metadata: Metadata = {
  title: `Analytics - Dashboard`,
};

const DashboardPage = async () => {

  const user = await getCurrentUser();

  let data;

  if (user?.username) {
    data = await getViews(user?.id);
  };

  const userInfo = await prisma.userInfo.findFirst({
    where: {
      userId: user?.id,
    },
    select: {
      isPublished: true,
    }
  });

  const externalLinkUrl = user?.domain ? `https://${user?.domain}` : `${process.env.NEXT_PUBLIC_APP_URL}/${user?.username}`;

  return (
    <>
      {!user?.username ? (
        <div className="max-w-5xl mx-auto flex md:items-center md:justify-center h-full p-6">
          <CreateUsername />
        </div>
      ) : (
        <div className="w-full h-full p-6">
          <div className="w-full flex items-center justify-between">
            <h3 className="font-bold text-xl lg:text-2xl text-blue-400" >Your portfolio views</h3>
            <div className="flex items-center gap-1 sm:gap-2">
              {!user?.isPremiumUser && (
                <TooltipContainer content="Upgrade plan" >
                  <Link href={'/dashboard/customize'} >
                    <Button variant={'outline'} size={'icon'} >
                      <FaCrown className="h-5 w-5 text-yellow-400" />
                    </Button>
                  </Link>
                </TooltipContainer>
              )}
              {userInfo?.isPublished && (
                <TooltipContainer content="View portfolio">
                  <Link href={externalLinkUrl} target="_blank" >
                    <Button variant={'outline'} size={'icon'} >
                      <ExternalLink className="h-5 w-5 text-sky-700" />
                    </Button>
                  </Link>
                </TooltipContainer>
              )}
              <RefreshButton />
            </div>
          </div>
          <div className="mt-5 md:mt-8 w-full md:w-[70%] md:mx-auto">
            <ViewChart data={data!} />
          </div>
        </div>
      )}
    </>
  );
};

export default DashboardPage;   