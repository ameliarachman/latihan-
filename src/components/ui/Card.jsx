import React from 'react';
import { cn } from '../../lib/utils';
import { motion } from 'framer-motion';

export function Card({ className, children, ...props }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
                "bg-white dark:bg-slate-900/50 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 hover:shadow-lg transition-all duration-300 dark:shadow-slate-900/50 backdro-blur-sm",
                className
            )}
            {...props}
        >
            {children}
        </motion.div>
    );
}

export function CardHeader({ className, children }) {
    return <div className={cn("mb-5 flex items-center justify-between", className)}>{children}</div>;
}

export function CardTitle({ className, children }) {
    return <h3 className={cn("text-lg font-bold text-slate-800 dark:text-white tracking-tight leading-none", className)}>{children}</h3>;
}

export function CardContent({ className, children }) {
    return <div className={cn("", className)}>{children}</div>;
}
