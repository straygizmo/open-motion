import React from 'react';
import ReactDOM from 'react-dom/client';
import { CompositionProvider } from '@open-motion/core';
import { $(echo ${scene:0:1} | tr '[:lower:]' '[:upper:]')${scene:1}Showcase } from '../scenes/$(echo ${scene:0:1} | tr '[:lower:]' '[:upper:]')${scene:1}Showcase';

// 映射某些不规则命名的组件
${scene === 'main' ? "import { DemoVideo as MainShowcase } from '../scenes/DemoVideo';" : ""}
${scene === 'interpolation' ? "import { MovingBox as InterpolationShowcase } from '../scenes/MovingBox';" : ""}
${scene === 'dashboard' ? "import { Dashboard as DashboardShowcase } from '../scenes/Dashboard';" : ""}

// 这里简化处理，直接导出
const App = () => {
  const config = { width: 1280, height: 720, fps: 30, durationInFrames: 300 }; // 默认
  return (
    <CompositionProvider config={config} frame={(window as any).__OPEN_MOTION_FRAME__ || 0}>
      <div style={{ position: 'absolute', top: 10, right: 10, color: '#aaa', fontSize: 12 }}>ENTRY: ${scene}</div>
      {/* 动态选择组件 */}
    </CompositionProvider>
  );
};
