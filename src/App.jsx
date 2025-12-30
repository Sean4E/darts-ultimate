import React, { useState, useEffect, useCallback } from 'react';
import { Home, Target, Dumbbell, BookOpen, BarChart3, Settings, X, ChevronRight, RotateCcw, Share2, Volume2, Vibrate, MessageSquare, HelpCircle } from 'lucide-react';

// ============ CONSTANTS ============
const CHECKOUTS = {170:'T20 T20 Bull',167:'T20 T19 Bull',164:'T20 T18 Bull',161:'T20 T17 Bull',160:'T20 T20 D20',158:'T20 T20 D19',157:'T20 T19 D20',156:'T20 T20 D18',155:'T20 T19 D19',154:'T20 T18 D20',152:'T20 T20 D16',151:'T20 T17 D20',150:'T20 T18 D18',148:'T20 T20 D14',146:'T20 T18 D16',144:'T20 T20 D12',142:'T20 T14 D20',140:'T20 T20 D10',138:'T20 T18 D12',136:'T20 T20 D8',134:'T20 T14 D16',132:'T20 T16 D12',130:'T20 T20 D5',128:'T18 T14 D16',127:'T20 T17 D8',126:'T19 T19 D6',125:'T20 T19 D4',124:'T20 T16 D8',123:'T19 T16 D9',122:'T18 T18 D7',121:'T20 T11 D14',120:'T20 S20 D20',119:'T19 T12 D13',118:'T20 S18 D20',117:'T20 S17 D20',116:'T20 S16 D20',115:'T20 S15 D20',114:'T20 S14 D20',113:'T20 S13 D20',112:'T20 T12 D8',111:'T20 S19 D16',110:'T20 S10 D20',109:'T20 S9 D20',108:'T20 S16 D16',107:'T19 S10 D20',106:'T20 S6 D20',105:'T20 S5 D20',104:'T18 S10 D20',103:'T19 S6 D20',102:'T20 S10 D16',101:'T17 S10 D20',100:'T20 D20',99:'T19 S10 D16',98:'T20 D19',97:'T19 D20',96:'T20 D18',95:'T19 D19',94:'T18 D20',93:'T19 D18',92:'T20 D16',91:'T17 D20',90:'T18 D18',89:'T19 D16',88:'T20 D14',87:'T17 D18',86:'T18 D16',85:'T19 D14',84:'T20 D12',83:'T17 D16',82:'T14 D20',81:'T19 D12',80:'T20 D10',79:'T13 D20',78:'T18 D12',77:'T19 D10',76:'T20 D8',75:'T17 D12',74:'T14 D16',73:'T19 D8',72:'T16 D12',71:'T13 D16',70:'T18 D8',69:'T19 D6',68:'T20 D4',67:'T17 D8',66:'T10 D18',65:'T19 D4',64:'T16 D8',63:'T13 D12',62:'T10 D16',61:'T15 D8',60:'S20 D20',59:'S19 D20',58:'S18 D20',57:'S17 D20',56:'T16 D4',55:'S15 D20',54:'S14 D20',53:'S13 D20',52:'T12 D8',51:'S11 D20',50:'S10 D20',49:'S9 D20',48:'S16 D16',47:'S15 D16',46:'S6 D20',45:'S13 D16',44:'S12 D16',43:'S11 D16',42:'S10 D16',41:'S9 D16',40:'D20',39:'S7 D16',38:'D19',37:'S5 D16',36:'D18',35:'S3 D16',34:'D17',33:'S1 D16',32:'D16',31:'S15 D8',30:'D15',29:'S13 D8',28:'D14',27:'S11 D8',26:'D13',25:'S9 D8',24:'D12',23:'S7 D8',22:'D11',21:'S5 D8',20:'D10',19:'S3 D8',18:'D9',17:'S1 D8',16:'D8',15:'S7 D4',14:'D7',13:'S5 D4',12:'D6',11:'S3 D4',10:'D5',9:'S1 D4',8:'D4',7:'S3 D2',6:'D3',5:'S1 D2',4:'D2',3:'S1 D1',2:'D1'};

const THEMES = {
  cosmic: { name: 'Cosmic', primary: '#8B5CF6', secondary: '#EC4899', bg: '#0F0A1A', bgMed: '#1A1225', bgLight: '#251A35' },
  ocean: { name: 'Ocean', primary: '#0EA5E9', secondary: '#06B6D4', bg: '#0A1628', bgMed: '#0F1E32', bgLight: '#162844' },
  sunset: { name: 'Sunset', primary: '#F97316', secondary: '#EF4444', bg: '#1A0F0A', bgMed: '#251510', bgLight: '#351F18' },
  forest: { name: 'Forest', primary: '#10B981', secondary: '#06B6D4', bg: '#0A1A14', bgMed: '#0F251C', bgLight: '#183528' },
  neon: { name: 'Neon', primary: '#E11D48', secondary: '#A855F7', bg: '#0A0A0A', bgMed: '#141414', bgLight: '#1F1F1F' },
  midnight: { name: 'Midnight', primary: '#FBBF24', secondary: '#F97316', bg: '#09090B', bgMed: '#18181B', bgLight: '#27272A' },
  ruby: { name: 'Ruby', primary: '#DC2626', secondary: '#F97316', bg: '#1A0808', bgMed: '#251212', bgLight: '#351818' },
  emerald: { name: 'Emerald', primary: '#059669', secondary: '#10B981', bg: '#061A14', bgMed: '#0A251C', bgLight: '#123528' },
  sapphire: { name: 'Sapphire', primary: '#2563EB', secondary: '#3B82F6', bg: '#080A1A', bgMed: '#101525', bgLight: '#182035' },
};

const BACKGROUNDS = {
  dark: { name: 'Dark', class: 'bg-dark' },
  light: { name: 'Light', class: 'bg-light' },
  gradient: { name: 'Gradient', class: 'bg-gradient' },
};

const AVATARS = [
  // Sports & Games
  '🎯','🎱','🎳','🎮','🎲','🃏','♠️','♣️','♥️','♦️','🏆','🥇','🥈','🥉','🏅','🎖️',
  // Cool & Fire
  '😎','🔥','⚡','💥','✨','🌟','💫','⭐','🌈','💎','💰','👑','🎩','🕶️',
  // Animals
  '🦊','🐺','🦁','🐯','🦅','🐲','🦄','🐉','🦈','🐍','🦂','🐝','🦋','🐬','🦏','🐘',
  // People & Faces
  '🤴','👸','🧙','🧛','🤖','👽','💀','☠️','👹','👺','🤡','👻','🎃','😈','👿',
  // Objects & Symbols
  '💪','🤘','👊','✌️','🤙','👋','🖖','💣','🗡️','🛡️','⚔️','🏹','🔱','⚜️',
  // Food & Nature
  '🍀','🌵','🌴','🎄','🌺','🌻','🍎','🍊','🍋','🍒','🍇','🥑','🌶️','🍕','🍔','🍺',
  // Misc
  '🎪','🎭','🎨','🎬','🎤','🎸','🥁','🎹','🚀','🛸','⚓','🔮','💡','🔒','⚙️','🧲'
];
const COLORS = ['#8B5CF6','#EC4899','#06B6D4','#F59E0B','#10B981','#EF4444','#3B82F6','#F472B6','#84CC16','#14B8A6'];

const TIPS = [
  { title: 'Master the Trebles', text: 'Focus on T20-T19-T18 corridor for max efficiency.' },
  { title: 'Consistent Grouping', text: 'Tight groups anywhere beat scattered high shots.' },
  { title: 'Leave Even Numbers', text: 'Best finishes: 40 (D20), 32 (D16), 36 (D18).' },
  { title: 'Cover Shots', text: 'Aim slightly left of T20 to avoid S1/S5.' },
  { title: 'Doubles Practice', text: 'Spend 50% of practice time on doubles.' },
  { title: 'Bogey Numbers', text: 'Avoid leaving 169, 168, 166, 165, 163, 162, 159.' },
  { title: 'Pressure Doubles', text: 'D16 is the most forgiving - D8 if you miss.' },
  { title: 'Warm Up Right', text: 'Start with 20s, then doubles, then checkouts.' },
];

const ACHIEVEMENTS = {
  first180: { icon: '💎', name: 'First 180', desc: 'Hit your first maximum' },
  ton80: { icon: '🔥', name: 'Ton-80', desc: 'Score 160+ in a turn' },
  checkout100: { icon: '🎯', name: '100+ Out', desc: 'Checkout 100 or more' },
  games10: { icon: '🎮', name: '10 Games', desc: 'Play 10 matches' },
  avg80: { icon: '📈', name: '80+ Avg', desc: 'Average 80+ in a match' },
  nineDarter: { icon: '⭐', name: '9 Darter', desc: 'Perfect leg in 9 darts' },
};

const GUIDES = {
  stance: {
    title: 'Stance & Grip',
    icon: '🧍',
    content: [
      { h: 'Distance', p: 'Stand 7ft 9.25in (2.37m) from the board face.' },
      { h: 'Stance', p: 'Dominant foot forward, body sideways to the board. Keep your back foot grounded for balance.' },
      { h: 'Grip', p: 'Use 3-4 fingers, firm but relaxed. Find a grip that feels natural and repeatable.' },
      { h: 'Elbow', p: 'Keep your elbow at 90° pointing directly at your target.' },
    ]
  },
  strategy: {
    title: 'Scoring Strategy',
    icon: '🧠',
    content: [
      { h: 'Opening', p: 'Always aim for T20 first. Only switch to T19 if you\'re consistently missing left.' },
      { h: 'Setup Shots', p: 'Leave yourself on even numbers. Best finishes are 40, 32, and 36.' },
      { h: 'Bogey Numbers', p: 'Avoid 169, 168, 166, 165, 163, 162, 159 - they have no 3-dart checkout.' },
      { h: 'Risk vs Safe', p: 'When ahead, play safe. When behind, take risks on big scores.' },
    ]
  },
  mental: {
    title: 'Mental Game',
    icon: '💭',
    content: [
      { h: 'Routine', p: 'Develop and stick to the same approach for every throw.' },
      { h: 'Focus', p: 'Concentrate on one dart at a time. Forget bad darts immediately.' },
      { h: 'Pressure', p: 'Slow your breathing and maintain normal timing under pressure.' },
      { h: 'Visualization', p: 'See the dart hitting the target before you throw.' },
    ]
  },
};

const PRACTICE_MODES = [
  { id: 'doubles', name: 'Doubles Master', icon: '🎯', desc: 'Hit all doubles D1-D20', targets: 20 },
  { id: 'bob27', name: "Bob's 27", icon: '👁️', desc: 'Classic drill - start at 27 points', targets: 20 },
  { id: 'around', name: 'Around the Clock', icon: '🔄', desc: 'Hit 1-20 in sequence', targets: 20 },
  { id: 'triples', name: 'Triple Threat', icon: '🔥', desc: 'Master T20, T19, T18, T17', targets: 6 },
  { id: 'checkout', name: 'Checkout Drill', icon: '🏆', desc: 'Practice common finishes', targets: 10 },
  { id: 'random', name: 'Random Targets', icon: '🎲', desc: 'Test overall accuracy', targets: 15 },
];

// ============ UTILITIES ============
const playSound = (type, volume = 0.08) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = volume;

    const sounds = {
      throw: { freq: 800, dur: 0.04 },
      hit: { freq: 1200, dur: 0.08 },
      miss: { freq: 200, dur: 0.12 },
      bust: { freq: 150, dur: 0.25 },
      next: { freq: 600, dur: 0.06 },
      win: { freq: 1000, dur: 0.3 },
      click: { freq: 400, dur: 0.02 },
    };

    const s = sounds[type] || sounds.click;
    osc.frequency.value = s.freq;
    osc.start();
    osc.stop(ctx.currentTime + s.dur);
  } catch (e) {}
};

