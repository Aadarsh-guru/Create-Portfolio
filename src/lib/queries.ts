import prisma from "./prisma";

const getViews = async (userId: string) => {
  try {
    const viewsData: any = await prisma.$queryRaw`
      WITH time_ranges AS (
        SELECT 
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE) AS daily,
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE - INTERVAL '1 week' AND "created_at" <= CURRENT_DATE + INTERVAL '1 day') AS weekly,
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE - INTERVAL '1 month' AND "created_at" <= CURRENT_DATE + INTERVAL '1 day') AS monthly,
          COUNT(*) AS all_time
        FROM 
          "views"
        WHERE 
          "user_id" = ${userId}
      )
      SELECT * FROM time_ranges;
    `;
    const { daily, weekly, monthly, all_time } = viewsData[0];
    return {
      daily: parseInt(daily),
      weekly: parseInt(weekly),
      monthly: parseInt(monthly),
      allTime: parseInt(all_time)
    };
  } catch (error) {
    throw error;
  }
};

const getUsers = async () => {
  try {
    const signupData: any = await prisma.$queryRaw`
      WITH time_ranges AS (
        SELECT
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE) AS daily,
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE - INTERVAL '1 week' AND "created_at" <= CURRENT_DATE + INTERVAL '1 day') AS weekly,
          COUNT(*) FILTER (WHERE "created_at" >= CURRENT_DATE - INTERVAL '1 month' AND "created_at" <= CURRENT_DATE + INTERVAL '1 day') AS monthly,
          COUNT(*) AS all_time
        FROM
          "users"
        WHERE
          "created_at" IS NOT NULL
      )
    SELECT * FROM time_ranges;
    `;

    const { daily, weekly, monthly, all_time } = signupData[0];
    return {
      daily: parseInt(daily),
      weekly: parseInt(weekly),
      monthly: parseInt(monthly),
      allTime: parseInt(all_time),
    };
  } catch (error) {
    throw error;
  }
};

const getPremiumUsers = async () => {
  try {
    const activePremiumData: any = await prisma.$queryRaw`
      SELECT
        COUNT(*) AS total_premium_users
      FROM
        "users"
      WHERE
        "is_premium_user" = TRUE AND
        "premium_expiry" > CURRENT_TIMESTAMP;
    `;
    const { total_premium_users } = activePremiumData[0];
    return {
      totalPremiumUsers: parseInt(total_premium_users),
    };
  } catch (error) {
    throw error;
  }
};

const getRevenue = async () => {
  try {
    const revenueData: any = await prisma.$queryRaw`
      WITH time_ranges AS (
        SELECT 
          COUNT(CASE WHEN "created_at" >= CURRENT_DATE THEN 1 END) AS daily_purchases,
          SUM(CASE WHEN "created_at" >= CURRENT_DATE THEN price ELSE 0 END)::DECIMAL AS daily_revenue,
          COUNT(CASE WHEN "created_at" >= CURRENT_DATE - INTERVAL '1 week' AND "created_at" < CURRENT_DATE THEN 1 END) AS weekly_purchases,
          SUM(CASE WHEN "created_at" >= CURRENT_DATE - INTERVAL '1 week' AND "created_at" < CURRENT_DATE THEN price ELSE 0 END)::DECIMAL AS weekly_revenue,
          COUNT(CASE WHEN "created_at" >= CURRENT_DATE - INTERVAL '1 month' AND "created_at" < CURRENT_DATE THEN 1 END) AS monthly_purchases,
          SUM(CASE WHEN "created_at" >= CURRENT_DATE - INTERVAL '1 month' AND "created_at" < CURRENT_DATE THEN price ELSE 0 END)::DECIMAL AS monthly_revenue,
          COUNT(*) AS all_time_purchases,
          SUM(price)::DECIMAL AS all_time_revenue
        FROM 
          "purchases"
      )
      SELECT * FROM time_ranges;
    `;

    const {
      daily_purchases, daily_revenue,
      weekly_purchases, weekly_revenue,
      monthly_purchases, monthly_revenue,
      all_time_purchases, all_time_revenue
    } = revenueData[0];

    return {
      daily: {
        totalPurchases: parseInt(daily_purchases) || 0,
        totalRevenue: parseFloat(daily_revenue) || 0
      },
      weekly: {
        totalPurchases: parseInt(weekly_purchases) || 0,
        totalRevenue: parseFloat(weekly_revenue) || 0
      },
      monthly: {
        totalPurchases: parseInt(monthly_purchases) || 0,
        totalRevenue: parseFloat(monthly_revenue) || 0
      },
      allTime: {
        totalPurchases: parseInt(all_time_purchases) || 0,
        totalRevenue: parseFloat(all_time_revenue) || 0
      }
    };
  } catch (error) {
    throw error;
  }
};

export {
  getViews,
  getRevenue,
  getUsers,
  getPremiumUsers,
};