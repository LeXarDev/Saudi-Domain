"use client";

import { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiEffectProps {
  isAvailable: boolean;
}

export function ConfettiEffect({ isAvailable }: ConfettiEffectProps) {
  const [hasPlayed, setHasPlayed] = useState(false);

  useEffect(() => {
    if (isAvailable && !hasPlayed) {
      const duration = 3 * 1000;
      const animationEnd = Date.now() + duration;
      let skew = 1;

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      (function frame() {
        const timeLeft = animationEnd - Date.now();
        const ticks = Math.max(200, 500 * (timeLeft / duration));
        skew = Math.max(0.8, skew - 0.001);

        confetti({
          particleCount: 1,
          startVelocity: 0,
          ticks: ticks,
          origin: {
            x: Math.random(),
            y: (Math.random() * skew) - 0.2
          },
          colors: ['#5865F2', '#57F287', '#FEE75C', '#EB459E'],
          shapes: ['star', 'circle'],
          gravity: randomInRange(0.4, 0.6),
          scalar: randomInRange(0.8, 1.4),
          drift: randomInRange(-0.4, 0.4)
        });

        if (timeLeft > 0) {
          requestAnimationFrame(frame);
        }
      }());

      // Fire some celebratory cannon bursts
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5865F2', '#57F287', '#FEE75C', '#EB459E']
      });

      setHasPlayed(true);
    }
  }, [isAvailable, hasPlayed]);

  return null;
}
