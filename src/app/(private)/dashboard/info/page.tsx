import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/actions/user";
import Banner from "@/components/shared/Banner";
import InfoActions from "@/components/dashboard/info/InfoActions";
import IconBadge from "@/components/shared/IconBadge";
import {
    Text,
    Heading1,
    Heading3,
    Headset,
    MailPlus,
    NotepadText,
    Image,
    TextSearch,
} from "lucide-react";
import HeadingForm from "@/components/dashboard/info/HeadingForm";
import SubHeadingForm from "@/components/dashboard/info/SubHeadingForm";
import DescriptionForm from "@/components/dashboard/info/DescriptionForm";
import ImageForm from "@/components/dashboard/info/ImageForm";
import EmailForm from "@/components/dashboard/info/EmailForm";
import ContactNumberForm from "@/components/dashboard/info/ContactNumberForm";
import ResumeForm from "@/components/dashboard/info/ResumeForm";
import KeywordsForm from "@/components/dashboard/info/KeywordsForm";

export const metadata: Metadata = {
    title: `Your info - Dashboard`,
};

const YourInfo = async () => {

    const user = await getCurrentUser();

    let userInfo = await prisma.userInfo.findFirst({
        where: {
            userId: user?.id!,
        }
    });

    if (!userInfo) {
        userInfo = await prisma.userInfo.create({
            data: {
                userId: user?.id!,
            }
        });
    };

    const requiredFeilds = [
        userInfo?.heading,
        userInfo?.subHeading,
        userInfo?.description,
        userInfo?.image,
        userInfo?.email,
    ];

    const totalFeilds = requiredFeilds.length;
    const completedFeilds = requiredFeilds.filter(Boolean).length;

    const completionText = `(${completedFeilds}/${totalFeilds})`;

    const isComplete = requiredFeilds.every(Boolean);

    return (
        <>
            {!userInfo?.isPublished && (
                <Banner
                    label="Your details are not published yet. Please fill the required feilds to publish."
                />
            )}
            <div className="p-6">
                <div className="flex items-center justify-between">
                    <span className="text-base md:text-lg text-slate-700 dark:text-slate-300" >
                        Required feilds {completionText}
                    </span>
                    <InfoActions
                        disabled={!isComplete}
                        infoId={userInfo.id}
                        userId={user?.id!}
                        username={user?.username!}
                        domain={user?.domain}
                        isPublished={userInfo.isPublished}
                    />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Heading1} />
                                <h2 className="text-lg" >
                                    Add the tagline
                                </h2>
                            </div>
                            <HeadingForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Heading3} />
                                <h2 className="text-lg" >
                                    Add sub heading
                                </h2>
                            </div>
                            <SubHeadingForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Text} />
                                <h2 className="text-lg" >
                                    Add Description
                                </h2>
                            </div>
                            <DescriptionForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={TextSearch} />
                                <h2 className="text-lg" >
                                    Add search keywords (Optional)
                                </h2>
                            </div>
                            <KeywordsForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Image} />
                                <h2 className="text-lg" >
                                    Add an image
                                </h2>
                            </div>
                            <ImageForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={MailPlus} />
                                <h2 className="text-lg" >
                                    Contact email
                                </h2>
                            </div>
                            <EmailForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={Headset} />
                                <h2 className="text-lg" >
                                    Phone number (Optional)
                                </h2>
                            </div>
                            <ContactNumberForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                        <div>
                            <div className="flex items-center gap-x-2">
                                <IconBadge icon={NotepadText} />
                                <h2 className="text-lg" >
                                    Your Resume (Optional)
                                </h2>
                            </div>
                            <ResumeForm
                                userId={user?.id!}
                                initialData={userInfo}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default YourInfo;