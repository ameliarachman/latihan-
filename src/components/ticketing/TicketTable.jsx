import React from 'react';
import { cn, formatDate } from '../../lib/utils';
import { Eye } from 'lucide-react';

const STATUS_Styles = {
    'Open': 'bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/20 dark:text-rose-400 dark:border-rose-900/30',
    'On Progress': 'bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/30',
    'Pending': 'bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/20 dark:text-amber-400 dark:border-amber-900/30',
    'Resolved': 'bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/20 dark:text-emerald-400 dark:border-emerald-900/30',
    'Closed': 'bg-slate-100 text-slate-600 border-slate-200 dark:bg-slate-800 dark:text-slate-400 dark:border-slate-700',
};

const CATEGORIES = ['Hardware', 'Software', 'Network', 'Access', 'General'];
const STATUSES = ['Open', 'On Progress', 'Pending', 'Resolved', 'Closed'];

export function TicketTable({ tickets, onUpdate, onView }) {
    return (
        <div className="flex-1 overflow-auto relative scrollbar-hide">
            <table className="w-full text-left border-collapse min-w-[1200px]">
                <thead className="sticky top-0 z-10 bg-slate-50/95 dark:bg-slate-900/95 backdrop-blur-sm border-b border-slate-100 dark:border-slate-800">
                    <tr>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-16 text-sm uppercase tracking-wider">No</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-32 text-sm uppercase tracking-wider">Date</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-40 text-sm uppercase tracking-wider">User</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-40 text-sm uppercase tracking-wider">Site</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-64 text-sm uppercase tracking-wider">Case / Problem</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-32 text-sm uppercase tracking-wider">Category</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-64 text-sm uppercase tracking-wider">Troubleshoot</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-48 text-sm uppercase tracking-wider">Root Cause</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-32 text-sm uppercase tracking-wider">Status</th>
                        <th className="p-4 font-bold text-slate-600 dark:text-slate-400 w-20 text-center text-sm uppercase tracking-wider">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {tickets.map((ticket, index) => (
                        <tr
                            key={ticket.id}
                            className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors duration-150"
                        >
                            <td className="p-4 text-slate-500 dark:text-slate-500 font-medium">{index + 1}</td>

                            <td className="p-4">
                                <input
                                    type="date"
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all"
                                    value={ticket.date.split('T')[0]}
                                    onChange={(e) => onUpdate(ticket.id, 'date', e.target.value)}
                                />
                            </td>

                            <td className="p-4">
                                <input
                                    type="text"
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all truncate"
                                    value={ticket.user}
                                    onChange={(e) => onUpdate(ticket.id, 'user', e.target.value)}
                                />
                            </td>

                            <td className="p-4">
                                <input
                                    type="text"
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all truncate"
                                    value={ticket.site}
                                    onChange={(e) => onUpdate(ticket.id, 'site', e.target.value)}
                                />
                            </td>

                            <td className="p-4">
                                <textarea
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all resize-none overflow-hidden min-h-[40px]"
                                    value={ticket.case}
                                    rows={1}
                                    onChange={(e) => {
                                        e.target.style.height = 'auto';
                                        e.target.style.height = e.target.scrollHeight + 'px';
                                        onUpdate(ticket.id, 'case', e.target.value);
                                    }}
                                />
                            </td>

                            <td className="p-4">
                                <select
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none cursor-pointer"
                                    value={ticket.category}
                                    onChange={(e) => onUpdate(ticket.id, 'category', e.target.value)}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c} className="bg-white dark:bg-slate-800">{c}</option>)}
                                </select>
                            </td>

                            <td className="p-4">
                                <textarea
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all resize-none min-h-[40px] font-mono text-xs"
                                    value={ticket.troubleshoot}
                                    onChange={(e) => onUpdate(ticket.id, 'troubleshoot', e.target.value)}
                                />
                            </td>

                            <td className="p-4">
                                <textarea
                                    className="bg-transparent focus:bg-white dark:focus:bg-slate-800 text-slate-700 dark:text-slate-300 border-transparent focus:border-blue-300 rounded px-2 py-1 w-full text-sm outline-none transition-all resize-none min-h-[40px] font-mono text-xs"
                                    value={ticket.solved}
                                    onChange={(e) => onUpdate(ticket.id, 'solved', e.target.value)}
                                />
                            </td>

                            <td className="p-4">
                                <select
                                    className={cn(
                                        "rounded-full px-3 py-1 text-xs font-bold border cursor-pointer outline-none appearance-none text-center min-w-[100px] transition-all",
                                        STATUS_Styles[ticket.status] || STATUS_Styles['Open']
                                    )}
                                    value={ticket.status}
                                    onChange={(e) => onUpdate(ticket.id, 'status', e.target.value)}
                                >
                                    {STATUSES.map(s => <option key={s} value={s} className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200">{s}</option>)}
                                </select>
                            </td>

                            <td className="p-4 text-center">
                                <button
                                    onClick={() => onView(ticket)}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
