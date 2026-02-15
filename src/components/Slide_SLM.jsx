import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, ArrowRight, Zap, Database, Server } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide_SLM = () => {
    return (
        <SlideContainer className="bg-background relative overflow-hidden flex items-center justify-center">

            <div className="max-w-7xl w-full flex flex-col items-center gap-12 px-6">

                <div className="text-center space-y-4">
                    <h2 className="text-4xl md:text-5xl font-bold text-white">
                        The Model Paradigm Shift
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        With Multi-agent Systems, we can move from massive, general-purpose LLMs to efficient, task-specific SLMs.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full items-center">

                    {/* LEFT: SOTA LLMs */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#001229] border border-secondary/30 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-status-error/5 group-hover:bg-status-error/10 transition-colors"></div>

                        <div className="w-24 h-24 bg-status-error/20 rounded-full flex items-center justify-center border-2 border-status-error/50 shadow-[0_0_30px_rgba(255,77,77,0.3)]">
                            <Brain size={48} className="text-status-error" />
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">SOTA LLM based Monolithic Agent</h3>
                            <div className="flex gap-2 justify-center mb-4">
                                <span className="bg-white/10 px-2 py-1 rounded text-xs text-text-secondary">GPT-5.2</span>
                                <span className="bg-white/10 px-2 py-1 rounded text-xs text-text-secondary">Claude Opus</span>
                            </div>
                            <ul className="space-y-2 text-sm text-text-secondary text-left w-full pl-4">
                                <li className="flex items-center gap-2"><Brain size={14} className="text-status-error shrink-0" /> <span className="text-white font-bold">Complex Reasoning</span> (Planning, etc.)</li>
                                <li className="flex items-center gap-2"><Database size={14} className="text-status-error shrink-0" /> <span className="text-white font-bold">Broad General Knowledge</span></li>
                                <li className="flex items-start gap-2"><Zap size={14} className="shrink-0 mt-0.5" /> <span>Overkill for routine tasks (High Latency/Cost)</span></li>
                            </ul>
                        </div>
                    </motion.div>


                    {/* CENTER: Transition */}
                    <div className="flex flex-col items-center justify-center gap-4 text-primary">
                        <motion.div
                            animate={{ x: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                            transition={{ repeat: Infinity, duration: 2 }}
                        >
                            <ArrowRight size={48} />
                        </motion.div>
                        <span className="font-mono text-sm tracking-widest text-text-secondary uppercase text-center">
                            Distill into<br />Specialized Agents
                        </span>

                        <div className="mt-8 bg-white/5 border border-white/10 p-4 rounded-xl text-center max-w-sm">
                            <p className="text-sm italic text-text-secondary">
                                "We do not need high intelligence to summarize an email or extract data."
                            </p>
                        </div>
                    </div>


                    {/* RIGHT: Specialized SLMs */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="bg-[#001229] border border-primary/30 rounded-2xl p-8 flex flex-col items-center text-center space-y-6 shadow-2xl relative overflow-hidden group"
                    >
                        <div className="absolute inset-0 bg-primary/5 group-hover:bg-primary/10 transition-colors"></div>

                        <div className="grid grid-cols-2 gap-2 w-24 h-24 p-2 relative">
                            {[1, 2, 3, 4].map(i => (
                                <motion.div
                                    key={i}
                                    className="bg-primary/20 rounded-lg border border-primary/40 flex items-center justify-center"
                                    animate={{ scale: [1, 1.1, 1] }}
                                    transition={{ duration: 2, delay: i * 0.1, repeat: Infinity }}
                                >
                                    <Cpu size={20} className="text-primary" />
                                </motion.div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-2xl font-bold text-white mb-2">SLM powered Multi-Agent System</h3>
                            <div className="flex gap-2 justify-center mb-4">
                                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">NVIDIA Nemotron 3</span>
                                <span className="bg-primary/20 text-primary px-2 py-1 rounded text-xs">LFM 2.5</span>
                            </div>
                            <ul className="space-y-2 text-sm text-text-secondary text-left w-full pl-4">
                                <li className="flex items-center gap-2"><Cpu size={14} className="text-primary shrink-0" /> <span className="text-white font-bold">Routine Tasks</span> (Email, Data Extraction, etc.)</li>
                                <li className="flex items-center gap-2"><Server size={14} className="text-primary shrink-0" /> <span className="text-white font-bold">Same Reliability</span> for narrow tasks</li>
                                <li className="flex items-center gap-2"><Zap size={14} className="text-primary shrink-0" /> <span className="text-white font-bold">Ultra-Low Latency & Cost</span></li>

                            </ul>
                        </div>
                    </motion.div>

                </div>

            </div >

        </SlideContainer >
    );
};

export default Slide_SLM;
