import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import {
  HashRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';
import {
  ArrowLeft,
  ChevronRight,
  FlaskConical,
  Grid,
  Layers,
  Music,
  Rocket,
  Wind,
  Zap,
} from 'lucide-react';
import GrooveMaker from './game/groove_maker.jsx';
import DevBartender from './game/dev_bartender.jsx';
import SimpleAwsArchitect from './web/aws_architecture_diagram_tool.jsx';
import './index.css';

const withBase = (path) => {
  const normalized = path.startsWith('/') ? path.slice(1) : path;
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '');
  return `${base}/${normalized}`;
};

const games = [
  {
    id: 'groove-maker',
    title: 'Groove Maker',
    description: '감성적인 공간의 무작위적 소리 시퀀서',
    path: 'game/groove-maker',
    color: 'bg-sky-500',
    icon: <Music size={20} className="text-white" />,
    type: 'react',
    component: GrooveMaker,
    tags: ['audio', 'sequencer'],
  },
  {
    id: 'dev-bartender',
    title: 'Dev Bartender',
    description: '개발자 스택 칵테일 바',
    path: 'game/dev-bartender',
    color: 'bg-emerald-500',
    icon: <Layers size={20} className="text-white" />,
    type: 'react',
    component: DevBartender,
    tags: ['fun', 'generator'],
  },
  {
    id: 'dev-bartender-3d',
    title: 'Dev Bartender 3D',
    description: '스택을 3D 글래스로 시각화',
    path: 'game/dev-bartender-3d',
    color: 'bg-cyan-500',
    icon: <Rocket size={20} className="text-white" />,
    type: 'static',
    staticPath: withBase('game/dev_bartender_3d.html'),
    tags: ['three.js', 'visual'],
  },
  {
    id: 'firework-together',
    title: 'Firework Together',
    description: '실시간 멀티플레이 불꽃놀이',
    path: 'game/firework-together',
    color: 'bg-rose-500',
    icon: <Zap size={20} className="text-white" />,
    type: 'static',
    staticPath: withBase('game/firework_together.html'),
    tags: ['canvas', 'realtime'],
  },
];

const webExperiments = [
  {
    id: 'aws-architect',
    title: 'AWS Architecture Tool',
    description: '구성요소를 드래그해 다이어그램 작성',
    path: 'web/aws-architect',
    color: 'bg-indigo-500',
    icon: <Layers size={20} className="text-white" />,
    type: 'react',
    component: SimpleAwsArchitect,
    tags: ['diagram', 'dragdrop'],
  },
  {
    id: '3d-text-gif-maker',
    title: '3D Text & GIF Maker',
    description: 'Three.js로 GIF 캡처',
    path: 'web/3d-text-gif-maker',
    color: 'bg-fuchsia-500',
    icon: <Grid size={20} className="text-white" />,
    type: 'static',
    staticPath: withBase('web/3d_text_gif_maker.html'),
    tags: ['three.js', 'export'],
  },
  {
    id: 'developer-type-test',
    title: 'Developer Type Test',
    description: '개발자 성향 & 스택 추천',
    path: 'web/developer-type-test',
    color: 'bg-violet-500',
    icon: <Rocket size={20} className="text-white" />,
    type: 'static',
    staticPath: withBase('web/developer_type_test.html'),
    tags: ['quiz', 'recommendation'],
  },
];

const allItems = [...games, ...webExperiments];

function BackButton({ onBack }) {
  return (
    <button
      onClick={onBack}
      className="fixed top-6 left-6 z-50 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-lg shadow-slate-900/10 backdrop-blur"
      type="button"
    >
      <ArrowLeft size={16} />
      Lobby
    </button>
  );
}

function ReactExperience({ item }) {
  const navigate = useNavigate();
  const ExperienceComponent = item.component;

  return (
    <div className="relative min-h-screen">
      <BackButton onBack={() => navigate('/')} />
      <ExperienceComponent />
    </div>
  );
}

