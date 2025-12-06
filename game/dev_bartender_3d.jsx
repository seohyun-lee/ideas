<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>DevBartender 3D - Code & Cocktail</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&family=Orbitron:wght@500;900&display=swap" rel="stylesheet">
    <style>
        :root {
            --neon-blue: #00f3ff;
            --neon-pink: #bc13fe;
            --bg-dark: #0a0a12;
        }
        
        body {
            background-color: var(--bg-dark);
            font-family: 'JetBrains Mono', monospace;
            color: #fff;
            overflow-x: hidden;
            margin: 0;
        }

        .neon-text {
            font-family: 'Orbitron', sans-serif;
            text-shadow: 0 0 10px var(--neon-blue), 0 0 20px var(--neon-blue);
        }

        /* 3D 캔버스 컨테이너 */
        #canvas-container {
            width: 100%;
            height: 500px;
            position: relative;
            overflow: hidden;
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: radial-gradient(circle at center, #2a2a35 0%, #050508 100%);
            box-shadow: inset 0 0 50px rgba(0,0,0,0.8);
        }

        canvas {
            display: block;
            outline: none;
        }

        .tag-pill {
            transition: all 0.3s ease;
        }
        .tag-pill:hover {
            transform: translateY(-2px);
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        }

        /* 로딩 오버레이 */
        #loading {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            pointer-events: none;
            font-family: 'Orbitron', sans-serif;
            color: var(--neon-blue);
            transition: opacity 0.5s;
        }

        /* 스크롤바 커스텀 */
        ::-webkit-scrollbar {
            width: 8px;
        }
        ::-webkit-scrollbar-track {
            background: #0a0a12;
        }
        ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }
        ::-webkit-scrollbar-thumb:hover {
            background: var(--neon-blue);
        }
    </style>
