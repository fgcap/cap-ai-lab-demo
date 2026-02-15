import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, Share2, ArrowDown } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide_Thesis = () => {
    const scrollToNext = () => {
        const windowHeight = window.innerHeight;
        window.scrollBy({ top: windowHeight, behavior: 'smooth' });
        // Note: The global scroll listener in App.jsx will automatically update the currentSlide state
        // but since we are using a container ref in App.jsx now, we might need a custom event or context if we want *this* button
        // to drive the main container. However, for a simple implementation, let's rely on the user scrolling or the global button.
        // Wait, App.jsx controls everything via containerRef. Scrolling window won't work if container is overflow-y-scroll.
        // We need to dispatch an event or use a prop.
        // Let's dispatch a custom event that App.jsx can listen to, or simpler: just visually instruct to scroll.
        // Actually, looking at App.jsx, it has a containerRef. 
        // To keep it simple without passing props through every slide (though that would be better),
        // we can try to find the container. But proper React way is passing a `onNext` prop.
        // I will implement it assuming a prop `onNext` is passed, or I'll use a custom event "navigateNext".
        window.dispatchEvent(new CustomEvent('navigateNext'));
    };

    return (
        <SlideContainer className="bg-background relative overflow-hidden flex items-center justify-center">

            <div className="max-w-7xl w-full grid grid-cols-1 md:grid-cols-5 gap-12 px-6 items-center">

                {/* Left Column: Content */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="space-y-8 md:col-span-3"
                >
                    <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                        The Benefits of <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0070AD] to-primary">Multi-Agent Systems</span>
                    </h2>

                    <div className="space-y-6">
                        <div className="flex gap-4">
                            <div className="p-3 bg-status-error/10 rounded-lg h-fit">
                                <TrendingDown className="text-status-error w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">The Resource Bottleneck</h3>
                                <p className="text-text-secondary">
                                    Large, monolithic models crumble under high-frequency real-world tasks.
                                    Inference costs skyrocket, and latency becomes unacceptable at scale.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <div className="p-3 bg-primary/10 rounded-lg h-fit">
                                <Share2 className="text-primary w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">The Multi-Agent Solution</h3>
                                <p className="text-text-secondary">
                                    Specialized Multi-Agent Systems can operate in parallel, each agent specialized in a specific task, increasing efficiency and reliability.
                                    Collaborative intelligence that is faster, cheaper, and more reliable.
                                </p>
                            </div>
                        </div>
                    </div>


                </motion.div>

                {/* Right Column: Visual Component */}
                <div className="relative h-[500px] flex flex-col justify-between items-center py-12 border-l border-white/5 pl-12 md:col-span-2">

                    {/* Monolith Visual */}
                    <div className="relative flex flex-col items-center gap-4">
                        <motion.div
                            animate={{ scale: [1, 1.05, 1], boxShadow: ['0 0 20px rgba(255,77,77,0.2)', '0 0 60px rgba(255,77,77,0.5)', '0 0 20px rgba(255,77,77,0.2)'] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            className="w-32 h-32 rounded-full bg-gradient-to-br from-status-error/20 to-[#000B1A] border-2 border-status-error flex items-center justify-center relative z-10"
                        >
                            <span className="text-xs font-bold text-status-error tracking-widest">MONOLITH</span>
                        </motion.div>
                        <span className="text-sm text-text-secondary">High Latency and High Cost</span>
                    </div>

                    {/* Arrow Transition */}
                    <div className="h-24 w-px bg-gradient-to-b from-status-error to-primary opacity-30"></div>

                    {/* Swarm Visual */}
                    <div className="relative flex flex-col items-center gap-4">
                        <div className="grid grid-cols-5 gap-3">
                            {Array.from({ length: 10 }).map((_, i) => {
                                const isCyan = i % 2 === 0;
                                const baseColor = isCyan ? '0,210,255' : '0,112,173'; // Cyan vs Blue
                                return (
                                    <motion.div
                                        key={i}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.5, 1, 0.5],
                                            backgroundColor: [`rgba(${baseColor},0.1)`, `rgba(${baseColor},0.6)`, `rgba(${baseColor},0.1)`]
                                        }}
                                        transition={{
                                            duration: 1.5,
                                            repeat: Infinity,
                                            delay: i * 0.1,
                                            ease: "easeInOut"
                                        }}
                                        className={`w-6 h-6 rounded-full border ${isCyan ? 'border-primary/50' : 'border-secondary/50'}`}
                                    />
                                );
                            })}
                        </div>
                        <span className="text-sm text-text-secondary">Parallel and more Efficient</span>
                    </div>
                </div>

            </div>

        </SlideContainer>
    );
};

export default Slide_Thesis;
