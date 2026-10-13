import { useEffect, useRef, useState } from 'react';
import { RotateCcw } from 'lucide-react';

// Give visitors time to see a scene before it changes. Leaving the viewport or
// backgrounding the tab cancels the countdown instead of playing it unseen.
function observeScene(element: HTMLElement, play: () => void, delay: number) {
  let visible = false;
  let timer: ReturnType<typeof setTimeout> | undefined;
  const schedule = () => {
    clearTimeout(timer);
    if (visible && !document.hidden) {
      timer = setTimeout(() => { cleanup(); play(); }, delay);
    }
  };
  const observer = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting && entry.intersectionRatio >= 0.3;
    schedule();
  }, { threshold: [0, 0.3] });
  const cleanup = () => {
    clearTimeout(timer);
    observer.disconnect();
    document.removeEventListener('visibilitychange', schedule);
  };
  observer.observe(element);
  document.addEventListener('visibilitychange', schedule);
  return cleanup;
}

export function ShootingStars({ motion }: { motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!motion || !root.current) return;
    const layer = root.current;
    let lastPosition = window.scrollY;
    let travelled = 0;
    let lastShower = -6500;
    let shower = 0;
    const animations = new Set<Animation>();
    const clear = () => { animations.forEach(animation => animation.cancel()); animations.clear(); };
    const onScroll = () => {
      travelled += Math.abs(window.scrollY - lastPosition);
      lastPosition = window.scrollY;
      const now = performance.now();
      if (document.hidden || window.scrollY < window.innerHeight * 0.45 || travelled < 200 || now - lastShower < 6500) return;
      lastShower = now;
      travelled = 0;
      shower += 1;
      clear();
      layer.querySelectorAll<HTMLElement>('.scroll-meteor').forEach((star, i) => {
        const startX = window.innerWidth * (i ? 0.57 : 0.12 + (shower % 3) * 0.1);
        const startY = window.innerHeight * (i ? 0.48 : 0.18);
        const distance = Math.min(window.innerWidth * 0.55, 440);
        const animation = star.animate([
          { opacity: 0, transform: `translate(${startX}px, ${startY}px) rotate(32deg)` },
          { opacity: i ? 0.4 : 0.65, offset: 0.12 },
          { opacity: 0, transform: `translate(${startX + distance}px, ${startY + distance * 0.62}px) rotate(32deg)` },
        ], { duration: i ? 1550 : 1800, delay: i * 800, easing: 'ease-out', fill: 'none' });
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      });
    };
    const onVisibility = () => { if (document.hidden) clear(); };
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);
    return () => { clear(); window.removeEventListener('scroll', onScroll); document.removeEventListener('visibilitychange', onVisibility); };
  }, [motion]);
  return <div ref={root} className="scroll-meteors" aria-hidden="true"><span className="scroll-meteor" /><span className="scroll-meteor" /></div>;
}

export function Moon({ className = '' }: { className?: string }) {
  return <span className={`little-moon ${className}`} aria-hidden="true"><i /><i /><i /></span>;
}

export function Astronaut() {
  return (
    <svg className="astronaut" viewBox="0 0 130 150" fill="none" aria-hidden="true">
      <path d="M81 101C120 134 125 75 106 57C88 41 119 17 128 30" stroke="#8da6bc" strokeWidth="1" strokeDasharray="3 4" />
      <g stroke="#b9cddd" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" transform="rotate(-18 62 77)">
        <rect x="38" y="58" width="51" height="50" rx="12" fill="#162231" />
        <path d="M43 65L25 84Q18 87 18 79L34 54M86 63L101 80Q105 88 99 91L80 77" fill="#c1cfd4" />
        <path d="M47 97L40 125Q40 131 50 128L64 104M68 104L76 127Q83 134 88 126L82 96" fill="#c1cfd4" />
        <rect x="39" y="59" width="45" height="48" rx="16" fill="#d3dce0" />
        <rect x="48" y="73" width="26" height="17" rx="3" fill="#526b7c" />
        <path d="M52 78H62M52 83H58" stroke="#d3dce0" />
        <circle cx="68" cy="82" r="2" fill="#edc38d" stroke="none" />
        <circle cx="61" cy="43" r="26" fill="#d3dce0" />
        <rect x="41" y="29" width="40" height="27" rx="13" fill="#152334" stroke="#90aabf" />
        <path d="M48 37Q54 31 66 34" stroke="#90aabf" strokeWidth="2" />
        <path d="M49 97H75M43 118L53 122M77 119L86 116" stroke="#526b7c" />
      </g>
    </svg>
  );
}

export function Rocket() {
  return (
    <svg className="journey-rocket" viewBox="0 0 90 130" fill="none" aria-hidden="true">
      <g transform="rotate(20 45 65)" strokeWidth="1.5" strokeLinejoin="round">
        <path className="rocket-flame" d="M35 93Q33 111 45 123Q57 109 55 93" fill="#e7b780" fillOpacity=".5" stroke="#e7b780" />
        <path d="M29 60L17 83L19 99L34 88M61 60L73 83L71 99L56 88" fill="#526b7c" stroke="#b9cddd" />
        <path d="M45 11C23 32 23 69 33 94H57C67 69 67 32 45 11Z" fill="#c6d2d8" stroke="#d5e3ec" />
        <path d="M32 36Q45 40 58 36L45 11Z" fill="#8caec7" stroke="#8caec7" />
        <circle cx="45" cy="57" r="10" fill="#122332" stroke="#6e91a9" />
        <path d="M40 55Q42 51 47 52" stroke="#accce4" strokeLinecap="round" />
        <path d="M34 87H56" stroke="#526b7c" />
      </g>
    </svg>
  );
}

