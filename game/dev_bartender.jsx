import React, { useState, useRef } from 'react';
import { RefreshCw } from 'lucide-react';

const techData = {
  // == Languages ==
  python: { colors: ['#3776AB', '#FFD43B'], name: 'Python', ingredient: '블루 큐라소', flavor: '직관적이고 깔끔한 맛' },
  javascript: { colors: ['#F7DF1E'], name: 'JS', ingredient: '바나나 리큐르', flavor: '톡 쏘는 비동기의 맛' },
  js: { colors: ['#F7DF1E'], name: 'JS', ingredient: '바나나 리큐르', flavor: '톡 쏘는 비동기의 맛' },
  typescript: { colors: ['#3178C6'], name: 'TS', ingredient: '블루베리 시럽', flavor: '타입이 잡힌 안정적인 단맛' },
  ts: { colors: ['#3178C6'], name: 'TS', ingredient: '블루베리 시럽', flavor: '타입이 잡힌 안정적인 단맛' },
  
  // Java 수정: 깔루아 밀크 스타일 (진한 커피색 -> 크림색)
  java: { colors: ['#362211', '#EADDCA'], name: 'Java', ingredient: '깔루아 밀크', flavor: '객체지향의 깊고 부드러운 풍미' },
  
  c: { colors: ['#555555'], name: 'C', ingredient: '보드카', flavor: '메모리까지 닿는 독한 맛' },
  cpp: { colors: ['#00599C'], name: 'C++', ingredient: '드라이 진', flavor: '고성능의 차가운 맛' },
  'c++': { colors: ['#00599C'], name: 'C++', ingredient: '드라이 진', flavor: '고성능의 차가운 맛' }, 
  
  // C# 추가
  csharp: { colors: ['#239120', '#9B4F96'], name: 'C#', ingredient: '허브 리큐르', flavor: 'MS의 정제된 풍미' },
  'c#': { colors: ['#239120', '#9B4F96'], name: 'C#', ingredient: '허브 리큐르', flavor: 'MS의 정제된 풍미' },

  go: { colors: ['#00ADD8'], name: 'Go', ingredient: '파워에이드', flavor: '고루틴처럼 빠른 목넘김' },
  rust: { colors: ['#DEA584', '#000000'], name: 'Rust', ingredient: '시나몬 위스키', flavor: '메모리 안전한 스파이시함' },
  swift: { colors: ['#F05138'], name: 'Swift', ingredient: '자몽 시럽', flavor: '애플 생태계의 산뜻함' },
  kotlin: { colors: ['#7F52FF'], name: 'Kotlin', ingredient: '바이올렛 시럽', flavor: '자바보다 세련된 달콤함' },
  
  // == Web & Frameworks ==
  react: { colors: ['#61DAFB'], name: 'React', ingredient: '소다수', flavor: '컴포넌트 단위의 상쾌함' },
  vue: { colors: ['#4FC08D', '#35495E'], name: 'Vue', ingredient: '멜론 리큐르', flavor: '부드러운 러닝 커브' },
  angular: { colors: ['#DD0031'], name: 'Angular', ingredient: '그레나딘 시럽', flavor: '구조적이고 강렬한 맛' },
  next: { colors: ['#000000', '#ffffff'], name: 'Next.js', ingredient: '깔루아 밀크', flavor: 'SSR의 부드러운 맛' },
  nest: { colors: ['#E0234E'], name: 'NestJS', ingredient: '스파이시 체리', flavor: '구조 잡힌 매콤달콤함' },
  nestjs: { colors: ['#E0234E'], name: 'NestJS', ingredient: '스파이시 체리', flavor: '구조 잡힌 매콤달콤함' },
  node: { colors: ['#339933'], name: 'Node.js', ingredient: '라임 즙', flavor: '논블로킹의 새콤함' },
  spring: { colors: ['#6DB33F'], name: 'Spring', ingredient: '애플 민트', flavor: 'DI 컨테이너의 향긋함' },
  django: { colors: ['#092E20'], name: 'Django', ingredient: '예거마이스터', flavor: '풀스택의 묵직한 도수' },
  fastapi: { colors: ['#009688'], name: 'FastAPI', ingredient: '페퍼민트', flavor: '엄청난 속도의 시원함' },

  // == Infra & Cloud ==
  aws: { colors: ['#FF9900'], name: 'AWS', ingredient: '오렌지 제스트', flavor: '클라우드의 풍부한 향' },
  gcp: { colors: ['#4285F4', '#EA4335', '#FBBC04', '#34A853'], name: 'GCP', ingredient: '레인보우 샤벳', flavor: '구글 인프라의 다채로운 맛' },
  azure: { colors: ['#0078D4'], name: 'Azure', ingredient: '블루 하와이', flavor: '기업의 신뢰가 느껴지는 맛' },
  docker: { colors: ['#2496ED'], name: 'Docker', ingredient: '탄산수', flavor: '컨테이너의 톡 쏘는 맛' },
  kubernetes: { colors: ['#326CE5'], name: 'K8s', ingredient: '블루 라군', flavor: '오케스트레이션의 조화' },
  k8s: { colors: ['#326CE5'], name: 'K8s', ingredient: '블루 라군', flavor: '오케스트레이션의 조화' },
  argocd: { colors: ['#EF7B4D'], name: 'ArgoCD', ingredient: '오렌지 비터', flavor: '지속적 배포의 깔끔함' },
  argo: { colors: ['#EF7B4D'], name: 'ArgoCD', ingredient: '오렌지 비터', flavor: '지속적 배포의 깔끔함' },
  
  // == Misc ==
  git: { colors: ['#F05032'], name: 'Git', ingredient: '캄파리', flavor: '충돌 해결의 쌉싸름함' },
  linux: { colors: ['#FCC624', '#000000'], name: 'Linux', ingredient: '맥주', flavor: '자유로운 오픈소스의 맛' },
  html: { colors: ['#E34F26'], name: 'HTML', ingredient: '오렌지 시럽', flavor: '구조를 잡는 베이스' },
  css: { colors: ['#1572B6'], name: 'CSS', ingredient: '블루 시럽', flavor: '화려한 장식의 맛' },
};

