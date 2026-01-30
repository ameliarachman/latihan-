import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

export function formatDate(date) {
    return new Date(date).toLocaleDateString("id-ID", {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });
}
