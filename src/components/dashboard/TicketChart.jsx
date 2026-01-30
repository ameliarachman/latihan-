import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { useTheme } from '../ThemeProvider';

export function TicketChart({ data }) {
    const { theme } = useTheme();

    // Custom colors for the chart
    const COLORS = ['#3b82f6', '#f59e0b', '#10b981', '#64748b']; // Blue, Amber, Emerald, Slate

    const axisStyle = {
        fill: theme === 'dark' ? '#94a3b8' : '#64748b',
        fontSize: 12,
        fontWeight: 500
    };

    const tooltipStyle = {
        backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff',
        border: '1px solid ' + (theme === 'dark' ? '#1e293b' : '#e2e8f0'),
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
        color: theme === 'dark' ? '#f8fafc' : '#0f172a'
    };

    return (
        <Card className="h-full min-h-[400px] flex flex-col">
            <CardHeader>
                <CardTitle>Ticket Statistics</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-0">
                <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                    <BarChart data={data} margin={{ top: 20, right: 0, left: -20, bottom: 0 }}>
                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'}
                        />
                        <XAxis
                            dataKey="name"
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            dy={16}
                        />
                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={axisStyle}
                            dx={-8}
                        />
                        <Tooltip
                            cursor={{ fill: theme === 'dark' ? '#1e293b' : '#f8fafc' }}
                            contentStyle={tooltipStyle}
                            itemStyle={{ color: 'inherit' }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 0, 0]} barSize={40}>
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                    className="hover:opacity-80 transition-opacity cursor-pointer"
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </CardContent>
        </Card>
    );
}
