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

// Two distinct hemispheres and a persistent network of cortical folds keep the
// illustration recognisable after the temporary scribbles have cleared.
const leftHemisphere = 'M153 36C146 20 127 20 115 31C99 26 82 37 79 52C61 57 52 75 57 90C43 103 44 123 54 135C47 153 57 173 72 179C76 198 94 211 112 209C122 223 143 222 150 207C156 191 149 176 155 158C149 141 156 127 151 111C156 94 150 78 155 63C151 52 156 44 153 36Z';
const rightHemisphere = 'M167 36C174 20 193 20 205 31C221 26 238 37 241 52C259 57 268 75 263 90C277 103 276 123 266 135C273 153 263 173 248 179C244 198 226 211 208 209C198 223 177 222 170 207C164 191 171 176 165 158C171 141 164 127 169 111C164 94 170 78 165 63C169 52 164 44 167 36Z';
const corticalFolds = [
  'M116 32C109 45 121 57 135 51C145 47 147 59 140 67',
  'M81 54C92 47 109 52 106 65C103 76 117 84 129 76C139 71 147 79 144 90',
  'M61 83C74 73 88 82 83 95C78 108 87 119 101 112C113 106 122 114 118 126',
  'M56 120C65 111 75 119 70 132C68 143 80 149 88 140C99 130 111 137 107 150',
  'M64 161C78 151 91 158 87 172C84 183 96 192 107 184C117 177 127 183 123 198',
  'M105 91C121 92 127 101 123 112C119 124 132 132 145 122',
  'M112 155C125 143 140 148 137 161C133 172 143 182 150 178',
  'M109 206C108 196 116 189 125 194C134 199 143 194 143 185',
];

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
      <svg className="brain-drawing" viewBox="0 0 320 240" role="img" aria-label={untangled ? 'A brain with two hemispheres and visible folds, with four connected ideas inside.' : 'A brain with two hemispheres, visible folds, and tangled pen strokes inside.'}>
        <defs><clipPath id="brain-outline"><path d={leftHemisphere} /><path d={rightHemisphere} /></clipPath></defs>
        <path className="brain-stem" d="M149 201Q148 219 153 231H168Q171 217 170 201" />
        <path className="brain-silhouette" d={leftHemisphere} />
        <path className="brain-silhouette" d={rightHemisphere} />
        <g className="brain-folds">{corticalFolds.map((d, i) => <path key={i} d={d} />)}<g transform="translate(320 0) scale(-1 1)">{corticalFolds.map((d, i) => <path key={i} d={d} />)}</g></g>
        <g className="brain-scribbles" clipPath="url(#brain-outline)">{scribbles.map((d, i) => <path d={d} key={i} style={{ opacity: 0.3 + (i % 4) * 0.16 }} />)}</g>
        <g className="brain-ideas"><path d="M97 99Q151 59 216 99M97 99Q111 144 129 167M216 99Q221 143 198 168M129 167Q165 144 198 168M97 99Q156 147 198 168M216 99Q170 127 129 167" /><circle cx="97" cy="99" r="4" /><circle cx="216" cy="99" r="4" /><circle cx="129" cy="167" r="4" /><circle cx="198" cy="168" r="4" /></g>
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
