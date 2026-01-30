import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { HelpCircle, MessageCircle, FileText, Phone } from 'lucide-react';

export default function HelpCenter() {
    return (
        <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
            <div className="text-center py-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl text-white shadow-xl shadow-blue-500/20">
                <h2 className="text-3xl font-bold mb-3">How can we help you?</h2>
                <p className="text-blue-100 max-w-lg mx-auto">Search our knowledge base or get in touch with our support team.</p>

                <div className="max-w-xl mx-auto mt-8 px-4">
                    <input
                        type="text"
                        placeholder="Search articles..."
                        className="w-full py-4 px-6 rounded-full bg-white/20 backdrop-blur-md placeholder-blue-100/70 border border-white/30 text-white focus:outline-none focus:bg-white/30 transition-all font-medium"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="hover:border-blue-400 dark:hover:border-blue-700 cursor-pointer text-center py-8">
                    <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <FileText className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Documentation</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-6">Detailed guides and API references for developers.</p>
                    <Button variant="ghost" className="text-blue-600">Browse Docs</Button>
                </Card>

                <Card className="hover:border-green-400 dark:hover:border-green-700 cursor-pointer text-center py-8">
                    <div className="w-14 h-14 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <MessageCircle className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Live Chat</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-6">Chat with our support team in real-time.</p>

                    {/* WhatsApp Integration */}
                    <a href="https://www.whatsapp.com" target="_blank" rel="noopener noreferrer">
                        <Button className="bg-[#25D366] hover:bg-[#128C7E] border-none text-white shadow-green-500/20">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" className="w-4 h-4 mr-2" />
                            Chat on WhatsApp
                        </Button>
                    </a>
                </Card>

                <Card className="hover:border-purple-400 dark:hover:border-purple-700 cursor-pointer text-center py-8">
                    <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Phone className="w-7 h-7" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Phone Support</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4 px-6">24/7 dedicated support line for enterprise.</p>
                    <Button variant="ghost" className="text-purple-600">View Numbers</Button>
                </Card>
            </div>

            <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Frequently Asked Questions</h3>
                {['How do I reset my password?', 'Can I export reports to PDF?', 'How to add a new team member?'].map((faq, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 rounded-xl flex justify-between items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                        <span className="font-medium text-slate-700 dark:text-slate-200">{faq}</span>

                    </div>
                ))}
            </div>
        </div>
    );
}
