import { Redis } from "ioredis";
import { User } from "@prisma/client";
import { getCurrentUser } from "@/actions/user";

const redis = new Redis(process.env.REDIS_URL as string);

const invalidateChache = async (userInstence?: User) => {
    try {
        let user = userInstence || null;
        if (!user) {
            user = await getCurrentUser();
        };
        const isPremiumValid = (user?.isPremiumUser && new Date(user?.premiumExpiry!) > new Date());
        if (isPremiumValid) {
            const userDataKey = `user:${user?.domain || user?.username}`;
            const metadataKey = `metadata:${user?.domain || user?.username}`;
            const layoutData = `layout:${user?.domain || user?.username}`;
            await redis.del([
                userDataKey,
                metadataKey,
                layoutData,
            ]);
        };
    } catch (error) {
        console.error(error);
    };
};

export {
    invalidateChache,
    redis,
};