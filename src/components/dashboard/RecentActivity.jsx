import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Clock, CheckCircle2, AlertCircle, FileEdit } from 'lucide-react';

export function RecentActivity({ activities }) {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {activities.map((activity, index) => (
                        <div key={index} className="flex gap-4 group cursor-pointer relative">
                            {/* Timeline line */}
                            {index !== activities.length - 1 && (
                                <div className="absolute left-4 top-10 bottom-[-24px] w-0.5 bg-slate-100 dark:bg-slate-800 group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-colors"></div>
                            )}

                            <div className="relative z-10 mt-1">
                                {activity.type === 'resolved' ? (
                                    <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600 dark:text-emerald-400 ring-4 ring-white dark:ring-slate-900">
                                        <CheckCircle2 className="w-4 h-4" />
                                    </div>
                                ) : activity.type === 'new' ? (
                                    <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 ring-4 ring-white dark:ring-slate-900">
                                        <AlertCircle className="w-4 h-4" />
                                    </div>
                                ) : (
                                    <div className="w-8 h-8 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600 dark:text-amber-400 ring-4 ring-white dark:ring-slate-900">
                                        <Clock className="w-4 h-4" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1 pb-4 group-hover:translate-x-1 transition-transform duration-200">
                                <p className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{activity.title}</p>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full">{activity.user}</p>
                                    <span className="text-xs text-slate-400 dark:text-slate-500">{activity.time}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