const Bartender = ({ isMixing }) => (
  <div 
    className={`absolute bottom-[25%] left-1/2 -translate-x-1/2 w-[120px] h-[180px] z-10 transition-transform duration-300 ${isMixing ? 'animate-bounce' : ''}`}
  >
    <div className="w-[60px] h-[70px] bg-[#ffdbac] mx-auto rounded-sm relative">
      <div className="absolute -top-[5px] -left-[4px] w-[68px] h-[30px] bg-[#2a2a2a] rounded-t-sm" />
      <div className="absolute top-[35px] w-full flex justify-center gap-[12px]">
        <div className="w-[6px] h-[6px] bg-black" />
        <div className="w-[6px] h-[6px] bg-black" />
      </div>
    </div>
    <div className="w-[100px] h-[110px] bg-white mx-auto -mt-[5px] relative rounded-t-lg -z-10">
      <div className="absolute top-[10px] left-1/2 -translate-x-1/2 border-l-[10px] border-l-transparent border-r-[10px] border-r-transparent border-t-[20px] border-t-[#8b0000]" />
      <div className="absolute bottom-0 w-full h-[90px] bg-[#5d4037] rounded-t-sm" />
    </div>
  </div>
);

export default function DevBartender() {
  const [gameState, setGameState] = useState('intro');
  const [inputValue, setInputValue] = useState('');
  const [dialogue, setDialogue] = useState('어서오세요. 개발자 라운지입니다...\n오늘 어떤 기술 스택으로 한 잔 하시겠습니까?');
  const [cocktail, setCocktail] = useState(null);
  const [iceType, setIceType] = useState('cube'); // cube, sphere, stacked
  const [glassType, setGlassType] = useState('highball'); // highball, rocks, martini, coupe
  
  // 게임 시작 시 input으로 바로 전환
  React.useEffect(() => {
    if (gameState === 'intro') {
      const timer = setTimeout(() => {
        setGameState('input');
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [gameState]);

  const handleInput = (e) => {
    if (e.key === 'Enter' && inputValue.trim()) {
      processOrder();
    }
  };

  const processOrder = () => {
    setGameState('mixing');
    
    const tokens = inputValue.split(/[, ]+/).map(s => s.trim().toLowerCase()).filter(s => s);
    let matchedColors = [];
    let ingredients = [];
    let flavors = [];
    let matchedTechs = [];

    tokens.forEach(token => {
      const keys = Object.keys(techData);
      const matchedKey = keys
        .filter(key => token === key || (token.includes(key) && key.length > 1))
        .sort((a, b) => b.length - a.length)[0];

      if (matchedKey) {
        const data = techData[matchedKey];
        matchedColors.push(...data.colors);
        ingredients.push(data.ingredient);
        flavors.push(data.flavor);
        matchedTechs.push(data.name);
      }
    });

    if (matchedColors.length === 0) {
      matchedColors = ['#eeeeee', '#cccccc'];
      ingredients = ['얼음물'];
      flavors = ['미지의 맛'];
      matchedTechs = ['Newbie'];
    }

    let finalName = '';
    const prefixes = ["Dark", "Sweet", "Silent", "Neon", "Retro", "Hyper"];
    const suffixes = ["Sling", "Tonic", "Fizz", "Sour", "Draft", "Punch"];
    const randPre = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randSuf = suffixes[Math.floor(Math.random() * suffixes.length)];

    if (matchedTechs.length > 2) {
      finalName = `Fullstack ${randSuf}`;
      setDialogue(`오호, ${matchedTechs.length}가지 기술을 섞으시는군요.\n복합적인 풍미의 풀스택 칵테일을 만들어 드리겠습니다.`);
    } else if (matchedTechs[0] === 'Newbie') {
      finalName = "Mystery Water";
      setDialogue("처음 듣는 레시피군요... 제 감대로 만들어보죠.");
    } else {
      finalName = `${randPre} ${matchedTechs.join(' & ')} ${randSuf}`;
      setDialogue(`${matchedTechs.join(', ')}... 탁월한 선택입니다.\n잠시만 기다려주세요.`);
    }

    const newCocktail = {
      colors: matchedColors,
      name: finalName,
      ingredients: [...new Set(ingredients)].join(' + '),
      flavor: flavors[Math.floor(Math.random() * flavors.length)]
    };

    // Randomly select ice and glass type
    const iceTypes = ['cube', 'sphere', 'stacked'];
    const glassTypes = ['highball', 'rocks', 'martini', 'coupe'];
    setIceType(iceTypes[Math.floor(Math.random() * iceTypes.length)]);
    setGlassType(glassTypes[Math.floor(Math.random() * glassTypes.length)]);

    setTimeout(() => {
      setCocktail(newCocktail);
      setGameState('served');
      setDialogue("자, 주문하신 칵테일 나왔습니다.\n천천히 드세요.");
    }, 2000);
  };

  const resetGame = () => {
    setGameState('input');
    setInputValue('');
    setCocktail(null);
    setDialogue('또 다른 주문 있으신가요?');
  };

  const getGlassStyles = () => {
    switch (glassType) {
      case 'rocks':
        return 'w-[90px] h-[90px] rounded-b-lg';
      case 'martini':
        return 'w-[120px] h-[80px] rounded-none [clip-path:polygon(50%_100%,0_0,100%_0)]';
      case 'coupe':
        return 'w-[100px] h-[60px] rounded-b-full';
      case 'highball':
      default:
        return 'w-[80px] h-[120px] rounded-b-xl';
    }
  };

  const getLiquidStyles = () => {
    switch (glassType) {
      case 'martini':
        return 'h-[75%] [clip-path:polygon(50%_100%,0_0,100%_0)]';
      case 'coupe':
        return 'h-[75%] rounded-b-full';
      case 'rocks':
      case 'highball':
      default:
        return 'h-[85%]';
    }
  };

  const getInfoCardOffset = () => {
    switch (glassType) {
      case 'martini':
        return '-top-[180px]';
      case 'coupe':
        return '-top-[160px]';
      case 'rocks':
        return '-top-[150px]';
      case 'highball':
      default:
        return '-top-[160px]';
    }
  }

  const renderIce = () => {
    const iceCommon = 'absolute bg-white/30 border border-white/50 z-10';
    
    // 단순 얼음 (큐브/구형)
    if (iceType === 'sphere') {
      const bottomPos = (glassType === 'martini' || glassType === 'coupe') ? 'bottom-8' : 'bottom-4';
      return <div className={`${iceCommon} ${bottomPos} left-1/2 -translate-x-1/2 w-10 h-10 rounded-full`} />;
    }
    
    if (iceType === 'cube') {
       const bottomPos = (glassType === 'martini' || glassType === 'coupe') ? 'bottom-6' : 'bottom-2';
       return <div className={`${iceCommon} ${bottomPos} left-1/2 -translate-x-1/2 w-8 h-8 rotate-12 rounded-sm`} />;
    }

    // 쌓인 얼음 (stacked) - 컵 모양에 따라 좌표 커스텀
    if (iceType === 'stacked') {
      let icePositions = [];
      
      switch (glassType) {
        case 'highball': // 좁고 높게
          icePositions = [
            { x: 0, y: 10, rot: 15 },
            { x: 5, y: 35, rot: -10 },
            { x: -2, y: 60, rot: 20 },
            { x: 3, y: 85, rot: 5 }
          ];
          break;
        case 'rocks': // 넓고 낮게 피라미드
          icePositions = [
            { x: -18, y: 10, rot: 10 },
            { x: 18, y: 10, rot: -5 },
            { x: 0, y: 35, rot: 15 }
          ];
          break;
        case 'martini': // 좁은 하단 고려하여 조금 높게, 적게
          icePositions = [
            { x: -5, y: 25, rot: 45 },
            { x: 8, y: 45, rot: 10 }
          ];
          break;
        case 'coupe': // 둥근 하단
          icePositions = [
            { x: -10, y: 15, rot: 10 },
            { x: 10, y: 15, rot: -20 },
            { x: 0, y: 35, rot: 5 }
          ];
          break;
        default:
          icePositions = [{x:0, y:10, rot:0}];
      }

      return (
        <>
          {icePositions.map((pos, i) => (
            <div 
              key={i}
              className={`${iceCommon} w-7 h-7 rounded-sm`}
              style={{ 
                bottom: `${pos.y}px`,
                left: '50%',
                transform: `translateX(calc(-50% + ${pos.x}px)) rotate(${pos.rot}deg)`
              }}
            />
          ))}
        </>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#0f0e11] flex items-center justify-center font-['Courier_New'] text-[#e6dacc] overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=VT323&display=swap');
        * { font-family: 'VT323', monospace; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="relative w-full max-w-[800px] h-[600px] bg-[#2b2024] border-4 border-[#4a3b3b] shadow-2xl flex flex-col overflow-hidden">
        
        <button 
          onClick={resetGame}
          className="absolute top-2 right-2 z-50 p-2 text-gray-500 hover:text-white border border-transparent hover:border-gray-500 rounded"
        >
          <RefreshCw size={20} />
        </button>

        <div className="absolute top-0 left-0 w-full h-[75%] bg-gradient-to-b from-[#1a1516] to-[#2b2024]">
          <div className="absolute top-[20%] w-full h-[10px] bg-[#3e2f2f] shadow-md">
            <div className="absolute bottom-0 left-[10%] w-[20px] h-[40px] bg-[#a33] opacity-60 rounded-t-sm" />
            <div className="absolute bottom-0 left-[15%] w-[20px] h-[35px] bg-[#3a3] opacity-60 rounded-t-sm" />
            <div className="absolute bottom-0 left-[20%] w-[20px] h-[45px] bg-[#33a] opacity-60 rounded-t-sm" />
          </div>
          <div className="absolute top-[45%] w-full h-[10px] bg-[#3e2f2f] shadow-md">
            <div className="absolute bottom-0 right-[10%] w-[20px] h-[40px] bg-[#dda] opacity-60 rounded-t-sm" />
            <div className="absolute bottom-0 right-[18%] w-[20px] h-[30px] bg-[#a3d] opacity-60 rounded-t-sm" />
          </div>
        </div>

        {gameState !== 'served' && <Bartender isMixing={gameState === 'mixing'} />}

        {gameState === 'served' && cocktail && (
          <div className="absolute bottom-[32%] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center animate-[fadeIn_1s_ease-out] scale-150 transform-gpu">
            <div className={`absolute ${getInfoCardOffset()} w-[260px] bg-white text-black p-3 rounded shadow-xl text-center animate-[slideDown_0.5s_ease-out] scale-75 origin-bottom`}>
              <h3 className="text-xl font-bold mb-1 text-purple-900">{cocktail.name}</h3>
              <div className="w-full h-px bg-gray-300 my-1" />
              <p className="text-sm text-gray-700 mb-1">{cocktail.ingredients}</p>
              <p className="text-xs text-gray-500 italic">"{cocktail.flavor}"</p>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 border-l-8 border-r-8 border-t-8 border-transparent border-t-white" />
            </div>

            <div className={`relative bg-white/10 border-2 border-white/40 overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] ${getGlassStyles()}`}>
              <div 
                className={`absolute bottom-0 w-full transition-all duration-1000 ease-out ${getLiquidStyles()}`}
                style={{ 
                  background: cocktail.colors.length > 1 
                    ? `linear-gradient(to top, ${cocktail.colors.join(', ')})` 
                    : cocktail.colors[0] 
                }}
              />
              {renderIce()}
            </div>
            {/* Stem for martini/coupe */}
            {(glassType === 'martini' || glassType === 'coupe') && (
              <div className="w-[6px] h-[40px] bg-white/40 border-x-2 border-white/40"></div>
            )}
            {/* Base for martini/coupe */}
            {(glassType === 'martini' || glassType === 'coupe') && (
              <div className="w-[60px] h-[6px] bg-white/10 border-2 border-white/40 rounded-t-sm"></div>
            )}

            <div className="absolute -top-2 -right-2 text-2xl">🍋</div>
          </div>
        )}

        <div className="absolute bottom-[25%] w-full h-[40px] bg-[#3e2723] border-t-4 border-[#5d4037] z-[15]" />

        {/* Dialogue Area */}
        <div className="absolute bottom-0 w-full h-[25%] bg-[#1a1617] border-t-4 border-[#4a3b3b] p-5 flex flex-col gap-2 z-30">
          <div className="text-lg leading-normal flex-grow overflow-y-auto no-scrollbar whitespace-pre-line">
            {dialogue}
          </div>

          {(gameState === 'input') && (
            <div className="flex items-center gap-2 border-t border-dashed border-[#444] pt-2 mt-auto animate-pulse flex-shrink-0">
              <span className="text-xl text-[#d4a373]">{'>'}</span>
              <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleInput}
                placeholder="스택 입력 (예: Java, C++, Go...)"
                className="w-full bg-transparent border-none outline-none text-2xl text-white placeholder-gray-600 font-['VT323']"
                autoFocus
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
