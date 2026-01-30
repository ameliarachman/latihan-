import React, { useCallback, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, FileText, Image, Paperclip, Save } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { Button } from '../ui/Button';
import { cn } from '../../lib/utils';

export function TicketModal({ ticket, onClose, onSave }) {
    // Initialize state. If ticket is null, we are creating a new one.
    const [formData, setFormData] = useState({
        id: '',
        date: new Date().toISOString().split('T')[0], // Default today
        user: '',
        site: '',
        category: 'Hardware', // Default
        case: '',
        troubleshoot: '',
        solved: '',
        status: 'Open',
        files: []
    });

    useEffect(() => {
        if (ticket) {
            setFormData({
                ...ticket,
                date: ticket.date ? ticket.date.split('T')[0] : new Date().toISOString().split('T')[0]
            });
        }
    }, [ticket]);

    const handleChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const onDrop = useCallback((acceptedFiles) => {
        const newFiles = acceptedFiles.map(file => ({
            name: file.name,
            size: (file.size / 1024).toFixed(2) + ' KB',
            type: file.type,
            preview: URL.createObjectURL(file)
        }));
        setFormData(prev => ({ ...prev, files: [...prev.files, ...newFiles] }));
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
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
                    className="relative w-full max-w-4xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] border border-slate-200 dark:border-slate-800"
                >
                    {/* Header */}
                    <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                        <div>
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                                {ticket ? `Edit Ticket #${ticket.id}` : 'Create New Ticket'}
                            </h3>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                {ticket ? 'Update ticket details and status' : 'Fill in the information below to create a ticket'}
                            </p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-700">
                        {/* Main Info Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-5">
                                <div className="form-group">
                                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">Date</label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => handleChange('date', e.target.value)}
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                                <div className="form-group">
                                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">Reported By (User)</label>
                                    <input
                                        type="text"
                                        value={formData.user}
                                        onChange={(e) => handleChange('user', e.target.value)}
                                        placeholder="Enter username..."
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    />
                                </div>
                            </div>

                            <div className="space-y-5">
                                <div className="form-group">
                                    <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">Site / Location</label>
                                    <input
                                        type="text"
                                        value={formData.site}
                                        onChange={(e) => handleChange('site', e.target.value)}
                                        placeholder="e.g. HQ, Warehouse..."
                                        className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="form-group">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">Category</label>
                                        <select
                                            value={formData.category}
                                            onChange={(e) => handleChange('category', e.target.value)}
                                            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white"
                                        >
                                            {['Hardware', 'Software', 'Network', 'Access', 'General'].map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div className="form-group">
                                        <label className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1.5 block">Status</label>
                                        <select
                                            value={formData.status}
                                            onChange={(e) => handleChange('status', e.target.value)}
                                            className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all dark:text-white font-medium"
                                        >
                                            <option value="Open">Open</option>
                                            <option value="On Progress">On Progress</option>
                                            <option value="Pending">Pending</option>
                                            <option value="Resolved">Resolved</option>
                                            <option value="Closed">Closed</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Content Sections */}
                        <div className="space-y-6">
                            <div>
                                <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Case Description</h4>
                                <textarea
                                    className="w-full bg-slate-50 dark:bg-slate-800 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm leading-relaxed border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
                                    rows={3}
                                    value={formData.case}
                                    onChange={(e) => handleChange('case', e.target.value)}
                                    placeholder="Describe the issue in detail..."
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Troubleshooting Steps</h4>
                                    <textarea
                                        className="w-full bg-amber-50/50 dark:bg-amber-900/10 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm border border-amber-100 dark:border-amber-900/30 focus:border-amber-400 focus:ring-0 transition-all font-mono"
                                        rows={4}
                                        value={formData.troubleshoot}
                                        onChange={(e) => handleChange('troubleshoot', e.target.value)}
                                        placeholder="Steps taken to diagnose..."
                                    />
                                </div>
                                <div>
                                    <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Root Cause / Solution</h4>
                                    <textarea
                                        className="w-full bg-emerald-50/50 dark:bg-emerald-900/10 p-4 rounded-xl text-slate-700 dark:text-slate-300 text-sm border border-emerald-100 dark:border-emerald-900/30 focus:border-emerald-400 focus:ring-0 transition-all font-mono"
                                        rows={4}
                                        value={formData.solved}
                                        onChange={(e) => handleChange('solved', e.target.value)}
                                        placeholder="Final solution explanation..."
                                    />
                                </div>
                            </div>
                        </div>

                        {/* File Upload Section */}
                        <div>
                            <h4 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                                <Paperclip className="w-4 h-4" /> Attachments
                            </h4>

                            <div
                                {...getRootProps()}
                                className={cn(
                                    "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                                    isDragActive
                                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600 bg-slate-50/50 dark:bg-slate-800/50"
                                )}
                            >
                                <input {...getInputProps()} />
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-blue-100 dark:bg-slate-800 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                        <Upload className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">Click to upload or drag and drop</p>
                                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Images, Documents, PDFs (max. 10MB)</p>
                                    </div>
                                </div>
                            </div>

                            {/* File List */}
                            {formData.files && formData.files.length > 0 && (
                                <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-4">
                                    {formData.files.map((file, idx) => (
                                        <div key={idx} className="relative group rounded-lg border border-slate-200 dark:border-slate-700 p-2 flex items-center gap-3 bg-white dark:bg-slate-800 hover:shadow-md transition-all">
                                            <div className="w-10 h-10 rounded bg-slate-100 dark:bg-slate-700 flex items-center justify-center text-slate-500 dark:text-slate-400 flex-shrink-0">
                                                {file.type.includes('image') ? <Image className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-slate-700 dark:text-slate-200 truncate">{file.name}</p>
                                                <p className="text-xs text-slate-400">{file.size}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 flex justify-end gap-3">
                        <Button variant="secondary" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSubmit} className="shadow-lg shadow-blue-500/20">
                            <Save className="w-4 h-4" />
                            {ticket ? 'Save Changes' : 'Create Ticket'}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
