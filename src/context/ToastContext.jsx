import React, { createContext, useContext, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import { cn } from '../lib/utils';

const ToastContext = createContext();

export function ToastProvider({ children }) {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback(({ title, description, type = 'success' }) => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts((prev) => [...prev, { id, title, description, type }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 5000);
    }, []);

    const removeToast = (id) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed top-4 right-4 z-[100] flex flex-col gap-2 w-full max-w-sm pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, y: -20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                            layout
                            className={cn(
                                "pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-lg border backdrop-blur-md",
                                toast.type === 'success'
                                    ? "bg-white/90 dark:bg-slate-900/90 border-emerald-100 dark:border-emerald-900/30 text-emerald-900 dark:text-emerald-100"
                                    : "bg-white/90 dark:bg-slate-900/90 border-red-100 dark:border-red-900/30 text-red-900 dark:text-red-100"
                            )}
                        >
                            <div className={cn(
                                "shrink-0 mt-0.5 w-6 h-6 rounded-full flex items-center justify-center",
                                toast.type === 'success' ? "bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600" : "bg-red-100 dark:bg-red-900/50 text-red-600"
                            )}>
                                {toast.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                            </div>
                            <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-sm text-slate-900 dark:text-white">{toast.title}</h4>
                                {toast.description && (
                                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">{toast.description}</p>
                                )}
                            </div>
                            <button onClick={() => removeToast(toast.id)} className="shrink-0 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                                <X className="w-4 h-4" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
}

export const useToast = () => useContext(ToastContext);
