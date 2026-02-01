import React from 'react';
import {
  CompositionProvider,
  Composition,
  Player,
  registerComposition
} from '@open-motion/core';

// Scenes
import { DemoVideo } from './scenes/DemoVideo';
import { MovingBox } from './scenes/MovingBox';
import { Dashboard } from './scenes/Dashboard';
import { AudioShowcase } from './scenes/AudioShowcase';
import { EasingShowcase } from './scenes/EasingShowcase';
import { VideoShowcase } from './scenes/VideoShowcase';
import { BrandShowcase } from './scenes/BrandShowcase';

const configs = {
  main: { width: 1280, height: 720, fps: 30, durationInFrames: 300 },
  interpolation: { width: 1280, height: 720, fps: 30, durationInFrames: 90 },
  dashboard: { width: 1280, height: 720, fps: 30, durationInFrames: 120 },
  audio: { width: 1280, height: 720, fps: 30, durationInFrames: 300 },
  easing: { width: 1280, height: 720, fps: 30, durationInFrames: 120 },
  video: { width: 1280, height: 720, fps: 30, durationInFrames: 150 },
  brand: { width: 1280, height: 720, fps: 30, durationInFrames: 450 },
};

const sceneMapping: Record<string, { component: React.ComponentType<any>, config: any }> = {
  'main': { component: DemoVideo, config: configs.main },
  'interpolation': { component: MovingBox, config: configs.interpolation },
  'dashboard': { component: Dashboard, config: configs.dashboard },
  'audio': { component: AudioShowcase, config: configs.audio },
  'easing': { component: EasingShowcase, config: configs.easing },
  'video': { component: VideoShowcase, config: configs.video },
  'brand': { component: BrandShowcase, config: configs.brand },
};

if (typeof window !== 'undefined') {
  Object.entries(sceneMapping).forEach(([id, scene]) => {
    registerComposition({ id, component: scene.component, ...scene.config });
  });
}

export const App = () => {
  const isRendering = typeof (window as any).__OPEN_MOTION_FRAME__ === 'number';

  // 核心逻辑：从 URL 中获取 scene 参数，实现彻底的物理隔离
  const urlParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const urlSceneId = urlParams.get('scene');
  const compositionId = urlSceneId || (window as any).__OPEN_MOTION_COMPOSITION_ID__ || 'main';

  if (isRendering || urlSceneId) {
    const scene = sceneMapping[compositionId] || sceneMapping.main;
    const frame = (window as any).__OPEN_MOTION_FRAME__ || 0;
    const inputProps = (window as any).__OPEN_MOTION_INPUT_PROPS__ || {};

    return (
      <CompositionProvider
        key={compositionId} // 强制 React 重新挂载，清除所有组件状态
        config={scene.config}
        frame={frame}
        inputProps={inputProps}
      >
        <div style={{ position: 'absolute', top: 5, left: 5, color: 'rgba(255,0,0,0.3)', fontSize: 10, zIndex: 999 }}>
          SCENE: {compositionId}
        </div>
        <scene.component />
      </CompositionProvider>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'system-ui, sans-serif', backgroundColor: '#f8fafc', minHeight: '100vh' }}>
      <header style={{ marginBottom: 40, borderBottom: '1px solid #e2e8f0', paddingBottom: 20 }}>
        <h1 style={{ margin: 0, color: '#0f172a' }}>OpenMotion Professional Showcase</h1>
        <p style={{ color: '#64748b' }}>A high-performance programmatic video engine built with React</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(600px, 1fr))', gap: '40px' }}>
        {Object.entries(sceneMapping).map(([id, scene]) => (
          <section key={id} style={sectionStyle}>
            <h3>🎬 {id.toUpperCase()} Showcase</h3>
            <div style={{ marginBottom: 10 }}>
               <a href={`?scene=${id}`} target="_blank" style={{ fontSize: 12, color: '#3b82f6' }}>Open in isolation (Anti-cache)</a>
            </div>
            <Player
              component={scene.component}
              config={scene.config}
              autoPlay
              loop
            />
          </section>
        ))}
      </div>

      <div style={{ display: 'none' }}>
        {Object.entries(sceneMapping).map(([id, scene]) => (
          <Composition key={id} id={id} component={scene.component} {...scene.config} />
        ))}
      </div>
    </div>
  );
};

const sectionStyle: React.CSSProperties = {
  backgroundColor: 'white',
  padding: '24px',
  borderRadius: '16px',
  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  border: '1px solid #e2e8f0'
};
