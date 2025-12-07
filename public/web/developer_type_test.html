<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>개발자 성향 & 스택 추천 테스트</title>
    <style>
        /* 1. 기본 스타일 설정 */
        :root {
            --primary: #8b5cf6; /* 더 밝은 보라색 */
            --primary-dark: #7c3aed;
            --secondary: #a78bfa;
            --accent: #f472b6; /* 핑크 포인트 */
            --bg-gradient: linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%);
            --card-bg: rgba(255, 255, 255, 0.95);
            --text-main: #1e293b;
            --text-sub: #64748b;
        }

        body {
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            background: var(--bg-gradient);
            color: var(--text-main);
            margin: 0;
            padding: 20px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            overflow-x: hidden;
        }

        /* 2. 레이아웃 컨테이너 */
        .container {
            width: 100%;
            max-width: 550px;
            background: var(--card-bg);
            border-radius: 30px;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(255, 255, 255, 0.5) inset;
            overflow: hidden;
            position: relative;
            min-height: 700px;
            display: flex;
            flex-direction: column;
            backdrop-filter: blur(10px);
        }

        .screen {
            padding: 40px 30px;
            flex-grow: 1;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center; /* 기본은 중앙 정렬 */
            text-align: center;
            animation: fadeIn 0.6s cubic-bezier(0.22, 1, 0.36, 1);
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            box-sizing: border-box;
            background: transparent;
            overflow-y: auto;
            -webkit-overflow-scrolling: touch;
        }
        
        /* 스크롤바 커스텀 */
        .screen::-webkit-scrollbar { width: 6px; }
        .screen::-webkit-scrollbar-thumb { background-color: rgba(0,0,0,0.1); border-radius: 3px; }
        .screen::-webkit-scrollbar-track { background: transparent; }

        /* [수정됨] 내용이 긴 화면(결과, 도감)은 위쪽 잘림 방지를 위해 flex-start 적용 */
        #result-screen, #all-types-screen {
            justify-content: flex-start;
            padding-top: 50px; /* 상단 여백 확보 */
            padding-bottom: 50px; /* 하단 여백 확보 */
        }

        .hidden { display: none !important; }

        /* 3. 시작 화면 */
        h1 { 
            font-size: 2.2rem; 
            margin-bottom: 15px; 
            background: linear-gradient(to right, var(--primary-dark), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            font-weight: 800;
        }
        .intro-icon { font-size: 5rem; margin-bottom: 20px; animation: float 3s ease-in-out infinite; }
        .intro-desc { font-size: 1.1rem; color: var(--text-sub); margin-bottom: 40px; line-height: 1.6; word-break: keep-all;}
        
        .start-btn {
            background: linear-gradient(90deg, var(--primary) 0%, var(--accent) 100%);
            color: white;
            border: none;
            padding: 18px 45px;
            font-size: 1.2rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: bold;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(124, 58, 237, 0.3);
            margin-bottom: 15px;
            width: 80%;
        }
        .start-btn:hover { transform: translateY(-3px) scale(1.02); box-shadow: 0 15px 30px rgba(124, 58, 237, 0.4); }

        .all-types-btn {
            background: white;
            border: 2px solid #e2e8f0;
            color: var(--text-sub);
            padding: 14px 30px;
            font-size: 1rem;
            border-radius: 50px;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.2s;
            width: 80%;
        }
        .all-types-btn:hover { border-color: var(--primary); color: var(--primary); background: #f8fafc; }

        /* 4. 퀴즈 화면 */
        .progress-container { width: 100%; height: 6px; background: #e2e8f0; position: absolute; top: 0; left: 0; }
        .progress-bar { height: 100%; background: linear-gradient(90deg, var(--primary), var(--accent)); width: 0%; transition: width 0.4s ease; border-radius: 0 3px 3px 0; }
        
        .question-badge {
            display: inline-block;
            background: rgba(139, 92, 246, 0.1);
            color: var(--primary);
            padding: 6px 14px;
            border-radius: 20px;
            font-weight: 700;
            font-size: 0.9rem;
            margin-bottom: 20px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .question-text { font-size: 1.5rem; font-weight: 800; margin-bottom: 40px; line-height: 1.4; color: var(--text-main); }
        
        .options { width: 100%; display: flex; flex-direction: column; gap: 14px; }
        .option-btn {
            background: white;
            border: 2px solid transparent;
            box-shadow: 0 4px 15px rgba(0,0,0,0.05);
            padding: 20px 24px;
            border-radius: 18px;
            font-size: 1rem;
            color: var(--text-main);
            cursor: pointer;
            transition: all 0.25s cubic-bezier(0.25, 0.46, 0.45, 0.94);
            text-align: left;
            position: relative;
            overflow: hidden;
            font-weight: 500;
        }
        .option-btn:hover { 
            border-color: var(--primary); 
            background: #fbfbfe; 
            transform: translateY(-2px); 
            box-shadow: 0 8px 20px rgba(139, 92, 246, 0.15); 
            color: var(--primary-dark);
        }
        .option-btn:active { transform: scale(0.98); }

        /* 5. 로딩 화면 */
        .loading-spinner {
            width: 60px; height: 60px;
            border: 6px solid #f3f4f6;
            border-top: 6px solid var(--primary);
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin-bottom: 30px;
        }

        /* 6. 결과 화면 */
        .result-header {
            background: transparent;
            padding: 0;
            margin-bottom: 10px;
            width: 100%;
            box-sizing: border-box;
        }
        .result-icon { 
            font-size: 6rem;
            margin-bottom: 15px; 
            display: inline-block; 
            animation: popIn 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        }
        .result-subtitle { 
            color: var(--text-sub); 
            font-size: 1rem; 
            font-weight: 600; 
            letter-spacing: 1px; 
            margin-bottom: 10px; 
            text-transform: uppercase; 
        }
        .result-title { 
            font-size: 2.4rem; 
            color: var(--primary-dark); 
            margin-bottom: 20px; 
            font-weight: 900; 
            line-height: 1.2; 
            word-break: keep-all; 
            margin-top: 5px;
        }
        
        .result-desc { 
            font-size: 1.05rem; 
            line-height: 1.7; 
            color: var(--text-sub); 
            margin-bottom: 30px; 
            text-align: left; 
            background: white;
            padding: 25px;
            border-radius: 20px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.03);
            border: 1px solid rgba(0,0,0,0.03);
        }
        
        .stack-box { margin-bottom: 30px; width: 100%; text-align: left; }
        .stack-title { 
            font-size: 1.1rem; 
            font-weight: 800; 
            color: var(--text-main); 
            margin-bottom: 15px; 
            display: flex;
            align-items: center;
            gap: 8px;
        }
        
        /* Job Tags */
        .tags { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 25px; }
        .job-tag { 
            background: white; 
            color: var(--primary-dark); 
            border: 1px solid #e9d5ff;
            padding: 10px 16px; 
            border-radius: 12px; 
            font-size: 0.95rem; 
            font-weight: 700; 
            box-shadow: 0 2px 5px rgba(0,0,0,0.02);
        }

        /* Tech Stack Confessions UI */
        .confession-list { display: flex; flex-direction: column; gap: 14px; }
        .confession-card {
            display: flex;
            align-items: flex-start;
            gap: 15px;
            background: white;
            border: 1px solid #f1f5f9;
            border-radius: 16px;
            padding: 18px;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 10px rgba(0,0,0,0.02);
        }
        .confession-card:hover { border-color: var(--primary); transform: translateY(-3px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .tech-avatar {
            width: 50px; height: 50px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            color: white;
            border-radius: 16px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 800;
            font-size: 1.2rem;
            flex-shrink: 0;
            box-shadow: 0 4px 10px rgba(124, 58, 237, 0.2);
        }
        .tech-content { text-align: left; }
        .tech-name { font-weight: 800; font-size: 1.05rem; color: var(--text-main); margin-bottom: 5px; display: block; }
        .tech-msg { font-size: 0.95rem; color: var(--text-sub); line-height: 1.5; }
        
        .action-buttons { display: flex; gap: 12px; width: 100%; margin-top: auto; padding-bottom: 10px; }
        .action-btn { 
            flex: 1; 
            padding: 18px; 
            border-radius: 16px; 
            border: none; 
            font-weight: 700; 
            cursor: pointer; 
            font-size: 1rem; 
            transition: all 0.2s;
        }
        .retry-btn { background: #f1f5f9; color: var(--text-sub); }
        .retry-btn:hover { background: #e2e8f0; color: var(--text-main); }
        .share-btn { 
            background: linear-gradient(90deg, var(--primary), var(--accent));
            color: white;
            box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
        }
        .share-btn:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(124, 58, 237, 0.4); }

        /* 7. 모든 유형 보기 (모달) */
        .all-types-list {
            width: 100%;
            text-align: left;
            overflow-y: auto;
            max-height: 70vh;
            padding-right: 5px;
        }
        .all-types-list::-webkit-scrollbar { width: 4px; }
        .all-types-list::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 2px; }

        .type-card {
            background: white;
            border-radius: 16px;
            padding: 24px;
            margin-bottom: 16px;
            border: 1px solid #f1f5f9;
            box-shadow: 0 4px 6px rgba(0,0,0,0.02);
            transition: transform 0.2s;
        }
        .type-card:hover { transform: translateY(-2px); border-color: var(--secondary); }
        
        .type-header { display: flex; align-items: center; margin-bottom: 12px; gap: 12px; }
        .type-icon { font-size: 1.8rem; background: #f3f4f6; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; border-radius: 12px; }
        .type-name { font-weight: 800; font-size: 1.2rem; color: var(--text-main); }
        .type-desc-short { font-size: 0.95rem; color: var(--text-sub); line-height: 1.6; }
        
        .close-btn {
            position: absolute;
            top: 25px;
            right: 25px;
            background: #f1f5f9;
            border: none;
            width: 36px; height: 36px;
            border-radius: 50%;
            font-size: 1.5rem;
            line-height: 1;
            cursor: pointer;
            color: var(--text-sub);
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s;
        }
        .close-btn:hover { background: #e2e8f0; color: var(--text-main); }

        /* Toast Message */
        .toast {
            visibility: hidden;
            min-width: 250px;
            margin-left: -125px;
            background-color: rgba(30, 41, 59, 0.9);
            color: #fff;
            text-align: center;
            border-radius: 50px;
            padding: 16px;
            position: fixed;
            z-index: 1000;
            left: 50%;
            bottom: 30px;
            font-size: 0.95rem;
            font-weight: 600;
            box-shadow: 0 10px 20px rgba(0,0,0,0.2);
            opacity: 0;
            transition: opacity 0.3s, bottom 0.3s, visibility 0.3s;
        }

        .toast.show {
            visibility: visible;
            opacity: 1;
            bottom: 50px;
        }

        /* 애니메이션 */
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes float { 0% { transform: translateY(0px); } 50% { transform: translateY(-15px); } 100% { transform: translateY(0px); } }
        @keyframes popIn { 0% { transform: scale(0); opacity: 0; } 70% { transform: scale(1.1); } 100% { transform: scale(1); opacity: 1; } }
        
        /* 모바일 대응 */
        @media (max-width: 480px) {
            body { padding: 0; }
            .container { height: 100vh; border-radius: 0; max-width: 100%; box-shadow: none; }
            h1 { font-size: 1.8rem; }
            .screen { padding: 30px 20px; }
            .question-text { font-size: 1.3rem; }
            .option-btn { padding: 18px 20px; }
        }
    </style>
</head>
<body>

<div class="container">
    
    <!-- 1. 시작 화면 -->
    <div id="intro-screen" class="screen">
        <div class="intro-icon">💻</div>
        <h1>개발자 성향 테스트</h1>
        <p class="intro-desc">
            "혹시... 어떤 기술 좋아하세요?"<br>
            성격으로 알아보는 나의 IT 직무와<br>
            <strong>나에게 플러팅하는 기술 스택 찾기💘</strong>
        </p>
        <button class="start-btn" onclick="startTest()">테스트 시작하기</button>
        <button class="all-types-btn" onclick="showAllTypes()">📕 8가지 유형 도감 보기</button>
    </div>

    <!-- 2. 모든 유형 보기 화면 -->
    <div id="all-types-screen" class="screen hidden" style="align-items: flex-start; text-align: left;">
        <button class="close-btn" onclick="hideAllTypes()">×</button>
        <h2 style="margin-top: 10px; color: var(--text-main); font-size: 1.8rem;">유형 도감</h2>
        <p style="color: var(--text-sub); font-size: 0.95rem; margin-bottom: 30px;">총 8가지의 개발자 유형을 만나보세요.</p>
        
        <div class="all-types-list" id="all-types-list">
            <!-- JS로 주입됨 -->
        </div>
    </div>

    <!-- 3. 퀴즈 화면 -->
    <div id="quiz-screen" class="screen hidden">
        <div class="progress-container"><div class="progress-bar" id="progress-bar"></div></div>
        <div style="width: 100%;">
            <span class="question-badge" id="q-number">Q1</span>
            <div class="question-text" id="q-text">질문 내용이 여기에 표시됩니다.</div>
            <div class="options" id="options-container">
                <!-- 선택지 버튼들이 여기에 동적으로 추가됨 -->
            </div>
        </div>
    </div>

    <!-- 4. 로딩 화면 -->
    <div id="loading-screen" class="screen hidden">
        <div class="loading-spinner"></div>
        <h2 style="color:var(--text-main); margin-bottom: 10px;">결과 분석 중...</h2>
        <p style="color:var(--text-sub);">기술 스택들이 당신에게 보낼<br>고백 멘트를 준비하고 있습니다 💌</p>
    </div>

    <!-- 5. 결과 화면 -->
    <div id="result-screen" class="screen hidden">
        <div class="result-header">
            <div class="result-icon" id="r-icon">🔮</div>
            <div class="result-subtitle">당신의 개발자 유형은</div>
            <div class="result-title" id="r-title">결과 제목</div>
        </div>
        
        <div class="result-desc" id="r-desc">
            결과 설명이 들어갑니다.
        </div>
        
        <div class="stack-box">
            <div class="stack-title">💼 추천 직무</div>
            <div class="tags" id="r-jobs"></div>
            
            <div class="stack-title" style="margin-top: 30px;">💘 기술 스택의 플러팅 메시지</div>
            <div class="confession-list" id="r-confessions">
                <!-- 고백 카드들이 여기에 추가됨 -->
            </div>
        </div>

        <div class="action-buttons">
            <button class="action-btn retry-btn" onclick="location.reload()">처음으로</button>
            <button class="action-btn share-btn" onclick="copyLink()">결과 공유하기</button>
        </div>
    </div>

</div>

<!-- 알림용 토스트 -->
<div id="toast" class="toast">링크가 복사되었습니다!</div>

<script>
    /* Archetypes (8가지 유형) 데이터 유지 */
    const results = {
        "WEB_ARTIST": {
            icon: "🎨",
            title: "감각적인 웹 아티스트",
            desc: "당신은 <b>픽셀 하나도 놓치지 않는 디테일 장인</b>입니다.<br><br>단순히 기능이 동작하는 것을 넘어, 사용자가 마주하는 화면이 아름답고 직관적이어야 직성이 풀립니다. '보기 좋은 떡이 먹기도 좋다'는 당신의 코딩 철학! 디자인 감각과 기술을 결합해 사람들을 매료시키는 프론트엔드 분야가 딱입니다.",
            jobs: ["Frontend 개발자", "Web Publisher", "UX 엔지니어"],
            confessions: [
                { name: "React", msg: "네가 원하는 화면, 내가 컴포넌트 단위로 쪼개서 평생 관리해줄게. 💍" },
                { name: "CSS", msg: "너의 스타일? 말만 해. 내가 세상에서 제일 화려하게 꾸며줄 자신 있어." },
                { name: "TypeScript", msg: "널 헷갈리게 하지 않을게. 언제나 명확한 타입으로 널 지켜줄게." }
            ]
        },
        "LOGIC_ARCHITECT": {
            icon: "🏗️",
            title: "논리적인 설계 건축가",
            desc: "당신은 <b>보이지 않는 세계의 질서를 잡는 설계자</b>입니다.<br><br>화려한 겉모습보다 튼튼한 내부 구조, 효율적인 데이터 처리에 희열을 느낍니다. 수만 명이 동시에 접속해도 끄떡없는 서버를 구축하는 그 짜릿함! 논리적 사고가 강점인 당신은 백엔드 분야의 리더가 될 상입니다.",
            jobs: ["Backend 개발자", "Software Architect", "DBA"],
            confessions: [
                { name: "Java", msg: "어떤 시련(트래픽)이 와도 널 든든하게 받쳐주는 버팀목이 될게." },
                { name: "Spring", msg: "복잡한 건 나한테 맡겨. 넌 비즈니스 로직에만 집중해." },
                { name: "Docker", msg: "어디로 이사를 가든, 우리 집 환경 그대로 옮겨줄게." }
            ]
        },
        "DATA_PROPHET": {
            icon: "🔮",
            title: "데이터를 읽는 예언가",
            desc: "당신은 <b>혼돈 속에서 패턴을 찾아내는 통찰력의 소유자</b>입니다.<br><br>'감'보다는 확실한 '숫자'를 믿습니다. 수많은 데이터를 분석해 숨겨진 의미를 찾고, AI를 학습시켜 미래를 예측하는 일은 마치 마법과도 같죠. 호기심 많고 탐구적인 당신은 데이터 사이언스 분야의 핵심 인재입니다.",
            jobs: ["Data Scientist", "AI/ML Engineer", "Data Analyst"],
            confessions: [
                { name: "Python", msg: "복잡한 세상, 나랑 같이 가장 심플하고 직관적으로 사랑하자." },
                { name: "PyTorch", msg: "너의 뇌세포 하나하나, 인공신경망으로 완벽하게 학습하고 싶어." },
                { name: "SQL", msg: "네가 원하는 건 뭐든지 SELECT 해줄게. 조건은 없어." }
            ]
        },
        "SYSTEM_GUARDIAN": {
            icon: "🛡️",
            title: "시스템의 철벽 수호자",
            desc: "당신은 <b>시스템의 평화를 지키는 든든한 방패</b>입니다.<br><br>해킹 위협을 막아내거나, 비효율적인 작업을 자동화하여 동료들의 칼퇴를 돕는 숨은 영웅이죠. 1%의 빈틈도 허용하지 않는 꼼꼼함과 책임감! 인프라와 보안을 책임지는 당신 덕분에 오늘도 서비스는 안전합니다.",
            jobs: ["DevOps Engineer", "Security Specialist", "SRE"],
            confessions: [
                { name: "AWS", msg: "네가 어디에 있든, 구름(Cloud) 위에서 항상 널 지켜보고 있을게." },
                { name: "Linux", msg: "화려한 말은 필요 없어. 묵묵히 너의 명령만 따를게 (sudo)." },
                { name: "K8s", msg: "네가 힘들 때 짐을 나눠 들어줄(Scaling) 친구들을 무한히 불러올게." }
            ]
        },
        "AGILE_ADVENTURER": {
            icon: "🚀",
            title: "민첩한 올라운드 모험가",
            desc: "당신은 <b>아이디어를 현실로 만드는 육각형 개발자</b>입니다!<br><br>'완벽함'보다는 '실행'이 중요합니다. 프론트, 백엔드 가리지 않고 필요한 기술을 빠르게 습득해 서비스 하나를 뚝딱 만들어냅니다. 변화를 두려워하지 않고 돌진하는 당신은 스타트업의 심장이자 풀스택 개발자가 운명입니다.",
            jobs: ["Full-stack Developer", "Startup CTO", "Indie Maker"],
            confessions: [
                { name: "Next.js", msg: "프론트랑 백엔드? 우리 사이엔 경계 같은 건 필요 없어. 하나가 되자." },
                { name: "Firebase", msg: "귀찮은 건 내가 다 할게. 넌 그냥 아이디어만 떠올려." },
                { name: "JavaScript", msg: "웹이든 앱이든 서버든, 난 너만 있다면 어디든 변신할 수 있어." }
            ]
        },
        "REALITY_CREATOR": {
            icon: "🎮",
            title: "가상 현실의 창조자",
            desc: "당신은 <b>상상력을 현실로 구현하는 조물주</b>입니다.<br><br>물리 법칙을 무시하거나 새로운 세계를 창조하는 게임 개발에 매력을 느낍니다. 3D 공간 지각 능력과 수학적 사고, 그리고 약간의 '오타쿠' 기질이 있는 당신! 유저들에게 최고의 몰입감을 선사할 준비가 되셨나요?",
            jobs: ["Game Client Dev", "Graphics Engineer", "VR/AR Dev"],
            confessions: [
                { name: "Unity", msg: "이 현실이 지루해? 너만을 위한 새로운 세상을 만들어줄게." },
                { name: "Unreal", msg: "너의 상상력, 내가 극강의 고퀄리티 그래픽으로 렌더링해줄게." },
                { name: "OpenGL", msg: "삼각형 하나하나 깎아서라도 널 기쁘게 해주고 싶어." }
            ]
        },
        "MACHINE_SOUL": {
            icon: "🤖",
            title: "기계와 대화하는 영혼",
            desc: "당신은 <b>차가운 기계에 숨결을 불어넣는 마법사</b>입니다.<br><br>남들은 어렵다는 하드웨어 제어나 메모리 최적화에서 희열을 느낍니다. IoT 기기부터 로봇, 자동차까지 당신의 손길이 닿으면 똑똑해집니다. 기계어와 대화가 통하는 당신은 임베디드 분야의 귀한 인재입니다.",
            jobs: ["Embedded Developer", "Firmware Engineer", "IoT Specialist"],
            confessions: [
                { name: "C Language", msg: "난 좀 투박해. 하지만 누구보다 빠르게 널 위해 움직일 거야." },
                { name: "Arduino", msg: "작은 불빛(LED) 하나라도 널 위해 깜빡이고 싶어." },
                { name: "Rust", msg: "메모리 누수? 내 사전에 널 놓치는 일 따윈 없어. 안전하게 지켜줄게." }
            ]
        },
        "DIGITAL_NOMAD": {
            icon: "📱",
            title: "손바닥 위의 혁명가",
            desc: "당신은 <b>언제 어디서나 세상과 연결되는 자유인</b>입니다.<br><br>무거운 데스크탑보다 내 손안의 스마트폰이 세상을 바꾼다고 믿습니다. 사용자에게 가장 밀접한 앱 서비스를 만들며, 직관적인 인터페이스와 휴대성을 중요하게 생각합니다. 모바일 앱 개발이 당신의 무대입니다.",
            jobs: ["iOS Developer", "Android Developer", "Flutter Developer"],
            confessions: [
                { name: "Swift", msg: "사과(Apple)처럼 상큼하고 우아하게 널 에스코트할게." },
                { name: "Flutter", msg: "아이폰이든 갤럭시든 상관없어. 난 너만 있으면 어디든 갈 수 있어." },
                { name: "Kotlin", msg: "자바 형보단 내가 더 세련됐지? 이제 나랑 모바일 길만 걷자." }
            ]
        }
    };

    const questions = [
        {
            q: "친구들과 여행 계획을 짤 때, 나의 역할은?",
            a: [
                { text: "인생샷 건져야지! 뷰가 예쁜 숙소와 핫플을 찾는다.", type: "WEB_ARTIST", score: 3 },
                { text: "최적의 동선과 시간표를 엑셀로 완벽하게 짠다.", type: "LOGIC_ARCHITECT", score: 3 },
                { text: "예산을 분석하고 날씨 변수에 따른 대안(Plan B)을 짠다.", type: "DATA_PROPHET", score: 3 },
                { text: "모두의 짐을 최소화할 수 있게 필수템 리스트를 짠다.", type: "DIGITAL_NOMAD", score: 3 },
                { text: "지도 앱 하나 들고 무계획으로 일단 떠난다. 가서 해결해!", type: "AGILE_ADVENTURER", score: 3 }
            ]
        },
        {
            q: "레고나 프라모델을 조립할 때 나는?",
            a: [
                { text: "완성된 모습이 박스 그림처럼 예쁘게 마감되어야 한다.", type: "WEB_ARTIST", score: 3 },
                { text: "내부 기어가 딱 맞물려 튼튼하게 돌아가는 구조가 중요하다.", type: "LOGIC_ARCHITECT", score: 3 },
                { text: "설명서 없이 나만의 독창적인 로봇이나 비행선을 만든다.", type: "REALITY_CREATOR", score: 4 },
                { text: "모터와 건전지를 연결해서 실제로 움직이게 개조한다.", type: "MACHINE_SOUL", score: 5 },
                { text: "블록 개수와 종류를 먼저 분류하고 시작한다.", type: "DATA_PROPHET", score: 2 }
            ]
        },
        {
            q: "가장 흥미로운 영화 장르는?",
            a: [
                { text: "화려한 CG와 가상 세계가 나오는 판타지/SF (아바타, 레디플레이어원)", type: "REALITY_CREATOR", score: 4 },
                { text: "복선이 딱딱 회수되는 치밀한 추리/스릴러 (인셉션)", type: "LOGIC_ARCHITECT", score: 3 },
                { text: "AI와 로봇이 나오는 미래 과학 영화 (아이언맨, her)", type: "MACHINE_SOUL", score: 3 },
                { text: "해커가 시스템을 뚫거나 방어하는 첩보물 (미션임파서블)", type: "SYSTEM_GUARDIAN", score: 4 },
                { text: "주인공이 역경을 딛고 성공하는 성장 드라마 (소셜네트워크)", type: "AGILE_ADVENTURER", score: 3 }
            ]
        },
        {
            q: "스마트폰이 없는 세상에서 살아야 한다면?",
            a: [
                { text: "절대 불가능. 내 모든 일상이 마비된다.", type: "DIGITAL_NOMAD", score: 5 },
                { text: "불편하겠지만 책이나 PC로 대체하면 된다.", type: "LOGIC_ARCHITECT", score: 2 },
                { text: "오히려 좋아. 디지털 디톡스하고 밖에서 뛰어논다.", type: "REALITY_CREATOR", score: 2 },
                { text: "직접 무전기나 통신 기계를 만들어서 쓴다.", type: "MACHINE_SOUL", score: 4 }
            ]
        },
        {
            q: "팀 프로젝트 중 심각한 버그가 터졌다! 나의 반응은?",
            a: [
                { text: "화면 UI가 깨졌나? 사용자 눈에 보이는지부터 확인한다.", type: "WEB_ARTIST", score: 3 },
                { text: "로그 파일부터 깐다. 원인을 논리적으로 추적한다.", type: "LOGIC_ARCHITECT", score: 3 },
                { text: "일단 서비스가 안 죽게 임시 조치(Rollback)부터 하고 본다.", type: "SYSTEM_GUARDIAN", score: 4 },
                { text: "재빠르게 수정해서 바로 다시 배포한다. 속도가 생명!", type: "AGILE_ADVENTURER", score: 3 },
                { text: "이 버그가 발생할 확률과 빈도 데이터를 확인한다.", type: "DATA_PROPHET", score: 3 }
            ]
        },
        {
            q: "집에 있는 가전제품이 고장 났다. 나는?",
            a: [
                { text: "분해한다. 고장 난 부품을 찾아서 납땜하거나 고친다.", type: "MACHINE_SOUL", score: 5 },
                { text: "새로 산다. 요즘 나온 신제품이 디자인도 예쁘고 기능도 많으니까.", type: "DIGITAL_NOMAD", score: 3 },
                { text: "AS 센터에 전화한다. 전문가에게 맡기는 게 가장 효율적이다.", type: "SYSTEM_GUARDIAN", score: 2 },
                { text: "왜 고장 났는지 인터넷을 뒤져서 원리를 공부한다.", type: "LOGIC_ARCHITECT", score: 2 }
            ]
        },
        {
            q: "나에게 '완벽한 결과물'이란?",
            a: [
                { text: "사용자가 '와 예쁘다, 편하다'라고 감탄하는 것.", type: "WEB_ARTIST", score: 4 },
                { text: "버그 없이 24시간 365일 안정적으로 돌아가는 것.", type: "SYSTEM_GUARDIAN", score: 4 },
                { text: "내 상상 속의 세계가 눈앞에 그대로 구현되는 것.", type: "REALITY_CREATOR", score: 4 },
                { text: "시장에서 반응이 오고 돈이 벌리는 서비스.", type: "AGILE_ADVENTURER", score: 4 },
                { text: "정확한 수치로 성능 향상이 증명되는 것.", type: "DATA_PROPHET", score: 4 }
            ]
        }
    ];

    let scores = { 
        "WEB_ARTIST": 0, "LOGIC_ARCHITECT": 0, "DATA_PROPHET": 0, 
        "SYSTEM_GUARDIAN": 0, "AGILE_ADVENTURER": 0, "REALITY_CREATOR": 0,
        "MACHINE_SOUL": 0, "DIGITAL_NOMAD": 0
    };
    let currentStep = 0;

    // 초기화: 모든 유형 리스트 생성
    function initAllTypes() {
        const listContainer = document.getElementById('all-types-list');
        listContainer.innerHTML = ''; 
        
        for (const [key, val] of Object.entries(results)) {
            const card = document.createElement('div');
            card.className = 'type-card';
            card.innerHTML = `
                <div class="type-header">
                    <span class="type-icon">${val.icon}</span>
                    <span class="type-name">${val.title}</span>
                </div>
                <div class="type-desc-short">${val.desc.split('<br>')[0]}</div>
                <div style="margin-top:10px;">
                      ${val.jobs.map(j => `<span style="font-size:0.8rem; background:#f1f5f9; padding:4px 8px; border-radius:6px; margin-right:4px; font-weight:600; color:#475569;">${j}</span>`).join('')}
                </div>
            `;
            listContainer.appendChild(card);
        }
    }
    initAllTypes();

    function showAllTypes() {
        document.getElementById('intro-screen').classList.add('hidden');
        document.getElementById('all-types-screen').classList.remove('hidden');
    }

    function hideAllTypes() {
        document.getElementById('all-types-screen').classList.add('hidden');
        document.getElementById('intro-screen').classList.remove('hidden');
    }

    function startTest() {
        document.getElementById('intro-screen').classList.add('hidden');
        document.getElementById('quiz-screen').classList.remove('hidden');
        renderQuestion();
    }

    function renderQuestion() {
        const q = questions[currentStep];
        document.getElementById('q-number').innerText = `Question ${currentStep + 1}`;
        document.getElementById('q-text').innerText = q.q;
        document.getElementById('progress-bar').style.width = `${((currentStep) / questions.length) * 100}%`;

        const optsDiv = document.getElementById('options-container');
        optsDiv.innerHTML = '';

        q.a.forEach(ans => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerText = ans.text;
            btn.onclick = () => nextStep(ans.type, ans.score);
            optsDiv.appendChild(btn);
        });
    }

    function nextStep(type, score) {
        scores[type] += score;
        currentStep++;

        if (currentStep < questions.length) {
            renderQuestion();
        } else {
            showLoading();
        }
    }

    function showLoading() {
        document.getElementById('quiz-screen').classList.add('hidden');
        document.getElementById('loading-screen').classList.remove('hidden');

        setTimeout(() => {
            showResult();
        }, 1800);
    }

    function showResult() {
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('result-screen').classList.remove('hidden');

        let maxScore = -1;
        let resultType = "AGILE_ADVENTURER"; // 기본값

        for (const [key, value] of Object.entries(scores)) {
            if (value > maxScore) {
                maxScore = value;
                resultType = key;
            }
        }

        const data = results[resultType];
        
        document.getElementById('r-icon').innerText = data.icon;
        document.getElementById('r-title').innerText = data.title;
        document.getElementById('r-desc').innerHTML = data.desc;
        
        const jobsContainer = document.getElementById('r-jobs');
        jobsContainer.innerHTML = data.jobs.map(job => `<span class="job-tag">${job}</span>`).join('');
        
        const confContainer = document.getElementById('r-confessions');
        confContainer.innerHTML = '';

        data.confessions.forEach(item => {
            const card = document.createElement('div');
            card.className = 'confession-card';
            
            const avatarChar = item.name.charAt(0).toUpperCase();
            
            card.innerHTML = `
                <div class="tech-avatar">${avatarChar}</div>
                <div class="tech-content">
                    <span class="tech-name">${item.name}</span>
                    <span class="tech-msg">"${item.msg}"</span>
                </div>
            `;
            confContainer.appendChild(card);
        });
    }

    // 토스트 메시지 함수
    function showToast(message) {
        const toast = document.getElementById("toast");
        toast.innerText = message;
        toast.className = "toast show";
        setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
    }

    function copyLink() {
        const dummy = document.createElement("input");
        document.body.appendChild(dummy);
        dummy.value = window.location.href;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        // Alert 대신 토스트 메시지 사용
        showToast("링크가 복사되었습니다! 친구들에게 공유해서 플러팅 멘트를 확인해보세요 😆");
    }
</script>

</body>
</html>
