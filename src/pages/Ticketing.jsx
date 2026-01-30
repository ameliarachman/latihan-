import React, { useState } from 'react';
import { Button } from '../components/ui/Button';
import { Plus, Search } from 'lucide-react';
import { TicketTable } from '../components/ticketing/TicketTable';
import { TicketModal } from '../components/ticketing/TicketModal';
import { generateId } from '../lib/utils';
import { motion } from 'framer-motion';
import { useData } from '../context/DataContext';

export default function Ticketing() {
    const { tickets, addTicket, updateTicket } = useData();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    // Handle opening modal for CREATE
    const handleCreate = () => {
        setSelectedTicket(null); // Reset selection
        setIsModalOpen(true);
    };

    // Handle saving (Create or Update) from Modal
    const handleSaveTicket = (ticketData) => {
        if (selectedTicket) {
            // Update existing via Context
            updateTicket(ticketData);
        } else {
            // Create new via Context
            const newTicket = {
                ...ticketData,
                id: generateId(),
                // Ensure fields are present
                status: ticketData.status || 'Open',
                date: ticketData.date || new Date().toISOString()
            };
            addTicket(newTicket);
        }
        setIsModalOpen(false);
    };

    // Handle inline updates from Table
    const handleInlineUpdate = (id, field, value) => {
        const ticketToUpdate = tickets.find(t => t.id === id);
        if (ticketToUpdate) {
            updateTicket({ ...ticketToUpdate, [field]: value });
        }
    };

    const handleView = (ticket) => {
        setSelectedTicket(ticket);
        setIsModalOpen(true);
    };

    const filteredTickets = tickets.filter(t =>
        (t.case?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (t.site?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (t.user?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div className="space-y-6 h-[calc(100vh-140px)] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 animate-fade-in">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Tickets Management</h2>
                    <p className="text-slate-500 dark:text-slate-400">Manage, track, and resolve support tickets.</p>
                </div>
                <div className="flex gap-3 w-full sm:w-auto">
                    <div className="relative flex-1 sm:flex-initial">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search tickets..."
                            className="pl-10 pr-4 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button onClick={handleCreate} className="shadow-blue-500/25 shadow-lg">
                        <Plus className="w-5 h-5" />
                        New Ticket
                    </Button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 bg-white dark:bg-slate-900 rounded-xl shadow-premium-shadow border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-colors"
            >
                <TicketTable
                    tickets={filteredTickets}
                    onUpdate={handleInlineUpdate}
                    onView={handleView}
                />
            </motion.div>

            {isModalOpen && (
                <TicketModal
                    ticket={selectedTicket}
                    onClose={() => setIsModalOpen(false)}
                    onSave={handleSaveTicket}
                />
            )}
        </div>
    );
}
