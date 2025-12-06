import React from 'react';
import { createRoot } from 'react-dom/client';
import { HashRouter, Routes, Route, Link, Navigate } from 'react-router-dom';
import {
  ArrowLeft,
  ExternalLink,
  FlaskConical,
  Gamepad2,
  Globe2,
  Home as HomeIcon,
  Layers,
  Music,
  Network,
  Rocket,
  Sparkles,
} from 'lucide-react';
import CompositionGame from './game/groove_maker.jsx';
import DevBartender from './game/dev_bartender.jsx';
import SimpleAwsArchitect from './web/aws_architecture_diagram_tool.jsx';
import './index.css';

const withBase = (path) => new URL(path, import.meta.env.BASE_URL).toString();

const games = [
  {
    id: 'groove-maker',
    title: 'Groove Maker',
    description: '감성적인 스텝 시퀀서',
    path: '/game/groove-maker',
    accent: 'from-sky-400 to-indigo-500',
    icon: <Music size={18} />,
    type: 'react',
    component: CompositionGame,
    tags: ['audio', 'sequencer'],
  },
  {
    id: 'dev-bartender',
    title: 'Dev Bartender',
    description: '개발자 스택 칵테일 바',
    path: '/game/dev-bartender',
    accent: 'from-emerald-400 to-lime-500',
    icon: <Layers size={18} />,
    type: 'react',
    component: DevBartender,
    tags: ['fun', 'generator'],
  },
  {
    id: 'dev-bartender-3d',
    title: 'Dev Bartender 3D',
    description: '스택을 3D 글래스로 시각화',
    path: '/game/dev-bartender-3d',
    accent: 'from-cyan-400 to-purple-500',
    icon: <Rocket size={18} />,
    type: 'static',
    staticPath: withBase('game/dev_bartender_3d.html'),
    tags: ['three.js', 'visual'],
  },
  {
    id: 'firework-together',
    title: 'Firework Together',
    description: '실시간 멀티플레이 불꽃놀이',
    path: '/game/firework-together',
    accent: 'from-amber-400 to-rose-500',
    icon: <Sparkles size={18} />,
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
    path: '/web/aws-architect',
    accent: 'from-blue-400 to-indigo-500',
    icon: <Network size={18} />,
    type: 'react',
    component: SimpleAwsArchitect,
    tags: ['diagram', 'dragdrop'],
  },
  {
    id: '3d-text-gif-maker',
    title: '3D Text & GIF Maker',
    description: 'Three.js로 GIF 캡처',
    path: '/web/3d-text-gif-maker',
    accent: 'from-fuchsia-400 to-blue-400',
    icon: <Globe2 size={18} />,
    type: 'static',
    staticPath: withBase('web/3d_text_gif_maker.html'),
    tags: ['three.js', 'export'],
  },
  {
    id: 'developer-type-test',
    title: 'Developer Type Test',
    description: '개발자 성향 & 스택 추천',
    path: '/web/developer-type-test',
    accent: 'from-violet-400 to-rose-400',
    icon: <Rocket size={18} />,
    type: 'static',
    staticPath: withBase('web/developer_type_test.html'),
    tags: ['quiz', 'recommendation'],
  },
];

function ExperienceCard({ item }) {
  return (
    <Link
      to={item.path}
      className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:border-sky-400/50 hover:shadow-cyan-400/20"
    >
      <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br opacity-70 blur-3xl ${item.accent}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-white/10 text-white">{item.icon}</span>
            {item.type === 'static' ? 'Standalone' : 'React'}
          </div>
          <h3 className="text-2xl font-bold text-white drop-shadow-sm">{item.title}</h3>
          <p className="mt-2 text-sm text-slate-200/80">{item.description}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {item.tags?.map((tag) => (
              <span key={tag} className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-semibold text-slate-100">
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold text-slate-100 transition-colors group-hover:bg-white/20">
          Open
        </span>
      </div>
    </Link>
  );
}

function Section({ title, icon, items }) {
  return (
    <section className="mt-12 space-y-6">
      <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-200/70">
        {icon}
        <span>{title}</span>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {items.map((item) => (
          <ExperienceCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}

function Home() {
  return (
    <div className="min-h-screen text-slate-100">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex items-center justify-between">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.25em] text-slate-200">
              <FlaskConical size={14} className="text-cyan-300" />
              Hyun&apos;s Lab
            </div>
            <div>
              <p className="text-sm font-semibold text-cyan-200/70">Ideas · Experiments · Toys</p>
              <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
                A playground for
                <br />
                <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent">games & web labs</span>
              </h1>
            </div>
            <p className="max-w-2xl text-base text-slate-200/80">
              다양한 인터랙티브 실험을 한곳에 모았습니다. Github Pages로 바로 배포 가능한 Vite 기반 앱입니다.
            </p>
            <div className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-slate-200/60">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                <HomeIcon size={14} /> HashRouter ready
              </span>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2">
                <Sparkles size={14} /> Tailwind + Vite
              </span>
            </div>
          </div>
        </div>

        <Section title="Playground · Game" icon={<Gamepad2 size={16} />} items={games} />
        <Section title="Web · Tools" icon={<Globe2 size={16} />} items={webExperiments} />
      </div>
    </div>
  );
}

function ReactExperiencePage({ title, Component }) {
  return (
    <div className="relative min-h-screen bg-slate-950">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.1),transparent_25%)]" />
      <Link
        to="/"
        className="fixed left-6 top-6 z-50 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20"
      >
        <ArrowLeft size={16} />
        Lobby
      </Link>
      <div className="pointer-events-none fixed right-6 top-6 z-50 inline-flex items-center gap-2 rounded-full bg-white/5 px-3 py-2 text-xs font-semibold text-slate-200/80 backdrop-blur">
        <Sparkles size={14} />
        {title}
      </div>
      <Component />
    </div>
  );
}

function StaticExperiencePage({ title, src }) {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="flex items-center justify-between px-6 py-5">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:border-cyan-300/40 hover:bg-white/10"
        >
          <ArrowLeft size={16} />
          Back to Lobby
        </Link>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-white shadow-sm backdrop-blur transition hover:border-cyan-300/40 hover:bg-white/10"
        >
          Open in New Tab
          <ExternalLink size={16} />
        </a>
      </div>
      <div className="px-6 pb-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-cyan-400/10">
          <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100">
            <Network size={16} />
            {title}
            <span className="ml-auto rounded-full bg-white/10 px-2.5 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-200/80">Static</span>
          </div>
          <iframe
            src={src}
            title={title}
            className="h-[calc(100vh-180px)] w-full bg-white"
            loading="lazy"
            allowFullScreen
          />
        </div>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {games.map((item) =>
          item.type === 'static' ? (
            <Route key={item.id} path={item.path} element={<StaticExperiencePage title={item.title} src={item.staticPath} />} />
          ) : (
            <Route key={item.id} path={item.path} element={<ReactExperiencePage title={item.title} Component={item.component} />} />
          ),
        )}
        {webExperiments.map((item) =>
          item.type === 'static' ? (
            <Route key={item.id} path={item.path} element={<StaticExperiencePage title={item.title} src={item.staticPath} />} />
          ) : (
            <Route key={item.id} path={item.path} element={<ReactExperiencePage title={item.title} Component={item.component} />} />
          ),
        )}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </HashRouter>
  );
}

const rootElement = document.getElementById('root');
createRoot(rootElement).render(
  <React.StrictMode>
    <AppRoutes />
  </React.StrictMode>,
);
