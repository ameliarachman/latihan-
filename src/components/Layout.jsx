import React, { useState } from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Ticket,
    Menu,
    Bell,
    User as UserIcon,
    Settings,
    FileBarChart,
    Users,
    Moon,
    Sun,
    LogOut,
    HelpCircle,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../lib/utils';
import { useTheme } from './ThemeProvider';

export default function Layout() {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const location = useLocation();
    const { theme, toggleTheme } = useTheme();

    const toggleSidebar = () => setSidebarOpen(!isSidebarOpen);

    const navItems = [
        { path: '/', label: 'Overview', icon: LayoutDashboard },
        { path: '/tickets', label: 'Tickets', icon: Ticket },
        { path: '/reports', label: 'Reports', icon: FileBarChart, badge: 'New' },
        { path: '/team', label: 'Team', icon: Users },
    ];

    const bottomNavItems = [
        { path: '/settings', label: 'Settings', icon: Settings },
        { path: '/help', label: 'Help Center', icon: HelpCircle },
    ];

    const pageTitle = [...navItems, ...bottomNavItems].find(item => item.path === location.pathname)?.label || 'Dashboard';

    return (
        <div className="flex h-screen bg-slate-50 dark:bg-slate-950 overflow-hidden font-sans transition-colors duration-300">
            {/* Mobile Sidebar Overlay */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSidebarOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    />
                )}
            </AnimatePresence>

            {/* Sidebar */}
            <motion.aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 lg:relative lg:translate-x-0 transition-transform duration-300 ease-in-out",
                    isSidebarOpen ? "translate-x-0" : "-translate-x-full",
                    "bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 shadow-2xl lg:shadow-none flex flex-col z-50"
                )}
            >
                {/* Logo Section */}
                <div className="h-20 flex items-center px-8 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
                            MK
                        </div>
                        <div>
                            <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                                TicketFlow
                            </span>
                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Mktech</p>
                        </div>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-8 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
                    <div>
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Main Menu</p>
                        <nav className="space-y-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden",
                                            isActive
                                                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                                        )
                                    }
                                >
                                    <item.icon className={cn("w-5 h-5 transition-colors", ({ isActive }) => isActive ? "text-white" : "text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300")} />
                                    <span className="font-medium relative z-10">{item.label}</span>
                                    {item.badge && (
                                        <span className="ml-auto px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500 text-white shadow-sm">
                                            {item.badge}
                                        </span>
                                    )}
                                </NavLink>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <p className="px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Support</p>
                        <nav className="space-y-1">
                            {bottomNavItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    onClick={() => setSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        cn(
                                            "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                                            isActive
                                                ? "bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white"
                                                : "text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                                        )
                                    }
                                >
                                    <item.icon className="w-5 h-5 text-slate-400 group-hover:text-slate-600 dark:text-slate-500 dark:group-hover:text-slate-300" />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>

                {/* User User & Theme */}
                <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white shadow-md">
                            <UserIcon className="w-5 h-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900 dark:text-white truncate">Admin User</p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 truncate">IT Support Lead</p>
                        </div>
                        <NavLink to="/login" className="text-slate-400 hover:text-red-500 transition-colors" title="Sign Out">
                            <LogOut className="w-5 h-5" />
                        </NavLink>
                    </div>
                </div>
            </motion.aside>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Header */}
                <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 flex items-center justify-between px-4 lg:px-8 z-30 sticky top-0 transition-colors duration-300">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={toggleSidebar}
                            className="p-2 -ml-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden"
                        >
                            <Menu className="w-6 h-6" />
                        </button>
                        <div className="flex flex-col">
                            <h1 className="text-xl font-bold text-slate-800 dark:text-white hidden sm:block">
                                {pageTitle}
                            </h1>
                            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
                                Overview of your helpdesk activities
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-2 sm:gap-4 relative">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2.5 rounded-full text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-colors relative group"
                        >
                            {theme === 'dark' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                        </button>

                        <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 mx-2 hidden sm:block"></div>

                        {/* Notification Bell */}
                        <div className="relative">
                            <button
                                onClick={() => setShowNotifications(!showNotifications)}
                                className="p-2 text-slate-500 hover:text-blue-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-all relative"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
                            </button>

                            {/* Notification Dropdown */}
                            <AnimatePresence>
                                {showNotifications && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-3 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 overflow-hidden z-50 origin-top-right"
                                    >
                                        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
                                            <h3 className="font-bold text-slate-900 dark:text-white">Notifications</h3>
                                            <button onClick={() => setShowNotifications(false)} className="text-slate-400 hover:text-slate-600">
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <div className="max-h-[300px] overflow-y-auto">
                                            {[1, 2, 3].map((_, i) => (
                                                <div key={i} className="p-4 border-b border-slate-50 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer relative">
                                                    <div className="flex gap-3">
                                                        <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 shrink-0"></div>
                                                        <div>
                                                            <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">New Ticket Assigned</p>
                                                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Ticket #1245 has been assigned to you by Admin.</p>
                                                            <p className="text-[10px] text-slate-400 mt-2">2 hours ago</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="p-3 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 text-center">
                                            <button className="text-sm font-semibold text-blue-600 hover:underline">Mark all as read</button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </header>

                {/* Content Area */}
                <div className="flex-1 overflow-auto p-4 lg:p-8 scroll-smooth bg-slate-50 dark:bg-slate-950 bg-grid-pattern relative">
                    <div className="max-w-7xl mx-auto space-y-8 pb-10">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
}
