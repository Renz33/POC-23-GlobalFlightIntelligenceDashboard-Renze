'use client';

import { useEffect, useRef, useState } from 'react';

interface Props {
  onComplete: () => void;
}

export default function Intro({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showText, setShowText] = useState(false);
  const [fadeOut, setFadeOut]   = useState(false);
  const [done, setDone]         = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const W = window.innerWidth;
    const H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Stars
    const stars = Array.from({ length: 180 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.3,
      o: Math.random() * 0.5 + 0.2,
    }));

    // Trail dots
    const trail: { x: number; y: number; life: number; size: number; color: string }[] = [];
    const trailColors = ['#60a5fa', '#34d399', '#a78bfa', '#93c5fd', '#6ee7b7'];

    let frame  = 0;
    let animId = 0;
    const TOTAL_FRAMES = 160;

    setTimeout(() => setShowText(true), 800);

    function getPlanePos(f: number) {
      const t    = Math.min(f / TOTAL_FRAMES, 1);
      const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      const x    = -60 + ease * (W + 120);
      const y    = H * 0.5 + Math.sin(t * Math.PI * 3) * 45;
      return { x, y };
    }

    function drawBg() {
      ctx.fillStyle = '#0a0f1e';
      ctx.fillRect(0, 0, W, H);
    }

    function drawGrid() {
      ctx.strokeStyle = 'rgba(30,58,95,0.4)';
      ctx.lineWidth   = 0.8;
      for (let x = 0; x < W; x += 60) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (let y = 0; y < H; y += 60) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
    }

    function drawStars() {
      stars.forEach(s => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(148,163,184,${s.o})`;
        ctx.fill();
      });
    }

    function drawRadar() {
      const cx = W / 2, cy = H / 2;
      [100, 200, 310, 430].forEach((r, i) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(30,58,130,${0.25 - i * 0.04})`;
        ctx.lineWidth   = 1;
        ctx.stroke();
      });
    }

    function addTrail(x: number, y: number) {
      for (let i = 0; i < 5; i++) {
        trail.push({
          x: x - 8 + Math.random() * 4,
          y: y + (Math.random() - 0.5) * 14,
          life: 1,
          size: Math.random() * 4 + 1,
          color: trailColors[Math.floor(Math.random() * trailColors.length)],
        });
      }
    }

    function drawTrail() {
      for (let i = trail.length - 1; i >= 0; i--) {
        const p = trail[i];
        p.life -= 0.018;
        p.x    -= 1.2;
        p.y    += (Math.random() - 0.5) * 0.5;

        if (p.life <= 0) { trail.splice(i, 1); continue; }

        const alpha = p.life * 0.85;
        const r = parseInt(p.color.slice(1, 3), 16);
        const g = parseInt(p.color.slice(3, 5), 16);
        const b = parseInt(p.color.slice(5, 7), 16);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
        ctx.fill();
      }
    }

    function drawPlane(x: number, y: number) {
      ctx.save();
      ctx.translate(x, y);

      // Glow effect
      ctx.shadowColor = '#60a5fa';
      ctx.shadowBlur  = 20;

      // Fuselage
      ctx.fillStyle = '#e2e8f0';
      ctx.beginPath();
      ctx.moveTo(36, 0);
      ctx.lineTo(-24, -8);
      ctx.lineTo(-16, 0);
      ctx.lineTo(-24, 8);
      ctx.closePath();
      ctx.fill();

      // Main wing
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.moveTo(8,  0);
      ctx.lineTo(-8, -26);
      ctx.lineTo(-18, -26);
      ctx.lineTo(-14, 0);
      ctx.closePath();
      ctx.fill();

      // Bottom wing
      ctx.fillStyle = '#93c5fd';
      ctx.beginPath();
      ctx.moveTo(8,  0);
      ctx.lineTo(-8, 26);
      ctx.lineTo(-18, 26);
      ctx.lineTo(-14, 0);
      ctx.closePath();
      ctx.fill();

      // Tail fin
      ctx.fillStyle = '#7dd3fc';
      ctx.beginPath();
      ctx.moveTo(-16, 0);
      ctx.lineTo(-26, -14);
      ctx.lineTo(-30, -14);
      ctx.lineTo(-24, 0);
      ctx.closePath();
      ctx.fill();

      // Cockpit window glow
      ctx.shadowColor = '#bfdbfe';
      ctx.shadowBlur  = 10;
      ctx.fillStyle   = '#bfdbfe';
      ctx.beginPath();
      ctx.ellipse(18, -3, 5, 3, 0, 0, Math.PI * 2);
      ctx.fill();

      // Engine glow dot
      ctx.shadowColor = '#34d399';
      ctx.shadowBlur  = 14;
      ctx.fillStyle   = '#34d399';
      ctx.beginPath();
      ctx.arc(-4, -12, 3, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }

    function animate() {
      frame++;
      drawBg();
      drawGrid();
      drawRadar();
      drawStars();

      if (frame <= TOTAL_FRAMES) {
        const pos = getPlanePos(frame);
        addTrail(pos.x, pos.y);
        drawTrail();
        drawPlane(pos.x, pos.y);
      } else {
        drawTrail();
      }

      

      animId = requestAnimationFrame(animate);
    }

    animId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animId);
  }, []);

  if (done) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      opacity: fadeOut ? 0 : 1,
      transition: 'opacity 1s ease',
      pointerEvents: fadeOut ? 'none' : 'auto',
    }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

      {/* Text overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        pointerEvents: 'none',
      }}>
        <div style={{
          textAlign: 'center',
          opacity:   showText ? 1 : 0,
          transform: showText ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 1s ease',
        }}>
          <div style={{
            fontSize: 12, letterSpacing: 7,
            color: '#34d399', fontWeight: 700,
            textTransform: 'uppercase', marginBottom: 18,
          }}>
            Real Rails Intelligence Library
          </div>

          <div style={{
            fontSize: 58, fontWeight: 800,
            color: '#f1f5f9', lineHeight: 1.1,
            letterSpacing: '-1.5px', textShadow: '0 0 40px rgba(96,165,250,0.3)',
          }}>
            Global Flight<br />
            <span style={{ color: '#60a5fa', textShadow: '0 0 30px rgba(96,165,250,0.6)' }}>
              Intelligence
            </span>
          </div>

          <div style={{
            fontSize: 15, color: '#475569',
            marginTop: 14, letterSpacing: 1,
          }}>
            Real-time · ADS-B · OpenSky Network
          </div>

          <button
  onClick={() => {
    setFadeOut(true);

    setTimeout(() => {
      setDone(true);
      onComplete();
    }, 1000);
  }}
            style={{
              marginTop: 40, pointerEvents: 'auto',
              padding: '13px 36px', borderRadius: 999,
              background: 'rgba(59,130,246,0.12)',
              border: '1px solid rgba(96,165,250,0.45)',
              color: '#60a5fa', fontSize: 14, fontWeight: 600,
              cursor: 'pointer', letterSpacing: 1.5,
            }}
          >
            ENTER DASHBOARD →
          </button>
        </div>
      </div>

      <style>{`
        @keyframes glow-pulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(59,130,246,0.5); }
          50%      { box-shadow: 0 0 0 14px rgba(59,130,246,0); }
        }
        button { animation: glow-pulse 2.2s infinite; }
      `}</style>
    </div>
  );
}