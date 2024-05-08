import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

const RATE_LIMIT_WINDOW = 60;
const MAX_REQUESTS_PER_WINDOW = 100;

const ratelimit = async (ip: string) => {
    try {
        const rateLimitKey = `ratelimit:${ip}`;
        const requestsCount = await redis.get(rateLimitKey) as null | number ?? 0;
        if ((MAX_REQUESTS_PER_WINDOW - requestsCount) <= 0) {
            return { success: false, message: "Too Many Requests" };
        } else {
            await redis.setex(rateLimitKey, RATE_LIMIT_WINDOW + 1, requestsCount + 1);
            return { success: true, message: "Allowed to access" };
        };
    } catch (error: any) {
        console.error(error);
        return { success: false, message: error.message };
    };
};

export default ratelimit;
