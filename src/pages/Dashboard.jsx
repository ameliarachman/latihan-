import React from 'react';
import { StatCard } from '../components/dashboard/StatCard';
import { TicketChart } from '../components/dashboard/TicketChart';
import { RecentActivity } from '../components/dashboard/RecentActivity';
import { Button } from '../components/ui/Button';
import { Plus, Ticket, AlertCircle, CheckCircle2, Clock, Archive } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const stats = [
    { label: 'Total Tickets', value: 45, icon: Ticket, color: 'blue', trend: 12 },
    { label: 'Open Issues', value: 8, icon: AlertCircle, color: 'yellow', trend: -5 },
    { label: 'Resolved', value: 24, icon: CheckCircle2, color: 'green', trend: 18 },
    { label: 'Pending', value: 13, icon: Clock, color: 'purple', trend: 2 },
];

const chartData = [
    { name: 'Open', value: 8 },
    { name: 'On Progress', value: 5 },
    { name: 'Pending', value: 13 },
    { name: 'Resolved', value: 19 },
];

const activities = [
    { type: 'new', title: 'Printer connection failure @ HR Dept', user: 'Sarah Wilson', time: '10 mins ago' },
    { type: 'resolved', title: 'Network slowdown reported', user: 'Mike Chen', time: '1 hour ago' },
    { type: 'update', title: 'ERP Login Issue', user: 'System Admin', time: '2 hours ago' },
    { type: 'new', title: 'New Employee Equipment Request', user: 'John Doe', time: '4 hours ago' },
];

export default function Dashboard() {
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-fade-in pb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">Dashboard Overview</h2>
                    <p className="text-slate-500 dark:text-slate-400 mt-2 font-medium">Welcome back, here's what's happening today.</p>
                </div>
                <Button onClick={() => navigate('/tickets')} size="lg" className="shadow-blue-500/20 shadow-xl w-full sm:w-auto">
                    <Plus className="w-5 h-5" />
                    Create New Ticket
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, index) => (
                    <StatCard key={stat.label} {...stat} delay={index * 0.1} />
                ))}
            </div>

            {/* Charts & Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                    className="lg:col-span-2 min-h-[400px]"
                >
                    <TicketChart data={chartData} />
                </motion.div>
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 }}
                    className="lg:col-span-1 h-full"
                >
                    <RecentActivity activities={activities} />
                </motion.div>
            </div>
        </div>
    );
}
