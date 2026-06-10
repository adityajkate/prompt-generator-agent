'use client';

import { useTheme } from './ThemeProvider';

export default function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className="fixed top-4 right-4 sm:top-5 sm:right-5 z-50 cursor-pointer select-none"
      onClick={toggle}
      style={{ width: 'clamp(64px, 12vw, 80px)', height: 'clamp(28px, 5vw, 34px)' }}
    >
      <div
        className={`toggle-content ${isDark ? 'dark-mode' : 'light-mode'}`}
        style={{
          width: '100%',
          height: '100%',
          borderRadius: '999px',
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          background: isDark ? '#1f2234' : '#2e83bf',
          transition: 'all 0.6s ease',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5), 0.5px 0.5px 1px rgba(255,255,255,0.4)',
        }}
      >

        <div
          style={{
            width: 'clamp(20px, 4vw, 26px)',
            height: 'clamp(20px, 4vw, 26px)',
            position: 'absolute',
            top: '50%',
            left: isDark ? 'calc(100% - clamp(20px, 4vw, 26px) - 3px)' : '3px',
            transform: 'translateY(-50%)',
            borderRadius: '50%',
            isolation: 'isolate',
            zIndex: 1,
            transition: 'all 0.6s ease',
          }}
        >

          <div
            style={{
              position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 2,
              boxShadow: 'inset 0.5px 0.5px 1px rgba(255,255,255,0.4), -0.5px -0.5px 0.5px rgba(255,255,255,0.4), inset -0.5px -0.5px 0.5px rgba(0,0,0,0.3), 0.5px 0.5px 0.5px rgba(0,0,0,0.3), 0.5px 0.5px 2px rgba(0,0,0,0.15)',
            }}
          />
          <div
            className="sun"
            style={{
              width: '100%', height: '100%',
              background: '#fbc72d',
              borderRadius: '50%', position: 'relative', overflow: 'hidden', zIndex: 1,
            }}
          >
            <div
              className="moon"
              style={{
                width: '100%', height: '100%',
                background: '#cccfd9',
                borderRadius: '50%',
                position: 'absolute', top: 0,
                left: isDark ? '0%' : '100%',
                transform: isDark ? 'rotate(0deg)' : 'rotate(60deg)',
                transition: 'all 0.6s ease',
                boxShadow: 'inset 0.5px 0.5px 1px rgba(255,255,255,0.4), -0.5px -0.5px 1px rgba(255,255,255,0.4), inset -0.5px -0.5px 1px rgba(0,0,0,0.3), 0.5px 0.5px 1px rgba(0,0,0,0.3), 0.5px 0.5px 2px rgba(0,0,0,0.2)',
              }}
            >
              <div className="dot dot1" style={{ width: '18%', height: '18%', background: '#9da8bc', borderRadius: '50%', position: 'absolute', top: '20%', left: '45%' }} />
              <div className="dot dot2" style={{ width: '18%', height: '18%', background: '#9da8bc', borderRadius: '50%', position: 'absolute', top: '50%', left: '25%', transform: 'scale(2)' }} />
              <div className="dot dot3" style={{ width: '18%', height: '18%', background: '#9da8bc', borderRadius: '50%', position: 'absolute', top: '60%', left: '62%', transform: 'scale(1.2)' }} />
            </div>
          </div>

          <div
            className="rays"
            style={{
              position: 'absolute', inset: 0, pointerEvents: 'none',
              transform: isDark ? 'scale(0.85)' : 'scale(1)',
              transition: 'all 0.6s ease',
            }}
          >
            {[2, 2.9, 3.8].map((s, i) => (
              <div key={i} style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                background: 'rgba(255,255,255,0.08)',
                backdropFilter: 'blur(0.1px)',
                transform: `scale(${s})`,
              }} />
            ))}
          </div>
        </div>

        <div
          className="stars"
          style={{
            position: 'absolute', width: '70%', height: '100%',
            top: isDark ? '0%' : '-100%',
            transition: 'all 0.6s ease', pointerEvents: 'none',
          }}
        >
          {[
            { t: '12%', l: '25%', s: 1 },
            { t: '30%', l: '10%', s: 0.4 },
            { t: '35%', l: '60%', s: 0.3 },
            { t: '25%', l: '77.5%', s: 1.1 },
            { t: '45%', l: '27.5%', s: 0.3 },
            { t: '50%', l: '58.5%', s: 0.2 },
            { t: '55%', l: '77.5%', s: 0.3 },
            { t: '65%', l: '18%', s: 0.2 },
            { t: '72.5%', l: '15%', s: 0.2 },
            { t: '80%', l: '30%', s: 0.24 },
            { t: '75%', l: '62.5%', s: 0.5 },
          ].map((star, i) => (
            <div key={i} style={{
              position: 'absolute', top: star.t, left: star.l,
              width: 'clamp(4px, 0.8vw, 5px)', height: 'clamp(4px, 0.8vw, 5px)',
              background: '#f8fcff',
              clipPath: 'polygon(50% 0, 65% 35%, 100% 50%, 65% 65%, 50% 100%, 35% 65%, 0 50%, 35% 35%)',
              transform: `scale(${star.s})`,
            }} />
          ))}
        </div>

        <div
          className="clouds"
          style={{
            position: 'absolute', inset: 0, pointerEvents: 'none',
            top: isDark ? '100%' : '0',
            isolation: 'isolate', transition: 'all 0.6s ease',
          }}
        >

          <div className="cloudset1" style={{
            position: 'absolute', inset: 0,
            bottom: '-15%', right: '-10%', zIndex: 1,
          }}>
            {[{ x: 0, y: -24, s: 1 }, { x: 14, y: -20, s: 1.3 }, { x: 27.5, y: -15, s: 1.3 }, { x: 40, y: -12, s: 0.9 }, { x: 52.5, y: -7.5, s: 1.1 }, { x: 67.5, y: 0, s: 1.3 }, { x: 80, y: 25, s: 1.55 }].map((c, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${c.x}%`, bottom: `${c.y}%`,
                width: 'clamp(10px, 2vw, 14px)', height: 'clamp(10px, 2vw, 14px)',
                background: '#f5faff',
                borderRadius: '50%',
                transform: `scale(${c.s})`,
              }} />
            ))}
          </div>

          <div className="cloudset2" style={{
            position: 'absolute', inset: 0,
            bottom: '0%', right: '-6%',
            transform: 'rotate(-5deg)',
          }}>
            {[{ x: 0, y: -24, s: 1, c: '#a7cbea' }, { x: 15, y: -18, s: 1.3, c: '#a7cbea' }, { x: 29, y: -7.5, s: 1.3, c: '#a7cbea' }, { x: 40, y: -12, s: 0.9, c: '#a7cbea' }, { x: 52.5, y: -1, s: 1.1, c: '#a7cbea' }, { x: 67.5, y: 4, s: 1.3, c: '#a7cbea' }, { x: 80, y: 25, s: 1.55, c: '#a7cbea' }].map((c, i) => (
              <div key={i} style={{
                position: 'absolute',
                left: `${c.x}%`, bottom: `${c.y}%`,
                width: 'clamp(10px, 2vw, 14px)', height: 'clamp(10px, 2vw, 14px)',
                background: c.c,
                borderRadius: '50%',
                transform: `scale(${c.s})`,
              }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
