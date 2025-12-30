import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { Home, Target, Dumbbell, BookOpen, BarChart3, Settings, HelpCircle, X, ChevronRight, RotateCcw, Trophy, Zap, Volume2, VolumeX, Sun, Moon, Palette } from 'lucide-react';

// ============ CONSTANTS ============
const CHECKOUTS = {170:'T20 T20 Bull',167:'T20 T19 Bull',164:'T20 T18 Bull',161:'T20 T17 Bull',160:'T20 T20 D20',158:'T20 T20 D19',157:'T20 T19 D20',156:'T20 T20 D18',155:'T20 T19 D19',154:'T20 T18 D20',152:'T20 T20 D16',151:'T20 T17 D20',150:'T20 T18 D18',148:'T20 T20 D14',146:'T20 T18 D16',144:'T20 T20 D12',142:'T20 T14 D20',140:'T20 T20 D10',138:'T20 T18 D12',136:'T20 T20 D8',134:'T20 T14 D16',132:'T20 T16 D12',130:'T20 T20 D5',128:'T18 T14 D16',127:'T20 T17 D8',126:'T19 T19 D6',125:'T20 T19 D4',124:'T20 T16 D8',123:'T19 T16 D9',122:'T18 T18 D7',121:'T20 T11 D14',120:'T20 S20 D20',119:'T19 T12 D13',118:'T20 S18 D20',117:'T20 S17 D20',116:'T20 S16 D20',115:'T20 S15 D20',114:'T20 S14 D20',113:'T20 S13 D20',112:'T20 T12 D8',111:'T20 S19 D16',110:'T20 S10 D20',109:'T20 S9 D20',108:'T20 S16 D16',107:'T19 S10 D20',106:'T20 S6 D20',105:'T20 S5 D20',104:'T18 S10 D20',103:'T19 S6 D20',102:'T20 S10 D16',101:'T17 S10 D20',100:'T20 D20',99:'T19 S10 D16',98:'T20 D19',97:'T19 D20',96:'T20 D18',95:'T19 D19',94:'T18 D20',93:'T19 D18',92:'T20 D16',91:'T17 D20',90:'T18 D18',89:'T19 D16',88:'T20 D14',87:'T17 D18',86:'T18 D16',85:'T19 D14',84:'T20 D12',83:'T17 D16',82:'T14 D20',81:'T19 D12',80:'T20 D10',79:'T13 D20',78:'T18 D12',77:'T19 D10',76:'T20 D8',75:'T17 D12',74:'T14 D16',73:'T19 D8',72:'T16 D12',71:'T13 D16',70:'T18 D8',69:'T19 D6',68:'T20 D4',67:'T17 D8',66:'T10 D18',65:'T19 D4',64:'T16 D8',63:'T13 D12',62:'T10 D16',61:'T15 D8',60:'S20 D20',59:'S19 D20',58:'S18 D20',57:'S17 D20',56:'T16 D4',55:'S15 D20',54:'S14 D20',53:'S13 D20',52:'T12 D8',51:'S11 D20',50:'S10 D20',49:'S9 D20',48:'S16 D16',47:'S15 D16',46:'S6 D20',45:'S13 D16',44:'S12 D16',43:'S11 D16',42:'S10 D16',41:'S9 D16',40:'D20',39:'S7 D16',38:'D19',37:'S5 D16',36:'D18',35:'S3 D16',34:'D17',33:'S1 D16',32:'D16',31:'S15 D8',30:'D15',29:'S13 D8',28:'D14',27:'S11 D8',26:'D13',25:'S9 D8',24:'D12',23:'S7 D8',22:'D11',21:'S5 D8',20:'D10',19:'S3 D8',18:'D9',17:'S1 D8',16:'D8',15:'S7 D4',14:'D7',13:'S5 D4',12:'D6',11:'S3 D4',10:'D5',9:'S1 D4',8:'D4',7:'S3 D2',6:'D3',5:'S1 D2',4:'D2',3:'S1 D1',2:'D1'};

const THEMES = {
  purple: { name: 'Purple', primary: 'purple-500', gradient: 'from-purple-500 to-indigo-600' },
  blue: { name: 'Ocean', primary: 'blue-500', gradient: 'from-blue-500 to-cyan-500' },
  emerald: { name: 'Forest', primary: 'emerald-500', gradient: 'from-emerald-500 to-teal-500' },
  orange: { name: 'Sunset', primary: 'orange-500', gradient: 'from-orange-500 to-red-500' },
  rose: { name: 'Rose', primary: 'rose-500', gradient: 'from-rose-500 to-pink-500' },
  amber: { name: 'Gold', primary: 'amber-500', gradient: 'from-amber-500 to-yellow-500' },
  cyan: { name: 'Aqua', primary: 'cyan-500', gradient: 'from-cyan-500 to-blue-500' },
  lime: { name: 'Lime', primary: 'lime-500', gradient: 'from-lime-500 to-green-500' },
  fuchsia: { name: 'Neon', primary: 'fuchsia-500', gradient: 'from-fuchsia-500 to-purple-500' },
  slate: { name: 'Slate', primary: 'slate-400', gradient: 'from-slate-400 to-slate-600' },
};

