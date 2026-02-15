import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, Mail, RotateCcw } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide6_Summary = () => {
    const takeaways = [
        "From Monoliths to Multi-Agent-Systems",
        "Higher Efficiency with lower Cost using Small Language Models",
        "Orchestrated Reliability and Real-World Alignment",
        "Built-in Governance and Guardrails"
    ];

    return (
        <SlideContainer className="bg-background relative overflow-hidden flex items-center justify-center">
            {/* Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
            </div>

            <div className="max-w-4xl w-full z-10 px-6 md:px-0 flex flex-col items-center text-center">
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-bold text-white mb-4"
                >
                    The Future of <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] to-primary">Reliable AI</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-text-secondary mb-12 max-w-2xl"
                >
                    Make it real.
                </motion.p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl mb-12 text-left">
                    {takeaways.map((point, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                            className="flex items-center gap-3 bg-white/5 border border-white/10 p-4 rounded-xl backdrop-blur-sm"
                        >
                            <CheckCircle className="text-secondary w-6 h-6 shrink-0" />
                            <span className="text-white font-medium">{point}</span>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="flex flex-col items-center gap-4"
                >
                    <p className="text-text-secondary text-sm uppercase tracking-widest">Ready to Scale?</p>
                    <a
                        href="mailto:contact@capgemini.com"
                        className="group relative px-8 py-4 bg-primary text-background font-bold rounded-full flex items-center gap-3 hover:bg-white transition-all shadow-[0_0_30px_rgba(0,210,255,0.4)]"
                    >
                        <Mail className="w-5 h-5" />
                        <span>Connect with Capgemini</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </a>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 1 }}
                >
                    <button
                        onClick={() => window.location.reload()}
                        className="mt-8 px-6 py-2 text-sm text-secondary hover:text-white border border-secondary/30 hover:border-white/50 rounded-full transition-all flex items-center gap-2"
                    >
                        <RotateCcw className="w-4 h-4" />
                        <span>Restart Demonstration</span>
                    </button>
                </motion.div>

                <div className="absolute bottom-8 text-xs text-text-secondary opacity-50">
                    Capgemini AI Lab - All Rights Reserved © 2026 F. Gwinner
                </div>
            </div>
        </SlideContainer>
    );
};

export default Slide6_Summary;