const hapticFeedback = (intensity = 8) => {
  if (navigator.vibrate) navigator.vibrate(intensity);
};

const cryptoRandom = (max) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

const speak = (text) => {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 0.8;
    speechSynthesis.speak(utterance);
  }
};

// ============ COMPONENTS ============

// Interactive Dartboard SVG with magnifier for precision
const Dartboard = ({ onHit, size = 300, numberSize = 14 }) => {
  const nums = [20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];
  const cx = 200, cy = 200;
  const svgRef = React.useRef(null);
  const [magnifier, setMagnifier] = useState({ active: false, x: 0, y: 0, svgX: 0, svgY: 0 });
  const [isMobile] = useState(() => 'ontouchstart' in window || navigator.maxTouchPoints > 0);
  const [ctrlPressed, setCtrlPressed] = useState(false);
  const longPressTimer = React.useRef(null);
  const touchStartTime = React.useRef(0);

  // Desktop: Listen for Ctrl key
  useEffect(() => {
    const handleKeyDown = (e) => { if (e.key === 'Control') setCtrlPressed(true); };
    const handleKeyUp = (e) => { if (e.key === 'Control') { setCtrlPressed(false); setMagnifier(m => ({ ...m, active: false })); } };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  // Get SVG coordinates from mouse/touch position
  const getSvgCoords = (clientX, clientY) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((clientX - rect.left) / rect.width) * 400;
    const y = ((clientY - rect.top) / rect.height) * 400;
    return { x, y };
  };

  // Determine what segment is at given SVG coordinates
  const getHitFromCoords = (x, y) => {
    const dx = x - cx, dy = y - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist <= 16) return { number: 50, multiplier: 2 }; // Bull
    if (dist <= 40) return { number: 25, multiplier: 1 }; // 25
    if (dist > 180) return null; // Outside board

    // Calculate angle and find segment
    let angle = Math.atan2(dy, dx) * 180 / Math.PI + 99;
    if (angle < 0) angle += 360;
    const segmentIndex = Math.floor(angle / 18) % 20;
    const number = nums[segmentIndex];

    // Determine multiplier by distance
    let multiplier = 1;
    if (dist >= 170 && dist <= 180) multiplier = 2; // Double
    else if (dist >= 99 && dist <= 107) multiplier = 3; // Triple

    return { number, multiplier };
  };

  // Mouse move for desktop magnifier
  const handleMouseMove = (e) => {
    if (ctrlPressed) {
      const { x, y } = getSvgCoords(e.clientX, e.clientY);
      setMagnifier({ active: true, x: e.clientX, y: e.clientY, svgX: x, svgY: y });
    }
  };

  // Handle click - works with or without magnifier
  const handleClick = (e) => {
    const { x, y } = getSvgCoords(e.clientX, e.clientY);
    const hitResult = getHitFromCoords(x, y);
    if (hitResult) {
      onHit(hitResult.number, hitResult.multiplier);
    }
  };

  // Touch handlers for mobile magnifier
  const handleTouchStart = (e) => {
    touchStartTime.current = Date.now();
    if (isMobile) {
      const touch = e.touches[0];
      longPressTimer.current = setTimeout(() => {
        const { x, y } = getSvgCoords(touch.clientX, touch.clientY);
        setMagnifier({ active: true, x: touch.clientX, y: touch.clientY - 80, svgX: x, svgY: y });
      }, 300);
    }
  };

  const handleTouchMove = (e) => {
    // If touch moves significantly, cancel the long press
    if (longPressTimer.current && !magnifier.active) {
      clearTimeout(longPressTimer.current);
    }
    if (magnifier.active && isMobile) {
      const touch = e.touches[0];
      const { x, y } = getSvgCoords(touch.clientX, touch.clientY);
      setMagnifier({ active: true, x: touch.clientX, y: touch.clientY - 80, svgX: x, svgY: y });
    }
  };

  const handleTouchEnd = (e) => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);

    const touchDuration = Date.now() - touchStartTime.current;

    if (magnifier.active) {
      // Magnifier was active - hit where the crosshair is
      const { svgX, svgY } = magnifier;
      const hitResult = getHitFromCoords(svgX, svgY);
      if (hitResult) {
        onHit(hitResult.number, hitResult.multiplier);
      }
      setMagnifier({ active: false, x: 0, y: 0, svgX: 0, svgY: 0 });
      e.preventDefault();
    } else if (touchDuration < 300 && e.changedTouches.length > 0) {
      // Quick tap - normal hit
      const touch = e.changedTouches[0];
      const { x, y } = getSvgCoords(touch.clientX, touch.clientY);
      const hitResult = getHitFromCoords(x, y);
      if (hitResult) {
        onHit(hitResult.number, hitResult.multiplier);
      }
    }
  };

  const segment = (ro, ri, sa, ea, fill, n, mult, isInteractive = true) => {
    const x1o = cx + Math.cos(sa) * ro, y1o = cy + Math.sin(sa) * ro;
    const x2o = cx + Math.cos(ea) * ro, y2o = cy + Math.sin(ea) * ro;
    const x1i = cx + Math.cos(ea) * ri, y1i = cy + Math.sin(ea) * ri;
    const x2i = cx + Math.cos(sa) * ri, y2i = cy + Math.sin(sa) * ri;
    const d = `M${x1o} ${y1o} A${ro} ${ro} 0 0 1 ${x2o} ${y2o} L${x1i} ${y1i} A${ri} ${ri} 0 0 0 ${x2i} ${y2i}Z`;

    return (
      <path
        key={`${n}-${mult}-${ro}`}
        d={d}
        fill={fill}
        stroke="#333"
        strokeWidth="0.5"
        className={isInteractive ? "cursor-pointer dartboard-segment" : ""}
        style={isInteractive ? { pointerEvents: 'all' } : { pointerEvents: 'none' }}
      />
    );
  };

  const numberRadius = 188 + (numberSize - 12) * 0.5;

  return (
    <div className="relative">
      {/* Magnifier hint */}
      {!isMobile && (
        <div className="absolute -top-6 left-0 right-0 text-center text-xs text-white/40">
          Hold Ctrl for magnifier
        </div>
      )}

      <svg
        ref={svgRef}
        viewBox="0 0 400 400"
        style={{ width: size, height: size, filter: 'drop-shadow(0 8px 32px rgba(0,0,0,0.5))' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMagnifier(m => ({ ...m, active: false }))}
        onClick={!isMobile ? handleClick : undefined}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <circle cx={cx} cy={cy} r="180" fill="#1a1a1a" />
        {nums.map((n, i) => {
          const sa = (i * 18 - 99) * Math.PI / 180;
          const ea = ((i + 1) * 18 - 99) * Math.PI / 180;
          const even = i % 2 === 0;
          return (
            <React.Fragment key={n}>
              {segment(180, 170, sa, ea, even ? '#e63946' : '#2a9d8f', n, 2)}
              {segment(170, 107, sa, ea, even ? '#1a1a1a' : '#f5e6c8', n, 1)}
              {segment(107, 99, sa, ea, even ? '#e63946' : '#2a9d8f', n, 3)}
              {segment(99, 40, sa, ea, even ? '#1a1a1a' : '#f5e6c8', n, 1)}
            </React.Fragment>
          );
        })}
        <circle
          cx={cx} cy={cy} r="40"
          fill="#2a9d8f"
          className="cursor-pointer dartboard-segment"
        />
        <circle
          cx={cx} cy={cy} r="16"
          fill="#e63946"
          className="cursor-pointer dartboard-segment"
        />
        {nums.map((n, i) => {
          const a = (i * 18 - 90) * Math.PI / 180;
          const x = cx + Math.cos(a) * numberRadius;
          const y = cy + Math.sin(a) * numberRadius;
          return (
            <text
              key={`num-${n}`}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="white"
              fontSize={numberSize}
              fontWeight="700"
              style={{ pointerEvents: 'none', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}
            >
              {n}
            </text>
          );
        })}

        {/* Crosshair when magnifying */}
        {magnifier.active && (
          <>
            <line x1={magnifier.svgX - 15} y1={magnifier.svgY} x2={magnifier.svgX + 15} y2={magnifier.svgY} stroke="white" strokeWidth="2" />
            <line x1={magnifier.svgX} y1={magnifier.svgY - 15} x2={magnifier.svgX} y2={magnifier.svgY + 15} stroke="white" strokeWidth="2" />
            <circle cx={magnifier.svgX} cy={magnifier.svgY} r="5" fill="var(--primary)" />
          </>
        )}
      </svg>

      {/* Magnifier Loupe */}
      {magnifier.active && (
        <div
          className="fixed pointer-events-none z-50 rounded-full border-4 border-white/80 shadow-2xl overflow-hidden"
          style={{
            width: 140,
            height: 140,
            left: magnifier.x - 70,
            top: magnifier.y - 70,
            background: '#1a1a1a',
          }}
        >
          <svg
            viewBox={`${magnifier.svgX - 35} ${magnifier.svgY - 35} 70 70`}
            style={{ width: '100%', height: '100%' }}
          >
            <circle cx={cx} cy={cy} r="180" fill="#1a1a1a" />
            {nums.map((n, i) => {
              const sa = (i * 18 - 99) * Math.PI / 180;
              const ea = ((i + 1) * 18 - 99) * Math.PI / 180;
              const even = i % 2 === 0;
              return (
                <React.Fragment key={n}>
                  {segment(180, 170, sa, ea, even ? '#e63946' : '#2a9d8f', n, 2, false)}
                  {segment(170, 107, sa, ea, even ? '#1a1a1a' : '#f5e6c8', n, 1, false)}
                  {segment(107, 99, sa, ea, even ? '#e63946' : '#2a9d8f', n, 3, false)}
                  {segment(99, 40, sa, ea, even ? '#1a1a1a' : '#f5e6c8', n, 1, false)}
                </React.Fragment>
              );
            })}
            <circle cx={cx} cy={cy} r="40" fill="#2a9d8f" />
            <circle cx={cx} cy={cy} r="16" fill="#e63946" />
            {/* Crosshair in magnifier */}
            <line x1={magnifier.svgX - 10} y1={magnifier.svgY} x2={magnifier.svgX + 10} y2={magnifier.svgY} stroke="white" strokeWidth="1.5" />
            <line x1={magnifier.svgX} y1={magnifier.svgY - 10} x2={magnifier.svgX} y2={magnifier.svgY + 10} stroke="white" strokeWidth="1.5" />
            <circle cx={magnifier.svgX} cy={magnifier.svgY} r="3" fill="var(--primary)" stroke="white" strokeWidth="1" />
          </svg>
          {/* What will be hit */}
          {(() => {
            const hit = getHitFromCoords(magnifier.svgX, magnifier.svgY);
            if (!hit) return null;
            const label = hit.number === 50 ? 'BULL' : hit.number === 25 ? '25' :
              `${hit.multiplier === 1 ? 'S' : hit.multiplier === 2 ? 'D' : 'T'}${hit.number}`;
            const score = hit.number === 50 ? 50 : hit.number === 25 ? 25 : hit.number * hit.multiplier;
            return (
              <div className="absolute bottom-1 left-0 right-0 text-center">
                <span className="bg-black/80 px-2 py-0.5 rounded text-sm font-bold">{label} = {score}</span>
              </div>
            );
          })()}
        </div>
      )}

      {/* Mobile hint */}
      {isMobile && (
        <div className="absolute -bottom-6 left-0 right-0 text-center text-xs text-white/40">
          Press & hold for magnifier
        </div>
      )}
    </div>
  );
};

// Dart-by-Dart Pad Component (for entering individual darts with S/D/T)
const DartPad = ({ onScore, multiplier, setMultiplier }) => (
  <div className="space-y-2">
    <div className="grid grid-cols-3 gap-2">
      {[
        { label: 'Single', mult: 1, color: 'bg-blue-500' },
        { label: 'Double', mult: 2, color: 'bg-green-500' },
        { label: 'Triple', mult: 3, color: 'bg-red-500' },
      ].map(({ label, mult, color }) => (
        <button
          key={label}
          onClick={() => setMultiplier(mult)}
          className={`py-3 rounded-xl font-bold text-sm transition-all ${
            multiplier === mult ? `${color} text-white shadow-lg` : 'bg-white/10 text-white/70 hover:bg-white/20'
          }`}
        >
          {label}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-5 gap-1.5">
      {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(n => (
        <button
          key={n}
          onClick={() => onScore(n * multiplier, multiplier === 1 ? `S${n}` : multiplier === 2 ? `D${n}` : `T${n}`, multiplier === 2)}
          className="h-12 rounded-xl font-mono font-bold text-lg bg-white/10 hover:bg-white/20 active:bg-[var(--primary)] transition-colors"
        >
          {n}
        </button>
      ))}
    </div>
    <div className="grid grid-cols-3 gap-1.5">
      <button
        onClick={() => onScore(25, '25', false)}
        className="h-12 rounded-xl font-mono font-bold bg-amber-600/80 hover:bg-amber-600 text-white"
      >
        25
      </button>
      <button
        onClick={() => onScore(50, 'Bull', true)}
        className="h-12 rounded-xl font-mono font-bold bg-amber-500 hover:bg-amber-400 text-white"
      >
        BULL
      </button>
      <button
        onClick={() => onScore(0, 'Miss', false)}
        className="h-12 rounded-xl font-bold bg-red-500/80 hover:bg-red-500 text-white"
      >
        MISS
      </button>
    </div>
  </div>
);

// Keypad Component (for entering 3-dart total directly with large buttons)
const Keypad = ({ onSubmit, currentScore }) => {
  const [inputValue, setInputValue] = useState('');
  const canCheckout = currentScore <= 170 && currentScore >= 2;

  const handleDigit = (digit) => {
    const newValue = inputValue + digit;
    if (parseInt(newValue) <= 180) {
      setInputValue(newValue);
    }
  };

  const handleClear = () => setInputValue('');
  const handleBackspace = () => setInputValue(inputValue.slice(0, -1));

  const handleSubmit = (isCheckout = false) => {
    const score = parseInt(inputValue) || 0;
    if (score >= 0 && score <= 180) {
      onSubmit(score, isCheckout);
      setInputValue('');
    }
  };

  const displayValue = inputValue || '0';
  const scoreValue = parseInt(inputValue) || 0;
  const wouldCheckout = scoreValue === currentScore && canCheckout;

  return (
    <div className="space-y-3">
      {/* Display */}
      <div className="bg-white/10 rounded-2xl p-4 text-center">
        <div className="text-5xl font-bold font-mono" style={{ color: wouldCheckout ? '#10B981' : 'white' }}>
          {displayValue}
        </div>
        {wouldCheckout && (
          <div className="text-emerald-400 text-sm mt-1 font-semibold">CHECKOUT!</div>
        )}
      </div>

      {/* Number Grid */}
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map(n => (
          <button
            key={n}
            onClick={() => handleDigit(n.toString())}
            className="h-14 rounded-xl font-bold text-2xl bg-white/10 hover:bg-white/20 active:bg-[var(--primary)] transition-colors"
          >
            {n}
          </button>
        ))}
        <button
          onClick={handleClear}
          className="h-14 rounded-xl font-bold text-lg bg-red-500/30 hover:bg-red-500/50 text-red-400"
        >
          CLR
        </button>
        <button
          onClick={() => handleDigit('0')}
          className="h-14 rounded-xl font-bold text-2xl bg-white/10 hover:bg-white/20 active:bg-[var(--primary)] transition-colors"
        >
          0
        </button>
        <button
          onClick={handleBackspace}
          className="h-14 rounded-xl font-bold text-lg bg-white/10 hover:bg-white/20"
        >
          {'\u232B'}
        </button>
      </div>

      {/* Quick Scores */}
      <div className="grid grid-cols-5 gap-1.5">
        {[180, 140, 100, 60, 0].map(score => (
          <button
            key={score}
            onClick={() => { setInputValue(score.toString()); }}
            className={`h-10 rounded-lg font-mono font-bold text-sm transition-colors ${
              score === 180 ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white' :
              score === 0 ? 'bg-red-500/50 text-red-300' :
              'bg-white/10 hover:bg-white/20'
            }`}
          >
            {score}
          </button>
        ))}
      </div>

      {/* Submit Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => handleSubmit(false)}
          disabled={inputValue === ''}
          className="h-14 rounded-xl font-bold text-lg bg-white/20 hover:bg-white/30 disabled:opacity-30 transition-all"
        >
          Submit
        </button>
        <button
          onClick={() => handleSubmit(true)}
          disabled={!wouldCheckout}
          className={`h-14 rounded-xl font-bold text-lg transition-all ${
            wouldCheckout
              ? 'bg-emerald-500 hover:bg-emerald-400 text-white'
              : 'bg-emerald-500/20 text-emerald-400/50'
          }`}
        >
          Checkout!
        </button>
      </div>
    </div>
  );
};

// Quick Scores Component (common 3-dart totals)
const QuickScores = ({ onSubmit, currentScore }) => {
  const canCheckout = currentScore <= 170 && currentScore >= 2;
  const wouldCheckout = (score) => score === currentScore && canCheckout;

  // Organized by scoring zones
  const scores = {
    max: [180, 177, 174, 171, 170],
    high: [167, 164, 161, 160, 158, 157, 156, 155],
    ton: [140, 139, 138, 137, 136, 135, 134, 133, 132, 131, 130, 125, 121, 120],
    good: [100, 99, 98, 97, 96, 95, 85, 81, 80],
    mid: [60, 59, 58, 57, 45, 44, 43, 42, 41, 40],
    low: [26, 25, 24, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
  };

  const ScoreButton = ({ score }) => {
    const isCheckout = wouldCheckout(score);
    return (
      <button
        onClick={() => onSubmit(score, isCheckout)}
        className={`h-11 rounded-xl font-mono font-bold transition-all ${
          isCheckout
            ? 'bg-emerald-500 text-white ring-2 ring-emerald-300 shadow-lg shadow-emerald-500/30'
            : score === 180
            ? 'bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] text-white'
            : score === 0
            ? 'bg-red-500/70 text-white'
            : score >= 100
            ? 'bg-white/15 hover:bg-white/25'
            : 'bg-white/10 hover:bg-white/20'
        }`}
      >
        {score}
      </button>
    );
  };

  return (
    <div className="space-y-3">
      {/* Maximum */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">MAXIMUM</div>
        <div className="grid grid-cols-5 gap-1.5">
          {scores.max.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>

      {/* High */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">HIGH (155-167)</div>
        <div className="grid grid-cols-4 gap-1.5">
          {scores.high.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>

      {/* Ton+ */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">TON+ (120-140)</div>
        <div className="grid grid-cols-7 gap-1">
          {scores.ton.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>

      {/* Good */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">GOOD (80-100)</div>
        <div className="grid grid-cols-5 gap-1.5">
          {scores.good.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>

      {/* Common */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">COMMON (40-60)</div>
        <div className="grid grid-cols-5 gap-1.5">
          {scores.mid.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>

      {/* Low */}
      <div>
        <div className="text-xs text-white/50 mb-1.5 font-semibold">LOW / MISS</div>
        <div className="grid grid-cols-7 gap-1">
          {scores.low.map(s => <ScoreButton key={s} score={s} />)}
        </div>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-end animate-fadeIn" onClick={onClose}>
      <div className="w-full max-h-[85vh] bg-bgMed rounded-t-2xl overflow-hidden animate-slideUp" onClick={e => e.stopPropagation()}>
        <div className="p-4 pb-safe">
          <div className="w-8 h-1 bg-border rounded-full mx-auto mb-3" />
          {title && <h2 className="text-lg font-bold text-center mb-4">{title}</h2>}
          <div className="overflow-y-auto max-h-[70vh]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-primary';

  return (
    <div className={`fixed top-safe left-3 right-3 ${bgColor} text-white p-3 rounded-xl flex items-center gap-2 font-semibold shadow-xl z-50 animate-fadeIn`}>
      <span>{type === 'success' ? '✓' : type === 'error' ? '✕' : '🎯'}</span>
      <span>{message}</span>
    </div>
  );
};

// Announcer Component
const Announcer = ({ text, onComplete }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 1500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="text-5xl md:text-7xl font-black bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent animate-announcer">
        {text}
      </div>
    </div>
  );
};

// Confetti Effect
const Confetti = () => {
  const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#F59E0B', '#10B981', '#EF4444'];
  const pieces = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 0.5,
    color: colors[Math.floor(Math.random() * colors.length)],
    size: 6 + Math.random() * 6,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {pieces.map(p => (
        <div
          key={p.id}
          className="absolute animate-confetti"
          style={{
            left: `${p.left}%`,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
          }}
        />
      ))}
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  // Settings State
  const [theme, setTheme] = useState('cosmic');
  const [background, setBackground] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [hapticEnabled, setHapticEnabled] = useState(true);
  const [voiceEnabled, setVoiceEnabled] = useState(false);
  const [hintsEnabled, setHintsEnabled] = useState(true);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [boardNumberSize, setBoardNumberSize] = useState(14); // 10-20 range

  // Navigation State
  const [screen, setScreen] = useState('home');
  const [modal, setModal] = useState(null);

  // Player Configuration
  const [players, setPlayers] = useState([
    { name: 'Player 1', avatar: '😎', color: '#8B5CF6' },
    { name: 'Player 2', avatar: '🎯', color: '#EC4899' },
    { name: 'Player 3', avatar: '🔥', color: '#06B6D4' },
    { name: 'Player 4', avatar: '⚡', color: '#F59E0B' },
  ]);
  const [editingPlayerIdx, setEditingPlayerIdx] = useState(null);

  // Game Setup
  const [gameType, setGameType] = useState('501');
  const [numPlayers, setNumPlayers] = useState(1);
  const [legs, setLegs] = useState(1);
  const [sets, setSets] = useState(0);
  const [checkoutMode, setCheckoutMode] = useState('double');
  const [firstPlayer, setFirstPlayer] = useState(0);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);

  // Game State
  const [gameActive, setGameActive] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([]);
  const [legWins, setLegWins] = useState([]);
  const [setWins, setSetWins] = useState([]);
  const [darts, setDarts] = useState([]);
  const [multiplier, setMultiplier] = useState(1);
  const [inputMode, setInputMode] = useState('keypad');
  const [undoHistory, setUndoHistory] = useState([]);
  const [playerStats, setPlayerStats] = useState([]);
  const [currentLeg, setCurrentLeg] = useState(1);
  const [currentSet, setCurrentSet] = useState(1);

  // Stats & Achievements
  const [stats, setStats] = useState({
    games: 0, wins: 0, totalScore: 0, totalDarts: 0, highest: 0, best3: 0,
    checkAttempts: 0, checkHits: 0, s180: 0, s140: 0, s100: 0, recent: [], history: []
  });
  const [achievements, setAchievements] = useState({
    first180: false, ton80: false, checkout100: false, games10: false, avg80: false, nineDarter: false
  });

  // Practice State
  const [practiceMode, setPracticeMode] = useState(null);
  const [practiceTargets, setPracticeTargets] = useState([]);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceHits, setPracticeHits] = useState(0);
  const [practiceMisses, setPracticeMisses] = useState(0);
  const [bobScore, setBobScore] = useState(27);

  // UI State
  const [toast, setToast] = useState(null);
  const [announcer, setAnnouncer] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [tip, setTip] = useState(TIPS[0]);

  // Load/Save
  useEffect(() => {
    const saved = localStorage.getItem('dartsUltimateV2');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        if (data.theme) setTheme(data.theme);
        if (data.background) setBackground(data.background);
        if (data.soundEnabled !== undefined) setSoundEnabled(data.soundEnabled);
        if (data.hapticEnabled !== undefined) setHapticEnabled(data.hapticEnabled);
        if (data.voiceEnabled !== undefined) setVoiceEnabled(data.voiceEnabled);
        if (data.hintsEnabled !== undefined) setHintsEnabled(data.hintsEnabled);
        if (data.autoAdvance !== undefined) setAutoAdvance(data.autoAdvance);
        if (data.boardNumberSize !== undefined) setBoardNumberSize(data.boardNumberSize);
        if (data.players) setPlayers(data.players);
        if (data.stats) setStats(s => ({ ...s, ...data.stats }));
        if (data.achievements) setAchievements(a => ({ ...a, ...data.achievements }));
      } catch (e) {}
    }
    // Random tip
    setTip(TIPS[cryptoRandom(TIPS.length)]);
  }, []);

  useEffect(() => {
    localStorage.setItem('dartsUltimateV2', JSON.stringify({
      theme, background, soundEnabled, hapticEnabled, voiceEnabled, hintsEnabled, autoAdvance, boardNumberSize, players, stats, achievements
    }));
  }, [theme, background, soundEnabled, hapticEnabled, voiceEnabled, hintsEnabled, autoAdvance, boardNumberSize, players, stats, achievements]);

  // Theme CSS Variables
  useEffect(() => {
    const t = THEMES[theme];
    document.documentElement.style.setProperty('--primary', t.primary);
    document.documentElement.style.setProperty('--secondary', t.secondary);
    document.documentElement.style.setProperty('--bg-dark', t.bg);
    document.documentElement.style.setProperty('--bg-med', t.bgMed);
    document.documentElement.style.setProperty('--bg-light', t.bgLight);
  }, [theme]);

  // Helper functions
  const sound = useCallback((type, vol) => {
    if (soundEnabled) playSound(type, vol);
  }, [soundEnabled]);

  const haptic = useCallback((intensity) => {
    if (hapticEnabled) hapticFeedback(intensity);
  }, [hapticEnabled]);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
  }, []);

  const announce = useCallback((text) => {
    setAnnouncer(text);
    if (voiceEnabled) {
      const voiceText = text === '180' ? 'One hundred and eighty!' : text;
      speak(voiceText);
    }
  }, [voiceEnabled]);

  const celebrate = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000);
  }, []);

  const getCheckout = useCallback((score) => {
    return score <= 170 && score >= 2 ? CHECKOUTS[score] : null;
  }, []);

  // ============ GAME LOGIC ============
  const startGame = useCallback(() => {
    const startScore = parseInt(gameType) || 501;
    const newScores = Array(numPlayers).fill(startScore);
    const newLegWins = Array(numPlayers).fill(0);
    const newSetWins = Array(numPlayers).fill(0);
    const newPlayerStats = Array(numPlayers).fill(null).map(() => ({
      darts: 0, score: 0, legDarts: 0, legScore: 0, first9: [], highTurn: 0, checkAttempts: 0, checkHits: 0
    }));

    setScores(newScores);
    setLegWins(newLegWins);
    setSetWins(newSetWins);
    setPlayerStats(newPlayerStats);
    setCurrentPlayer(firstPlayer);
    setDarts([]);
    setUndoHistory([]);
    setMultiplier(1);
    setCurrentLeg(1);
    setCurrentSet(1);
    setGameActive(true);
    setShowBoard(true);
    sound('hit');
    haptic();
  }, [gameType, numPlayers, firstPlayer, sound, haptic]);

  const endGame = useCallback(() => {
    setGameActive(false);
    setShowBoard(false);
    setDarts([]);
    setCoinResult(null);
  }, []);

  const recordDart = useCallback((score, label, isDouble = false) => {
    if (!gameActive || darts.length >= 3) return;

    const newDarts = [...darts, { score, label, isDouble }];
    setDarts(newDarts);

    // Update player stats
    const newStats = [...playerStats];
    newStats[currentPlayer].darts++;
    newStats[currentPlayer].score += score;
    newStats[currentPlayer].legDarts++;
    newStats[currentPlayer].legScore += score;
    if (newStats[currentPlayer].legDarts <= 9) {
      newStats[currentPlayer].first9.push(score);
    }
    setPlayerStats(newStats);

    sound('throw');
    haptic();

    // Check high score on 3 darts
    if (newDarts.length === 3) {
      const total = newDarts.reduce((a, d) => a + d.score, 0);
      if (total > newStats[currentPlayer].highTurn) {
        newStats[currentPlayer].highTurn = total;
      }
      checkHighScore(total);
      if (autoAdvance) {
        setTimeout(() => nextTurn(), 500);
      }
    }
  }, [gameActive, darts, currentPlayer, playerStats, sound, haptic, autoAdvance]);

  const checkHighScore = useCallback((total) => {
    let newStats = { ...stats };
    let newAchievements = { ...achievements };

    if (total > newStats.best3) newStats.best3 = total;

    if (total === 180) {
      newStats.s180++;
      newAchievements.first180 = true;
      announce('180!');
      celebrate();
      showToast('ONE HUNDRED AND EIGHTY! 🎯', 'celebrate');
    } else if (total >= 160) {
      newStats.s140++;
      newAchievements.ton80 = true;
      announce(total.toString());
      showToast(`${total}! 🔥`, 'success');
    } else if (total >= 140) {
      newStats.s140++;
      announce(total.toString());
      showToast(`${total}! 🔥`, 'success');
    } else if (total >= 100) {
      newStats.s100++;
    }

    setStats(newStats);
    setAchievements(newAchievements);
  }, [stats, achievements, announce, celebrate, showToast]);

  // Match won handler - must be defined before legWon
  const matchWon = useCallback((winner) => {
    setGameActive(false);
    setShowBoard(false);

    const ps = playerStats[winner];
    const avg = ps.darts > 0 ? (ps.score / ps.darts * 3).toFixed(1) : '0';
    const first9Avg = ps.first9.length > 0 ? (ps.first9.reduce((a, b) => a + b, 0) / ps.first9.length * 3).toFixed(1) : '0';
    const checkPct = ps.checkAttempts > 0 ? Math.round(ps.checkHits / ps.checkAttempts * 100) : 0;

    // Update global stats
    setStats(s => {
      const newStats = {
        ...s,
        games: s.games + 1,
        wins: (winner === 0 || numPlayers === 1) ? s.wins + 1 : s.wins,
        totalScore: s.totalScore + ps.score,
        totalDarts: s.totalDarts + ps.darts,
        recent: [...s.recent.slice(-9), Math.round(parseFloat(avg))],
        history: [{
          date: new Date().toISOString(),
          players: players.slice(0, numPlayers).map(p => p.name),
          winner: players[winner].name,
          avg,
          first9: first9Avg
        }, ...s.history.slice(0, 49)]
      };
      return newStats;
    });

    // Check achievements
    setAchievements(a => {
      const newA = { ...a };
      if (stats.games + 1 >= 10) newA.games10 = true;
      if (parseFloat(avg) >= 80) newA.avg80 = true;
      return newA;
    });

    // Show winner modal
    setModal({
      type: 'winner',
      winner: players[winner],
      stats: { avg, first9Avg, checkPct, darts: ps.darts, highTurn: ps.highTurn, legDarts: ps.legDarts }
    });

    sound('win');
    celebrate();
  }, [playerStats, numPlayers, players, stats, sound, celebrate]);

  // Leg won handler - must be defined before submitTurn and nextTurn
  const legWon = useCallback((winner) => {
    const newLegWins = [...legWins];
    newLegWins[winner]++;
    setLegWins(newLegWins);

    const neededLegs = Math.ceil(legs / 2);

    if (sets > 0) {
      // Playing with sets
      if (newLegWins[winner] >= neededLegs) {
        // Set won
        const newSetWins = [...setWins];
        newSetWins[winner]++;
        setSetWins(newSetWins);

        const neededSets = Math.ceil(sets / 2);
        if (newSetWins[winner] >= neededSets) {
          matchWon(winner);
          return;
        }

        // Reset legs for new set
        setLegWins(Array(numPlayers).fill(0));
        setCurrentSet(s => s + 1);
        showToast(`${players[winner].name} wins the set! 🎉`, 'success');
      } else {
        setCurrentLeg(l => l + 1);
        showToast(`${players[winner].name} wins the leg! 🎉`, 'success');
      }
    } else {
      // Playing legs only
      if (newLegWins[winner] >= neededLegs) {
        matchWon(winner);
        return;
      }
      setCurrentLeg(l => l + 1);
      showToast(`${players[winner].name} wins the leg! 🎉`, 'success');
    }

    // Reset for new leg
    const startScore = parseInt(gameType) || 501;
    setScores(Array(numPlayers).fill(startScore));
    const newStats = [...playerStats];
    for (let i = 0; i < numPlayers; i++) {
      // Check for 9 darter
      if (i === winner && newStats[i].legDarts === 9 && gameType === '501') {
        setAchievements(a => ({ ...a, nineDarter: true }));
        showToast('NINE DARTER! ⭐', 'celebrate');
        celebrate();
      }
      newStats[i].legDarts = 0;
      newStats[i].legScore = 0;
      newStats[i].first9 = [];
    }
    setPlayerStats(newStats);
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
    setDarts([]);
    setMultiplier(1);
  }, [legWins, setWins, sets, legs, numPlayers, gameType, players, playerStats, currentPlayer, showToast, celebrate, matchWon]);

  // Submit a complete 3-dart turn at once (for keypad/quick modes)
  // This processes the turn immediately without using the darts array
  const submitTurn = useCallback((turnScore, isCheckout = false) => {
    if (!gameActive) return;

    // Save to undo history
    setUndoHistory(h => [...h.slice(-19), {
      player: currentPlayer,
      darts: [],
      turnTotal: turnScore,
      scoreBefore: scores[currentPlayer],
      statsBefore: { ...playerStats[currentPlayer] }
    }]);

    // Check for checkout attempt
    if (scores[currentPlayer] <= 170 && CHECKOUTS[scores[currentPlayer]]) {
      setStats(s => ({ ...s, checkAttempts: s.checkAttempts + 1 }));
    }

    const newScore = scores[currentPlayer] - turnScore;

    // Bust check
    if (newScore < 0 || newScore === 1 || (checkoutMode === 'double' && newScore === 0 && !isCheckout)) {
      showToast('BUST! 💥', 'error');
      sound('bust', 0.15);
      // Score doesn't change on bust, but stats still updated
    } else if (newScore === 0) {
      // Checkout!
      setStats(s => ({ ...s, checkHits: s.checkHits + 1 }));
      if (turnScore >= 100) {
        setAchievements(a => ({ ...a, checkout100: true }));
      }

      // Update scores first
      const newScores = [...scores];
      newScores[currentPlayer] = 0;
      setScores(newScores);

      // Update player stats
      const newStats = [...playerStats];
      newStats[currentPlayer].darts += 3;
      newStats[currentPlayer].score += turnScore;
      newStats[currentPlayer].legDarts += 3;
      newStats[currentPlayer].legScore += turnScore;
      newStats[currentPlayer].checkHits++;
      if (turnScore > newStats[currentPlayer].highTurn) {
        newStats[currentPlayer].highTurn = turnScore;
      }
      const remaining = Math.max(0, 9 - newStats[currentPlayer].first9.length);
      if (remaining > 0) {
        const perDart = Math.round(turnScore / 3);
        for (let i = 0; i < Math.min(3, remaining); i++) {
          newStats[currentPlayer].first9.push(perDart);
        }
      }
      setPlayerStats(newStats);

      // Check high score and leg won
      checkHighScore(turnScore);
      legWon(currentPlayer);
      return;
    } else {
      // Normal turn - update score
      const newScores = [...scores];
      newScores[currentPlayer] = newScore;
      setScores(newScores);
    }

    // Update player stats
    const newStats = [...playerStats];
    newStats[currentPlayer].darts += 3;
    newStats[currentPlayer].score += turnScore;
    newStats[currentPlayer].legDarts += 3;
    newStats[currentPlayer].legScore += turnScore;
    if (turnScore > newStats[currentPlayer].highTurn) {
      newStats[currentPlayer].highTurn = turnScore;
    }
    const remaining = Math.max(0, 9 - newStats[currentPlayer].first9.length);
    if (remaining > 0) {
      const perDart = Math.round(turnScore / 3);
      for (let i = 0; i < Math.min(3, remaining); i++) {
        newStats[currentPlayer].first9.push(perDart);
      }
    }
    setPlayerStats(newStats);

    // Check high score
    checkHighScore(turnScore);

    // Play sound and haptic
    sound('throw');
    haptic();

    // Advance to next player
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
    setDarts([]);
    setMultiplier(1);
    sound('next');
  }, [gameActive, currentPlayer, scores, playerStats, checkoutMode, numPlayers, showToast, sound, haptic, checkHighScore, legWon]);

  const nextTurn = useCallback(() => {
    if (!gameActive) return;

    const turnTotal = darts.reduce((a, d) => a + d.score, 0);
    const lastDart = darts[darts.length - 1];
    const isDoubleOut = lastDart?.isDouble;

    // Save to undo history
    setUndoHistory(h => [...h.slice(-19), {
      player: currentPlayer,
      darts: [...darts],
      turnTotal,
      scoreBefore: scores[currentPlayer],
      statsBefore: { ...playerStats[currentPlayer] }
    }]);

    // Check for checkout attempt
    if (scores[currentPlayer] <= 170 && CHECKOUTS[scores[currentPlayer]]) {
      const newStats = [...playerStats];
      newStats[currentPlayer].checkAttempts++;
      setPlayerStats(newStats);
      setStats(s => ({ ...s, checkAttempts: s.checkAttempts + 1 }));
    }

    const newScore = scores[currentPlayer] - turnTotal;

    // Bust check
    if (newScore < 0 || newScore === 1 || (checkoutMode === 'double' && newScore === 0 && !isDoubleOut)) {
      showToast('BUST! 💥', 'error');
      sound('bust', 0.15);
      // Score doesn't change on bust
    } else if (newScore === 0) {
      // Checkout!
      const newStats = [...playerStats];
      newStats[currentPlayer].checkHits++;
      setPlayerStats(newStats);
      setStats(s => ({ ...s, checkHits: s.checkHits + 1 }));

      if (turnTotal >= 100) {
        setAchievements(a => ({ ...a, checkout100: true }));
      }

      legWon(currentPlayer);
      return;
    } else {
      // Normal turn - update score
      const newScores = [...scores];
      newScores[currentPlayer] = newScore;
      setScores(newScores);
    }

    // Advance to next player
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
    setDarts([]);
    setMultiplier(1);
    sound('next');
  }, [gameActive, darts, currentPlayer, scores, playerStats, checkoutMode, numPlayers, showToast, sound]);

  const undoAction = useCallback(() => {
    if (darts.length > 0) {
      const lastDart = darts[darts.length - 1];
      setDarts(darts.slice(0, -1));

      const newStats = [...playerStats];
      newStats[currentPlayer].darts--;
      newStats[currentPlayer].score -= lastDart.score;
      newStats[currentPlayer].legDarts--;
      newStats[currentPlayer].legScore -= lastDart.score;
      setPlayerStats(newStats);

      haptic();
    } else if (undoHistory.length > 0) {
      const prev = undoHistory[undoHistory.length - 1];
      setUndoHistory(undoHistory.slice(0, -1));
      setCurrentPlayer(prev.player);
      setDarts(prev.darts);

      const newScores = [...scores];
      newScores[prev.player] = prev.scoreBefore;
      setScores(newScores);

      const newStats = [...playerStats];
      newStats[prev.player] = { ...prev.statsBefore };
      setPlayerStats(newStats);

      showToast('Turn undone', 'success');
      haptic();
    }
  }, [darts, currentPlayer, playerStats, undoHistory, scores, haptic, showToast]);

  // Coin flip
  const flipCoin = useCallback(() => {
    if (coinFlipping) return;
    setCoinFlipping(true);
    setCoinResult(null);
    sound('throw');

    setTimeout(() => {
      const result = cryptoRandom(numPlayers);
      setCoinResult(result);
      setFirstPlayer(result);
      setCoinFlipping(false);
      sound('hit');
      haptic();
    }, 1000);
  }, [coinFlipping, numPlayers, sound, haptic]);

  // Quick start
  const quickStart = useCallback((type) => {
    setGameType(type);
    setNumPlayers(1);
    setFirstPlayer(0);
    setLegs(1);
    setSets(0);
    setTimeout(() => startGame(), 50);
  }, [startGame]);

  // ============ PRACTICE LOGIC ============
  const startPractice = useCallback((mode) => {
    let targets = [];
    switch (mode) {
      case 'doubles':
        targets = Array.from({ length: 20 }, (_, i) => ({ target: `D${i + 1}`, value: (i + 1) * 2 }));
        break;
      case 'bob27':
        targets = Array.from({ length: 20 }, (_, i) => ({ target: `D${i + 1}`, value: (i + 1) * 2 }));
        setBobScore(27);
        break;
      case 'around':
        targets = Array.from({ length: 20 }, (_, i) => ({ target: `${i + 1}`, value: i + 1 }));
        break;
      case 'triples':
        targets = [20, 19, 18, 17, 16, 15].map(n => ({ target: `T${n}`, value: n * 3 }));
        break;
      case 'checkout':
        targets = [32, 40, 36, 24, 16, 8, 20, 12, 4, 2].map(n => ({ target: `D${n/2}`, value: n }));
        break;
      case 'random':
        targets = Array.from({ length: 15 }, () => {
          const types = ['S', 'D', 'T'];
          const t = types[cryptoRandom(3)];
          const n = cryptoRandom(20) + 1;
          return { target: `${t}${n}`, value: n * (t === 'S' ? 1 : t === 'D' ? 2 : 3) };
        });
        break;
    }

    setPracticeMode(mode);
    setPracticeTargets(targets);
    setPracticeIdx(0);
    setPracticeHits(0);
    setPracticeMisses(0);
    sound('hit');
    haptic();
  }, [sound, haptic]);

  const practiceResult = useCallback((hit) => {
    if (practiceMode === 'bob27') {
      const val = practiceTargets[practiceIdx].value;
      if (hit) {
        setBobScore(s => s + val);
        setPracticeHits(h => h + 1);
        sound('hit');
      } else {
        setBobScore(s => s - val);
        setPracticeMisses(m => m + 1);
        sound('miss');
      }
    } else {
      if (hit) {
        setPracticeHits(h => h + 1);
        sound('hit');
      } else {
        setPracticeMisses(m => m + 1);
        sound('miss');
      }
    }
    haptic();

    if (practiceIdx + 1 >= practiceTargets.length) {
      const finalHits = practiceHits + (hit ? 1 : 0);
      const acc = Math.round(finalHits / practiceTargets.length * 100);
      if (practiceMode === 'bob27') {
        const finalScore = bobScore + (hit ? practiceTargets[practiceIdx].value : -practiceTargets[practiceIdx].value);
        showToast(`Final Score: ${finalScore}`, finalScore > 0 ? 'success' : 'error');
      } else {
        showToast(`Complete! ${acc}% accuracy`, acc >= 50 ? 'success' : 'error');
      }
      setTimeout(() => setPracticeMode(null), 1500);
    } else {
      setPracticeIdx(i => i + 1);
    }
  }, [practiceMode, practiceTargets, practiceIdx, practiceHits, bobScore, sound, haptic, showToast]);

  // Share result
  const shareResult = useCallback(() => {
    if (!modal?.winner) return;
    const text = `🎯 Darts Ultimate\n\n🏆 ${modal.winner.name} wins!\nAverage: ${modal.stats.avg}\nFirst 9: ${modal.stats.first9Avg}\nCheckout: ${modal.stats.checkPct}%\n\n#darts #dartsultimate`;

    if (navigator.share) {
      navigator.share({ title: 'Darts Ultimate', text });
    } else {
      navigator.clipboard.writeText(text);
      showToast('Copied to clipboard!', 'success');
    }
  }, [modal, showToast]);

  // ============ DERIVED VALUES ============
  const turnTotal = darts.reduce((a, d) => a + d.score, 0);
  const currentScore = gameActive ? scores[currentPlayer] - turnTotal : 0;
  const checkout = hintsEnabled && gameActive ? getCheckout(currentScore) : null;

  const themeColors = THEMES[theme];
  const bgClass = background === 'light'
    ? 'bg-gray-100 text-gray-900'
    : background === 'gradient'
    ? 'bg-gradient-to-br from-[var(--primary)] via-[var(--bg-dark)] to-[var(--secondary)] text-white'
    : 'bg-[var(--bg-dark)] text-white';

  // ============ RENDER ============
  return (
    <div className={`h-full flex flex-col ${bgClass} overflow-hidden`} style={{ '--primary': themeColors.primary, '--secondary': themeColors.secondary }}>
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Announcer */}
      {announcer && <Announcer text={announcer} onComplete={() => setAnnouncer(null)} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}

      {/* Header */}
      {!showBoard && (
        <header className="flex items-center justify-between px-4 py-3 bg-bgMed/50 backdrop-blur-sm border-b border-white/10 safe-top">
          <div className="flex items-center gap-2">
            <span className="text-xl">🎯</span>
            <span className="font-bold text-lg">Darts Ultimate</span>
          </div>
          <div className="flex gap-2">
            <button onClick={() => setModal({ type: 'history' })} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-lg">
              📜
            </button>
            <button onClick={() => setModal({ type: 'settings' })} className="p-2.5 rounded-xl bg-white/10 hover:bg-white/20 transition-colors">
              <Settings size={18} />
            </button>
          </div>
        </header>
      )}

      {/* Main Content */}
      <main className={`flex-1 overflow-y-auto ${showBoard ? '' : 'pb-20'}`}>

        {/* ========== HOME SCREEN ========== */}
        {screen === 'home' && !gameActive && (
          <div className="p-4 space-y-4 animate-fadeIn">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Average" value={stats.totalDarts > 0 ? (stats.totalScore / stats.totalDarts * 3).toFixed(0) : '0'} />
              <StatBox label="Games" value={stats.games} />
              <StatBox label="Wins" value={stats.wins} />
            </div>

            {/* Quick Play */}
            <div>
              <SectionTitle icon="🎮" text="Quick Play" />
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: '501', icon: '5️⃣', name: '501', desc: 'Classic' },
                  { id: '301', icon: '3️⃣', name: '301', desc: 'Quick' },
                ].map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => quickStart(mode.id)}
                    className="bg-white/10 hover:bg-white/20 rounded-xl p-4 text-center transition-transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <div className="text-2xl mb-1">{mode.icon}</div>
                    <div className="font-bold">{mode.name}</div>
                    <div className="text-xs opacity-60">{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Daily Tip */}
            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-4">
              <div className="text-xs uppercase opacity-80 flex items-center gap-1"><Lightbulb size={12} /> Tip</div>
              <div className="font-bold mt-1">{tip.title}</div>
              <div className="text-sm opacity-90">{tip.text}</div>
            </div>

            {/* Achievements */}
            <div>
              <SectionTitle icon="🏆" text="Achievements" />
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(ACHIEVEMENTS).map(([key, ach]) => (
                  <div
                    key={key}
                    className={`rounded-xl p-3 text-center transition-all ${
                      achievements[key] ? 'bg-gradient-to-br from-[var(--primary)]/30 to-[var(--secondary)]/30 border border-[var(--primary)]' : 'bg-white/5 opacity-40'
                    }`}
                  >
                    <div className="text-xl mb-1">{ach.icon}</div>
                    <div className="text-xs font-semibold">{ach.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ========== PLAY SETUP SCREEN ========== */}
        {screen === 'play' && !gameActive && (
          <div className="p-4 space-y-4 animate-fadeIn">
            {/* Game Type */}
            <Card title="🎯 Game Type">
              <div className="grid grid-cols-3 gap-2">
                {['501', '301', '701'].map(type => (
                  <SelectButton key={type} selected={gameType === type} onClick={() => setGameType(type)}>
                    {type}
                  </SelectButton>
                ))}
              </div>
            </Card>

            {/* Players */}
            <Card title="👥 Players">
              <div className="grid grid-cols-4 gap-2 mb-4">
                {[1, 2, 3, 4].map(n => (
                  <SelectButton key={n} selected={numPlayers === n} onClick={() => setNumPlayers(n)}>
                    {n}
                  </SelectButton>
                ))}
              </div>
              <div className="space-y-2">
                {players.slice(0, numPlayers).map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-xl p-3">
                    <button
                      onClick={() => { setEditingPlayerIdx(i); setModal({ type: 'avatar' }); }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0 transition-transform hover:scale-110"
                      style={{ background: p.color }}
                    >
                      {p.avatar}
                    </button>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const newPlayers = [...players];
                        newPlayers[i].name = e.target.value;
                        setPlayers(newPlayers);
                      }}
                      className="flex-1 bg-transparent border-none outline-none font-semibold text-lg"
                      placeholder={`Player ${i + 1}`}
                    />
                  </div>
                ))}
              </div>
            </Card>

            {/* Format */}
            <Card title="🎲 Match Format">
              {/* Quick Format Presets */}
              <div className="text-xs text-white/60 mb-2">QUICK SELECT</div>
              <div className="grid grid-cols-3 gap-2 mb-4">
                <button
                  onClick={() => { setLegs(1); setSets(0); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 1 && sets === 0 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 1 && sets === 0 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  Single Leg
                </button>
                <button
                  onClick={() => { setLegs(3); setSets(0); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 3 && sets === 0 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 3 && sets === 0 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  Best of 3
                </button>
                <button
                  onClick={() => { setLegs(5); setSets(0); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 5 && sets === 0 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 5 && sets === 0 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  Best of 5
                </button>
                <button
                  onClick={() => { setLegs(3); setSets(3); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 3 && sets === 3 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 3 && sets === 3 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  3 Sets
                </button>
                <button
                  onClick={() => { setLegs(5); setSets(5); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 5 && sets === 5 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 5 && sets === 5 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  5 Sets
                </button>
                <button
                  onClick={() => { setLegs(5); setSets(7); }}
                  className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${legs === 5 && sets === 7 ? 'text-white' : 'bg-white/10 hover:bg-white/20'}`}
                  style={legs === 5 && sets === 7 ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  7 Sets
                </button>
              </div>

              {/* Custom Format */}
              <div className="text-xs text-white/60 mb-2">CUSTOM FORMAT</div>
              <div className="bg-white/5 rounded-xl p-3 space-y-3">
                {/* Legs per set / match */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">{sets > 0 ? 'Legs per Set' : 'Total Legs'}</div>
                    <div className="text-xs text-white/50">First to {Math.ceil(legs / 2)} wins</div>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
                    <button
                      onClick={() => { if (legs > 1) setLegs(legs - 1); }}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg"
                    >
                      -
                    </button>
                    <div className="w-12 text-center font-mono font-bold text-xl">{legs}</div>
                    <button
                      onClick={() => { if (legs < 21) setLegs(legs + 1); }}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Number of Sets */}
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-sm">Number of Sets</div>
                    <div className="text-xs text-white/50">{sets === 0 ? 'Legs only (no sets)' : `First to ${Math.ceil(sets / 2)} sets wins`}</div>
                  </div>
                  <div className="flex items-center gap-1 bg-white/10 rounded-xl px-2 py-1">
                    <button
                      onClick={() => { if (sets > 0) setSets(sets - 1); }}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg"
                    >
                      -
                    </button>
                    <div className="w-12 text-center font-mono font-bold text-xl">{sets === 0 ? '-' : sets}</div>
                    <button
                      onClick={() => { if (sets < 13) setSets(sets + 1); }}
                      className="w-9 h-9 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center font-bold text-lg"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Format Summary */}
              <div className="mt-3 p-4 bg-gradient-to-r from-[var(--primary)]/20 to-[var(--secondary)]/20 rounded-xl text-center border border-[var(--primary)]/30">
                <div className="text-lg font-bold">
                  {sets > 0 ? (
                    <>
                      <span style={{ color: 'var(--primary)' }}>First to {Math.ceil(sets / 2)}</span>
                      <span className="text-white/60"> sets</span>
                    </>
                  ) : legs === 1 ? (
                    <span>Single Leg Match</span>
                  ) : (
                    <>
                      <span style={{ color: 'var(--primary)' }}>First to {Math.ceil(legs / 2)}</span>
                      <span className="text-white/60"> legs</span>
                    </>
                  )}
                </div>
                <div className="text-sm text-white/60 mt-1">
                  {sets > 0 ? (
                    `Best of ${sets} sets • Best of ${legs} legs per set`
                  ) : legs === 1 ? (
                    'Winner takes all'
                  ) : (
                    `Best of ${legs} legs`
                  )}
                </div>
              </div>
            </Card>

            {/* Checkout Mode */}
            <Card title="🎯 Checkout">
              <div className="grid grid-cols-2 gap-2">
                <SelectButton selected={checkoutMode === 'double'} onClick={() => setCheckoutMode('double')}>
                  Double Out
                </SelectButton>
                <SelectButton selected={checkoutMode === 'straight'} onClick={() => setCheckoutMode('straight')}>
                  Straight Out
                </SelectButton>
              </div>
            </Card>

            {/* Coin Toss */}
            {numPlayers > 1 && (
              <Card title="🪙 Who Goes First?">
                <div className="text-center py-4">
                  <button
                    onClick={flipCoin}
                    className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl shadow-xl transition-transform ${coinFlipping ? 'animate-coinFlip' : 'hover:scale-110'}`}
                    style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                  >
                    {coinResult !== null ? players[coinResult].avatar : '🎯'}
                  </button>
                  <div className="font-semibold">
                    {coinResult !== null ? `${players[coinResult].name} goes first!` : 'Tap to flip!'}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={flipCoin} className="py-2.5 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                    🎲 Random
                  </button>
                  <button onClick={() => setModal({ type: 'chooseFirst' })} className="py-2.5 rounded-xl bg-white/10 font-semibold hover:bg-white/20">
                    ✋ Choose
                  </button>
                </div>
              </Card>
            )}

            {/* Start Button */}
            <button
              onClick={startGame}
              className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
            >
              🎯 Start Match
            </button>
          </div>
        )}

        {/* ========== FULLSCREEN BOARD ========== */}
        {gameActive && showBoard && (
          <div className="fixed inset-0 z-40 flex flex-col bg-[var(--bg-dark)]">
            {/* Compact Header - Scores + Darts in one row */}
            <div className="flex items-stretch gap-1 p-1.5 bg-bgMed safe-top">
              {/* Player Scores */}
              {players.slice(0, numPlayers).map((p, i) => {
                const isActive = i === currentPlayer;
                const displayScore = i === currentPlayer ? scores[i] - turnTotal : scores[i];
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-lg p-1.5 text-center transition-all ${
                      isActive ? 'ring-2 ring-[var(--primary)]' : ''
                    }`}
                    style={{ background: isActive ? `${p.color}40` : 'rgba(255,255,255,0.05)' }}
                  >
                    <div className="flex items-center justify-center gap-1 text-xs">
                      <span>{p.avatar}</span>
                      <span className="truncate max-w-[50px]">{p.name}</span>
                    </div>
                    <div className="text-2xl font-bold font-mono" style={{ color: isActive ? 'var(--primary)' : 'white' }}>
                      {displayScore}
                    </div>
                    <div className="text-[10px] opacity-50">L:{legWins[i]}{sets > 0 ? ` S:${setWins[i]}` : ''}</div>
                  </div>
                );
              })}
              {/* Current Turn Info */}
              <div className="flex flex-col justify-center gap-1 px-2 min-w-[80px]">
                <div className="flex gap-0.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className={`flex-1 h-6 rounded text-xs font-mono font-bold flex items-center justify-center ${
                        darts[i] ? 'bg-[var(--primary)]' : 'bg-white/10'
                      }`}
                    >
                      {darts[i]?.label?.slice(0,3) || '-'}
                    </div>
                  ))}
                </div>
                <div className="text-center font-mono font-bold text-lg" style={{ color: 'var(--primary)' }}>
                  {turnTotal}
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={endGame}
              className="absolute top-safe right-1 z-50 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center"
            >
              <X size={16} />
            </button>

            {/* Checkout Hint - Compact */}
            {checkout && (
              <div className="py-1.5 px-3 text-center text-sm" style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                <span className="opacity-80">Checkout: </span>
                <span className="font-bold font-mono">{checkout}</span>
              </div>
            )}

            {/* Input Mode Tabs - Compact */}
            <div className="flex justify-center gap-0.5 px-2 py-1.5 bg-black/30">
              {[
                { id: 'board', icon: '🎯', label: 'Board' },
                { id: 'keypad', icon: '🔢', label: 'Keypad' },
                { id: 'pad', icon: '🎱', label: 'Darts' },
                { id: 'quick', icon: '⚡', label: 'Quick' },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => { setInputMode(mode.id); haptic(); }}
                  className={`flex-1 py-1.5 px-1 rounded-lg font-semibold text-xs transition-all flex items-center justify-center gap-0.5 ${
                    inputMode === mode.id
                      ? 'text-white'
                      : 'bg-white/10 text-white/60'
                  }`}
                  style={inputMode === mode.id ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
                >
                  <span className="text-sm">{mode.icon}</span>
                  <span className="hidden xs:inline">{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Input Area - Board Mode (MAXIMIZED dartboard) */}
            {inputMode === 'board' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 flex items-center justify-center p-1">
                  <Dartboard
                    onHit={(n, mult) => {
                      let score, label, isDouble;
                      if (n === 50) {
                        score = 50; label = 'Bull'; isDouble = true;
                      } else if (n === 25) {
                        score = 25; label = '25'; isDouble = false;
                      } else {
                        score = n * mult;
                        label = mult === 1 ? `S${n}` : mult === 2 ? `D${n}` : `T${n}`;
                        isDouble = mult === 2;
                      }
                      recordDart(score, label, isDouble);
                    }}
                    size={Math.min(window.innerWidth - 8, window.innerHeight - 280)}
                    numberSize={boardNumberSize}
                  />
                </div>
                {/* Compact Bottom Actions for Board Mode */}
                <div className="flex gap-1.5 p-2 bg-bgMed safe-bottom">
                  <button
                    onClick={() => recordDart(0, 'Miss', false)}
                    className="py-3 px-4 rounded-xl font-bold bg-red-500 text-white active:scale-95 transition-transform"
                  >
                    Miss
                  </button>
                  <button
                    onClick={undoAction}
                    className="flex-1 py-3 rounded-xl font-bold bg-white/10 flex items-center justify-center gap-1 active:scale-95 transition-transform"
                  >
                    <RotateCcw size={16} /> Undo
                  </button>
                  <button
                    onClick={nextTurn}
                    className="flex-1 py-3 rounded-xl font-bold text-white flex items-center justify-center gap-1 active:scale-95 transition-transform"
                    style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                  >
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Input Area - Keypad Mode (enter 3-dart total with number pad) */}
            {inputMode === 'keypad' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-3">
                  <Keypad
                    currentScore={scores[currentPlayer]}
                    onSubmit={(score, isCheckout) => {
                      submitTurn(score, isCheckout);
                    }}
                  />
                </div>
                {/* Stats Bar */}
                <div className="flex items-center justify-between p-3 bg-bgMed safe-bottom">
                  <div className="flex gap-4 text-sm">
                    <div><span className="opacity-50">Avg:</span> <span className="font-mono font-bold text-[var(--primary)]">{playerStats[currentPlayer]?.darts > 0 ? (playerStats[currentPlayer].score / playerStats[currentPlayer].darts * 3).toFixed(1) : '0.0'}</span></div>
                    <div><span className="opacity-50">Darts:</span> <span className="font-mono font-bold">{playerStats[currentPlayer]?.legDarts || 0}</span></div>
                  </div>
                  <button onClick={undoAction} className="py-2 px-4 rounded-xl font-semibold bg-white/10 flex items-center gap-2 active:scale-95 transition-transform">
                    <RotateCcw size={16} /> Undo
                  </button>
                </div>
              </div>
            )}

            {/* Input Area - Dart Pad Mode (enter each dart with S/D/T) */}
            {inputMode === 'pad' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-3">
                  <DartPad
                    onScore={(score, label, isDouble) => recordDart(score, label, isDouble)}
                    multiplier={multiplier}
                    setMultiplier={setMultiplier}
                  />
                </div>
                {/* Actions Bar */}
                <div className="flex gap-2 p-2 bg-bgMed safe-bottom">
                  <div className="flex gap-3 text-sm items-center flex-1">
                    <div><span className="opacity-50">Avg:</span> <span className="font-mono font-bold text-[var(--primary)]">{playerStats[currentPlayer]?.darts > 0 ? (playerStats[currentPlayer].score / playerStats[currentPlayer].darts * 3).toFixed(1) : '0.0'}</span></div>
                  </div>
                  <button onClick={undoAction} className="py-2.5 px-4 rounded-xl font-semibold bg-white/10 flex items-center gap-1 active:scale-95 transition-transform">
                    <RotateCcw size={16} /> Undo
                  </button>
                  <button onClick={nextTurn} className="py-2.5 px-6 rounded-xl font-bold text-white flex items-center gap-1 active:scale-95 transition-transform" style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}>
                    Next <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}

            {/* Input Area - Quick Mode (tap common scores) */}
            {inputMode === 'quick' && (
              <div className="flex-1 flex flex-col min-h-0">
                <div className="flex-1 overflow-y-auto p-3">
                  <QuickScores
                    currentScore={scores[currentPlayer]}
                    onSubmit={(score, isCheckout) => {
                      submitTurn(score, isCheckout);
                    }}
                  />
                </div>
                {/* Stats Bar */}
                <div className="flex items-center justify-between p-3 bg-bgMed safe-bottom">
                  <div className="flex gap-4 text-sm">
                    <div><span className="opacity-50">Avg:</span> <span className="font-mono font-bold text-[var(--primary)]">{playerStats[currentPlayer]?.darts > 0 ? (playerStats[currentPlayer].score / playerStats[currentPlayer].darts * 3).toFixed(1) : '0.0'}</span></div>
                    <div><span className="opacity-50">Darts:</span> <span className="font-mono font-bold">{playerStats[currentPlayer]?.legDarts || 0}</span></div>
                  </div>
                  <button onClick={undoAction} className="py-2 px-4 rounded-xl font-semibold bg-white/10 flex items-center gap-2 active:scale-95 transition-transform">
                    <RotateCcw size={16} /> Undo
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ========== PRACTICE SCREEN ========== */}
        {screen === 'practice' && !practiceMode && (
          <div className="p-4 space-y-4 animate-fadeIn">
            <SectionTitle icon="💪" text="Practice Drills" />
            <div className="space-y-2">
              {PRACTICE_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => startPractice(mode.id)}
                  className="w-full flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all hover:translate-x-1"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0"
                    style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                  >
                    {mode.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-bold">{mode.name}</div>
                    <div className="text-sm opacity-60">{mode.desc}</div>
                  </div>
                  <ChevronRight className="opacity-40" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Practice Active */}
        {screen === 'practice' && practiceMode && (
          <div className="p-4 space-y-4 animate-fadeIn">
            <Card>
              <div className="text-center py-4">
                <div className="text-sm opacity-60 mb-1">
                  Target {practiceIdx + 1} of {practiceTargets.length}
                </div>
                <div
                  className="text-6xl font-bold font-mono"
                  style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
                >
                  {practiceTargets[practiceIdx]?.target}
                </div>
                {practiceMode === 'bob27' && (
                  <div className={`mt-4 text-xl font-bold ${bobScore > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                    Score: {bobScore}
                  </div>
                )}
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1 flex-wrap mt-4">
                {practiceTargets.map((_, i) => (
                  <div
                    key={i}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i < practiceIdx ? 'bg-emerald-400' : i === practiceIdx ? 'bg-[var(--primary)] scale-150' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </Card>

            <div className="grid grid-cols-3 gap-2">
              <StatBox label="Hits" value={practiceHits} color="text-emerald-400" />
              <StatBox label="Misses" value={practiceMisses} color="text-red-400" />
              <StatBox label="Accuracy" value={`${practiceHits + practiceMisses > 0 ? Math.round(practiceHits / (practiceHits + practiceMisses) * 100) : 0}%`} />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => practiceResult(false)}
                className="py-4 rounded-xl font-bold text-lg bg-red-500 text-white active:scale-95 transition-transform"
              >
                ❌ Miss
              </button>
              <button
                onClick={() => practiceResult(true)}
                className="py-4 rounded-xl font-bold text-lg text-white active:scale-95 transition-transform"
                style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
              >
                ✅ Hit
              </button>
            </div>

            <button
              onClick={() => setPracticeMode(null)}
              className="w-full py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20"
            >
              End Practice
            </button>
          </div>
        )}

        {/* ========== LEARN SCREEN ========== */}
        {screen === 'learn' && (
          <div className="p-4 space-y-4 animate-fadeIn">
            <SectionTitle icon="📊" text="Checkout Chart" />
            <div className="grid grid-cols-3 gap-2">
              {[170, 160, 140, 120, 100, 80, 60, 40, 32, 16, 8, 4].map(n => (
                <div key={n} className="bg-white/10 rounded-xl p-2.5 text-center">
                  <div className="font-bold text-lg" style={{ color: 'var(--primary)' }}>{n}</div>
                  <div className="text-xs opacity-60 font-mono">{CHECKOUTS[n]}</div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setModal({ type: 'checkouts' })}
              className="w-full py-3 rounded-xl font-semibold bg-white/10 hover:bg-white/20"
            >
              View All Checkouts
            </button>

            <div className="bg-gradient-to-r from-[var(--primary)] to-[var(--secondary)] rounded-xl p-4">
              <div className="text-xs uppercase opacity-80">Pro Tip</div>
              <div className="font-bold mt-1">Leave Even Numbers</div>
              <div className="text-sm opacity-90">Best finishes: 40 (D20), 32 (D16), 36 (D18).</div>
            </div>

            <SectionTitle icon="📚" text="Guides" />
            <div className="space-y-2">
              {Object.entries(GUIDES).map(([key, guide]) => (
                <button
                  key={key}
                  onClick={() => setModal({ type: 'guide', guide: key })}
                  className="w-full flex items-center gap-4 bg-white/10 hover:bg-white/20 rounded-xl p-4 text-left transition-all hover:translate-x-1"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0"
                    style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
                  >
                    {guide.icon}
                  </div>
                  <div className="flex-1">
                    <div className="font-bold">{guide.title}</div>
                  </div>
                  <ChevronRight className="opacity-40" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ========== STATS SCREEN ========== */}
        {screen === 'stats' && (
          <div className="p-4 space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <StatCard icon="🎯" label="3-Dart Avg" value={stats.totalDarts > 0 ? (stats.totalScore / stats.totalDarts * 3).toFixed(1) : '0'} />
              <StatCard icon="🏆" label="Wins" value={stats.wins} />
              <StatCard icon="⚡" label="Best Turn" value={stats.best3} />
              <StatCard icon="✨" label="Checkout %" value={`${stats.checkAttempts > 0 ? Math.round(stats.checkHits / stats.checkAttempts * 100) : 0}%`} />
            </div>

            {/* Performance Chart */}
            {stats.recent.length > 0 && (
              <Card title="📈 Recent Performance">
                <div className="flex items-end gap-1 h-16">
                  {stats.recent.map((val, i) => (
                    <div
                      key={i}
                      className="flex-1 rounded-t transition-all"
                      style={{
                        height: `${Math.max(10, val / Math.max(...stats.recent, 60) * 100)}%`,
                        background: `linear-gradient(to top, var(--primary), var(--secondary))`
                      }}
                    />
                  ))}
                </div>
              </Card>
            )}

            <Card title="🎉 High Scores">
              <div className="grid grid-cols-3 gap-2">
                <StatBox label="180s" value={stats.s180} />
                <StatBox label="140+" value={stats.s140} />
                <StatBox label="100+" value={stats.s100} />
              </div>
            </Card>

            <button
              onClick={() => {
                if (confirm('Reset all stats? This cannot be undone.')) {
                  setStats({
                    games: 0, wins: 0, totalScore: 0, totalDarts: 0, highest: 0, best3: 0,
                    checkAttempts: 0, checkHits: 0, s180: 0, s140: 0, s100: 0, recent: [], history: []
                  });
                  setAchievements({
                    first180: false, ton80: false, checkout100: false, games10: false, avg80: false, nineDarter: false
                  });
                  showToast('Stats reset', 'success');
                }
              }}
              className="w-full py-3 rounded-xl font-semibold bg-red-500/20 text-red-400 hover:bg-red-500/30"
            >
              🗑️ Reset Stats
            </button>
          </div>
        )}
      </main>

      {/* Bottom Navigation */}
      {!showBoard && (
        <nav className="fixed bottom-0 left-0 right-0 flex bg-bgMed/80 backdrop-blur-lg border-t border-white/10 safe-bottom">
          {[
            { id: 'home', icon: Home, label: 'Home' },
            { id: 'play', icon: Target, label: 'Play' },
            { id: 'practice', icon: Dumbbell, label: 'Practice' },
            { id: 'learn', icon: BookOpen, label: 'Learn' },
            { id: 'stats', icon: BarChart3, label: 'Stats' },
          ].map(nav => (
            <button
              key={nav.id}
              onClick={() => { setScreen(nav.id); haptic(); }}
              className={`flex-1 py-3 flex flex-col items-center gap-0.5 transition-colors ${
                screen === nav.id ? 'text-[var(--primary)]' : 'text-white/40'
              }`}
            >
              <nav.icon size={22} />
              <span className="text-[10px] font-medium">{nav.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* ========== MODALS ========== */}

      {/* Settings Modal */}
      <Modal isOpen={modal?.type === 'settings'} onClose={() => setModal(null)} title="Settings">
        <div className="space-y-4">
          <div>
            <div className="text-xs text-white/50 mb-2 uppercase">Background</div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(BACKGROUNDS).map(([key, bg]) => (
                <SelectButton key={key} selected={background === key} onClick={() => setBackground(key)}>
                  {bg.name}
                </SelectButton>
              ))}
            </div>
          </div>

          <div>
            <div className="text-xs text-white/50 mb-2 uppercase">Theme Color</div>
            <div className="grid grid-cols-3 gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`h-12 rounded-xl transition-all ${theme === key ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--bg-dark)]' : ''}`}
                  style={{ background: `linear-gradient(135deg, ${t.primary}, ${t.secondary})` }}
                >
                  <span className="text-xs font-semibold text-white/90">{t.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Dartboard Number Size Slider */}
          <div>
            <div className="text-xs text-white/50 mb-2 uppercase flex items-center justify-between">
              <span>Board Number Size</span>
              <span className="text-[var(--primary)] font-mono">{boardNumberSize}px</span>
            </div>
            <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
              <span className="text-xs opacity-50">Small</span>
              <input
                type="range"
                min="10"
                max="20"
                value={boardNumberSize}
                onChange={(e) => setBoardNumberSize(parseInt(e.target.value))}
                className="flex-1 h-2 rounded-full appearance-none bg-white/20 cursor-pointer"
                style={{
                  background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${(boardNumberSize - 10) * 10}%, rgba(255,255,255,0.2) ${(boardNumberSize - 10) * 10}%, rgba(255,255,255,0.2) 100%)`
                }}
              />
              <span className="text-xs opacity-50">Large</span>
            </div>
            <div className="mt-2 flex justify-center">
              <div className="bg-white/10 rounded-xl p-3 text-center">
                <span style={{ fontSize: boardNumberSize }} className="font-bold">20</span>
                <span className="text-xs opacity-50 ml-2">Preview</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <ToggleRow icon={<Volume2 size={18} />} label="Sound Effects" value={soundEnabled} onChange={setSoundEnabled} />
            <ToggleRow icon={<Vibrate size={18} />} label="Haptic Feedback" value={hapticEnabled} onChange={setHapticEnabled} />
            <ToggleRow icon={<MessageSquare size={18} />} label="Voice Announcer" value={voiceEnabled} onChange={setVoiceEnabled} />
            <ToggleRow icon={<HelpCircle size={18} />} label="Checkout Hints" value={hintsEnabled} onChange={setHintsEnabled} />
            <ToggleRow icon={<ChevronRight size={18} />} label="Auto-Advance" value={autoAdvance} onChange={setAutoAdvance} />
          </div>

          <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10 mt-4">
            Close
          </button>
        </div>
      </Modal>

      {/* Avatar Picker Modal */}
      <Modal isOpen={modal?.type === 'avatar'} onClose={() => setModal(null)} title="Choose Avatar">
        <div className="grid grid-cols-6 gap-2 mb-4 max-h-[60vh] overflow-y-auto p-1">
          {AVATARS.map(avatar => (
            <button
              key={avatar}
              onClick={() => {
                if (editingPlayerIdx !== null) {
                  const newPlayers = [...players];
                  newPlayers[editingPlayerIdx].avatar = avatar;
                  setPlayers(newPlayers);
                }
              }}
              className={`aspect-square rounded-xl flex items-center justify-center text-4xl bg-white/10 hover:bg-white/20 hover:scale-110 transition-all ${
                editingPlayerIdx !== null && players[editingPlayerIdx]?.avatar === avatar ? 'ring-2 ring-[var(--primary)] bg-white/20' : ''
              }`}
            >
              {avatar}
            </button>
          ))}
        </div>
        <div className="flex justify-center gap-3 mb-4">
          {COLORS.map(color => (
            <button
              key={color}
              onClick={() => {
                if (editingPlayerIdx !== null) {
                  const newPlayers = [...players];
                  newPlayers[editingPlayerIdx].color = color;
                  setPlayers(newPlayers);
                }
              }}
              className={`w-10 h-10 rounded-full transition-all ${
                editingPlayerIdx !== null && players[editingPlayerIdx]?.color === color ? 'ring-2 ring-white ring-offset-2 ring-offset-[var(--bg-dark)]' : ''
              }`}
              style={{ background: color }}
            />
          ))}
        </div>
        <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10">
          Done
        </button>
      </Modal>

      {/* Choose First Player Modal */}
      <Modal isOpen={modal?.type === 'chooseFirst'} onClose={() => setModal(null)} title="Who Goes First?">
        <div className="space-y-2">
          {players.slice(0, numPlayers).map((p, i) => (
            <button
              key={i}
              onClick={() => { setFirstPlayer(i); setCoinResult(i); setModal(null); }}
              className="w-full flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-xl p-3"
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: p.color }}>
                {p.avatar}
              </div>
              <span className="font-semibold">{p.name}</span>
            </button>
          ))}
        </div>
      </Modal>

      {/* Winner Modal */}
      <Modal isOpen={modal?.type === 'winner'} onClose={() => setModal(null)}>
        <div className="text-center py-4">
          <div className="text-6xl animate-bounce mb-4">🏆</div>
          <div
            className="text-2xl font-bold"
            style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}
          >
            {modal?.winner?.name}
          </div>
          <div className="text-white/60 mb-4">Wins the match!</div>
          <div className="space-y-1 text-sm text-white/80 mb-6">
            <div>Average: <span className="font-bold">{modal?.stats?.avg}</span></div>
            <div>First 9 Avg: <span className="font-bold">{modal?.stats?.first9Avg}</span></div>
            <div>Checkout: <span className="font-bold">{modal?.stats?.checkPct}%</span></div>
            <div>High Turn: <span className="font-bold">{modal?.stats?.highTurn}</span></div>
          </div>
          <div className="space-y-2">
            <button
              onClick={shareResult}
              className="w-full py-3 rounded-xl font-bold flex items-center justify-center gap-2"
              style={{ background: `linear-gradient(135deg, var(--primary), var(--secondary))` }}
            >
              <Share2 size={18} /> Share Result
            </button>
            <button
              onClick={() => { setModal(null); startGame(); }}
              className="w-full py-3 rounded-xl font-semibold bg-white/10"
            >
              🔄 Rematch
            </button>
            <button
              onClick={() => { setModal(null); setScreen('home'); }}
              className="w-full py-3 rounded-xl font-semibold bg-white/10"
            >
              Done
            </button>
          </div>
        </div>
      </Modal>

      {/* History Modal */}
      <Modal isOpen={modal?.type === 'history'} onClose={() => setModal(null)} title="Match History">
        {stats.history.length === 0 ? (
          <div className="text-center py-8 text-white/40">No matches yet</div>
        ) : (
          <div className="space-y-2 max-h-[50vh] overflow-y-auto">
            {stats.history.map((h, i) => (
              <div key={i} className="flex justify-between items-center bg-white/5 rounded-xl p-3">
                <div>
                  <div className="font-semibold">🏆 {h.winner}</div>
                  <div className="text-xs text-white/40">{new Date(h.date).toLocaleDateString()}</div>
                </div>
                <div className="text-right">
                  <div className="text-[var(--primary)] font-mono">Avg: {h.avg}</div>
                  {h.first9 && <div className="text-xs text-white/40">First 9: {h.first9}</div>}
                </div>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10 mt-4">
          Close
        </button>
      </Modal>

      {/* Checkouts Modal */}
      <Modal isOpen={modal?.type === 'checkouts'} onClose={() => setModal(null)} title="All Checkouts">
        <div className="grid grid-cols-3 gap-2 max-h-[55vh] overflow-y-auto">
          {Object.entries(CHECKOUTS).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([score, route]) => (
            <div key={score} className="bg-white/5 rounded-lg p-2 text-center">
              <div className="font-bold" style={{ color: 'var(--primary)' }}>{score}</div>
              <div className="text-xs text-white/50 font-mono">{route}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10 mt-4">
          Close
        </button>
      </Modal>

      {/* Guide Modal */}
      <Modal isOpen={modal?.type === 'guide'} onClose={() => setModal(null)} title={modal?.guide ? GUIDES[modal.guide].title : ''}>
        {modal?.guide && (
          <div className="space-y-4">
            {GUIDES[modal.guide].content.map((section, i) => (
              <div key={i}>
                <div className="font-bold text-[var(--primary)]">{section.h}</div>
                <div className="text-white/70 text-sm">{section.p}</div>
              </div>
            ))}
          </div>
        )}
        <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10 mt-4">
          Close
        </button>
      </Modal>
    </div>
  );
}

// ============ HELPER COMPONENTS ============

const SectionTitle = ({ icon, text }) => (
  <h2 className="font-bold flex items-center gap-2 mb-2">
    <span>{icon}</span> {text}
  </h2>
);

const Card = ({ title, children }) => (
  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/10">
    {title && <div className="font-bold mb-3 flex items-center gap-2">{title}</div>}
    {children}
  </div>
);

const StatBox = ({ label, value, color = '' }) => (
  <div className="bg-white/10 rounded-xl p-3 text-center">
    <div className={`text-2xl font-bold font-mono ${color}`} style={!color ? { color: 'var(--primary)' } : {}}>
      {value}
    </div>
    <div className="text-xs text-white/50">{label}</div>
  </div>
);

const StatCard = ({ icon, label, value }) => (
  <div className="bg-white/10 rounded-xl p-4 text-center">
    <div className="text-2xl mb-1">{icon}</div>
    <div className="text-2xl font-bold font-mono" style={{ color: 'var(--primary)' }}>{value}</div>
    <div className="text-xs text-white/50">{label}</div>
  </div>
);

const SelectButton = ({ selected, onClick, children }) => (
  <button
    onClick={onClick}
    className={`py-2.5 rounded-xl font-semibold transition-all ${
      selected ? 'text-white' : 'bg-white/10 hover:bg-white/20'
    }`}
    style={selected ? { background: `linear-gradient(135deg, var(--primary), var(--secondary))` } : {}}
  >
    {children}
  </button>
);

const ToggleRow = ({ icon, label, value, onChange }) => (
  <div className="flex justify-between items-center p-3 bg-white/5 rounded-xl">
    <span className="font-semibold flex items-center gap-2">{icon} {label}</span>
    <button
      onClick={() => onChange(!value)}
      className={`w-12 h-6 rounded-full relative transition-colors ${value ? 'bg-[var(--primary)]' : 'bg-white/20'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${value ? 'left-7' : 'left-1'}`} />
    </button>
  </div>
);
