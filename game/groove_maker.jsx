import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Play, Square, RefreshCcw, Volume2, Music, Settings, Activity, 
  Trees, Rocket, Monitor, Snowflake, Disc, 
  ChevronLeft, ChevronRight, Layers, Zap, X, Sliders
} from 'lucide-react';

// 음계 데이터 (C Major Scale) - 선명한 500번대 색상 및 Glow 유지
const NOTES = [
  { name: 'C5', freq: 523.25, color: 'bg-rose-400', glow: '#f43f5e' },
  { name: 'B4', freq: 493.88, color: 'bg-orange-400', glow: '#f97316' },
  { name: 'A4', freq: 440.00, color: 'bg-amber-400', glow: '#f59e0b' },
  { name: 'G4', freq: 392.00, color: 'bg-yellow-400', glow: '#eab308' },
  { name: 'F4', freq: 349.23, color: 'bg-emerald-400', glow: '#10b981' },
  { name: 'E4', freq: 329.63, color: 'bg-cyan-400', glow: '#06b6d4' },
  { name: 'D4', freq: 293.66, color: 'bg-blue-400', glow: '#3b82f6' },
  { name: 'C4', freq: 261.63, color: 'bg-indigo-400', glow: '#6366f1' },
];

const STEPS_PER_BAR = 16;
const INITIAL_BPM = 120;

// 테마 데이터
const THEMES = {
  nature: {
    id: 'nature',
    name: 'Forest',
    icon: <Trees size={16} />,
    desc: '깊은 숲속의 속삭임',
    bg: 'bg-gradient-to-br from-[#2c3333] to-[#1a1f1f]',
    panelBg: 'bg-[#2e4f4f]/80 border border-[#4e6f6f]/30 shadow-[0_20px_50px_rgba(0,0,0,0.5)]',
    text: 'text-emerald-50',
    accent: 'bg-[#cbe4de] text-[#2c3333]',
    waveform: 'triangle',
    shape: 'rounded-full', 
    envelope: { attack: 0.01, decay: 0.1, sustain: 0.3, release: 0.2 }, 
    gridBase: 'bg-black/20', 
    playhead: 'bg-[#cbe4de]',
    sliderTrack: 'bg-[#0e8388]/40',
    popupBg: 'bg-[#2c3333]/40', popupBorder: 'border-[#4e6f6f]/50'
  },
  space: {
    id: 'space',
    name: 'Galaxy',
    icon: <Rocket size={16} />,
    desc: '먼 우주에서 온 신호',
    bg: 'bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0a0a] to-black',
    panelBg: 'bg-black/60 border border-slate-700/50 backdrop-blur-xl shadow-[0_0_50px_rgba(79,70,229,0.15)]',
    text: 'text-slate-200',
    accent: 'bg-indigo-500 text-white',
    waveform: 'sine',
    shape: 'rounded-sm',
    envelope: { attack: 0.05, decay: 0.2, sustain: 0.6, release: 1.5 },
    gridBase: 'bg-white/5',
    activeGlow: 'shadow-[0_0_20px_rgba(165,180,252,0.6)]',
    playhead: 'bg-indigo-400',
    sliderTrack: 'bg-slate-700',
    popupBg: 'bg-[#0f172a]/40', popupBorder: 'border-indigo-500/30'
  },
  winter: {
    id: 'winter',
    name: 'Snow',
    icon: <Snowflake size={16} />,
    desc: '눈 내리는 날의 오르골',
    bg: 'bg-gradient-to-b from-[#e0f2fe] to-[#f0f9ff]', 
    panelBg: 'bg-white/40 border border-white/60 backdrop-blur-md shadow-[0_20px_40px_rgba(186,230,253,0.4)]',
    text: 'text-slate-600', 
    accent: 'bg-sky-400 text-white',
    waveform: 'sine', 
    shape: 'rounded-2xl', 
    envelope: { attack: 0.001, decay: 0.3, sustain: 0.1, release: 0.8 },
    gridBase: 'bg-white/50',
    activeGlow: 'shadow-[0_0_15px_rgba(56,189,248,0.5)] ring-2 ring-sky-200',
    playhead: 'bg-sky-400',
    sliderTrack: 'bg-slate-300',
    popupBg: 'bg-white/40', popupBorder: 'white',
  },
  cyber: {
    id: 'cyber',
    name: 'Cyber',
    icon: <Monitor size={16} />,
    desc: '오래된 아케이드 게임기',
    bg: 'bg-zinc-950',
    panelBg: 'bg-zinc-900/90 border-2 border-green-500/30 shadow-[0_0_30px_rgba(34,197,94,0.1)]',
    text: 'text-green-500',
    accent: 'bg-green-500 text-black',
    waveform: 'square',
    shape: 'rounded-none border border-green-500/40',
    envelope: { attack: 0.01, decay: 0.05, sustain: 0.5, release: 0.1 },
    gridBase: 'bg-zinc-800/50',
    activeGlow: 'shadow-[0_0_10px_#22c55e]',
    playhead: 'bg-green-500',
    sliderTrack: 'bg-zinc-700',
    popupBg: 'bg-zinc-900/40', popupBorder: 'border-green-500/30'
  }
};

