import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideContainer from './SlideContainer';

const Slide1_Narrative = ({ isActive, onNext }) => {
    const [hasExploded, setHasExploded] = useState(false);

    // Reset animation when slide is not active
    useEffect(() => {
        if (!isActive) {
            setHasExploded(false);
        }
    }, [isActive]);

    // Generate 12 nodes for the swarm
    const swarmNodes = Array.from({ length: 12 }).map((_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 150; // Distance from center
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            id: i,
        };
    });

    const handleClick = () => {
        if (hasExploded) {
            if (onNext) onNext();
        } else {
            setHasExploded(true);
        }
    };

    return (
        <SlideContainer className="bg-background overflow-hidden relative" isFirstSlide={true}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
                <div className="w-[800px] h-[800px] bg-secondary/20 rounded-full blur-3xl animate-pulse"></div>
            </div>

            <div className="z-10 text-center mb-12">
                <motion.h1
                    className="text-5xl md:text-7xl font-bold text-white mb-6"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    {hasExploded ? (
                        <>Scaling <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] to-primary">Beyond</span> The Monolith</>
                    ) : (
                        <>Scaling Beyond <span className="text-transparent bg-clip-text bg-gradient-to-r from-status-error to-amber-500">The Monolith</span></>
                    )}
                </motion.h1>

            </div>

            <div
                className="relative w-[400px] h-[400px] flex items-center justify-center cursor-pointer group"
                onClick={handleClick}
            >
                <div className="absolute inset-0 flex items-center justify-center text-text-secondary opacity-90 text-sm mt-[-400px]">
                    (Click to {hasExploded ? 'Continue' : 'Fragment'})
                </div>

                {/* Central Monolith Node */}
                <motion.div
                    className="absolute w-32 h-32 bg-gradient-to-br from-status-error/20 to-[#000B1A] rounded-full shadow-[0_0_50px_rgba(255,77,77,0.4)] flex items-center justify-center z-20 border-2 border-status-error"
                    initial={{ scale: 1, opacity: 1 }}
                    animate={{
                        scale: hasExploded ? 0 : 1,
                        opacity: hasExploded ? 0 : 1,
                    }}
                    transition={{ duration: 0.6, ease: "backInOut" }}
                >
                    <span className="text-xs font-bold text-status-error tracking-widest">MONOLITH</span>
                </motion.div>

                {/* Distributed Swarm Nodes */}
                {swarmNodes.map((node) => (
                    <motion.div
                        key={node.id}
                        className="absolute w-12 h-12 bg-secondary rounded-full shadow-[0_0_20px_rgba(0,119,182,0.5)] flex items-center justify-center z-10 border-2 border-primary/30"
                        initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
                        animate={{
                            x: hasExploded ? node.x : 0,
                            y: hasExploded ? node.y : 0,
                            scale: hasExploded ? 1 : 0,
                            opacity: hasExploded ? 1 : 0,
                        }}
                        whileHover={{ scale: 1.2, borderColor: '#00D2FF' }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 15,
                            delay: hasExploded ? 0.1 + (node.id * 0.05) : 0
                        }}
                    >
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" style={{ animationDelay: `${node.id * 0.2}s` }}></div>
                    </motion.div>
                ))}

                {/* Connecting Lines (Only visible when exploded) */}
                <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
                    {hasExploded && swarmNodes.map((node, i) => (
                        swarmNodes.map((target, j) => {
                            if (Math.abs(i - j) === 1 || (i === 0 && j === 11)) { // Connect neighbors
                                // Calculate positions relative to center (200, 200)
                                const x1 = 200 + node.x;
                                const y1 = 200 + node.y;
                                const x2 = 200 + target.x;
                                const y2 = 200 + target.y;

                                return (
                                    <motion.line
                                        key={`line-${i}-${j}`}
                                        x1={x1} y1={y1} x2={x2} y2={y2}
                                        stroke="#0077B6"
                                        strokeWidth="1"
                                        initial={{ pathLength: 0, opacity: 0 }}
                                        animate={{ pathLength: 1, opacity: 0.4 }}
                                        transition={{ duration: 1, delay: 0.8 }}
                                    />
                                )
                            }
                            return null;
                        })
                    ))}
                </svg>

            </div>

            <div className="mt-16 text-center max-w-2xl px-4 h-24 relative w-full">
                <AnimatePresence mode="wait">
                    <motion.p
                        key={hasExploded ? "multi-agent" : "monolith"}
                        className="text-text-primary text-xl font-light absolute top-0 left-0 w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {hasExploded
                            ? <><strong>Multi-Agent Systems with Specialiced Agents</strong> dedicated to specific sub-tasks operate in harmony, reducing risk through redundancy and granular control.</>
                            : "Current Monolithic AI Architectures struggle to scale and run complex tasks with long contexts."}
                    </motion.p>
                </AnimatePresence>
            </div>

        </SlideContainer>
    );
};

export default Slide1_Narrative;
