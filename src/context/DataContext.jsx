import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

const INITIAL_TEAM = [
    { id: 1, name: 'Sarah Wilson', role: 'Support Lead', email: 'sarah@company.com', phone: '+1 234 567 890', status: 'Online' },
    { id: 2, name: 'Mike Chen', role: 'Network Specialist', email: 'mike@company.com', phone: '+1 234 567 891', status: 'In Meeting' },
    { id: 3, name: 'Jessica Lee', role: 'Hardware Technician', email: 'jessica@company.com', phone: '+1 234 567 892', status: 'Offline' },
];

const INITIAL_TICKETS = [
    {
        id: '1',
        date: new Date().toISOString(),
        user: 'John Doe',
        site: 'Headquarters',
        case: 'Internet slow in Meeting Room A',
        category: 'Network',
        troubleshoot: 'Restarted AP, checked cable',
        solved: '',
        status: 'On Progress',
        files: [],
        history: []
    },
    {
        id: '2',
        date: new Date(Date.now() - 86400000).toISOString(),
        user: 'Jane Smith',
        site: 'Branch Office 1',
        case: 'Printer not responding',
        category: 'Hardware',
        troubleshoot: 'Checked paper tray, reinstalled driver',
        solved: 'Driver corruption, reinstalled latest version',
        status: 'Resolved',
        files: [],
        history: []
    }
];

export function DataProvider({ children }) {
    // Load from localStorage if available, else use defaults
    const [team, setTeam] = useState(() => {
        const saved = localStorage.getItem('mk_team');
        return saved ? JSON.parse(saved) : INITIAL_TEAM;
    });

    const [tickets, setTickets] = useState(() => {
        const saved = localStorage.getItem('mk_tickets');
        return saved ? JSON.parse(saved) : INITIAL_TICKETS;
    });

    // Save to localStorage whenever state changes
    useEffect(() => {
        localStorage.setItem('mk_team', JSON.stringify(team));
    }, [team]);

    useEffect(() => {
        localStorage.setItem('mk_tickets', JSON.stringify(tickets));
    }, [tickets]);

    // Team Actions
    const addMember = (member) => {
        setTeam([...team, { ...member, id: Date.now() }]);
    };

    const updateMember = (updatedMember) => {
        setTeam(team.map(m => m.id === updatedMember.id ? updatedMember : m));
    };

    const deleteMember = (id) => {
        setTeam(team.filter(m => m.id !== id));
    };

    // Ticket Actions
    const addTicket = (ticket) => {
        setTickets([ticket, ...tickets]);
    };

    const updateTicket = (updatedTicket) => {
        setTickets(tickets.map(t => t.id === updatedTicket.id ? updatedTicket : t));
    };

    const deleteTicket = (id) => {
        setTickets(tickets.filter(t => t.id !== id));
    };

    return (
        <DataContext.Provider value={{
            team, addMember, updateMember, deleteMember,
            tickets, addTicket, updateTicket, deleteTicket
        }}>
            {children}
        </DataContext.Provider>
    );
}

export const useData = () => useContext(DataContext);
