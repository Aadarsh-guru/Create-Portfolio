"use client";
import { Tooltip, ResponsiveContainer, PieChart, Pie } from 'recharts';

interface PremiumUsersChartProps {
    data: {
        totalUsers: number;
        activePremiumUsers: number;
    };
};

const PremiumUsersChart: React.FC<PremiumUsersChartProps> = ({ data }) => {

    const chartData = [
        { name: 'Premium Users', users: data.activePremiumUsers },
        { name: "Non-Premium Users", users: data.totalUsers - data.activePremiumUsers },
    ];

    const COLORS = ['#2ecc71', '#3498db'];

    return (
        <ResponsiveContainer width="100%" height={500}>
            <PieChart height={500} width={500} data={chartData}>
                <Tooltip />
                <Pie
                    dataKey="users"
                    startAngle={360}
                    endAngle={0}
                    label
                    stroke="#fff"
                    strokeWidth={2}
                    data={chartData.map((entry, index) => ({
                        ...entry,
                        fill: COLORS[index],
                    }))}
                />
            </PieChart>
        </ResponsiveContainer>
    );
};

export default PremiumUsersChart;
