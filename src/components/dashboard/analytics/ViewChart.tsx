"use client";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';

interface ViewChartProps {
    data: {
        daily: number;
        weekly: number;
        monthly: number;
        allTime: number;
    };
};

const ViewChart: React.FC<ViewChartProps> = ({ data }) => {

    const chartData = [
        { name: 'Day', views: data.daily },
        { name: 'Week', views: data.weekly },
        { name: 'Month', views: data.monthly },
        { name: 'All', views: data.allTime },
    ];

    return (
        <ResponsiveContainer width="100%" height={500}>
            <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <Tooltip />
                <Bar dataKey="views" fill="#60a5fa" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ViewChart;