export default function CompositionGame() {
  const [totalBars, setTotalBars] = useState(1);
  const [currentBarPage, setCurrentBarPage] = useState(0); 
  const [grid, setGrid] = useState(
    Array(NOTES.length).fill().map(() => Array(STEPS_PER_BAR * 1).fill(false))
  );
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [bpm, setBpm] = useState(INITIAL_BPM);
  const [volume, setVolume] = useState(0.3);
  const [currentTheme, setCurrentTheme] = useState(THEMES.winter);

  const [isDrumMasterActive, setIsDrumMasterActive] = useState(false);
  const [drumState, setDrumState] = useState({
    kick: true,
    snare: true,
    hihat: true,
    cymbal: false
  });

  const audioCtxRef = useRef(null);
  const timerRef = useRef(null);
  const noiseBufferRef = useRef(null);

  const initAudio = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    if (!noiseBufferRef.current) {
      const bufferSize = audioCtxRef.current.sampleRate;
      const buffer = audioCtxRef.current.createBuffer(1, bufferSize, audioCtxRef.current.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      noiseBufferRef.current = buffer;
    }
  };

  const changeTotalBars = (newBars) => {
    if (newBars === totalBars) return;
    const newTotalSteps = newBars * STEPS_PER_BAR;
    
    setGrid(prevGrid => {
      return prevGrid.map(row => {
        const newRow = new Array(newTotalSteps).fill(false);
        for (let i = 0; i < newTotalSteps; i++) {
          newRow[i] = row[i % row.length];
        }
        return newRow;
      });
    });

    setTotalBars(newBars);
    if (currentBarPage >= newBars) setCurrentBarPage(0);
  };

  const playDrum = useCallback((type) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const t = ctx.currentTime;

    if (type === 'kick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.setValueAtTime(150, t);
      osc.frequency.exponentialRampToValueAtTime(0.001, t + 0.5);
      gain.gain.setValueAtTime(volume * 2.0, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.5);
    } 
    else if (type === 'snare') {
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBufferRef.current;
      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = 'highpass';
      noiseFilter.frequency.value = 1000;
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(volume * 1.2, t);
      noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      noise.start(t);

      const osc = ctx.createOscillator();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(100, t);
      const oscGain = ctx.createGain();
      oscGain.gain.setValueAtTime(volume * 0.5, t);
      oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      osc.start(t);
      osc.stop(t + 0.2);
    }
    else if (type === 'hihat') {
      const src = ctx.createBufferSource();
      src.buffer = noiseBufferRef.current;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 7000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 0.6, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.05);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(t);
    }
    else if (type === 'cymbal') {
      const src = ctx.createBufferSource();
      src.buffer = noiseBufferRef.current;
      const filter = ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.value = 4000;
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(volume * 1.5, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
      src.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      src.start(t);
    }
  }, [volume]);

  const playSound = useCallback((freq) => {
    if (!audioCtxRef.current) return;
    const ctx = audioCtxRef.current;
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    const { waveform, envelope } = currentTheme;

    osc.type = waveform;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);

    const now = ctx.currentTime;
    const { attack, decay, sustain, release } = envelope;

    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(volume, now + attack);
    gainNode.gain.linearRampToValueAtTime(volume * sustain, now + attack + decay);
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + attack + decay + release);

    osc.connect(gainNode);
    gainNode.connect(ctx.destination);

    osc.start();
    osc.stop(now + attack + decay + release + 0.1);
  }, [currentTheme, volume]);

  useEffect(() => {
    if (isPlaying) {
      const stepTime = (60 / bpm) / 4 * 1000;
      const totalSteps = STEPS_PER_BAR * totalBars;

      timerRef.current = setInterval(() => {
        setCurrentStep((prev) => {
          const nextStep = (prev + 1) % totalSteps;
          
          grid.forEach((row, rowIndex) => {
            if (row[nextStep]) {
              playSound(NOTES[rowIndex].freq);
            }
          });

          if (isDrumMasterActive) {
            if (drumState.kick && nextStep % 4 === 0) playDrum('kick');
            if (drumState.snare && nextStep % 8 === 4) playDrum('snare');
            if (drumState.hihat && nextStep % 2 === 0) playDrum('hihat');
            if (drumState.cymbal && nextStep % 16 === 0) playDrum('cymbal');
          }

          return nextStep;
        });
      }, stepTime);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [isPlaying, bpm, grid, playSound, isDrumMasterActive, drumState, playDrum, totalBars]);

  const toggleCell = (rowIndex, stepIndex) => {
    const actualStepIndex = (currentBarPage * STEPS_PER_BAR) + stepIndex;
    const newGrid = [...grid];
    newGrid[rowIndex][actualStepIndex] = !newGrid[rowIndex][actualStepIndex];
    setGrid(newGrid);
    if (newGrid[rowIndex][actualStepIndex]) {
      initAudio();
      playSound(NOTES[rowIndex].freq);
    }
  };

  const clearGrid = () => {
    setGrid(Array(NOTES.length).fill().map(() => Array(STEPS_PER_BAR * totalBars).fill(false)));
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const randomizeGrid = () => {
    const newGrid = grid.map(row => 
       row.map(() => Math.random() > 0.85)
    );
    setGrid(newGrid);
    initAudio();
  };

  const goNextPage = () => setCurrentBarPage(prev => (prev + 1) % totalBars);
  const goPrevPage = () => setCurrentBarPage(prev => (prev - 1 + totalBars) % totalBars);

  return (
    <div className={`min-h-screen ${currentTheme.bg} transition-colors duration-1000 flex flex-col items-center justify-center p-4 md:p-8 select-none`}>
      
      <div className={`${currentTheme.panelBg} ${currentTheme.text} w-full max-w-5xl p-6 md:p-10 rounded-[2.5rem] transition-all duration-700 ease-in-out shadow-2xl`}>
        
        {/* 헤더 */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-serif font-bold tracking-wide mb-1 flex items-center justify-center md:justify-start gap-3">
              <Music size={24} className="opacity-80" />
              Groove Maker <span className="text-xs font-sans font-normal opacity-50 border border-current px-2 rounded-full">Demo</span>
            </h1>
            <p className="text-sm opacity-60 font-serif italic ml-1">{currentTheme.desc}</p>
          </div>

          <div className="flex bg-black/5 p-1.5 rounded-full backdrop-blur-sm border border-white/10 overflow-x-auto max-w-full">
            {Object.values(THEMES).map((theme) => (
              <button
                key={theme.id}
                onClick={() => setCurrentTheme(theme)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 text-xs font-medium whitespace-nowrap ${
                  currentTheme.id === theme.id 
                    ? `${currentTheme.accent} shadow-md` 
                    : 'opacity-50 hover:opacity-100 hover:bg-black/5'
                }`}
              >
                {theme.icon}
                <span className="hidden sm:inline">{theme.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 메인 컨트롤러 패널 (박스 제거, 우측 슬라이더만 박스) */}
        <div className="flex flex-col md:flex-row items-center md:justify-between gap-4 mb-8 px-2">

          {/* [LEFT] 조작부: 컨테이너 없음 */}
          <div className="flex items-center gap-4 flex-nowrap">
            
            {/* Play Button */}
            <button
              onClick={() => { initAudio(); setIsPlaying(!isPlaying); }}
              className={`w-16 h-16 flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300 shadow-lg hover:scale-105 active:scale-95 ${
                isPlaying 
                  ? 'bg-rose-400 text-white shadow-rose-400/40' 
                  : `${currentTheme.accent} opacity-90 hover:opacity-100`
              }`}
            >
              {isPlaying ? <Square size={24} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
            </button>

            {/* Icon Buttons Group */}
            <div className="flex items-center gap-2">
                {/* Reset */}
                <button onClick={clearGrid} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors" title="Reset">
                  <RefreshCcw size={18} />
                </button>
                {/* Random */}
                <button onClick={randomizeGrid} className="w-10 h-10 flex items-center justify-center rounded-full bg-black/5 hover:bg-black/10 transition-colors" title="Randomize">
                  <Activity size={18} />
                </button>
                
                {/* 🥁 Drum Button & Popup */}
                <div className="relative group">
                  <button
                    onClick={() => { initAudio(); setIsDrumMasterActive(!isDrumMasterActive); }}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 ${isDrumMasterActive ? `${currentTheme.accent} shadow-md` : 'bg-black/5 hover:bg-black/10'}`}
                  >
                    <Disc size={18} className={isDrumMasterActive ? 'animate-spin-slow' : ''} />
                  </button>
                  
                  {/* Dynamic Themed Popup */}
                   <div className={`
                      absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 
                      ${currentTheme.popupBg} border ${currentTheme.popupBorder}
                      rounded-2xl shadow-2xl flex gap-1 z-50 backdrop-blur-xl transition-all duration-200 origin-bottom 
                      ${isDrumMasterActive ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-2 pointer-events-none'}
                  `}>
                    {/* Background Mask to hide the main border line */}
                    {/* <div className={`absolute -bottom-[1px] left-1/2 -translate-x-1/2 w-4 h-[3px] ${currentTheme.popupBg}`}></div> */}

                    {/* Speech Bubble Tail */}
                    {/* <div className={`absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 ${currentTheme.popupBg} border-b border-r ${currentTheme.popupBorder} rotate-45`}></div> */}
                  

                    {[{ id: 'kick', label: 'K' }, { id: 'snare', label: 'S' }, { id: 'hihat', label: 'H' }, { id: 'cymbal', label: 'C' }].map((drum) => (
                      <button 
                        key={drum.id} 
                        onClick={(e) => { e.stopPropagation(); setDrumState(prev => ({...prev, [drum.id]: !prev[drum.id]})); }} 
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                          drumState[drum.id] 
                            ? `${currentTheme.accent} font-bold ring-1 ring-white/30 shadow-md` 
                            : 'text-white/30 hover:bg-white/5'
                        }`}
                      >
                         <span className="text-[10px]">{drum.label}</span>
                         {drumState[drum.id] && <div className="absolute bottom-1.5 w-1 h-1 bg-white rounded-full shadow-[0_0_4px_white]" />}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="w-px h-6 bg-current opacity-20 mx-1" />
                
                {/* Length */}
                <div className="flex gap-1">
                  {[1, 2, 4, 8].map((bar) => (
                    <button
                      key={bar}
                      onClick={() => changeTotalBars(bar)}
                      className={`w-8 h-8 rounded-full text-[10px] font-bold transition-all ${
                        totalBars === bar
                          ? `${currentTheme.accent} shadow-md scale-105 z-10 ring-1 ring-black/10`
                          : 'bg-black/5 opacity-50 hover:opacity-100 hover:bg-black/10'
                      }`}
                    >
                      {bar}x
                    </button>
                  ))}
                </div>
            </div>
          </div>

          {/* [RIGHT] 설정부: 별도의 회색 컨테이너 적용 */}
          <div className="flex items-center gap-6 px-6 py-3 bg-black/5 rounded-2xl flex-shrink-0">
             {/* BPM */}
             <div className="flex flex-col gap-1 w-24">
                 <div className="flex justify-between text-[10px] font-bold opacity-50">
                    <span>BPM</span>
                    <span>{bpm}</span>
                 </div>
                 <input
                  type="range" min="60" max="240" value={bpm}
                  onChange={(e) => setBpm(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${currentTheme.sliderTrack} accent-current`}
                />
             </div>

             {/* VOL */}
             <div className="flex flex-col gap-1 w-24">
                 <div className="flex justify-between text-[10px] font-bold opacity-50">
                    <span>VOL</span>
                    <span>{Math.round(volume * 200)}%</span>
                 </div>
                 <input
                  type="range" min="0" max="0.5" step="0.01" value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className={`w-full h-1.5 rounded-full appearance-none cursor-pointer ${currentTheme.sliderTrack} accent-current`}
                />
             </div>
          </div>

        </div>

        {/* 시퀀서 네비게이션 & 그리드 */}
        <div className="relative">
          {/* 네비게이션 헤더 */}
          <div className="flex items-center justify-between mb-2 px-2">
             <button 
               onClick={goPrevPage}
               className="p-2 hover:bg-black/10 rounded-full transition-colors disabled:opacity-20"
               disabled={totalBars === 1}
             >
               <ChevronLeft size={20} />
             </button>
             
             <div className="flex gap-1">
               {Array(totalBars).fill().map((_, idx) => {
                 const playingBarIndex = Math.floor(currentStep / STEPS_PER_BAR);
                 const isPlayingThisBar = isPlaying && playingBarIndex === idx;

                 return (
                   <button
                    key={idx}
                    onClick={() => setCurrentBarPage(idx)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentBarPage === idx ? 'w-8 bg-current opacity-80' : 'w-2 bg-current opacity-20 hover:opacity-40'
                    } ${isPlayingThisBar ? 'ring-1 ring-current ring-offset-1 ring-offset-transparent' : ''}`}
                   />
                 )
               })}
             </div>

             <button 
               onClick={goNextPage}
               className="p-2 hover:bg-black/10 rounded-full transition-colors disabled:opacity-20"
               disabled={totalBars === 1}
             >
               <ChevronRight size={20} />
             </button>
          </div>

          {/* 그리드 컨테이너: 회색 박스/테두리 제거 */}
          <div className="relative pt-4 min-h-[300px]">
            
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[120px] font-bold opacity-[0.03] pointer-events-none">
              {currentBarPage + 1}
            </div>

            {/* 재생 헤드 */}
            {Math.floor(currentStep / STEPS_PER_BAR) === currentBarPage && (
              <div 
                className={`absolute top-4 bottom-4 w-[2px] z-10 blur-[1px] transition-all duration-[60ms] ease-linear ${currentTheme.playhead}`}
                style={{ 
                  left: `calc(16px + ${(currentStep % STEPS_PER_BAR) / STEPS_PER_BAR * 100} * (100% - 32px) / 100)`,
                  opacity: 0.8,
                  boxShadow: `0 0 12px currentColor`
                }}
              />
            )}
            
            {/* 그리드 */}
            <div className="flex flex-col gap-2 relative z-0">
              {grid.map((row, rowIndex) => {
                const start = currentBarPage * STEPS_PER_BAR;
                const end = start + STEPS_PER_BAR;
                const pageRow = row.slice(start, end);

                return (
                  <div key={rowIndex} className="flex items-center gap-3 h-8">
                    <span className="w-8 text-[10px] font-serif font-bold text-right opacity-40 pt-1">
                      {NOTES[rowIndex].name}
                    </span>
                    
                    <div className="flex-1 flex gap-1.5 h-full">
                      {pageRow.map((isActive, colIndex) => {
                        const actualStep = start + colIndex;
                        const isCurrentStep = currentStep === actualStep;
                        const noteColor = NOTES[rowIndex].color;
                        const glowColor = NOTES[rowIndex].glow; // 각 노트의 고유 Glow 색상
                        
                        return (
                          <button
                            key={`${rowIndex}-${actualStep}`}
                            onMouseDown={() => toggleCell(rowIndex, colIndex)}
                            onMouseEnter={(e) => { if (e.buttons === 1) toggleCell(rowIndex, colIndex); }}
                            className={`
                              flex-1 h-full transition-all duration-200 ease-out relative
                              ${currentTheme.shape}
                              ${isActive 
                                ? `${noteColor} opacity-100 scale-100` 
                                : `${currentTheme.gridBase} scale-90 opacity-100 hover:scale-95 hover:bg-black/10`}
                              ${isCurrentStep && !isActive ? 'brightness-125 ring-1 ring-current ring-opacity-30' : ''}
                              ${isCurrentStep && isActive ? 'brightness-150 scale-110' : ''}
                            `}
                            style={{
                                boxShadow: isActive ? `0 0 15px ${glowColor}` : 'none'
                            }}
                          >
                            {isActive && (
                              <div className="absolute top-1 left-1 w-[40%] h-[40%] bg-white rounded-full opacity-30 blur-[1px]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
