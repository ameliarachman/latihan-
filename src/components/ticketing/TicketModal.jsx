import React, { useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Image, Film, Paperclip, CheckCircle2 } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

// Updated Categories and Statuses based on user request
const CATEGORIES = ['Software', 'Hardware', 'Network'];
const STATUSES = ['Open', 'On Progress', 'Pending', 'Solved', 'Closed'];

export function TicketModal({ ticket, onClose, onSave }) {
    const isNew = !ticket;
    const [formData, setFormData] = React.useState(ticket || {
        date: new Date().toISOString().split("T")[0],
        user: '',
        site: '',
        case: '',
        category: 'Software',
        troubleshoot: '',
        solved: '',
        status: 'Open',
        files: []
    });

    const onDrop = useCallback(acceptedFiles => {
        // Logic for handling files (mock)
        const newFiles = acceptedFiles.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type
        }));
        setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleSubmit = (e) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                            {isNew ? 'New Support Ticket' : `Ticket #${formData.id || ''}`}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">Please fill in the details below</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6">
                    <form id="ticket-form" onSubmit={handleSubmit} className="space-y-6">

                        {/* 1. Basic Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Date</label>
                                <input
                                    type="date"
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                                    onChange={e => setFormData({ ...formData, date: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">PIC / User</label>
                                <input
                                    type="text"
                                    placeholder="Requester Name"
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    value={formData.user}
                                    onChange={e => setFormData({ ...formData, user: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Site / Location</label>
                                <input
                                    type="text"
                                    placeholder="e.g. HQ - Floor 2"
                                    required
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    value={formData.site}
                                    onChange={e => setFormData({ ...formData, site: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Category</label>
                                <select
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none dark:text-white"
                                    value={formData.category}
                                    onChange={e => setFormData({ ...formData, category: e.target.value })}
                                >
                                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                                </select>
                            </div>
                        </div>

                        {/* 2. Issue Details */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Case / Problem Description</label>
                            <textarea
                                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[80px] dark:text-white"
                                placeholder="Describe the issue in detail..."
                                required
                                value={formData.case}
                                onChange={e => setFormData({ ...formData, case: e.target.value })}
                            />
                        </div>

                        {/* 3. Tech Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Troubleshooting Steps</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] dark:text-white"
                                    placeholder="What steps have been taken?"
                                    value={formData.troubleshoot}
                                    onChange={e => setFormData({ ...formData, troubleshoot: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Root Cause / Solution</label>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none min-h-[100px] dark:text-white"
                                    placeholder="Steps to resolve or cause of issue..."
                                    value={formData.solved}
                                    onChange={e => setFormData({ ...formData, solved: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* 4. Files */}
                        <div>
                            <label className="block text-xs font-semibold uppercase text-slate-500 mb-1.5">Attachments</label>
                            <div {...getRootProps()} className={cn(
                                "border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center cursor-pointer transition-colors",
                                isDragActive ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : "hover:bg-slate-50 dark:hover:bg-slate-800"
                            )}>
                                <input {...getInputProps()} />
                                <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                                <p className="text-sm font-medium text-slate-700 dark:text-slate-300">
                                    {isDragActive ? "Drop files here" : "Click to upload or drag and drop"}
                                </p>
                                <p className="text-xs text-slate-500 mt-1">Images, PDF, Documents (Max 10MB)</p>
                            </div>

                            {/* File List */}
                            {formData.files.length > 0 && (
                                <div className="mt-4 space-y-2">
                                    {formData.files.map((file, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600">
                                                    <Paperclip className="w-4 h-4" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-slate-900 dark:text-white truncate max-w-[200px]">{file.name}</p>
                                                    <p className="text-xs text-slate-500">{file.size}</p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setFormData(prev => ({ ...prev, files: prev.files.filter((_, i) => i !== idx) }))}
                                                className="text-slate-400 hover:text-red-500"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* 5. Status */}
                        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">Status:</span>
                                <select
                                    className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-1.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none font-medium text-slate-700 dark:text-slate-200"
                                    value={formData.status}
                                    onChange={e => setFormData({ ...formData, status: e.target.value })}
                                >
                                    {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                    </form>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex justify-end gap-3">
                    <Button variant="secondary" onClick={onClose}>Cancel</Button>
                    <Button type="submit" form="ticket-form" className="shadow-blue-500/25">
                        {isNew ? 'Create Ticket' : 'Save Changes'}
                    </Button>
                </div>

            </motion.div>
        </div>
    );
}
