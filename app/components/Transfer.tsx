'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function Transfer() {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        delay: 0.2,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={variants}
      className="relative w-full h-[400px] overflow-hidden"
    >
      <Image
        src="/images/transfer.jpg"
        alt="Transfer Service"
        layout="fill"
        objectFit="cover"
        className="filter brightness-75"
      />
      <div className="absolute inset-0 bg-black bg-opacity-40" />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
        <motion.h2 
          variants={variants}
          className="text-4xl md:text-5xl font-bold mb-4 text-center px-4"
        >
          Experience Comfort and Safety
        </motion.h2>
        <motion.p
          variants={variants}
          className="text-xl md:text-2xl text-center px-4 mb-2"
        >
          Every journey with us is a promise of happiness and security
        </motion.p>
        <motion.p
          variants={variants}
          className="text-sm md:text-base text-center px-4 text-gray-300"
        >
          ทุกการเดินทางกับเรา คือคำมั่นสัญญาแห่งความสุขและความปลอดภัย
        </motion.p>
      </div>
    </motion.div>
  );
}