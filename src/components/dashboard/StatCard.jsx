import React from 'react';
import { Card } from '../ui/Card';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function StatCard({ label, value, icon: Icon, color, trend, delay = 0 }) {
    const colorStyles = {
        blue: {
            bg: 'bg-blue-50 dark:bg-blue-900/20',
            text: 'text-blue-600 dark:text-blue-400',
            border: 'border-blue-100 dark:border-blue-900/30'
        },
        purple: {
            bg: 'bg-purple-50 dark:bg-purple-900/20',
            text: 'text-purple-600 dark:text-purple-400',
            border: 'border-purple-100 dark:border-purple-900/30'
        },
        yellow: {
            bg: 'bg-amber-50 dark:bg-amber-900/20',
            text: 'text-amber-600 dark:text-amber-400',
            border: 'border-amber-100 dark:border-amber-900/30'
        },
        green: {
            bg: 'bg-emerald-50 dark:bg-emerald-900/20',
            text: 'text-emerald-600 dark:text-emerald-400',
            border: 'border-emerald-100 dark:border-emerald-900/30'
        },
    };

    const style = colorStyles[color] || colorStyles.blue;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay, duration: 0.4 }}
        >
            <div className={cn(
                "relative overflow-hidden rounded-2xl bg-white dark:bg-slate-900 border p-6 transition-all duration-300 hover:shadow-lg dark:shadow-slate-900/20 group cursor-pointer",
                "border-slate-200 dark:border-slate-800"
            )}>
                <div className="flex items-start justify-between relative z-10">
                    <div>
                        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                        <h3 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight">{value}</h3>
                    </div>
                    <div className={cn(
                        "p-3 rounded-xl transition-colors duration-300",
                        style.bg,
                        style.text
                    )}>
                        <Icon className="w-6 h-6" />
                    </div>
                </div>

                {trend !== undefined && (
                    <div className="mt-4 flex items-center text-sm relative z-10">
                        <span className={cn(
                            "font-bold flex items-center gap-1",
                            trend > 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
                        )}>
                            {trend > 0 ? "+" : ""}{trend}%
                        </span>
                        <span className="text-slate-400 dark:text-slate-500 ml-2 font-medium">from last month</span>
                    </div>
                )}

                {/* Decorative Background gradient */}
                <div className={cn(
                    "absolute -right-6 -bottom-6 w-32 h-32 rounded-full opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-2xl",
                    style.text.replace('text-', 'bg-')
                )} />
            </div>
        </motion.div>
    );
}
