import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { FileBarChart, Download, Calendar } from 'lucide-react';
import { TicketChart } from '../components/dashboard/TicketChart';
import { useData } from '../context/DataContext';

export default function Reports() {
    const { tickets } = useData();

    // Calculate stats dynamically from context tickets
    const totalTickets = tickets.length;
    const resolvedTickets = tickets.filter(t => t.status === 'Resolved' || t.status === 'Closed').length;
    const resolutionRate = totalTickets > 0 ? Math.round((resolvedTickets / totalTickets) * 100) : 0;

    // Simple aggregation for chart (mock distribution based on context somewhat)
    const chartData = [
        { name: 'Jan', value: 40 },
        { name: 'Feb', value: 45 },
        { name: 'Mar', value: 35 },
        { name: 'Apr', value: 60 },
        { name: 'May', value: 48 },
        { name: 'June', value: 75 },
        { name: 'July', value: 65 },
    ];

    const handleDownloadCSV = () => {
        // 1. Filter tickets for last 30 days
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

        const recentTickets = tickets.filter(t => {
            const tDate = new Date(t.date);
            return tDate >= thirtyDaysAgo;
        });

        if (recentTickets.length === 0) {
            alert("No tickets found in the last 30 days.");
            return;
        }

        // 2. Convert to CSV
        const headers = ["ID", "Date", "User", "Site", "Category", "Case", "Status", "Resolution"];
        const csvRows = [
            headers.join(','),
            ...recentTickets.map(row => {
                // Escape quotes and handle commas in content
                const escape = (text) => `"${String(text || '').replace(/"/g, '""')}"`;

                return [
                    row.id,
                    row.date,
                    escape(row.user),
                    escape(row.site),
                    escape(row.category),
                    escape(row.case),
                    row.status,
                    escape(row.solved)
                ].join(',');
            })
        ];

        const csvContent = "data:text/csv;charset=utf-8," + csvRows.join('\n');

        // 3. Trigger Download
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `ticket_report_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link); // Required for FF
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Analytics Reports</h2>
                    <p className="text-slate-500 dark:text-slate-400">Deep dive into your help desk performance.</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="secondary">
                        <Calendar className="w-4 h-4 mr-2" />
                        Last 30 Days
                    </Button>
                    <Button onClick={handleDownloadCSV}>
                        <Download className="w-4 h-4 mr-2" />
                        Export CSV
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="h-[400px]">
                    {/* Use dynamic chart data if you want, simpler to keep static for visual demo unless requested */}
                    <TicketChart data={chartData} />
                </div>
                <div className="h-[400px]">
                    <TicketChart data={[...chartData].reverse()} />
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Detailed Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left text-sm">
                            <thead>
                                <tr className="border-b border-slate-100 dark:border-slate-800">
                                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Metric</th>
                                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Current Period</th>
                                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Previous (Avg)</th>
                                    <th className="py-3 px-4 font-semibold text-slate-700 dark:text-slate-300">Change</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b border-slate-50 dark:border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Total Tickets</td>
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{totalTickets}</td>
                                    <td className="py-3 px-4 text-slate-500">--</td>
                                    <td className="py-3 px-4 text-blue-600 font-medium">+100%</td>
                                </tr>
                                <tr className="border-b border-slate-50 dark:border-slate-800/50">
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Resolution Rate</td>
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">{resolutionRate}%</td>
                                    <td className="py-3 px-4 text-slate-500">89%</td>
                                    <td className="py-3 px-4 text-emerald-600 font-medium">Variable</td>
                                </tr>
                                <tr>
                                    <td className="py-3 px-4 text-slate-600 dark:text-slate-400">Customer Satisfaction</td>
                                    <td className="py-3 px-4 font-medium text-slate-900 dark:text-white">4.8/5.0</td>
                                    <td className="py-3 px-4 text-slate-500">4.5/5.0</td>
                                    <td className="py-3 px-4 text-emerald-600 font-medium">+0.3</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
