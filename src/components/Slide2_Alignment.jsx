import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Terminal, Cpu, Zap, Activity, Info, X } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide2_Alignment = ({ isActive }) => {
    const [scale, setScale] = useState(1);
    const [data, setData] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [hasSeenPopup, setHasSeenPopup] = useState(false);

    useEffect(() => {
        if (isActive && !hasSeenPopup) {
            setShowPopup(true);
            setHasSeenPopup(true);
        }
    }, [isActive, hasSeenPopup]);

    // Generate chart data based on scale
    useEffect(() => {
        const newData = Array.from({ length: 10 }).map((_, i) => ({
            name: `T${i}`,
            cost: Math.max(10, 100 - (scale * 8) - (i * 2)), // Mock cost reduction
            latency: Math.max(5, 100 / scale), // Latency reduces with scale
        }));
        setData(newData);
    }, [scale]);

    return (
        <SlideContainer className="bg-background">
            <div className="w-full max-w-6xl flex flex-col items-center">
                <h2 className="text-4xl font-bold text-white mb-2">The Efficiency Simulator</h2>
                <p className="text-text-secondary mb-8">Simulate how the efficiency of the system changes with the number of agents when shifting from SOTA LLMs to task specific SLMs</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full mb-8">

                    {/* SOTA Monolith Terminal */}
                    <div className="bg-[#001229] border border-secondary/30 rounded-lg p-4 font-mono text-sm shadow-lg h-64 flex flex-col">
                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                            <Terminal size={16} className="text-status-alert" />
                            <span className="text-status-alert">Monolith_AI_Agent_SOTA_LLM</span>
                        </div>
                        <div className="flex-1 space-y-4">
                            <div className="flex justify-between text-xs text-text-secondary">
                                <span>Processing...</span>
                                <span>CPU: 98%</span>
                            </div>
                            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-status-alert"
                                    animate={{ x: ["-100%", "100%"] }}
                                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                                />
                            </div>
                            <div className="text-xs text-status-alert mt-4">
                                &gt; WARN: High Latency Detected<br />
                                &gt; WARN: Cost/Token limit exceeded<br />
                                &gt; PROCESSING REQUEST #8842...
                            </div>
                        </div>
                    </div>

                    {/* SLM Swarm Terminal */}
                    <div className="bg-[#001229] border border-secondary/30 rounded-lg p-4 font-mono text-sm shadow-lg h-64 flex flex-col relative overflow-hidden">
                        {/* Dynamic Scanline */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none animate-scanline"></div>

                        <div className="flex items-center gap-2 mb-4 border-b border-white/10 pb-2">
                            <Cpu size={16} className="text-primary" />
                            <span className="text-primary">SLM_Multi_Agent_System</span>
                            <span className="ml-auto text-xs bg-primary/20 px-2 py-0.5 rounded text-primary">Active Agents: {scale}</span>
                        </div>
                        <div className="flex-1 overflow-y-auto space-y-2 scrollbar-thin scrollbar-thumb-secondary/30">
                            {Array.from({ length: Math.min(scale, 8) }).map((_, i) => ( // Show max 8 bars to avoid clutter
                                <div key={i} className="flex flex-col gap-1">
                                    <div className="flex justify-between text-[10px] text-text-secondary">
                                        <span>Agent_0{i + 1}</span>
                                        <span className="text-primary">IDLE</span>
                                    </div>
                                    <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                                        <motion.div
                                            className="h-full bg-primary"
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{
                                                repeat: Infinity,
                                                duration: 2 / scale, // Speed increases with scale
                                                ease: "linear",
                                                delay: i * 0.1
                                            }}
                                        />
                                    </div>
                                </div>
                            ))}
                            {scale > 8 && <div className="text-xs text-text-secondary italic">... {scale - 8} more agents active</div>}
                        </div>
                    </div>
                </div>

                {/* Controls and Graph */}
                <div className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-6 flex flex-col md:flex-row gap-8">

                    <div className="w-full md:w-1/3 flex flex-col justify-center">
                        <label className="text-text-primary font-bold mb-2 flex items-center gap-2">
                            <Activity size={20} />
                            Scale Multi-Agent System
                        </label>
                        <input
                            type="range"
                            min="1"
                            max="20"
                            value={scale}
                            onChange={(e) => setScale(parseInt(e.target.value))}
                            className="w-full h-2 bg-secondary/30 rounded-lg appearance-none cursor-pointer accent-primary hover:accent-primary-hover transition-all"
                        />
                        <div className="flex justify-between text-xs text-text-secondary mt-2">
                            <span>1 Agent</span>
                            <span>20 Agents</span>
                        </div>
                        <div className="mt-6 space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Est. Cost:</span>
                                <span className="text-primary font-bold">${(100 / scale).toFixed(2)}/hr</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Latency:</span>
                                <span className="text-primary font-bold">{(1200 / scale).toFixed(0)}ms</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full md:w-2/3 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={data}>
                                <XAxis dataKey="name" stroke="#A0C4FF" opacity={0.5} fontSize={12} />
                                <YAxis stroke="#A0C4FF" opacity={0.5} fontSize={12} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#000B1A', borderColor: '#0070AD', color: '#FFF' }}
                                    itemStyle={{ color: '#00D2FF' }}
                                />
                                <Line type="monotone" dataKey="cost" stroke="#FF4D4D" strokeWidth={2} dot={false} name="Cost" />
                                <Line type="monotone" dataKey="latency" stroke="#00D2FF" strokeWidth={2} dot={false} name="Latency" />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                </div>

                {/* Context Popup */}
                <AnimatePresence>
                    {showPopup && (
                        <div className="absolute inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                                className="bg-[#001229] border border-primary/50 p-6 rounded-2xl shadow-2xl max-w-md w-full relative overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>

                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="absolute top-4 right-4 text-text-secondary hover:text-white transition-colors"
                                >
                                    <X size={20} />
                                </button>

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="p-3 bg-primary/20 rounded-lg text-primary">
                                        <Info size={24} />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1">Cost Efficiency Simulation</h3>
                                        <p className="text-sm text-primary/80 font-mono">Comparing Architectures</p>
                                    </div>
                                </div>

                                <p className="text-text-secondary mb-6 leading-relaxed">
                                    This interactive simulation demonstrates the <span className="text-white font-semibold">cost and latency advantages</span> of a Multi-Agent System using specialized SLMs compared to a monolithic SOTA Large Language Model.
                                </p>

                                <button
                                    onClick={() => setShowPopup(false)}
                                    className="w-full py-3 bg-primary hover:bg-primary-hover text-[#000B1A] font-bold rounded-lg transition-all shadow-[0_0_20px_rgba(0,210,255,0.3)] hover:shadow-[0_0_30px_rgba(0,210,255,0.5)]"
                                >
                                    Explore Simulation
                                </button>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

            </div>
        </SlideContainer>
    );
};

export default Slide2_Alignment;
