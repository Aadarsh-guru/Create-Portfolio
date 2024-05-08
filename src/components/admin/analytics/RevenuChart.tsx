"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
    data: {
        daily: {
            totalPurchases: number;
            totalRevenue: number;
        };
        weekly: {
            totalPurchases: number;
            totalRevenue: number;
        };
        monthly: {
            totalPurchases: number;
            totalRevenue: number;
        };
        allTime: {
            totalPurchases: number;
            totalRevenue: number;
        };
    }
};

const RevenueChart: React.FC<RevenueChartProps> = ({ data }) => {
    const chartData = [
        { name: 'Day', ...data.daily },
        { name: 'Week', ...data.weekly },
        { name: 'Month', ...data.monthly },
        { name: 'All', ...data.allTime },
    ];

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData} >
                <XAxis dataKey={'name'} />
                <Tooltip />
                <Bar dataKey="totalPurchases" stackId="a" fill="#6b7280 " name="Sells" />
                <Bar dataKey="totalRevenue" stackId="a" fill="#60a5fa" activeBar name="Revenue" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default RevenueChart;