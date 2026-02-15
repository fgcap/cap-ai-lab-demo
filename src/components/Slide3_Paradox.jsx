import React from 'react';
import { motion } from 'framer-motion';
import { Info, AlertTriangle } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide3_Paradox = () => {
    return (
        <SlideContainer className="bg-background relative overflow-hidden flex items-center justify-center">

            {/* Background Ambience */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-status-alert/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            <div className="max-w-4xl z-10 relative px-6 md:px-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center space-y-4 mb-12"
                >
                    <h2 className="text-5xl md:text-7xl font-bold text-white opacity-90">
                        The Oversight Paradox
                    </h2>
                    <p className="text-xl text-text-secondary max-w-3xl mx-auto">
                        Moving to task-specific intelligence does create a critical challenge: maintaining meaningful human oversight in a system that operates at a scale far beyond human cognitive capacity.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-6"
                    >
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg">
                                <Info className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">The Human Bottleneck</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Current systems rely on "Human-in-the-loop" as a safety net.
                                    However, as AI scale increases exponentially, human cognitive throughput remains constant.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-status-alert/10 rounded-lg">
                                <AlertTriangle className="text-status-alert w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">The Rubber Stamp Effect</h3>
                                <p className="text-text-secondary leading-relaxed">
                                    Unable to process the volume of decisions, human oversight degrades into
                                    <span className="text-status-alert"> reflexive approval</span>.
                                    We aren't guiding the AI; we are merely slowing it down.
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="relative h-64 md:h-80 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center justify-center overflow-hidden backdrop-blur-md"
                    >
                        {/* Abstract Visualization of the Paradox */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#000B1A]/80 z-0"></div>

                        <div className="z-10 text-center space-y-4">
                            <div className="text-6xl font-bold text-white tracking-tighter">
                                1 <span className="text-text-secondary text-2xl font-normal">Human</span>
                            </div>
                            <div className="w-px h-8 bg-white/20 mx-auto"></div>
                            <div className="text-6xl font-bold text-primary tracking-tighter">
                                1M <span className="text-text-secondary text-2xl font-normal">Agents</span>
                            </div>
                        </div>

                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-status-alert to-status-error"
                            animate={{ width: ["0%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity }}
                        />
                    </motion.div>
                </div>
            </div>
        </SlideContainer>
    );
};

export default Slide3_Paradox;
