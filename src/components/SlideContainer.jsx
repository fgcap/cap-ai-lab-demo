import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const SlideContainer = ({ children, className, isFirstSlide = false }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={isFirstSlide ? { opacity: 1 } : undefined}
            whileInView={!isFirstSlide ? { opacity: 1 } : undefined}
            viewport={!isFirstSlide ? { once: false, amount: 0.3 } : undefined}
            transition={{ duration: 0.8 }}
            className={twMerge(
                'min-h-screen w-full flex flex-col items-center justify-center p-8 snap-start relative overflow-hidden',
                className
            )}
        >
            {children}
        </motion.div>
    );
};

export default SlideContainer;
