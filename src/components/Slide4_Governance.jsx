import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle, XCircle, Play, RotateCcw, Package, MapPin, DollarSign, Calendar } from 'lucide-react';
import SlideContainer from './SlideContainer';

const Slide4_Governance = () => {
    // Configuration for the 4 rounds
    const ROUNDS = [
        { id: 1, agents: 2, speed: 4000, cards: 5, title: "Pilot Phase", desc: "Initial deployment. Low volume." },
        { id: 2, agents: 4, speed: 2500, cards: 7, title: "Scaling Up", desc: "Doubling agent capacity." },
        { id: 3, agents: 8, speed: 1500, cards: 7, title: "High Velocity", desc: "Production load active." },
        { id: 4, agents: 16, speed: 1000, cards: 7, title: "Full Autonomy", desc: "Maximum throughput." } // Ends when user fails
    ];

    const [gameState, setGameState] = useState('idle'); // 'idle', 'briefing', 'playing', 'round-results', 'round-transition', 'gameover'
    const [cards, setCards] = useState([]);
    const [trustScore, setTrustScore] = useState(100);
    const [cognitiveLoad, setCognitiveLoad] = useState(0);
    const [currentRound, setCurrentRound] = useState(1);
    const [cardsInRound, setCardsInRound] = useState(0);

    // Derived state for speed/agents based on round
    const activeRound = ROUNDS.find(r => r.id === currentRound) || ROUNDS[0];
    const [speed, setSpeed] = useState(activeRound.speed);
    const [stats, setStats] = useState({ processed: 0, caughtErrors: 0, falsePositives: 0, missedErrors: 0 });
    const [roundStats, setRoundStats] = useState({ processed: 0, caughtErrors: 0, falsePositives: 0, missedErrors: 0 });

    const timerRef = useRef(null);
    const speedRef = useRef(speed);
    const cardsProcessedRef = useRef(0);
    const cardsInRoundRef = useRef(0);

    // Address Generators
    const generateAddress = () => {
        const isDE = Math.random() > 0.5;
        if (isDE) {
            const streets = ['Hauptstr.', 'Berliner Allee', 'Gartenstr.', 'Lindenweg', 'Dorfstr.'];
            const cities = ['Berlin', 'München', 'Hamburg', 'Köln', 'Frankfurt'];
            const zip = Math.floor(Math.random() * 90000) + 10000;
            return `${streets[Math.floor(Math.random() * streets.length)]} ${Math.floor(Math.random() * 100) + 1}, ${zip} ${cities[Math.floor(Math.random() * cities.length)]}, DE`;
        } else {
            const streets = ['Main St', 'Broadway', 'Park Ave', 'Elm St', 'Sunset Blvd'];
            const cities = ['New York, NY', 'San Francisco, CA', 'Austin, TX', 'Seattle, WA', 'Miami, FL'];
            const zip = Math.floor(Math.random() * 90000) + 10000;
            return `${Math.floor(Math.random() * 9000) + 100} ${streets[Math.floor(Math.random() * streets.length)]}, ${cities[Math.floor(Math.random() * cities.length)]} ${zip}, USA`;
        }
    };

    // Detailed Order Card Generator
    const generateCard = () => {
        // Error rate increases with progress, but starts low
        // formerly fixed 0.25. Now let's say starts at 0.1 and caps at 0.4
        const progressFactor = Math.min(1, cardsProcessedRef.current / 20); // Ramp up over first 20 cards
        const errorChance = 0.1 + (0.3 * progressFactor);

        const isError = Math.random() < errorChance;
        const errorType = isError ? ['logic', 'unit', 'data'][Math.floor(Math.random() * 3)] : null;

        const items = [
            { name: 'Quantum Chip', price: 1200, unit: 'units' },
            { name: 'Bio-Synth Gel', price: 50, unit: 'L' },
            { name: 'Neural Link', price: 2500, unit: 'units' },
            { name: 'Graphene Sheet', price: 10, unit: 'm²' }
        ];

        const item = items[Math.floor(Math.random() * items.length)];
        const qty = Math.floor(Math.random() * 50) + 1;
        const total = item.price * qty;

        // Construct Data
        let displayTotal = total;
        let displayQty = `${qty} ${item.unit}`;
        let displayDate = new Date();
        displayDate.setDate(displayDate.getDate() + Math.floor(Math.random() * 10)); // Future date
        let dateStr = displayDate.toISOString().split('T')[0];
        let displayAddr = generateAddress();

        // Inject Errors
        if (errorType === 'logic') {
            displayTotal = Math.floor(total * 0.5); // Math doesn't add up
        } else if (errorType === 'unit') {
            displayQty = `${qty * 1000} ${item.unit === 'L' ? 'mL' : 'kg'}`; // Wrong unit scale or type
        } else if (errorType === 'data') {
            if (Math.random() > 0.5) dateStr = '2025-02-31'; // Invalid date (Feb 31)
            else displayAddr = 'NULL_POINTER_EXCEPTION';
        }

        return {
            id: Date.now(),
            customer: `ORD-${Math.floor(Math.random() * 10000)}`,
            address: displayAddr,
            item: item.name,
            qty: displayQty,
            total: displayTotal,
            date: dateStr,
            error: isError,
            errorType: errorType
        };
    };

    // Game Loop
    useEffect(() => {
        if (gameState === 'playing') {
            const spawn = () => {
                // Check if round is complete
                if (cardsInRoundRef.current >= activeRound.cards && activeRound.id < 4) {
                    setGameState('round-results');
                    return; // Stop spawning
                }

                setCards(prev => [...prev, generateCard()]);
                cardsProcessedRef.current += 1;
                cardsInRoundRef.current += 1;
                setCardsInRound(cardsInRoundRef.current);

                // Speed is fixed per round now, or could slightly decay if desired. 
                // For now, sticking to the requested "fixed time for rounds".
                // But we can add slight pressure within the round if needed.
                // setSpeed(prev => Math.max(800, prev * 0.99)); 

                timerRef.current = setTimeout(spawn, speedRef.current);
            };
            // First card appears quickly (500ms), subsequent cards use round speed
            const initialDelay = cardsInRoundRef.current === 0 ? 500 : speedRef.current;
            timerRef.current = setTimeout(spawn, initialDelay);
        }
        return () => clearTimeout(timerRef.current);
    }, [gameState, currentRound]);

    useEffect(() => {
        speedRef.current = activeRound.speed;
        setSpeed(activeRound.speed);
    }, [currentRound]);

    // Keyboard Controls
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameState !== 'playing' || cards.length === 0) return;

            if (e.code === 'Space') {
                e.preventDefault();
                handleAction(cards[0].id, 'approve');
            } else if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
                e.preventDefault();
                handleAction(cards[0].id, 'reject');
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [gameState, cards]);


    const handleAction = (cardId, action) => {
        const card = cards.find(c => c.id === cardId);
        if (!card) return;

        const isCorrectAction = (action === 'approve' && !card.error) || (action === 'reject' && card.error);

        // Update overall stats
        setStats(prev => ({
            ...prev,
            processed: prev.processed + 1,
            caughtErrors: (action === 'reject' && card.error) ? prev.caughtErrors + 1 : prev.caughtErrors,
            falsePositives: (action === 'reject' && !card.error) ? prev.falsePositives + 1 : prev.falsePositives,
            missedErrors: (action === 'approve' && card.error) ? prev.missedErrors + 1 : prev.missedErrors
        }));

        // Update round stats
        setRoundStats(prev => ({
            ...prev,
            processed: prev.processed + 1,
            caughtErrors: (action === 'reject' && card.error) ? prev.caughtErrors + 1 : prev.caughtErrors,
            falsePositives: (action === 'reject' && !card.error) ? prev.falsePositives + 1 : prev.falsePositives,
            missedErrors: (action === 'approve' && card.error) ? prev.missedErrors + 1 : prev.missedErrors
        }));

        if (isCorrectAction) {
            setTrustScore(prev => Math.min(100, prev + 2));
            setCognitiveLoad(prev => Math.max(0, prev - 5));
        } else {
            setTrustScore(prev => prev - 15);
            setCognitiveLoad(prev => Math.min(100, prev + 15));
        }

        setCards(prev => prev.filter(c => c.id !== cardId));

        if (trustScore <= 0 || cognitiveLoad >= 100) {
            setGameState('gameover');
        }
    };

    const initGame = () => {
        setGameState('briefing');
    };

    const startGame = () => {
        // Reset full game
        setCurrentRound(1);
        startRound(1);
    };

    const startRound = (roundId) => {
        const roundConfig = ROUNDS.find(r => r.id === roundId);
        setCurrentRound(roundId);
        setSpeed(roundConfig.speed);
        speedRef.current = roundConfig.speed;

        // Reset round logic
        setCards([]);
        cardsInRoundRef.current = 0;
        setCardsInRound(0);
        setRoundStats({ processed: 0, caughtErrors: 0, falsePositives: 0, missedErrors: 0 });

        if (roundId === 1) {
            // Full reset if round 1
            setTrustScore(100);
            setCognitiveLoad(0);
            cardsProcessedRef.current = 0;
            setStats({ processed: 0, caughtErrors: 0, falsePositives: 0, missedErrors: 0 });
        }

        setGameState('playing');
    };

    const nextRound = () => {
        const next = currentRound + 1;
        if (next <= 4) {
            startRound(next);
        } else {
            setGameState('gameover');
        }
    };

    const proceedToTransition = () => {
        setGameState('round-transition');
    };

    return (
        <SlideContainer className="bg-background relative">
            <h2 className="text-3xl font-bold text-white mb-2">Monitoring AI Agents</h2>
            <p className="text-text-secondary mb-8">A Human-in-the-Loop Simulation of the Rubber Stamp Effect</p>

            {/* Stats Bar */}
            <div className={`flex gap-8 mb-4 w-full max-w-2xl transition-opacity ${gameState === 'idle' ? 'opacity-50' : 'opacity-100'}`}>
                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-primary">System Trust</span>
                        <span className="text-sm">{trustScore}%</span>
                    </div>
                    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${trustScore < 40 ? 'bg-status-error' : 'bg-primary'}`}
                            animate={{ width: `${Math.max(0, trustScore)}%` }}
                        />
                    </div>
                </div>

                {/* Agent Count Display */}
                <div className="flex-1 text-center">
                    <div className="text-sm text-text-secondary uppercase tracking-widest mb-1">Active Agents</div>
                    <motion.div
                        key={activeRound.agents}
                        initial={{ scale: 1.5, color: '#00D2FF' }}
                        animate={{ scale: 1, color: '#ffffff' }}
                        className="text-2xl font-bold font-mono"
                    >
                        {activeRound.agents}
                    </motion.div>
                </div>

                <div className="flex-1">
                    <div className="flex justify-between mb-1">
                        <span className="text-sm font-bold text-status-alert">Cognitive Load</span>
                        <span className="text-sm">{cognitiveLoad}%</span>
                    </div>
                    <div className="h-2 bg-secondary/30 rounded-full overflow-hidden">
                        <motion.div
                            className={`h-full ${cognitiveLoad > 80 ? 'bg-status-error' : 'bg-status-alert'}`}
                            animate={{ width: `${Math.min(100, cognitiveLoad)}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Game Area */}
            <div className="relative w-full max-w-xl h-[600px] border border-secondary/30 rounded-xl bg-white/5 backdrop-blur-sm overflow-hidden flex flex-col items-center justify-center p-4 shadow-2xl">

                {/* IDLE STATE */}
                {gameState === 'idle' && (
                    <button
                        onClick={initGame}
                        className="px-8 py-3 bg-primary text-background font-bold rounded-lg flex items-center gap-2 hover:bg-primary-hover transition-colors shadow-[0_0_20px_rgba(0,210,255,0.4)]"
                    >
                        <Play size={20} /> Initialize Simulation
                    </button>
                )}

                {/* BRIEFING MODAL */}
                {gameState === 'briefing' && (
                    <div className="absolute inset-0 bg-[#000B1A]/95 z-30 p-6 flex flex-col items-start justify-center">
                        <h3 className="text-2xl font-bold text-white mb-2">Simulation Briefing</h3>
                        {/*  <p className="text-primary mb-6 text-lg">Deploying Initial Agent Swarm</p> */}


                        <div className="space-y-4 text-sm text-text-secondary mb-8 w-full">
                            {/* <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-white/5 p-3 rounded border border-white/10">
                                    <span className="block text-xs text-text-secondary mb-1">INITIAL AGENTS</span>
                                    <span className="text-xl font-bold text-white">2</span>
                                </div>
                                <div className="bg-white/5 p-3 rounded border border-white/10">
                                    <span className="block text-xs text-text-secondary mb-1">THROUGHPUT</span>
                                    <span className="text-xl font-bold text-white">Low</span>
                                </div>
                            </div> */}

                            <div>
                                <strong className="text-primary block mb-1">OBJECTIVE</strong>
                                <p className="mb-2">
                                    You are a operations manager having the oversight of a Multi-Agent-System.
                                    The agents generate fulfillment orders which you need to validate.
                                </p>
                            </div>

                            <div>
                                <strong className="text-primary block mb-1">THE RULES</strong>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li><span className="text-white font-bold">SCAN</span> the decision cards.</li>
                                    <li><span className="text-white font-bold">SPACE</span> to VALIDATE correct data.</li>
                                    <li><span className="text-white font-bold">SHIFT</span> to INTERVENE on errors (Logic, Unit mismatches, Invalid Data).</li>
                                </ul>
                            </div>

                            <div className="bg-status-alert/10 border border-status-alert/30 p-3 rounded">
                                <strong className="text-status-alert block mb-1">SCALING PROTOCOL</strong>
                                As you succeed, we will scale the agent count. Throughput will accelerate. Monitor your Cognitive Load.
                            </div>
                        </div>

                        <button
                            onClick={startGame}
                            className="w-full py-4 bg-primary text-background font-bold rounded hover:bg-primary-hover transition-colors text-lg"
                        >
                            INITIATE ROUND 1
                        </button>
                    </div>
                )}

                {/* ROUND RESULTS MODAL */}
                {gameState === 'round-results' && (
                    <div className="absolute inset-0 bg-[#000B1A]/95 z-30 p-6 flex flex-col items-center justify-center text-center">
                        <CheckCircle size={48} className="text-primary mb-4" />
                        <h3 className="text-2xl font-bold text-white mb-2">ROUND {currentRound} COMPLETE</h3>
                        <p className="text-text-secondary mb-6">Performance Summary</p>

                        <div className="bg-white/5 p-4 rounded-lg my-6 w-full max-w-xs text-left space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Processed:</span>
                                <span className="text-white font-bold">{roundStats.processed}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-success">Errors Caught:</span>
                                <span className="text-status-success font-bold">{roundStats.caughtErrors}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-error">Missed Errors:</span>
                                <span className="text-status-error font-bold">{roundStats.missedErrors}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-alert">False Alarms:</span>
                                <span className="text-status-alert font-bold">{roundStats.falsePositives}</span>
                            </div>
                        </div>

                        <button
                            onClick={proceedToTransition}
                            className="px-8 py-3 bg-primary text-background font-bold rounded hover:bg-primary-hover transition-colors flex items-center gap-2"
                        >
                            Continue <Play size={20} />
                        </button>
                    </div>
                )}

                {/* ROUND TRANSITION MODAL */}
                {gameState === 'round-transition' && (
                    <div className="absolute inset-0 bg-[#000B1A]/95 z-30 p-6 flex flex-col items-center justify-center text-center">
                        <h3 className="text-xl text-primary mb-2">ROUND {currentRound} COMPLETE</h3>
                        <h2 className="text-3xl font-bold text-white mb-6">SCALING INFRASTRUCTURE</h2>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="text-right">
                                <div className="text-text-secondary text-sm">Previous Agents</div>
                                <div className="text-2xl font-bold text-white">{activeRound.agents}</div>
                            </div>
                            <div className="text-primary"><Play size={24} /></div>
                            <div className="text-left">
                                <div className="text-primary text-sm font-bold">New Agents</div>
                                <div className="text-3xl font-bold text-primary">{ROUNDS[currentRound].agents}</div>
                            </div>
                        </div>

                        <div className="bg-white/5 p-4 rounded-lg border border-white/10 max-w-xs mb-8">
                            <h4 className="text-white font-bold mb-1">{ROUNDS[currentRound].title}</h4>
                            <p className="text-sm text-text-secondary">{ROUNDS[currentRound].desc}</p>
                        </div>

                        <button
                            onClick={nextRound}
                            className="px-8 py-3 bg-primary text-background font-bold rounded hover:bg-primary-hover transition-colors flex items-center gap-2"
                        >
                            <Play size={20} /> START ROUND {currentRound + 1}
                        </button>
                    </div>
                )}

                {/* GAME OVER */}
                {gameState === 'gameover' && (
                    <div className="text-center z-30 bg-[#000B1A]/95 absolute inset-0 flex flex-col items-center justify-center p-6">
                        <AlertTriangle size={48} className="text-status-error mb-4" />
                        <h3 className="text-2xl font-bold text-status-error mb-2">SIMULATION ENDED</h3>

                        <div className="bg-white/5 p-4 rounded-lg my-6 w-full max-w-xs text-left space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-text-secondary">Processed:</span>
                                <span className="text-white font-bold">{stats.processed}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-success">Errors Caught:</span>
                                <span className="text-status-success font-bold">{stats.caughtErrors}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-error">Missed Errors:</span>
                                <span className="text-status-error font-bold">{stats.missedErrors}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-status-alert">False Alarms:</span>
                                <span className="text-status-alert font-bold">{stats.falsePositives}</span>
                            </div>
                        </div>

                        <p className="text-text-secondary mb-6 max-w-xs text-sm">
                            "Scaling requires Alignment Engineering, not just more human oversight."
                        </p>
                        <button
                            onClick={startGame}
                            className="px-6 py-2 bg-secondary text-white rounded-lg flex items-center gap-2 hover:bg-secondary/80"
                        >
                            <RotateCcw size={16} /> Reboot System
                        </button>
                    </div>
                )}

                {/* CARDS */}
                <AnimatePresence>
                    {cards.map((card, index) => (
                        <motion.div
                            key={card.id}
                            className="absolute w-80 bg-[#001229] border border-secondary rounded-lg overflow-hidden shadow-2xl"
                            initial={{ y: -400, opacity: 0, scale: 0.9 }}
                            animate={{ y: index * 12, opacity: 1 - (index * 0.15), scale: 1 - index * 0.05 }}
                            exit={{ x: 400, opacity: 0, rotate: 15 }}
                            style={{ zIndex: cards.length - index }}
                        >
                            {/* Card Header */}
                            <div className="bg-secondary/20 p-2 border-b border-secondary/30 flex justify-between items-center">
                                <span className="font-mono text-xs text-primary">{card.customer}</span>
                                <span className="text-[10px] text-text-secondary">{new Date(card.id).toLocaleTimeString()}</span>
                            </div>

                            {/* Card Body - VERTICAL LAYOUT */}
                            <div className="p-4 flex flex-col gap-3">

                                {/* 1. Address */}
                                <div className="flex items-start gap-2 text-left">
                                    <MapPin size={16} className="text-secondary mt-0.5 shrink-0" />
                                    <span className={`text-sm ${card.address === 'NULL_POINTER_EXCEPTION' ? 'text-status-error font-bold' : 'text-text-secondary'}`}>
                                        {card.address}
                                    </span>
                                </div>

                                {/* 2. Date */}
                                <div className="flex items-center gap-2 text-xs text-text-secondary pl-6">
                                    <Calendar size={14} /> {card.date}
                                </div>

                                {/* 3. Product & Quantity */}
                                <div className="pl-6 border-l-2 border-white/10 ml-2 py-1">
                                    <div className="flex items-center gap-1 text-xs text-text-primary mb-1">
                                        <Package size={14} /> {card.item}
                                    </div>
                                    <div className="text-base font-bold text-white">{card.qty}</div>
                                </div>

                                {/* 4. Amount */}
                                <div className="mt-2 pt-2 border-t border-white/5 flex justify-end items-center gap-1">
                                    <DollarSign size={16} className="text-primary" />
                                    <span className="text-xl font-bold text-primary">{card.total.toLocaleString()}</span>
                                </div>
                            </div>

                            {/* Interaction Buttons (Top card only) */}
                            {index === 0 && gameState === 'playing' && (
                                <div className="bg-white/5 p-3 flex gap-2 justify-between">
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAction(card.id, 'reject'); }}
                                        className="flex-1 bg-status-error/20 hover:bg-status-error/40 text-status-error text-xs font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors border border-status-error/30"
                                    >
                                        <XCircle size={14} /> REJECT
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); handleAction(card.id, 'approve'); }}
                                        className="flex-1 bg-primary/20 hover:bg-primary/40 text-primary text-xs font-bold py-2 rounded flex items-center justify-center gap-1 transition-colors border border-primary/30"
                                    >
                                        <CheckCircle size={14} /> APPROVE
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            {gameState === 'playing' && (
                <div className="mt-4 text-xs text-text-secondary opacity-50">
                    Press <span className="font-bold text-white">SPACE</span> to Validate • <span className="font-bold text-white">SHIFT</span> to Intervene
                </div>
            )}

        </SlideContainer>
    );
};

export default Slide4_Governance;