const scribbles = Array.from({ length: 18 }, (_, i) => {
  const n = (offset: number, scale: number) => (Math.sin(i * 13.7 + offset) * 0.5 + 0.5) * scale;
  return `M ${65 + n(1, 170)} ${35 + n(2, 130)} C ${20 + n(3, 270)} ${n(4, 180)}, ${30 + n(5, 260)} ${n(6, 190)}, ${55 + n(7, 185)} ${35 + n(8, 130)} S ${20 + n(9, 280)} ${n(10, 190)}, ${70 + n(11, 150)} ${40 + n(12, 120)}`;
});

export function ThoughtSketch({ motion }: { motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [untangled, setUntangled] = useState(false);
  useEffect(() => {
    if (!motion || untangled || !root.current) return;
    return observeScene(root.current, () => setUntangled(true), 2400);
  }, [motion, untangled]);
  return (
    <div ref={root} className={`thought-sketch ${untangled ? 'thoughts-clear' : ''}`}>
      <div className="thought-topline"><span className="eyebrow">Somewhere inside my head</span><span className="hand-note">probably another idea</span></div>
      <svg viewBox="0 0 320 210" role="img" aria-label={untangled ? 'The tangled thoughts resolve into four connected ideas.' : 'A hand-drawn brain filled with tangled pen strokes.'}>
        <defs><clipPath id="brain-outline"><path d="M158 34C130 9 101 20 90 40C57 31 38 58 42 80C11 99 21 131 41 140C35 166 64 184 88 177C105 202 138 192 159 178C183 197 215 194 231 176C263 184 286 160 277 139C307 114 290 90 277 80C283 48 254 31 231 38C207 9 178 17 158 34Z" /></clipPath></defs>
        <path className="brain-silhouette" d="M158 34C130 9 101 20 90 40C57 31 38 58 42 80C11 99 21 131 41 140C35 166 64 184 88 177C105 202 138 192 159 178C183 197 215 194 231 176C263 184 286 160 277 139C307 114 290 90 277 80C283 48 254 31 231 38C207 9 178 17 158 34Z" />
        <g className="brain-scribbles" clipPath="url(#brain-outline)">{scribbles.map((d, i) => <path d={d} key={i} style={{ opacity: 0.3 + (i % 4) * 0.16 }} />)}</g>
        <g className="brain-ideas"><path d="M80 110L158 69L239 117M80 110L158 154L239 117M158 69V154" /><circle cx="80" cy="110" r="7" /><circle cx="158" cy="69" r="7" /><circle cx="239" cy="117" r="7" /><circle cx="158" cy="154" r="5" /></g>
        <path className="brain-middle" d="M157 35Q146 62 160 84T158 132T159 178" />
      </svg>
      <div className="thought-bottom"><span className="hand-note" aria-live="polite">{untangled ? 'one question at a time.' : 'a few too many tabs open.'}</span><button type="button" className="text-button" disabled={motion && !untangled} onClick={() => setUntangled(value => !value)}><RotateCcw size={14} />{untangled ? 'Tangle again' : motion ? 'Finding a little order…' : 'Untangle a thought'}</button></div>
    </div>
  );
}

export function BlackHole({ motion }: { motion: boolean }) {
  const root = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'ready' | 'falling' | 'gone'>('ready');
  useEffect(() => {
    if (!motion || phase !== 'ready' || !root.current) return;
    return observeScene(root.current, () => setPhase('falling'), 1200);
  }, [motion, phase]);
  const visiblePhase = motion ? phase : 'ready';
  return (
    <div ref={root} className={`black-hole-scene black-hole-${visiblePhase}`}>
      <div className="black-hole-stage" aria-label="A playful black hole that stretches and swallows Nuel’s portrait" role="img">
        <span className="black-hole-halo" /><span className="accretion-disc disc-back" /><span className="event-horizon" /><span className="accretion-disc disc-front" />
        <div className="falling-portrait" onAnimationEnd={event => { if (event.animationName === 'spaghettify') setPhase('gone'); }}><img src="/og-profile.jpg" alt="" width="64" height="64" loading="lazy" /></div>
        <span className="black-hole-label">POINT OF NO RETURN</span>
        <span className="black-hole-coordinate" aria-hidden="true">r = rₛ</span>
      </div>
      <div className="black-hole-caption"><span className="hand-note" aria-live="polite">{visiblePhase === 'gone' ? 'well, that escalated.' : 'curiosity has a gravitational pull.'}</span><button type="button" className="text-button" disabled={!motion || visiblePhase !== 'gone'} onClick={() => setPhase('ready')}><RotateCcw size={13} />{!motion ? 'Motion is paused' : visiblePhase === 'gone' ? 'Bring me back' : visiblePhase === 'falling' ? 'Getting carried away…' : 'Gravity is calling…'}</button></div>
    </div>
  );
}