const BACKGROUNDS = {
  dark: { name: 'Dark', bg: 'bg-slate-900', text: 'text-white', card: 'bg-slate-800/50' },
  light: { name: 'Light', bg: 'bg-gray-100', text: 'text-gray-900', card: 'bg-white/80' },
  gradient: { name: 'Gradient', bg: 'bg-gradient-to-br', text: 'text-white', card: 'bg-white/10' },
};

const AVATARS = ['🎯','🔥','⚡','💎','🏆','👑','🦊','🐺','🦁','🎮','🌟','🚀'];
const COLORS = ['#8b5cf6','#3b82f6','#10b981','#f97316','#ec4899','#eab308','#06b6d4','#84cc16'];

const GAME_MODES = [
  { id: '501', name: '501', icon: '5️⃣', desc: 'Classic game' },
  { id: '301', name: '301', icon: '3️⃣', desc: 'Quick game' },
  { id: '701', name: '701', icon: '7️⃣', desc: 'Long game' },
];

const PRACTICE_MODES = [
  { id: 'doubles', name: 'Doubles Master', icon: '🎯', desc: 'Hit all doubles D1-D20' },
  { id: 'bob27', name: "Bob's 27", icon: '👁️', desc: 'Classic doubles drill, start at 27' },
  { id: 'around', name: 'Around the Clock', icon: '🔄', desc: 'Hit 1-20 in sequence' },
  { id: 'triples', name: 'Triple Grind', icon: '🔥', desc: 'T20, T19, T18 practice' },
  { id: 'checkout', name: 'Checkout Drill', icon: '🏁', desc: 'Practice finishing combos' },
  { id: 'random', name: 'Random Targets', icon: '🎲', desc: 'Test overall accuracy' },
];

const INSTRUCTIONS = {
  '501': { title: '501', rules: ['Start at 501 points', 'Subtract your score each turn', 'Must finish on exactly 0', 'Final dart must be a double'], tips: ['Leave even numbers for easier doubles', 'T20, T19, T18 for high scoring', 'Avoid leaving 169, 168, 166, 165, 163, 162, 159'] },
  '301': { title: '301', rules: ['Same as 501 but starting at 301', 'Faster games', 'Must finish on a double'], tips: ['Good for practice', 'Focus on accuracy over power'] },
  '701': { title: '701', rules: ['Extended version starting at 701', 'Longer format', 'Must finish on a double'], tips: ['Pace yourself', 'Build rhythm'] },
  'doubles': { title: 'Doubles Master', rules: ['Hit doubles D1 through D20', '3 darts per target', 'Track your hit percentage'], tips: ['Start with D20, D16, D8', 'These are most common checkouts'] },
  'bob27': { title: "Bob's 27", rules: ['Start with 27 points', 'Hit the double to add its value', 'Miss to subtract its value', 'Try to end positive'], tips: ['Classic pro training drill', 'Tests consistency under pressure'] },
  'around': { title: 'Around the Clock', rules: ['Hit numbers 1-20 in order', 'Any segment counts (S, D, or T)', 'Track how many darts it takes'], tips: ['Focus on rhythm', 'Great warm-up drill'] },
};

// ============ UTILITIES ============
const playSound = (type) => {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.value = 0.08;

    const sounds = {
      throw: { freq: 800, dur: 0.04 },
      hit: { freq: 1200, dur: 0.08 },
      miss: { freq: 200, dur: 0.12 },
      bust: { freq: 150, dur: 0.25, vol: 0.15 },
      next: { freq: 600, dur: 0.06 },
      win: { freq: 1000, dur: 0.3 },
    };

    const s = sounds[type] || sounds.hit;
    osc.frequency.value = s.freq;
    if (s.vol) gain.gain.value = s.vol;
    osc.start();
    osc.stop(ctx.currentTime + s.dur);
  } catch (e) {}
};

const haptic = () => {
  if (navigator.vibrate) navigator.vibrate(8);
};

const randomCrypto = (max) => {
  const array = new Uint32Array(1);
  crypto.getRandomValues(array);
  return array[0] % max;
};

// ============ COMPONENTS ============

// Dartboard SVG Component
const Dartboard = ({ onHit, size = 300 }) => {
  const nums = [20,1,18,4,13,6,10,15,2,17,3,19,7,16,8,11,14,9,12,5];
  const cx = 200, cy = 200;

  const segment = (ro, ri, sa, ea, fill, n, mult) => {
    const x1o = cx + Math.cos(sa) * ro, y1o = cy + Math.sin(sa) * ro;
    const x2o = cx + Math.cos(ea) * ro, y2o = cy + Math.sin(ea) * ro;
    const x1i = cx + Math.cos(ea) * ri, y1i = cy + Math.sin(ea) * ri;
    const x2i = cx + Math.cos(sa) * ri, y2i = cy + Math.sin(sa) * ri;
    const d = `M${x1o} ${y1o} A${ro} ${ro} 0 0 1 ${x2o} ${y2o} L${x1i} ${y1i} A${ri} ${ri} 0 0 0 ${x2i} ${y2i}Z`;
    return <path key={`${n}-${mult}`} d={d} fill={fill} stroke="#333" strokeWidth="0.5" className="dartboard-segment" onClick={() => onHit(n, mult)} />;
  };

  return (
    <svg viewBox="0 0 400 400" style={{ width: size, height: size, filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.4))' }}>
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
      <circle cx={cx} cy={cy} r="40" fill="#2a9d8f" className="dartboard-segment" onClick={() => onHit(25, 1)} />
      <circle cx={cx} cy={cy} r="16" fill="#e63946" className="dartboard-segment" onClick={() => onHit(50, 2)} />
      {nums.map((n, i) => {
        const a = (i * 18 - 90) * Math.PI / 180;
        const x = cx + Math.cos(a) * 192;
        const y = cy + Math.sin(a) * 192;
        return <text key={`num-${n}`} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill="white" fontSize="11" fontWeight="700">{n}</text>;
      })}
    </svg>
  );
};

