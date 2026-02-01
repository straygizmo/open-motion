import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Easing } from '@open-motion/core';

/**
 * A button that pulsates slowly to attract attention.
 */
export const BreathingButton: React.FC<{
  text: string;
  onClick?: () => void;
  style?: React.CSSProperties;
  speed?: number;
  scaleRange?: [number, number];
}> = ({ text, style, speed = 15, scaleRange = [0.98, 1.05] }) => {
  const frame = useCurrentFrame();

  const scale = interpolate(
    Math.sin(frame / speed),
    [-1, 1],
    scaleRange
  );

  return (
    <div style={{
      padding: '16px 40px',
      backgroundColor: '#2d3748',
      color: 'white',
      borderRadius: '40px',
      fontSize: '24px',
      fontWeight: 600,
      boxShadow: '0 10px 25px rgba(45, 55, 72, 0.3)',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      transform: `scale(${scale})`,
      ...style
    }}>
      {text}
    </div>
  );
};

/**
 * An item that slides in and fades in.
 */
export const SlideInItem: React.FC<{
  children: React.ReactNode;
  index: number;
  delay?: number;
  stagger?: number;
  distance?: number;
  style?: React.CSSProperties;
}> = ({ children, index, delay = 0, stagger = 5, distance = 50, style }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay - index * stagger,
    fps,
    config: { stiffness: 100, damping: 12 }
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const translateX = interpolate(spr, [0, 1], [distance, 0]);

  return (
    <div style={{
      opacity,
      transform: `translateX(${translateX}px)`,
      ...style
    }}>
      {children}
    </div>
  );
};
