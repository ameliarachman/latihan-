import React, { useState } from 'react';
import { cn, formatDate } from '../../lib/utils';
import { MoreHorizontal, Eye, Trash2 } from 'lucide-react';

const STATUS_Styles = {
    'Open': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
    'On Progress': 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30',
    'Pending': 'bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/20 dark:text-orange-400 dark:border-orange-900/30',
    'Solved': 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30',
    'Closed': 'bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

const CATEGORIES = ['Software', 'Hardware', 'Network'];
const STATUS_OPTIONS = ['Open', 'On Progress', 'Pending', 'Solved', 'Closed'];

export function TicketTable({ tickets, onUpdate, onView }) {
    // We use local state for editing cells just to show input, but commit on blur/change
    // For simplicity in this demo, we can just render inputs that trigger onUpdate directly.

    return (
        <div className="overflow-x-auto w-full">
            <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 dark:bg-slate-950/50 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-10">
                    <tr>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400 w-16">No</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Date</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">PIC / User</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Site</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Case</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Category</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Troubleshoot</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Solved / Root Cause</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400">Status</th>
                        <th className="py-4 px-6 font-bold text-slate-600 dark:text-slate-400 text-center">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                    {tickets.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="py-10 text-center text-slate-500 dark:text-slate-400">No tickets found. Create one to get started.</td>
                        </tr>
                    ) : tickets.map((ticket, index) => (
                        <tr key={ticket.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30 transition-colors group">
                            <td className="py-4 px-6 text-slate-500 font-mono text-xs">{index + 1}</td>

                            {/* Date */}
                            <td className="py-4 px-6">
                                {formatDate(ticket.date)}
                            </td>

                            {/* User/PIC - Editable */}
                            <td className="py-4 px-6">
                                <input
                                    className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-900 dark:text-slate-200 font-medium placeholder-slate-400"
                                    value={ticket.user}
                                    onChange={(e) => onUpdate(ticket.id, 'user', e.target.value)}
                                />
                            </td>

                            {/* Site - Editable */}
                            <td className="py-4 px-6">
                                <input
                                    className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-600 dark:text-slate-400"
                                    value={ticket.site}
                                    onChange={(e) => onUpdate(ticket.id, 'site', e.target.value)}
                                />
                            </td>

                            {/* Case - TextArea for expansion */}
                            <td className="py-4 px-6 max-w-xs">
                                <textarea
                                    rows={1}
                                    className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-600 dark:text-slate-400 resize-none overflow-hidden focus:bg-white dark:focus:bg-slate-800 focus:p-2 rounded transition-all"
                                    value={ticket.case}
                                    onChange={(e) => onUpdate(ticket.id, 'case', e.target.value)}
                                    onFocus={(e) => e.target.rows = 3}
                                    onBlur={(e) => e.target.rows = 1}
                                />
                            </td>

                            {/* Category - Select */}
                            <td className="py-4 px-6">
                                <select
                                    className="bg-transparent border-none p-0 focus:ring-0 text-slate-600 dark:text-slate-400 cursor-pointer"
                                    value={ticket.category}
                                    onChange={(e) => onUpdate(ticket.id, 'category', e.target.value)}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </td>

                            {/* Troubleshoot */}
                            <td className="py-4 px-6 max-w-xs">
                                <textarea
                                    rows={1}
                                    className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-600 dark:text-slate-400 resize-none overflow-hidden focus:bg-white dark:focus:bg-slate-800 focus:p-2 rounded transition-all"
                                    value={ticket.troubleshoot}
                                    onChange={(e) => onUpdate(ticket.id, 'troubleshoot', e.target.value)}
                                    onFocus={(e) => e.target.rows = 3}
                                    onBlur={(e) => e.target.rows = 1}
                                />
                            </td>

                            {/* Solved / Root Cause */}
                            <td className="py-4 px-6 max-w-xs">
                                <textarea
                                    rows={1}
                                    className="bg-transparent border-none p-0 focus:ring-0 w-full text-slate-600 dark:text-slate-400 resize-none overflow-hidden focus:bg-white dark:focus:bg-slate-800 focus:p-2 rounded transition-all"
                                    value={ticket.solved}
                                    onChange={(e) => onUpdate(ticket.id, 'solved', e.target.value)}
                                    onFocus={(e) => e.target.rows = 3}
                                    onBlur={(e) => e.target.rows = 1}
                                />
                            </td>

                            {/* Status */}
                            <td className="py-4 px-6">
                                <select
                                    className={cn(
                                        "px-2.5 py-1 rounded-full text-xs font-semibold border cursor-pointer appearance-none pl-3 pr-8 relative z-10",
                                        STATUS_Styles[ticket.status] || STATUS_Styles['Open']
                                    )}
                                    value={ticket.status}
                                    onChange={(e) => onUpdate(ticket.id, 'status', e.target.value)}
                                >
                                    {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </td>

                            {/* Actions */}
                            <td className="py-4 px-6 text-center">
                                <div className="flex justify-center items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <button
                                        onClick={() => onView(ticket)}
                                        className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                                        title="View Details"
                                    >
                                        <Eye className="w-4 h-4" />
                                    </button>
                                    {/* Add delete button if needed */}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