// Toast notification
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 2500);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 left-4 right-4 z-50 p-3 rounded-xl flex items-center gap-2 font-semibold text-sm animate-fadeIn ${
      type === 'success' ? 'bg-emerald-500' : type === 'error' ? 'bg-red-500' : 'bg-purple-500'
    } text-white shadow-xl`}>
      <span>{type === 'success' ? '✓' : type === 'error' ? '✕' : '🎯'}</span>
      <span>{message}</span>
    </div>
  );
};

// Modal wrapper
const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-end" onClick={onClose}>
      <div className="w-full max-h-[85vh] bg-slate-800 rounded-t-2xl p-4 pb-8 overflow-y-auto animate-slideUp" onClick={e => e.stopPropagation()}>
        <div className="w-8 h-1 bg-slate-600 rounded-full mx-auto mb-4" />
        {title && <h2 className="text-lg font-bold text-center mb-4 text-white">{title}</h2>}
        {children}
      </div>
    </div>
  );
};

// ============ MAIN APP ============
export default function App() {
  // State
  const [screen, setScreen] = useState('home');
  const [theme, setTheme] = useState('purple');
  const [background, setBackground] = useState('dark');
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showHints, setShowHints] = useState(true);

  // Game state
  const [gameActive, setGameActive] = useState(false);
  const [gameType, setGameType] = useState('501');
  const [numPlayers, setNumPlayers] = useState(1);
  const [players, setPlayers] = useState([
    { name: 'Player 1', avatar: '🎯', color: '#8b5cf6' },
    { name: 'Player 2', avatar: '🔥', color: '#3b82f6' },
    { name: 'Player 3', avatar: '⚡', color: '#10b981' },
    { name: 'Player 4', avatar: '💎', color: '#f97316' },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(0);
  const [scores, setScores] = useState([]);
  const [darts, setDarts] = useState([]);
  const [legWins, setLegWins] = useState([]);
  const [legs, setLegs] = useState(1);
  const [inputMode, setInputMode] = useState('board'); // 'board', 'pad', 'quick'
  const [multiplier, setMultiplier] = useState(1);
  const [undoHistory, setUndoHistory] = useState([]);

  // Stats
  const [stats, setStats] = useState({ games: 0, wins: 0, totalScore: 0, totalDarts: 0, s180: 0, s140: 0, s100: 0, history: [] });
  const [playerStats, setPlayerStats] = useState([]);

  // Practice state
  const [practiceMode, setPracticeMode] = useState(null);
  const [practiceTargets, setPracticeTargets] = useState([]);
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceHits, setPracticeHits] = useState(0);
  const [practiceMisses, setPracticeMisses] = useState(0);
  const [bobScore, setBobScore] = useState(27);

  // UI state
  const [toast, setToast] = useState(null);
  const [modal, setModal] = useState(null);
  const [coinFlipping, setCoinFlipping] = useState(false);
  const [coinResult, setCoinResult] = useState(null);
  const [firstPlayer, setFirstPlayer] = useState(0);
  const [showBoard, setShowBoard] = useState(false);

  // Load/save
  useEffect(() => {
    const saved = localStorage.getItem('dartsUltimate');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.theme) setTheme(data.theme);
      if (data.background) setBackground(data.background);
      if (data.soundEnabled !== undefined) setSoundEnabled(data.soundEnabled);
      if (data.showHints !== undefined) setShowHints(data.showHints);
      if (data.stats) setStats(data.stats);
      if (data.players) setPlayers(data.players);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('dartsUltimate', JSON.stringify({ theme, background, soundEnabled, showHints, stats, players }));
  }, [theme, background, soundEnabled, showHints, stats, players]);

  // Derived values
  const themeConfig = THEMES[theme];
  const bgConfig = BACKGROUNDS[background];

  const bgClass = background === 'gradient'
    ? `bg-gradient-to-br ${themeConfig.gradient}`
    : bgConfig.bg;

  const cardClass = background === 'light'
    ? 'bg-white/80 border border-gray-200'
    : 'bg-white/10 backdrop-blur-sm border border-white/10';

  const textClass = bgConfig.text;
  const textMutedClass = background === 'light' ? 'text-gray-500' : 'text-white/60';

  // Toast helper
  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Sound helper
  const sound = (type) => {
    if (soundEnabled) playSound(type);
    haptic();
  };

  // Checkout hint
  const getCheckout = (score) => {
    if (score <= 170 && score >= 2 && CHECKOUTS[score]) {
      return CHECKOUTS[score];
    }
    return null;
  };

  // ============ GAME LOGIC ============
  const startGame = () => {
    const startScore = parseInt(gameType);
    const newScores = Array(numPlayers).fill(startScore);
    const newLegWins = Array(numPlayers).fill(0);
    const newPlayerStats = Array(numPlayers).fill(null).map(() => ({
      darts: 0, score: 0, legDarts: 0, legScore: 0, highTurn: 0, checkAttempts: 0, checkHits: 0
    }));

    setScores(newScores);
    setLegWins(newLegWins);
    setPlayerStats(newPlayerStats);
    setCurrentPlayer(firstPlayer);
    setDarts([]);
    setUndoHistory([]);
    setGameActive(true);
    setShowBoard(true);
    sound('hit');
  };

  const endGame = () => {
    setGameActive(false);
    setShowBoard(false);
    setDarts([]);
  };

  const recordDart = (number, mult) => {
    if (!gameActive || darts.length >= 3) return;

    let score, label;
    if (number === 50) {
      score = 50;
      label = 'Bull';
    } else if (number === 25) {
      score = 25;
      label = '25';
    } else {
      score = number * mult;
      label = mult === 1 ? `S${number}` : mult === 2 ? `D${number}` : `T${number}`;
    }

    const newDarts = [...darts, { score, label, isDouble: mult === 2 || number === 50 }];
    setDarts(newDarts);

    // Update player stats
    const newStats = [...playerStats];
    newStats[currentPlayer].darts++;
    newStats[currentPlayer].score += score;
    newStats[currentPlayer].legDarts++;
    newStats[currentPlayer].legScore += score;
    setPlayerStats(newStats);

    sound('throw');

    // Auto-advance if 3 darts thrown
    if (newDarts.length === 3) {
      const total = newDarts.reduce((a, d) => a + d.score, 0);
      if (total > newStats[currentPlayer].highTurn) {
        newStats[currentPlayer].highTurn = total;
      }
      checkHighScore(total);
    }
  };

  const checkHighScore = (total) => {
    if (total === 180) {
      setStats(s => ({ ...s, s180: s.s180 + 1 }));
      showToast('ONE HUNDRED AND EIGHTY! 🎯', 'celebrate');
    } else if (total >= 140) {
      setStats(s => ({ ...s, s140: s.s140 + 1 }));
      showToast(`${total}! 🔥`, 'success');
    } else if (total >= 100) {
      setStats(s => ({ ...s, s100: s.s100 + 1 }));
    }
  };

  const nextTurn = () => {
    if (!gameActive) return;

    const turnTotal = darts.reduce((a, d) => a + d.score, 0);
    const lastDart = darts[darts.length - 1];
    const isDoubleOut = lastDart?.isDouble;

    // Save to undo history
    setUndoHistory(h => [...h.slice(-19), {
      player: currentPlayer,
      darts: [...darts],
      turnTotal,
      scoreBefore: scores[currentPlayer]
    }]);

    const newScore = scores[currentPlayer] - turnTotal;

    // Check for bust
    if (newScore < 0 || newScore === 1 || (newScore === 0 && !isDoubleOut)) {
      showToast('BUST! 💥', 'error');
      sound('bust');
      // Don't update score on bust
    } else if (newScore === 0) {
      // Leg won!
      const newLegWins = [...legWins];
      newLegWins[currentPlayer]++;
      setLegWins(newLegWins);

      const needed = Math.ceil(legs / 2);
      if (newLegWins[currentPlayer] >= needed) {
        // Match won!
        matchWon(currentPlayer);
        return;
      } else {
        // New leg
        showToast(`${players[currentPlayer].name} wins the leg! 🎉`, 'success');
        const startScore = parseInt(gameType);
        setScores(Array(numPlayers).fill(startScore));
        const newStats = [...playerStats];
        for (let i = 0; i < numPlayers; i++) {
          newStats[i].legDarts = 0;
          newStats[i].legScore = 0;
        }
        setPlayerStats(newStats);
      }
    } else {
      // Normal turn
      const newScores = [...scores];
      newScores[currentPlayer] = newScore;
      setScores(newScores);
    }

    // Advance to next player
    setCurrentPlayer((currentPlayer + 1) % numPlayers);
    setDarts([]);
    setMultiplier(1);
    sound('next');
  };

  const matchWon = (winner) => {
    setGameActive(false);
    setShowBoard(false);

    const ps = playerStats[winner];
    const avg = ps.darts > 0 ? (ps.score / ps.darts * 3).toFixed(1) : '0';

    setStats(s => ({
      ...s,
      games: s.games + 1,
      wins: winner === 0 || numPlayers === 1 ? s.wins + 1 : s.wins,
      history: [{ date: new Date().toISOString(), winner: players[winner].name, avg }, ...s.history.slice(0, 49)]
    }));

    setModal({
      type: 'winner',
      winner: players[winner],
      stats: { avg, darts: ps.darts, highTurn: ps.highTurn }
    });

    sound('win');
  };

  const undoAction = () => {
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

      showToast('Turn undone', 'success');
      haptic();
    }
  };

  // Coin flip
  const flipCoin = () => {
    if (coinFlipping) return;
    setCoinFlipping(true);
    setCoinResult(null);
    sound('throw');

    setTimeout(() => {
      const result = randomCrypto(numPlayers);
      setCoinResult(result);
      setFirstPlayer(result);
      setCoinFlipping(false);
      sound('hit');
    }, 1000);
  };

  // ============ PRACTICE LOGIC ============
  const startPractice = (mode) => {
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
        targets = [20, 16, 10, 8, 4, 2].map(n => ({ target: `D${n}`, value: n * 2 }));
        break;
      case 'random':
        targets = Array.from({ length: 15 }, () => {
          const types = ['S', 'D', 'T'];
          const t = types[randomCrypto(3)];
          const n = randomCrypto(20) + 1;
          return { target: `${t}${n}`, value: n * (t === 'S' ? 1 : t === 'D' ? 2 : 3) };
        });
        break;
    }

    setPracticeMode(mode);
    setPracticeTargets(targets);
    setPracticeIdx(0);
    setPracticeHits(0);
    setPracticeMisses(0);
    setScreen('practice');
    sound('hit');
  };

  const practiceResult = (hit) => {
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

    if (practiceIdx + 1 >= practiceTargets.length) {
      // Practice complete
      const acc = Math.round((practiceHits + (hit ? 1 : 0)) / practiceTargets.length * 100);
      if (practiceMode === 'bob27') {
        const finalScore = bobScore + (hit ? practiceTargets[practiceIdx].value : -practiceTargets[practiceIdx].value);
        showToast(`Final: ${finalScore}`, finalScore > 0 ? 'success' : 'error');
      } else {
        showToast(`Complete! ${acc}%`, acc >= 50 ? 'success' : 'error');
      }
      setTimeout(() => {
        setPracticeMode(null);
      }, 1500);
    } else {
      setPracticeIdx(i => i + 1);
    }
  };

  // ============ RENDER ============
  const turnTotal = darts.reduce((a, d) => a + d.score, 0);
  const currentScore = gameActive ? scores[currentPlayer] - turnTotal : 0;
  const checkout = showHints && gameActive ? getCheckout(currentScore) : null;

  return (
    <div className={`h-full flex flex-col ${bgClass} ${textClass} safe-top`}>
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <header className={`flex items-center justify-between px-4 py-3 ${cardClass}`}>
        <div className="flex items-center gap-2">
          <span className="text-xl">🎯</span>
          <span className="font-bold">Darts Ultimate</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setModal({ type: 'settings' })} className="p-2 rounded-lg bg-white/10 hover:bg-white/20">
            <Settings size={20} />
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-4 pb-20">

        {/* Home Screen */}
        {screen === 'home' && !gameActive && (
          <div className="space-y-4 animate-fadeIn">
            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { label: 'Games', value: stats.games },
                { label: 'Wins', value: stats.wins },
                { label: '180s', value: stats.s180 },
              ].map(s => (
                <div key={s.label} className={`${cardClass} rounded-xl p-3 text-center`}>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>{s.value}</div>
                  <div className={`text-xs ${textMutedClass}`}>{s.label}</div>
                </div>
              ))}
            </div>

            {/* Quick Play */}
            <div>
              <h2 className="font-semibold mb-2 flex items-center gap-2"><Zap size={18} /> Quick Play</h2>
              <div className="grid grid-cols-3 gap-2">
                {GAME_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => { setGameType(mode.id); setNumPlayers(1); setFirstPlayer(0); startGame(); }}
                    className={`${cardClass} rounded-xl p-4 text-center hover:scale-105 transition-transform`}
                  >
                    <div className="text-2xl mb-1">{mode.icon}</div>
                    <div className="font-bold">{mode.name}</div>
                    <div className={`text-xs ${textMutedClass}`}>{mode.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Recent */}
            {stats.history.length > 0 && (
              <div>
                <h2 className="font-semibold mb-2 flex items-center gap-2"><Trophy size={18} /> Recent</h2>
                <div className={`${cardClass} rounded-xl p-3`}>
                  {stats.history.slice(0, 3).map((h, i) => (
                    <div key={i} className={`flex justify-between py-2 ${i > 0 ? 'border-t border-white/10' : ''}`}>
                      <span>🏆 {h.winner}</span>
                      <span className={textMutedClass}>Avg: {h.avg}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Play Setup Screen */}
        {screen === 'play' && !gameActive && (
          <div className="space-y-4 animate-fadeIn">
            {/* Game Type */}
            <div className={`${cardClass} rounded-xl p-4`}>
              <h3 className={`text-sm ${textMutedClass} mb-2`}>GAME TYPE</h3>
              <div className="flex gap-2">
                {GAME_MODES.map(mode => (
                  <button
                    key={mode.id}
                    onClick={() => setGameType(mode.id)}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      gameType === mode.id ? `bg-${themeConfig.primary} text-white` : 'bg-white/10'
                    }`}
                  >
                    {mode.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Players */}
            <div className={`${cardClass} rounded-xl p-4`}>
              <h3 className={`text-sm ${textMutedClass} mb-2`}>PLAYERS</h3>
              <div className="flex gap-2 mb-4">
                {[1, 2, 3, 4].map(n => (
                  <button
                    key={n}
                    onClick={() => setNumPlayers(n)}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      numPlayers === n ? `bg-${themeConfig.primary} text-white` : 'bg-white/10'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                {players.slice(0, numPlayers).map((p, i) => (
                  <div key={i} className="flex items-center gap-3 bg-white/5 rounded-lg p-2">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-xl" style={{ background: p.color }}>
                      {p.avatar}
                    </div>
                    <input
                      type="text"
                      value={p.name}
                      onChange={(e) => {
                        const newPlayers = [...players];
                        newPlayers[i].name = e.target.value;
                        setPlayers(newPlayers);
                      }}
                      className="flex-1 bg-transparent border-none outline-none font-semibold"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Legs */}
            <div className={`${cardClass} rounded-xl p-4`}>
              <h3 className={`text-sm ${textMutedClass} mb-2`}>FORMAT</h3>
              <div className="flex gap-2">
                {[1, 3, 5, 7].map(n => (
                  <button
                    key={n}
                    onClick={() => setLegs(n)}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                      legs === n ? `bg-${themeConfig.primary} text-white` : 'bg-white/10'
                    }`}
                  >
                    {n === 1 ? '1 Leg' : `Bo${n}`}
                  </button>
                ))}
              </div>
            </div>

            {/* Coin Toss */}
            {numPlayers > 1 && (
              <div className={`${cardClass} rounded-xl p-4 text-center`}>
                <h3 className={`text-sm ${textMutedClass} mb-3`}>WHO GOES FIRST?</h3>
                <button
                  onClick={flipCoin}
                  className={`w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl bg-gradient-to-br ${themeConfig.gradient} shadow-xl ${coinFlipping ? 'animate-coinFlip' : ''}`}
                >
                  {coinResult !== null ? players[coinResult].avatar : '🎯'}
                </button>
                <div className="font-semibold">
                  {coinResult !== null ? `${players[coinResult].name} goes first!` : 'Tap to flip'}
                </div>
              </div>
            )}

            {/* Start Button */}
            <button
              onClick={startGame}
              className={`w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${themeConfig.gradient} text-white shadow-xl`}
            >
              Start Match
            </button>
          </div>
        )}

        {/* Game Active - Fullscreen Board */}
        {gameActive && showBoard && (
          <div className="fixed inset-0 z-40 flex flex-col bg-slate-900 safe-top safe-bottom">
            {/* Scoreboard */}
            <div className="flex gap-2 p-2 bg-slate-800">
              {players.slice(0, numPlayers).map((p, i) => {
                const ps = playerStats[i];
                const turnScore = i === currentPlayer ? turnTotal : 0;
                const displayScore = scores[i] - turnScore;
                const avg = ps?.darts > 0 ? (ps.score / ps.darts * 3).toFixed(1) : '0.0';
                const isActive = i === currentPlayer;
                return (
                  <div
                    key={i}
                    className={`flex-1 rounded-lg p-2 text-center transition-all ${
                      isActive ? `bg-gradient-to-br ${themeConfig.gradient} shadow-lg` : 'bg-slate-700/50'
                    }`}
                  >
                    <div className="text-lg">{p.avatar}</div>
                    <div className="text-xs text-white/70 truncate">{p.name}</div>
                    <div className="text-2xl font-bold font-mono">{displayScore}</div>
                    <div className="text-xs text-white/50">Avg: {avg} | L: {legWins[i]}</div>
                  </div>
                );
              })}
            </div>

            {/* Close Button */}
            <button
              onClick={endGame}
              className="absolute top-2 right-2 z-50 w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center"
            >
              <X size={20} />
            </button>

            {/* Checkout Hint */}
            {checkout && (
              <div className={`bg-gradient-to-r ${themeConfig.gradient} py-2 px-4 text-center`}>
                <span className="text-xs opacity-80">CHECKOUT: </span>
                <span className="font-bold font-mono">{checkout}</span>
              </div>
            )}

            {/* Dartboard */}
            <div className="flex-1 flex items-center justify-center p-4 relative">
              {/* Darts thrown overlay */}
              <div className="absolute top-2 left-1/2 -translate-x-1/2 flex gap-1 bg-black/60 backdrop-blur rounded-full px-3 py-1">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className={`min-w-[40px] h-7 rounded-full flex items-center justify-center font-mono text-sm font-bold ${
                      darts[i] ? `bg-gradient-to-r ${themeConfig.gradient}` : 'bg-slate-700'
                    }`}
                  >
                    {darts[i]?.label || '-'}
                  </div>
                ))}
                <div className={`min-w-[50px] h-7 rounded-full flex items-center justify-center font-mono text-sm font-bold bg-${themeConfig.primary}`}>
                  {turnTotal}
                </div>
              </div>

              <Dartboard onHit={recordDart} size={Math.min(window.innerWidth - 32, window.innerHeight - 300)} />
            </div>

            {/* Bottom Actions */}
            <div className="flex gap-2 p-3 bg-slate-800">
              <button
                onClick={() => recordDart(0, 1)}
                className="flex-[0.7] py-3 rounded-xl font-bold bg-red-500 text-white"
              >
                Miss
              </button>
              <button
                onClick={undoAction}
                className="flex-1 py-3 rounded-xl font-bold bg-slate-700 text-white flex items-center justify-center gap-2"
              >
                <RotateCcw size={18} /> Undo
              </button>
              <button
                onClick={nextTurn}
                className={`flex-1 py-3 rounded-xl font-bold bg-gradient-to-r ${themeConfig.gradient} text-white flex items-center justify-center gap-2`}
              >
                Next <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* Practice Screen */}
        {screen === 'practice' && !practiceMode && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="font-semibold flex items-center gap-2"><Dumbbell size={18} /> Practice Drills</h2>
            <div className="space-y-2">
              {PRACTICE_MODES.map(mode => (
                <button
                  key={mode.id}
                  onClick={() => startPractice(mode.id)}
                  className={`w-full ${cardClass} rounded-xl p-4 flex items-center gap-4 text-left hover:scale-[1.02] transition-transform`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-gradient-to-br ${themeConfig.gradient}`}>
                    {mode.icon}
                  </div>
                  <div>
                    <div className="font-bold">{mode.name}</div>
                    <div className={`text-sm ${textMutedClass}`}>{mode.desc}</div>
                  </div>
                  <ChevronRight className={`ml-auto ${textMutedClass}`} />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Practice Active */}
        {screen === 'practice' && practiceMode && (
          <div className="space-y-4 animate-fadeIn">
            <div className={`${cardClass} rounded-xl p-6 text-center`}>
              <h3 className={`text-sm ${textMutedClass} mb-1`}>TARGET {practiceIdx + 1} of {practiceTargets.length}</h3>
              <div className={`text-5xl font-bold font-mono bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>
                {practiceTargets[practiceIdx]?.target}
              </div>
              {practiceMode === 'bob27' && (
                <div className={`mt-4 text-lg ${bobScore > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                  Score: {bobScore}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className={`${cardClass} rounded-xl p-3 text-center`}>
                <div className="text-2xl font-bold text-emerald-400">{practiceHits}</div>
                <div className={`text-xs ${textMutedClass}`}>Hits</div>
              </div>
              <div className={`${cardClass} rounded-xl p-3 text-center`}>
                <div className="text-2xl font-bold text-red-400">{practiceMisses}</div>
                <div className={`text-xs ${textMutedClass}`}>Misses</div>
              </div>
              <div className={`${cardClass} rounded-xl p-3 text-center`}>
                <div className="text-2xl font-bold">
                  {practiceHits + practiceMisses > 0
                    ? Math.round(practiceHits / (practiceHits + practiceMisses) * 100)
                    : 0}%
                </div>
                <div className={`text-xs ${textMutedClass}`}>Accuracy</div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => practiceResult(false)}
                className="flex-1 py-4 rounded-xl font-bold text-lg bg-red-500 text-white"
              >
                Miss
              </button>
              <button
                onClick={() => practiceResult(true)}
                className={`flex-1 py-4 rounded-xl font-bold text-lg bg-gradient-to-r ${themeConfig.gradient} text-white`}
              >
                Hit
              </button>
            </div>

            <button
              onClick={() => setPracticeMode(null)}
              className={`w-full py-3 rounded-xl font-semibold ${cardClass}`}
            >
              End Practice
            </button>
          </div>
        )}

        {/* Learn Screen */}
        {screen === 'learn' && (
          <div className="space-y-4 animate-fadeIn">
            <h2 className="font-semibold flex items-center gap-2"><BookOpen size={18} /> Checkout Chart</h2>
            <div className="grid grid-cols-3 gap-2">
              {[170, 160, 140, 120, 100, 80, 60, 40, 32, 16, 8, 4].map(n => (
                <div key={n} className={`${cardClass} rounded-lg p-2 text-center`}>
                  <div className={`font-bold text-lg bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>{n}</div>
                  <div className={`text-xs ${textMutedClass} font-mono`}>{CHECKOUTS[n]}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setModal({ type: 'checkouts' })}
              className={`w-full py-3 rounded-xl font-semibold ${cardClass}`}
            >
              View All Checkouts
            </button>

            <div className={`${cardClass} rounded-xl p-4 bg-gradient-to-br ${themeConfig.gradient}`}>
              <div className="text-xs uppercase opacity-80">Pro Tip</div>
              <div className="font-bold mt-1">Leave Even Numbers</div>
              <div className="text-sm opacity-90">Best finishes: 40 (D20), 32 (D16), 36 (D18)</div>
            </div>
          </div>
        )}

        {/* Stats Screen */}
        {screen === 'stats' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Games', value: stats.games, icon: '🎮' },
                { label: 'Wins', value: stats.wins, icon: '🏆' },
                { label: '180s', value: stats.s180, icon: '💎' },
                { label: '140+', value: stats.s140, icon: '🔥' },
                { label: '100+', value: stats.s100, icon: '💪' },
                { label: 'Avg', value: stats.totalDarts > 0 ? (stats.totalScore / stats.totalDarts * 3).toFixed(1) : '0', icon: '📊' },
              ].map(s => (
                <div key={s.label} className={`${cardClass} rounded-xl p-4 text-center`}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <div className={`text-2xl font-bold bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>{s.value}</div>
                  <div className={`text-xs ${textMutedClass}`}>{s.label}</div>
                </div>
              ))}
            </div>

            {stats.history.length > 0 && (
              <div>
                <h3 className="font-semibold mb-2">Match History</h3>
                <div className={`${cardClass} rounded-xl divide-y divide-white/10`}>
                  {stats.history.slice(0, 10).map((h, i) => (
                    <div key={i} className="p-3 flex justify-between">
                      <div>
                        <span className="mr-2">🏆</span>
                        <span className="font-semibold">{h.winner}</span>
                      </div>
                      <div className={textMutedClass}>
                        Avg: {h.avg}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <button
              onClick={() => {
                if (confirm('Reset all stats?')) {
                  setStats({ games: 0, wins: 0, totalScore: 0, totalDarts: 0, s180: 0, s140: 0, s100: 0, history: [] });
                  showToast('Stats reset', 'success');
                }
              }}
              className={`w-full py-3 rounded-xl font-semibold ${cardClass} text-red-400`}
            >
              Reset Stats
            </button>
          </div>
        )}
      </main>

      {/* Bottom Nav */}
      {!showBoard && (
        <nav className={`fixed bottom-0 left-0 right-0 flex ${cardClass} safe-bottom`}>
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
              className={`flex-1 py-3 flex flex-col items-center gap-1 ${
                screen === nav.id ? `text-${themeConfig.primary}` : textMutedClass
              }`}
            >
              <nav.icon size={20} />
              <span className="text-xs">{nav.label}</span>
            </button>
          ))}
        </nav>
      )}

      {/* Settings Modal */}
      <Modal isOpen={modal?.type === 'settings'} onClose={() => setModal(null)} title="Settings">
        <div className="space-y-4">
          {/* Background Mode */}
          <div>
            <h3 className="text-sm text-white/60 mb-2">BACKGROUND</h3>
            <div className="flex gap-2">
              {Object.entries(BACKGROUNDS).map(([key, bg]) => (
                <button
                  key={key}
                  onClick={() => setBackground(key)}
                  className={`flex-1 py-3 rounded-lg font-semibold flex flex-col items-center gap-1 ${
                    background === key ? `bg-${themeConfig.primary}` : 'bg-white/10'
                  }`}
                >
                  {key === 'dark' ? <Moon size={18} /> : key === 'light' ? <Sun size={18} /> : <Palette size={18} />}
                  <span className="text-xs">{bg.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Theme Color */}
          <div>
            <h3 className="text-sm text-white/60 mb-2">ACCENT COLOR</h3>
            <div className="grid grid-cols-5 gap-2">
              {Object.entries(THEMES).map(([key, t]) => (
                <button
                  key={key}
                  onClick={() => setTheme(key)}
                  className={`aspect-square rounded-lg bg-gradient-to-br ${t.gradient} ${
                    theme === key ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-800' : ''
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
              <span className="font-semibold flex items-center gap-2">
                {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
                Sound Effects
              </span>
              <button
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full relative transition-colors ${soundEnabled ? `bg-${themeConfig.primary}` : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${soundEnabled ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
            <div className="flex justify-between items-center p-3 bg-white/10 rounded-lg">
              <span className="font-semibold flex items-center gap-2">
                <HelpCircle size={18} />
                Checkout Hints
              </span>
              <button
                onClick={() => setShowHints(!showHints)}
                className={`w-12 h-6 rounded-full relative transition-colors ${showHints ? `bg-${themeConfig.primary}` : 'bg-slate-600'}`}
              >
                <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${showHints ? 'left-7' : 'left-1'}`} />
              </button>
            </div>
          </div>

          <button onClick={() => setModal(null)} className="w-full py-3 rounded-xl font-semibold bg-white/10">
            Close
          </button>
        </div>
      </Modal>

      {/* Winner Modal */}
      <Modal isOpen={modal?.type === 'winner'} onClose={() => setModal(null)}>
        <div className="text-center py-4">
          <div className="text-6xl animate-bounce-custom">🏆</div>
          <div className={`text-2xl font-bold mt-4 bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>
            {modal?.winner?.name}
          </div>
          <div className="text-white/60 mt-2">
            Wins the match!
          </div>
          <div className="mt-4 space-y-1 text-sm text-white/80">
            <div>Average: {modal?.stats?.avg}</div>
            <div>Darts: {modal?.stats?.darts}</div>
            <div>High Turn: {modal?.stats?.highTurn}</div>
          </div>
          <div className="mt-6 space-y-2">
            <button
              onClick={() => { setModal(null); startGame(); }}
              className={`w-full py-3 rounded-xl font-bold bg-gradient-to-r ${themeConfig.gradient}`}
            >
              Rematch
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

      {/* All Checkouts Modal */}
      <Modal isOpen={modal?.type === 'checkouts'} onClose={() => setModal(null)} title="All Checkouts">
        <div className="grid grid-cols-3 gap-2 max-h-[60vh] overflow-y-auto">
          {Object.entries(CHECKOUTS).sort((a, b) => parseInt(b[0]) - parseInt(a[0])).map(([score, route]) => (
            <div key={score} className="bg-white/10 rounded-lg p-2 text-center">
              <div className={`font-bold text-lg bg-gradient-to-r ${themeConfig.gradient} bg-clip-text text-transparent`}>{score}</div>
              <div className="text-xs text-white/60 font-mono">{route}</div>
            </div>
          ))}
        </div>
        <button onClick={() => setModal(null)} className="w-full mt-4 py-3 rounded-xl font-semibold bg-white/10">
          Close
        </button>
      </Modal>
    </div>
  );
}