function StaticExperience({ item }) {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.open(item.staticPath, '_blank', 'noopener');
    }, 0);
    return () => clearTimeout(timer);
  }, [item.staticPath]);

  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center gap-6 p-8 text-center">
      <h1 className="text-4xl font-black text-sky-400">{item.title}</h1>
      <p className="text-slate-300 max-w-xl">
        이 실험은 정적 HTML 페이지로 제공됩니다. 새 탭이 자동으로 열리지 않았다면 아래 버튼을 눌러 다시 열 수 있습니다.
      </p>
      <div className="flex flex-wrap justify-center gap-4">
        <button
          className="inline-flex items-center gap-2 rounded-full bg-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-sky-500/30"
          onClick={() => window.open(item.staticPath, '_blank', 'noopener')}
          type="button"
        >
          Open Experiment
        </button>
        <button
          className="inline-flex items-center gap-2 rounded-full border border-white/40 px-6 py-3 font-semibold text-white/80"
          onClick={() => navigate('/')}
          type="button"
        >
          <ArrowLeft size={16} />
          Back to Lobby
        </button>
      </div>
    </div>
  );
}

function Lobby() {
  const navigate = useNavigate();

  const renderCard = (item, isMain = false) => {
    const cardClasses = isMain
      ? 'md:col-span-2 relative group cursor-pointer overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-sky-200/40 hover:-translate-y-1 transition-all duration-500'
      : 'relative group cursor-pointer overflow-hidden rounded-[2rem] bg-white/60 backdrop-blur-xl border border-white/60 shadow-lg shadow-slate-200/50 hover:shadow-sky-200/40 hover:-translate-y-1 transition-all duration-500';

    const onClickHandler = () => navigate(item.path);

    return (
      <div key={item.id} onClick={onClickHandler} className={cardClasses}>
        <div className="absolute inset-0 bg-gradient-to-br from-sky-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute top-10 left-10 z-10 max-w-md">
          <div className={`w-14 h-14 rounded-2xl ${item.color} flex items-center justify-center mb-6 shadow-xl shadow-slate-900/10 group-hover:scale-110 transition-transform duration-500`}>
            {item.icon}
          </div>
          <h3 className={`text-slate-800 mb-3 group-hover:text-sky-600 transition-colors ${isMain ? 'text-4xl md:text-5xl font-bold' : 'text-2xl font-bold'}`}>
            {item.title}
          </h3>
          <p className="text-slate-500 text-lg leading-relaxed">{item.description}</p>
        </div>

        <div className="absolute bottom-10 left-10">
          <span className="inline-flex items-center gap-2 text-sm font-bold text-slate-400 group-hover:text-slate-900 transition-colors border-b border-transparent group-hover:border-slate-900 pb-0.5">
            {item.type === 'static' ? 'View External' : 'Start'} <ChevronRight size={16} />
          </span>
        </div>

        <div className="absolute top-4 right-4 flex gap-1">
          {item.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-bold px-2 py-1 rounded-full bg-slate-200/50 text-slate-500 backdrop-blur-sm">
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-sky-200 text-slate-800 overflow-x-hidden relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-[-20%] left-[-10%] w-[80vw] h-[80vw] bg-sky-100/50 rounded-full blur-[100px] animate-pulse"
          style={{ animationDuration: '10s' }}
        />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-indigo-100/40 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 py-24">
        <header className="mb-24 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-slate-500 text-xs font-bold tracking-widest uppercase mb-8">
            <FlaskConical size={14} className="text-sky-400" />
            <span>Hyun's Lab</span>
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            FUN <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">THINGS.</span>
          </h1>
          <p className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            재미있는 아이디어와 실험들을 모아놓은 공간입니다.
            <br />
            웹으로 구현된 다양한 인터랙티브 오브제를 즐겨보세요.
          </p>
        </header>

        <div className="space-y-16">
          <section className="pt-8 border-t border-slate-200/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Games &amp; Simulations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
              {games.map((item, index) => renderCard(item, index === 0))}
            </div>
          </section>

          <section className="pt-8 border-t border-slate-200/50">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Web Experiments &amp; Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 auto-rows-[340px]">
              {webExperiments.map((item) => renderCard(item, false))}
            </div>
          </section>

          <div className="relative group overflow-hidden rounded-[2rem] bg-white/30 border border-slate-200 border-dashed flex flex-col items-center justify-center text-center p-8 hover:bg-white/50 transition-all cursor-default">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-4 shadow-sm group-hover:scale-110 transition-transform">
              <Wind size={24} className="text-slate-400 group-hover:text-sky-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-400 group-hover:text-slate-600">
              More Experiments
              <br />
              Coming Soon
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Lobby />} />
      {allItems
        .filter((item) => item.type === 'react')
        .map((item) => (
          <Route key={item.id} path={item.path} element={<ReactExperience item={item} />} />
        ))}
      {allItems
        .filter((item) => item.type === 'static')
        .map((item) => (
          <Route key={item.id} path={item.path} element={<StaticExperience item={item} />} />
        ))}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
);
