import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HelpCircle, MessageCircle, FileText, Phone, ChevronDown, ChevronUp, Search, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQS = [
    {
        id: 1,
        question: 'How do I reset my password?',
        answer: 'To reset your password, visit the login page and click on "Forgot Password". Follow the instructions sent to your email address.'
    },
    {
        id: 2,
        question: 'Can I export reports to PDF?',
        answer: 'Currently we support CSV export which can be opened in Excel or Google Sheets. PDF export is coming in the next update.'
    },
    {
        id: 3,
        question: 'How to add a new team member?',
        answer: 'Navigate to the Team page from the sidebar. Click on the "Add Member" button at the top right, fill in the details, and save.'
    },
    {
        id: 4,
        question: 'How to change the ticket status?',
        answer: 'You can change the ticket status directly from the ticket table using the dropdown, or by opening the ticket details view.'
    }
];

export default function HelpCenter() {
    const [openFaq, setOpenFaq] = useState(null);
    const [showPhoneModal, setShowPhoneModal] = useState(false);

    const toggleFaq = (id) => {
        setOpenFaq(openFaq === id ? null : id);
    };

    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-10">
            <div className="text-center py-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20 px-6">
                <h2 className="text-3xl font-bold mb-3">How can we help you?</h2>
                <p className="text-blue-100 max-w-lg mx-auto">Search our knowledge base or get in touch with our support team.</p>

                <div className="max-w-xl mx-auto mt-8 relative">
                    <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-blue-200" />
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full py-4 pl-12 pr-6 rounded-full bg-white/20 backdrop-blur-md placeholder-blue-100/70 border border-white/30 text-white focus:outline-none focus:bg-white/30 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


                <Card className="hover:border-green-400 dark:hover:border-green-700 cursor-pointer text-center py-8 group transition-all">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <MessageCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Live Chat</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-6">Chat with our support team in real-time.</p>

                    {/* WhatsApp Integration */}
                    <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <Button className="mx-auto bg-[#25D366] hover:bg-[#128C7E] border-none text-white shadow-green-500/20">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-4 h-4 mr-2" />
                            Chat on WhatsApp
                        </Button>
                    </a>
                </Card>

                <Card className="hover:border-purple-400 dark:hover:border-purple-700 cursor-pointer text-center py-8 group transition-all">
                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <Phone className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Phone Support</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-6">24/7 dedicated support line for enterprise.</p>

                    <Button className="mx-auto bg-purple-700 hover:bg-purple-800 border-none text-white shadow-green-500/20" onClick={() => setShowPhoneModal(true)}>
                        View Numbers
                    </Button>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
                <div className="space-y-3">
                    {FAQS.map((faq) => (
                        <div
                            key={faq.id}
                            className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleFaq(faq.id)}
                                className="w-full text-left p-4 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                            >
                                <span className="font-medium text-slate-700 dark:text-slate-200">{faq.question}</span>
                                {openFaq === faq.id ? (
                                    <ChevronUp className="w-5 h-5 text-slate-400" />
                                ) : (
                                    <ChevronDown className="w-5 h-5 text-slate-400" />
                                )}
                            </button>
                            <AnimatePresence>
                                {openFaq === faq.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-4 pt-0 text-sm text-slate-500 dark:text-slate-400 leading-relaxed border-t border-slate-50 dark:border-slate-800/50">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>
            </div>

            {/* Phone Modal */}
            <AnimatePresence>
                {showPhoneModal && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowPhoneModal(false)}
                            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl"
                        >
                            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Support Hotline</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">General Support</p>
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">085716712159</p>
                                    </div>
                                    <Phone className="w-5 h-5 text-blue-500" />
                                </div>
                                <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                                    <div>
                                        <p className="text-xs text-slate-500 uppercase font-semibold">Technical Issues</p>
                                        <p className="text-lg font-bold text-slate-800 dark:text-white">085891127883</p>
                                    </div>
                                    <Phone className="w-5 h-5 text-purple-500" />
                                </div>
                            </div>
                            <Button onClick={() => setShowPhoneModal(false)} className="w-full mt-6">
                                Close
                            </Button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
