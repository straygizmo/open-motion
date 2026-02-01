import React from 'react';
import {
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  Sequence,
  Easing
} from '@open-motion/core';

const ListItem: React.FC<{ label: string; index: number; delay: number }> = ({ label, index, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay - index * 5,
    fps,
    config: { stiffness: 100, damping: 12 }
  });

  const opacity = interpolate(spr, [0, 1], [0, 1]);
  const translateX = interpolate(spr, [0, 1], [50, 0]);

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      marginBottom: '15px',
      opacity,
      transform: `translateX(${translateX}px)`
    }}>
      <div style={{
        width: '24px',
        height: '24px',
        borderRadius: '50%',
        backgroundColor: '#2d3748',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: '12px'
      }}>✓</div>
      <span style={{ fontSize: '20px', color: '#2d3748', fontWeight: 500 }}>{label}</span>
    </div>
  );
};

const Tag: React.FC<{ label: string; index: number; delay: number }> = ({ label, index, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const spr = spring({
    frame: frame - delay - index * 8,
    fps,
    config: { stiffness: 150, damping: 10 }
  });

  return (
    <div style={{
      padding: '8px 20px',
      backgroundColor: '#2d3748',
      color: 'white',
      borderRadius: '20px',
      fontSize: '16px',
      transform: `scale(${spr})`,
      opacity: spr
    }}>
      {label}
    </div>
  );
};

export const BrandShowcase = () => {
  const frame = useCurrentFrame();
  const { width, height, fps } = useVideoConfig();

  return (
    <div style={{ flex: 1, backgroundColor: '#e9e9e4', position: 'relative', fontFamily: 'system-ui, sans-serif' }}>

      {/* Scene 1: Intro */}
      <Sequence from={0} durationInFrames={90}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            transform: `scale(${spring({ frame, fps, config: { stiffness: 60 } })})`
          }}>
            <img src="https://github.com/jsongo.png" style={{ width: 80, height: 80, borderRadius: 12 }} alt="logo" />
            <h1 style={{ fontSize: 64, margin: 0, color: '#1a202c', letterSpacing: -1 }}>SYL.AILABS</h1>
          </div>
          <div style={{
            marginTop: 20,
            opacity: interpolate(frame, [20, 40], [0, 1]),
            transform: `translateY(${interpolate(frame, [20, 40], [20, 0], { easing: Easing.out })})px`
          }}>
            <p style={{ fontSize: 24, color: '#4a5568' }}>AI驱动的品牌套件提取工具</p>
          </div>
        </div>
      </Sequence>

      {/* Scene 2: Extractor */}
      <Sequence from={90} durationInFrames={90}>
        <div style={{ flex: 1, padding: 60, height: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ textAlign: 'center', fontSize: 48, color: '#1a202c', marginBottom: 60 }}>Brand Kit Extractor</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around' }}>
            <img
              src="https://picsum.photos/id/1/600/400"
              style={{
                width: 600,
                borderRadius: 20,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                opacity: interpolate(frame - 90, [0, 20], [0, 1]),
                transform: `scale(${interpolate(frame - 90, [0, 20], [0.95, 1])})`
              }}
              alt="screenshot"
            />
            <div style={{ width: 300 }}>
              {['提取Logo', '分析颜色', '识别字体', '获取视觉系统'].map((label, i) => (
                <ListItem key={i} label={label} index={i} delay={20} />
              ))}
            </div>
          </div>
        </div>
      </Sequence>

      {/* Scene 3: Editor */}
      <Sequence from={180} durationInFrames={90}>
        <div style={{ flex: 1, padding: 60, height: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ textAlign: 'center', fontSize: 48, color: '#1a202c', marginBottom: 30 }}>Brand Kit Editor</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginBottom: 40 }}>
            {['品牌身份', '视觉系统', '品牌语境'].map((label, i) => (
              <Tag key={i} label={label} index={i} delay={15} />
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <img
              src="https://picsum.photos/id/2/800/500"
              style={{
                width: 800,
                borderRadius: 20,
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)',
                opacity: interpolate(frame - 180, [10, 30], [0, 1]),
                transform: `translateY(${interpolate(frame - 180, [10, 30], [40, 0])}px)`
              }}
              alt="editor"
            />
          </div>
        </div>
      </Sequence>

      {/* Scene 4: Management */}
      <Sequence from={270} durationInFrames={90}>
        <div style={{ flex: 1, padding: 60, height: '100%', boxSizing: 'border-box' }}>
          <h2 style={{ textAlign: 'center', fontSize: 48, color: '#1a202c', marginBottom: 60 }}>管理你的品牌项目</h2>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 60 }}>
            <div style={{ width: 300 }}>
              {[
                { label: '保存品牌套件', icon: '💾' },
                { label: '随时编辑修改', icon: '✏️' },
                { label: '一键导出使用', icon: '📲' }
              ].map((item, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 15,
                  marginBottom: 30,
                  opacity: interpolate(frame - 270, [10 + i * 10, 30 + i * 10], [0, 1]),
                  transform: `translateX(${interpolate(frame - 270, [10 + i * 10, 30 + i * 10], [-20, 0])}px)`
                }}>
                  <span style={{ fontSize: 32 }}>{item.icon}</span>
                  <span style={{ fontSize: 24, color: '#2d3748' }}>{item.label}</span>
                </div>
              ))}
            </div>
            <img
              src="https://picsum.photos/id/3/600/400"
              style={{
                width: 500,
                borderRadius: 20,
                boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                opacity: interpolate(frame - 270, [0, 20], [0, 1])
              }}
              alt="management"
            />
          </div>
        </div>
      </Sequence>

      {/* Scene 5: Outro / CTA */}
      <Sequence from={360} durationInFrames={90}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            opacity: interpolate(frame - 360, [0, 20], [0, 1]),
            transform: `scale(${interpolate(frame - 360, [0, 20], [0.9, 1], { easing: Easing.out })})`
          }}>
            <img src="https://github.com/jsongo.png" style={{ width: 60, height: 60, borderRadius: 10 }} alt="logo" />
            <h2 style={{ fontSize: 48, margin: 0, color: '#1a202c' }}>SYL.AILABS</h2>
          </div>

          <div style={{
            marginTop: 30,
            opacity: interpolate(frame - 360, [15, 35], [0, 1]),
          }}>
            <p style={{ fontSize: 24, color: '#4a5568' }}>一键提取，智能分析</p>
          </div>

          <div style={{
            marginTop: 50,
            opacity: interpolate(frame - 360, [30, 50], [0, 1]),
            // 实现极其缓慢的缩放闪动效果
            transform: `scale(${interpolate(
              Math.sin((frame - 360) / 15), // 使用正弦函数实现平滑循环
              [-1, 1],
              [0.98, 1.05]
            )})`
          }}>
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
              gap: '10px'
            }}>
              立即体验 <span style={{ fontSize: '20px' }}>→</span>
            </div>
          </div>

          <div style={{
            marginTop: 40,
            opacity: interpolate(frame - 360, [45, 65], [0, 0.5]),
          }}>
            <p style={{ fontSize: 16, color: '#4a5568', fontFamily: 'monospace' }}>www.sylailabs.com</p>
          </div>
        </div>
      </Sequence>

    </div>
  );
};
