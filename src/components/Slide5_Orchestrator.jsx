import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Brain, Lock, Wifi, Scale, GitMerge, X, Zap, Activity, Layers, Cpu, Eye } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide5_Orchestrator = () => {
    const [selectedAgent, setSelectedAgent] = useState(null);
    const [activeFeature, setActiveFeature] = useState(0); // Default to first feature

    const agents = [
        {
            id: 'ethics',
            name: 'Ethics Guard',
            icon: Shield,
            color: '#FFC300',
            logs: [
                '[10:00:01] Scanning prompt for bias...',
                '[10:00:02] DETECTED: Potential stereotype in query.',
                '[10:00:02] ACTION: Append system prompt #42 (Fairness).',
                '[10:00:03] STATUS: Approved for inference.'
            ]
        },
        {
            id: 'logic',
            name: 'Logic Filter',
            icon: Brain,
            color: '#00D2FF',
            logs: [
                '[10:00:05] Analyzing reasoning chain...',
                '[10:00:06] VERIFYING: "A implies B"',
                '[10:00:06] ERROR: Logical fallacy detected (Circular Dependency).',
                '[10:00:07] ACTION: Request re-reasoning from Model-Beta.'
            ]
        },
        {
            id: 'privacy',
            name: 'Privacy Sentry',
            icon: Lock,
            color: '#0070AD',
            logs: [
                '[10:00:10] Scanning for PII...',
                '[10:00:10] DETECTED: SSN pattern match.',
                '[10:00:10] ACTION: Redact [###-##-####].',
                '[10:00:11] STATUS: Data sanitized for transmission.'
            ]
        },
        {
            id: 'edge',
            name: 'Edge Compute',
            icon: Wifi,
            color: '#A0C4FF',
            logs: [
                '[10:00:15] Checking network latency...',
                '[10:00:15] STATUS: High latency on Cloud-East.',
                '[10:00:15] ACTION: Route request to Local Device (NPU).',
                '[10:00:16] RESULT: Inference time < 50ms.'
            ]
        },
        {
            id: 'alignment',
            name: 'Alignment Monitor',
            icon: Scale,
            color: '#FF4D4D',
            logs: [
                '[10:00:20] Monitoring goal congruency...',
                '[10:00:20] ALERT: Sub-goal deviation detected.',
                '[10:00:21] ACTION: Reinforcement Learning penalty applied.',
                '[10:00:21] STATUS: Agent behavior realigned.'
            ]
        },
    ];

    const features = [
        {
            id: 'coordination',
            icon: GitMerge,
            title: "Coordination & Control",
            description: "Multiple specialized agents require centralized management to ensure they work together harmoniously toward shared goals."
        },
        {
            id: 'guardrails',
            icon: Shield,
            title: "Guardrails & Safety",
            description: "Orchestrators enforce ethical boundaries, privacy protection, and alignment monitoring across all agent interactions."
        },
        {
            id: 'resource',
            icon: Cpu,
            title: "Resource Management",
            description: "Intelligent routing, load balancing, and compute optimization ensure efficient use of edge and cloud resources."
        },
        {
            id: 'qa',
            icon: Activity,
            title: "Quality Assurance",
            description: "Logic verification, bias detection, and reasoning validation maintain high standards across all agent outputs."
        },
        {
            id: 'scale',
            icon: Layers,
            title: "Scalability",
            description: "As agent teams grow, orchestrators provide the infrastructure to manage complexity without exponential overhead."
        }
    ];

    return (
        <SlideContainer className="bg-background relative overflow-hidden flex flex-col items-center justify-start pt-12 md:pt-20">

            {/* Background Ambience similar to Slide 3 */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#00D2FF]/5 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="w-full max-w-7xl mx-auto px-6 z-10 flex flex-col h-full">

                {/* Header Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-8"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-4">
                        The Orchestrator
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        To transition from isolated AI use cases to Reliable AI at Massive Scale, we need a central nervous system.
                    </p>
                </motion.div>

                <div className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16">

                    {/* Left Side - Interactive Information features */}
                    <div className="flex-1 w-full max-w-md">
                        <h3 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-2">
                            AI Systems Engineering
                        </h3>

                        <div className="space-y-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={feature.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    onMouseEnter={() => setActiveFeature(index)}
                                    className={`group p-4 rounded-xl border transition-all duration-300 cursor-pointer ${activeFeature === index
                                        ? 'bg-primary/10 border-primary/50 shadow-[0_0_20px_rgba(0,210,255,0.15)]'
                                        : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
                                        }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2 rounded-lg transition-colors ${activeFeature === index ? 'bg-primary/20 text-primary' : 'bg-white/5 text-text-secondary group-hover:text-white'
                                            }`}>
                                            <feature.icon size={24} />
                                        </div>
                                        <div>
                                            <h4 className={`font-bold text-lg transition-colors ${activeFeature === index ? 'text-white' : 'text-text-secondary group-hover:text-white'
                                                }`}>
                                                {feature.title}
                                            </h4>
                                        </div>
                                    </div>

                                    {/* Expandable Description Area */}
                                    <div className={`grid transition-all duration-300 ease-in-out ${activeFeature === index ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                                        }`}>
                                        <div className="overflow-hidden">
                                            <p className="text-sm text-text-secondary pl-[56px] leading-relaxed">
                                                {feature.description}
                                            </p>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right Side - Animation (Preserved & Adjusted) */}
                    <div className="relative w-[500px] h-[500px] flex items-center justify-center flex-shrink-0 scale-90 md:scale-100">

                        {/* Connection Lines */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            {agents.map((agent, i) => {
                                const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
                                const x = 250 + Math.cos(angle) * 180;
                                const y = 250 + Math.sin(angle) * 180;
                                return (
                                    <motion.line
                                        key={`line-${agent.id}`}
                                        x1="250" y1="250" x2={x} y2={y}
                                        stroke={agent.color}
                                        strokeWidth="2"
                                        strokeOpacity="0.3"
                                        initial={{ pathLength: 0 }}
                                        whileInView={{ pathLength: 1 }}
                                        transition={{ duration: 1, delay: 0.5 }}
                                    />
                                );
                            })}
                        </svg>

                        {/* Central Orchestrator */}
                        <motion.div
                            className="absolute w-32 h-32 bg-[#001229] border-4 border-primary rounded-full flex flex-col items-center justify-center z-20 shadow-[0_0_50px_rgba(0,210,255,0.3)] cursor-pointer"
                            style={{
                                left: '50%',
                                top: '50%',
                                marginLeft: -64,
                                marginTop: -64
                            }}
                            whileHover={{ scale: 1.1 }}
                            onClick={() => setSelectedAgent(null)}
                        >
                            <GitMerge size={40} className="text-primary mb-1" />
                            <span className="text-[10px] font-bold text-text-primary tracking-widest uppercase">Orchestrator</span>
                        </motion.div>

                        {/* Satellite Agents */}
                        {agents.map((agent, i) => {
                            const angle = (i / agents.length) * Math.PI * 2 - Math.PI / 2;
                            const radius = 180;
                            const x = Math.cos(angle) * radius; // Relative to center 0,0
                            const y = Math.sin(angle) * radius;

                            // We need absolute positioning within the 500x500 container
                            const absoluteX = 250 + x - 48; // Center (250) + Offset (x) - HalfWidth (48)
                            const absoluteY = 250 + y - 48;

                            return (
                                <motion.div
                                    key={agent.id}
                                    className="absolute w-24 h-24 bg-[#001229] border-2 rounded-xl flex flex-col items-center justify-center z-20 cursor-pointer shadow-lg hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-shadow"
                                    style={{
                                        borderColor: agent.color,
                                        left: absoluteX,
                                        top: absoluteY,
                                    }}
                                    whileHover={{ scale: 1.15, rotate: 5 }}
                                    onClick={() => setSelectedAgent(agent)}
                                >
                                    <agent.icon size={28} color={agent.color} className="mb-2" />
                                    <span className="text-[10px] text-text-secondary text-center leading-tight px-1">{agent.name}</span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Agent Detail Modal/Panel (Preserved functionality) */}
            <AnimatePresence>
                {selectedAgent && (
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        className="absolute right-8 top-1/2 -translate-y-1/2 w-80 bg-[#001229]/95 border border-white/10 backdrop-blur-md rounded-xl p-6 shadow-2xl z-30"
                    >
                        <div className="flex justify-between items-center mb-4">
                            <div className="flex items-center gap-3">
                                <selectedAgent.icon size={24} color={selectedAgent.color} />
                                <h3 className="font-bold text-lg text-text-primary">{selectedAgent.name}</h3>
                            </div>
                            <button onClick={() => setSelectedAgent(null)} className="text-text-secondary hover:text-white">
                                <X size={20} />
                            </button>
                        </div>

                        <div className="space-y-3 font-mono text-xs">
                            <div className="text-text-secondary uppercase tracking-wider mb-2 border-b border-white/10 pb-1">Trusted Principles Log</div>
                            {selectedAgent.logs.map((log, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-2 bg-white/5 rounded border-l-2"
                                    style={{ borderLeftColor: selectedAgent.color }}
                                >
                                    {log}
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

        </SlideContainer>
    );
};

export default Slide5_Orchestrator;