</head>
<body class="min-h-screen flex flex-col items-center p-4">

    <!-- Header -->
    <header class="text-center mb-6 mt-4">
        <h1 class="text-4xl md:text-6xl font-bold neon-text mb-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
            DevBartender 3D
        </h1>
        <p class="text-gray-400 text-sm md:text-base tracking-widest">VISUALIZE YOUR STACK</p>
    </header>

    <main class="w-full max-w-6xl flex flex-col lg:flex-row gap-8 items-start justify-center">
        
        <!-- Left: Order Panel -->
        <div class="w-full lg:w-1/3 bg-gray-900/80 p-6 rounded-xl border border-gray-800 shadow-2xl backdrop-blur-sm z-10">
            <div class="mb-6">
                <label class="block text-cyan-400 text-sm font-bold mb-2">YOUR TECH STACK</label>
                <div class="relative">
                    <input type="text" id="techInput" 
                        class="w-full bg-gray-800 text-white border-2 border-gray-700 rounded-lg py-3 px-4 leading-tight focus:outline-none focus:border-cyan-500 focus:shadow-[0_0_15px_rgba(0,255,255,0.3)] transition-all"
                        placeholder="Python, Java, Bug..."
                        autocomplete="off">
                </div>
                <p class="text-xs text-gray-500 mt-2">쉼표(,)로 구분하여 입력하세요.</p>
            </div>

            <!-- Suggestion Chips -->
            <div class="flex flex-wrap gap-2 mb-8" id="suggestionTags">
                <!-- JS injected tags -->
            </div>

            <button onclick="orderCocktail()" id="orderBtn"
                class="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 mb-6">
                <span>🧊 3D SHAKE IT!</span>
            </button>

             <!-- Recipe Card -->
             <div id="recipeCard" class="w-full bg-black/40 p-4 rounded-lg border border-gray-700 opacity-0 transition-all duration-700">
                <h2 id="cocktailName" class="text-xl font-bold text-cyan-400 mb-2 font-orbitron">Ready to serve</h2>
                <div class="h-px w-full bg-gray-700 mb-4"></div>
                <div class="space-y-2 text-sm text-gray-300">
                    <p><span class="text-purple-400 font-bold">Base:</span> <span id="cocktailBase">-</span></p>
                    <p><span class="text-pink-400 font-bold">Mix:</span> <span id="cocktailMixers">-</span></p>
                    <p><span class="text-yellow-400 font-bold">Note:</span> <span id="cocktailFlavor" class="italic">-</span></p>
                </div>
            </div>
        </div>

        <!-- Right: 3D Bar View -->
        <div class="w-full lg:w-2/3 relative">
            <div id="canvas-container">
                <div id="loading">INITIALIZING BAR...</div>
            </div>
            <div class="absolute bottom-4 right-4 text-xs text-gray-500 pointer-events-none">
                Mouse Move: Rotate View | Scroll: Zoom
            </div>
        </div>
    </main>

    <footer class="mt-12 text-gray-600 text-xs text-center pb-4">
        &copy; 2025 DevBartender. Three.js Render Engine.
    </footer>

    <script>
        // --- Data Configuration (Expanded) ---
        const techData = {
            // Languages
            'python': { color: 0x3776AB, name: '파이썬', ingredient: '블루 큐라소', flavor: '직관적인 깔끔함' },
            'javascript': { color: 0xF7DF1E, name: '자바스크립트', ingredient: '바나나 리큐르', flavor: '비동기 톡 쏘는 맛' },
            'js': { color: 0xF7DF1E, name: '자바스크립트', ingredient: '바나나 리큐르', flavor: '비동기 톡 쏘는 맛' },
            'typescript': { color: 0x3178C6, name: 'TS', ingredient: '블루베리 시럽', flavor: '타입이 잡힌 안정감' },
            'ts': { color: 0x3178C6, name: 'TS', ingredient: '블루베리 시럽', flavor: '타입이 잡힌 안정감' },
            'java': { color: 0x3b2f2f, name: '자바', ingredient: '에스프레소 & 럼', flavor: '객체지향의 묵직함' },
            'c': { color: 0x555555, name: 'C언어', ingredient: '보드카 샷', flavor: '포인터의 날카로운 맛' },
            'cpp': { color: 0x00599C, name: 'C++', ingredient: '드라이 진', flavor: '고성능의 차가움' },
            'c++': { color: 0x00599C, name: 'C++', ingredient: '드라이 진', flavor: '고성능의 차가움' },
            'c#': { color: 0x9B4F96, name: 'C#', ingredient: '그레이프 주스', flavor: 'MS의 정제된 단맛' },
            'go': { color: 0x00ADD8, name: 'Go', ingredient: '파워에이드', flavor: '고루틴의 빠른 목넘김' },
            'rust': { color: 0xDEA584, name: 'Rust', ingredient: '시나몬 위스키', flavor: '메모리 안전 스파이시' },
            'swift': { color: 0xF05138, name: 'Swift', ingredient: '레드 자몽', flavor: '애플 생태계의 산뜻함' },
            'kotlin': { color: 0x7F52FF, name: '코틀린', ingredient: '바이올렛 리큐르', flavor: '간결한 세련미' },
            'php': { color: 0x777BB4, name: 'PHP', ingredient: '포도 주스', flavor: '전통 웹의 맛' },
            'ruby': { color: 0xCC342D, name: 'Ruby', ingredient: '체리 브랜디', flavor: '개발자 행복의 달콤함' },
            'scala': { color: 0xDC322F, name: '스칼라', ingredient: '석류 시럽', flavor: '함수형의 깊은 맛' },
            'elixir': { color: 0x4e2a8e, name: 'Elixir', ingredient: '퍼플 진', flavor: '분산처리의 신비로움' },
            
            // Frontend
            'react': { color: 0x61DAFB, name: '리액트', ingredient: '소다수', flavor: '컴포넌트의 청량감' },
            'vue': { color: 0x4FC08D, name: '뷰', ingredient: '메론 리큐르', flavor: '가볍고 부드러움' },
            'angular': { color: 0xDD0031, name: '앵귤러', ingredient: '그레나딘 시럽', flavor: '구조적인 강렬함' },
            'svelte': { color: 0xFF3E00, name: 'Svelte', ingredient: '오렌지 껍질', flavor: '컴파일러의 가벼움' },
            'next': { color: 0xFFFFFF, name: 'Next.js', ingredient: '코코넛 밀크', flavor: 'SSR의 부드러움' },
            'tailwind': { color: 0x38B2AC, name: 'Tailwind', ingredient: '민트 시럽', flavor: '유틸리티의 상쾌함' },
            'html': { color: 0xE34F26, name: 'HTML', ingredient: '오렌지 주스', flavor: '마크업의 기본기' },
            'css': { color: 0x1572B6, name: 'CSS', ingredient: '블루 하와이', flavor: '스타일링의 화려함' },
            'jquery': { color: 0x0769AD, name: 'jQuery', ingredient: '올드 패션드', flavor: '추억의 맛' },

            // Backend & Frameworks
            'spring': { color: 0x6DB33F, name: '스프링', ingredient: '애플 민트', flavor: '의존성 주입의 향' },
            'node': { color: 0x339933, name: 'Node.js', ingredient: '라임 주스', flavor: '이벤트 루프의 새콤함' },
            'django': { color: 0x092E20, name: 'Django', ingredient: '압생트', flavor: '풀스택의 강력한 도수' },
            'flask': { color: 0x000000, name: 'Flask', ingredient: '콜라', flavor: '마이크로한 가벼움' },
            'fastapi': { color: 0x009688, name: 'FastAPI', ingredient: '청포도 에이드', flavor: '비동기 속도감' },
            'express': { color: 0x444444, name: 'Express', ingredient: '얼그레이', flavor: '미들웨어의 깔끔함' },
            'nestjs': { color: 0xE0234E, name: 'NestJS', ingredient: '로즈 시럽', flavor: '모듈화의 향기' },

            // Mobile
            'flutter': { color: 0x02569B, name: 'Flutter', ingredient: '블루 레모네이드', flavor: '크로스 플랫폼의 시원함' },
            'react native': { color: 0x61DAFB, name: 'RN', ingredient: '밀키스', flavor: '네이티브의 부드러움' },
            'android': { color: 0x3DDC84, name: 'Android', ingredient: '멜론 소다', flavor: '개방적인 맛' },
            'ios': { color: 0x000000, name: 'iOS', ingredient: '블랙 티', flavor: '폐쇄적인 고급짐' },

            // Database
            'mysql': { color: 0x4479A1, name: 'MySQL', ingredient: '솔트 림', flavor: '관계형의 짠맛' },
            'postgres': { color: 0x336791, name: 'PostgreSQL', ingredient: '블루 사파이어', flavor: '신뢰의 깊은 맛' },
            'mongodb': { color: 0x47A248, name: 'MongoDB', ingredient: '키위 주스', flavor: 'NoSQL의 자유로움' },
            'redis': { color: 0xDC382D, name: 'Redis', ingredient: '딸기 퓨레', flavor: '캐싱된 달콤함' },
            'oracle': { color: 0xF80000, name: 'Oracle', ingredient: '블러드 오렌지', flavor: '엔터프라이즈의 무게감' },

            // DevOps & Cloud
            'aws': { color: 0xFF9900, name: 'AWS', ingredient: '망고 퓨레', flavor: '클라우드의 풍부함' },
            'docker': { color: 0x2496ED, name: 'Docker', ingredient: '탄산수', flavor: '컨테이너의 청량함' },
            'kubernetes': { color: 0x326CE5, name: 'K8s', ingredient: '블루 라군', flavor: '오케스트레이션의 조화' },
            'git': { color: 0xF05032, name: 'Git', ingredient: '비터스', flavor: '버전 관리의 쌉싸름함' },
            'github': { color: 0x181717, name: 'GitHub', ingredient: '다크 초콜릿', flavor: '협업의 진한 맛' },
            'linux': { color: 0xFCC624, name: 'Linux', ingredient: '라거 맥주', flavor: '오픈소스의 자유' },
            'jenkins': { color: 0xD24939, name: 'Jenkins', ingredient: '토마토 주스', flavor: 'CI/CD의 건강한 맛' },
            'terraform': { color: 0x7B42BC, name: 'Terraform', ingredient: '포도 웰치스', flavor: 'IaC의 구조적인 맛' },

            // Others
            'vim': { color: 0x019733, name: 'Vim', ingredient: '고추냉이', flavor: '익숙해지면 중독됨' },
            'bug': { color: 0x1a1a1a, name: '버그', ingredient: '한약', flavor: '디버깅의 쓴맛' },
            'error': { color: 0xFF0000, name: '에러', ingredient: '캡사이신', flavor: '정신 번쩍 드는 맛' },
            'coffee': { color: 0x6f4e37, name: '커피', ingredient: '더블샷', flavor: '개발자의 연료' }
        };

        const defaultTech = { color: 0xeeeeee, name: 'Unknown', ingredient: '물', flavor: '무미' };

        // --- Suggestion Chips UI ---
        const suggestions = ['Python', 'Java', 'React', 'Bug', 'AWS', 'Docker', 'Redis', 'Flutter', 'Spring', 'Kotlin'];
        const suggestionContainer = document.getElementById('suggestionTags');
        const inputField = document.getElementById('techInput');

        suggestions.forEach(tech => {
            const btn = document.createElement('button');
            btn.className = 'tag-pill text-xs bg-gray-800 border border-gray-600 text-gray-300 px-3 py-1 rounded-full hover:bg-gray-700 hover:text-white hover:border-cyan-500';
            btn.innerText = tech;
            btn.onclick = () => {
                const currentVal = inputField.value;
                inputField.value = currentVal ? currentVal + ', ' + tech : tech;
            };
            suggestionContainer.appendChild(btn);
        });

        // --- THREE.JS LOGIC ---
        let scene, camera, renderer;
        let glassGroup, liquidGroup, iceGroup, bubbleGroup;
        let mouseX = 0, mouseY = 0;
        
        function init3D() {
            const container = document.getElementById('canvas-container');
            
            // 1. Scene Setup
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x1a1a24, 0.01); 

            // 2. Camera
            camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
            camera.position.set(0, 8, 22); 
            camera.lookAt(0, 3, 0);

            // 3. Renderer
            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.shadowMap.enabled = true;
            renderer.shadowMap.type = THREE.PCFSoftShadowMap;
            renderer.toneMapping = THREE.ACESFilmicToneMapping;
            renderer.toneMappingExposure = 1.0; 
            container.appendChild(renderer.domElement);

            // 4. Lights
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6); 
            scene.add(ambientLight);

            const mainLight = new THREE.DirectionalLight(0xffffff, 1.5);
            mainLight.position.set(5, 10, 7);
            mainLight.castShadow = true;
            scene.add(mainLight);

            const spotLightBlue = new THREE.SpotLight(0x00f3ff, 8);
            spotLightBlue.position.set(-10, 10, -5);
            spotLightBlue.lookAt(0, 0, 0);
            spotLightBlue.angle = Math.PI / 4;
            spotLightBlue.penumbra = 0.5;
            scene.add(spotLightBlue);

            const pointLightPink = new THREE.PointLight(0xbc13fe, 3, 50);
            pointLightPink.position.set(8, 5, 5);
            scene.add(pointLightPink);

            const rimLight = new THREE.SpotLight(0xffffff, 3);
            rimLight.position.set(0, 5, -10);
            rimLight.lookAt(0, 2, 0);
            scene.add(rimLight);

            // 5. Bar Counter (Floor)
            const planeGeometry = new THREE.PlaneGeometry(100, 100);
            const planeMaterial = new THREE.MeshStandardMaterial({ 
                color: 0x050505,
                roughness: 0.3,
                metalness: 0.6
            });
            const plane = new THREE.Mesh(planeGeometry, planeMaterial);
            plane.rotation.x = -Math.PI / 2;
            plane.position.y = 0;
            plane.receiveShadow = true;
            scene.add(plane);

            // 6. The Glass (Container)
            glassGroup = new THREE.Group();
            
            // Glass Shape
            const points = [];
            for (let i = 0; i <= 20; i++) {
                const y = i * 0.5;
                const x = 2.2 + (y * 0.1); 
                points.push(new THREE.Vector2(x, y));
            }
            
            const glassGeo = new THREE.LatheGeometry(points, 64);
            // Glass Material
            const glassMat = new THREE.MeshPhysicalMaterial({
                color: 0xffffff,
                metalness: 0,
                roughness: 0,
                transmission: 0.98,
                transparent: true,
                opacity: 1,
                thickness: 0.1,
                ior: 1.5,
                clearcoat: 1.0,
                clearcoatRoughness: 0,
                side: THREE.DoubleSide
            });
            const glassMesh = new THREE.Mesh(glassGeo, glassMat);
            glassMesh.castShadow = true;
            glassMesh.receiveShadow = true;
            glassMesh.position.y = 0.2;
            glassMesh.renderOrder = 2; 
            glassGroup.add(glassMesh);
            
            // Glass Base
            const baseGeo = new THREE.CylinderGeometry(2.2, 2.2, 0.8, 64);
            const baseMesh = new THREE.Mesh(baseGeo, glassMat);
            baseMesh.position.y = -0.2; 
            baseMesh.renderOrder = 2;
            glassGroup.add(baseMesh);

            scene.add(glassGroup);

            // Groups for contents
            liquidGroup = new THREE.Group();
            glassGroup.add(liquidGroup);

            iceGroup = new THREE.Group();
            glassGroup.add(iceGroup);

            bubbleGroup = new THREE.Group();
            glassGroup.add(bubbleGroup);

            document.getElementById('loading').style.opacity = 0;

            // Events
            container.addEventListener('mousemove', onDocumentMouseMove);
            window.addEventListener('resize', onWindowResize);

            animate();
        }

        // --- Animation Loop ---
        function animate() {
            requestAnimationFrame(animate);

            const targetX = mouseX * 0.005;
            const targetY = mouseY * 0.005;
            
            glassGroup.rotation.y += 0.002;
            
            camera.position.x += (targetX - camera.position.x) * 0.05;
            camera.position.y += (10 + targetY - camera.position.y) * 0.05;
            camera.lookAt(0, 5, 0);

            bubbleGroup.children.forEach(bubble => {
                bubble.position.y += bubble.userData.speed;
                bubble.position.x += Math.sin(Date.now() * 0.005 + bubble.userData.offset) * 0.01;
                
                if (bubble.position.y > 9) {
                    bubble.position.y = 1;
                    bubble.material.opacity = 0;
                } else if (bubble.position.y < 8) {
                    bubble.material.opacity = Math.min(1, bubble.material.opacity + 0.05);
                } else {
                    bubble.material.opacity -= 0.02;
                }
            });

            iceGroup.children.forEach((ice, idx) => {
                ice.rotation.x += 0.005;
                ice.rotation.y += 0.005;
                ice.position.y += Math.sin(Date.now() * 0.002 + idx) * 0.005;
            });

            renderer.render(scene, camera);
        }

        function onDocumentMouseMove(event) {
            const container = document.getElementById('canvas-container');
            const rect = container.getBoundingClientRect();
            mouseX = (event.clientX - rect.left - rect.width / 2) * 2;
            mouseY = -(event.clientY - rect.top - rect.height / 2) * 2;
        }

        function onWindowResize() {
            const container = document.getElementById('canvas-container');
            camera.aspect = container.clientWidth / container.clientHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(container.clientWidth, container.clientHeight);
        }

        // --- Cocktail Making Logic ---
        function orderCocktail() {
            const input = document.getElementById('techInput').value;
            if (!input.trim()) return;

            const rawTokens = input.split(',').map(s => s.trim().toLowerCase()).filter(s => s);
            if (rawTokens.length === 0) return;

            while(liquidGroup.children.length > 0) liquidGroup.remove(liquidGroup.children[0]); 
            while(iceGroup.children.length > 0) iceGroup.remove(iceGroup.children[0]); 
            while(bubbleGroup.children.length > 0) bubbleGroup.remove(bubbleGroup.children[0]); 

            let layers = [];
            let ingredients = [];
            let flavorNotes = [];
            let mainTechName = "";

            rawTokens.forEach(token => {
                let matchedKey = Object.keys(techData).find(key => token === key || (token.includes(key) && key.length > 2));
                const data = matchedKey ? techData[matchedKey] : defaultTech;
                
                layers.push(data.color);
                ingredients.push(data.ingredient);
                flavorNotes.push(data.flavor);
                if (!mainTechName && matchedKey) mainTechName = data.name;
            });

            if(!mainTechName) mainTechName = "Mystery";

            const totalHeight = 9;
            const layerHeight = totalHeight / layers.length;
            
            // [FIX] 아래에서부터 차오르도록 순서대로 생성
            layers.forEach((color, index) => {
                const topY = 0.5 + (index * layerHeight) + layerHeight;
                const bottomY = 0.5 + (index * layerHeight);
                const radiusTop = (2.2 + (topY * 0.1)) - 0.15;
                const radiusBottom = (2.2 + (bottomY * 0.1)) - 0.15;

                const geometry = new THREE.CylinderGeometry(radiusTop, radiusBottom, layerHeight, 32);
                
                // [CRITICAL FIX] 지오메트리 중심점을 바닥으로 이동!
                // 이렇게 하면 scale.y를 조절할 때 중앙이 아닌 바닥에서부터 커집니다.
                geometry.translate(0, layerHeight / 2, 0);

                const material = new THREE.MeshPhongMaterial({
                    color: color,
                    emissive: color, 
                    emissiveIntensity: 0.15,
                    shininess: 80, 
                    specular: 0x444444,
                    transparent: true,
                    opacity: 0.9,
                    side: THREE.DoubleSide
                });

                const mesh = new THREE.Mesh(geometry, material);
                
                // 중심점을 바닥으로 옮겼으므로, 위치를 바닥 기준으로 잡습니다.
                mesh.position.y = bottomY;
                
                // 처음에 높이(Y)를 0으로 설정하여 납작하게 만듭니다.
                mesh.scale.set(1, 0.001, 1);
                
                mesh.renderOrder = 1; 
                
                liquidGroup.add(mesh);

                // 순차적으로 차오르는 애니메이션 (시간차 두기)
                animateFill(mesh, index * 400);
            });

            // Add Ice Cubes
            for(let i=0; i<3; i++) {
                const iceGeo = new THREE.BoxGeometry(1.2, 1.2, 1.2);
                const iceMat = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff,
                    transmission: 0.6,
                    roughness: 0.1,
                    thickness: 1.0,
                    transparent: true,
                    opacity: 0.6,
                    clearcoat: 1.0
                });
                const ice = new THREE.Mesh(iceGeo, iceMat);
                ice.position.set(
                    (Math.random() - 0.5) * 2, 
                    5 + Math.random() * 3, 
                    (Math.random() - 0.5) * 2
                );
                ice.rotation.set(Math.random(), Math.random(), Math.random());
                ice.renderOrder = 1; 
                iceGroup.add(ice);
            }

            // Add Bubbles
            for(let i=0; i<30; i++) {
                const bubbleGeo = new THREE.SphereGeometry(0.1, 8, 8);
                const bubbleMat = new THREE.MeshBasicMaterial({ 
                    color: 0xffffff, 
                    transparent: true, 
                    opacity: 0.8 
                });
                const bubble = new THREE.Mesh(bubbleGeo, bubbleMat);
                bubble.position.set(
                    (Math.random() - 0.5) * 3,
                    Math.random() * 8,
                    (Math.random() - 0.5) * 3
                );
                bubble.userData = { 
                    speed: 0.02 + Math.random() * 0.05,
                    offset: Math.random() * 100 
                };
                bubble.renderOrder = 1;
                bubbleGroup.add(bubble);
            }

            const prefixes = ["Lazy", "Fatal", "Midnight", "Golden", "Electric", "Dark", "Holy", "Rapid", "Frozen"];
            const suffixes = ["Sling", "Fizz", "Tonic", "Mule", "Sour", "Bomb", "Sunrise", "Crush", "Draft"];
            const randomPrefix = prefixes[Math.floor(Math.random() * prefixes.length)];
            const randomSuffix = suffixes[Math.floor(Math.random() * suffixes.length)];
            const finalName = `${randomPrefix} ${mainTechName} ${randomSuffix}`;

            const card = document.getElementById('recipeCard');
            card.style.opacity = '1';
            document.getElementById('cocktailName').innerText = finalName;
            document.getElementById('cocktailBase').innerText = rawTokens.join(' + ').toUpperCase();
            document.getElementById('cocktailMixers').innerText = [...new Set(ingredients)].join(', ');
            document.getElementById('cocktailFlavor').innerText = flavorNotes[Math.floor(Math.random() * flavorNotes.length)];
        }

        // [FIX] Y축(높이) 스케일 애니메이션으로 변경
        function animateFill(mesh, delay) {
            setTimeout(() => {
                let progress = 0;
                const grow = setInterval(() => {
                    progress += 0.04; // 속도 조절
                    if (progress >= 1) {
                        mesh.scale.set(1, 1, 1);
                        clearInterval(grow);
                    } else {
                        // Ease Out Quad 효과 적용 (빠르게 시작해서 천천히 끝남)
                        const ease = 1 - (1 - progress) * (1 - progress);
                        mesh.scale.y = THREE.MathUtils.lerp(0.001, 1, ease);
                    }
                }, 16);
            }, delay);
        }

        inputField.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') orderCocktail();
        });

        init3D();

    </script>
</body>
</html>
