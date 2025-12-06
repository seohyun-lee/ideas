<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>디스코드 3D 텍스트 메이커 (Pro)</title>
    
    <!-- Pretendard UI Font -->
    <link rel="stylesheet" as="style" crossorigin href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.8/dist/web/static/pretendard.css" />

    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/FontLoader.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/geometries/TextGeometry.js"></script>
    <script src="https://unpkg.com/ccapture.js@1.1.0/build/CCapture.all.min.js"></script>
    
    <style>
        body {
            margin: 0;
            overflow: hidden;
            font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
            background-color: #1e1f22;
            color: white;
            display: flex;
            flex-direction: column;
            height: 100vh;
        }

        #canvas-container {
            flex-grow: 1;
            position: relative;
            background-color: #313338;
            display: flex;
            justify-content: center;
            align-items: center;
            background-image: linear-gradient(45deg, #2b2d31 25%, transparent 25%), 
                              linear-gradient(-45deg, #2b2d31 25%, transparent 25%), 
                              linear-gradient(45deg, transparent 75%, #2b2d31 75%), 
                              linear-gradient(-45deg, transparent 75%, #2b2d31 75%);
            background-size: 20px 20px;
            background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
            overflow: hidden;
        }

        #ui-panel {
            background-color: #2b2d31;
            padding: 15px 20px;
            box-shadow: 0 -4px 20px rgba(0,0,0,0.4);
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            align-items: flex-start;
            justify-content: center;
            z-index: 10;
            max-height: 40vh;
            overflow-y: auto;
        }

        /* 스크롤바 커스텀 */
        #ui-panel::-webkit-scrollbar { width: 8px; }
        #ui-panel::-webkit-scrollbar-thumb { background: #1a1b1e; border-radius: 4px; }
        #ui-panel::-webkit-scrollbar-track { background: #2b2d31; }

        .control-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
            background: #232428;
            padding: 10px;
            border-radius: 8px;
            min-width: 180px;
        }

        .section-title {
            font-size: 11px;
            color: #949ba4;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 2px;
        }

        .control-row {
            display: flex;
            align-items: center;
            gap: 8px;
            justify-content: space-between;
        }

        label {
            font-size: 13px;
            color: #dbdee1;
        }

        input[type="text"] {
            background: #1e1f22;
            border: 1px solid #1e1f22;
            color: #dbdee1;
            padding: 8px;
            border-radius: 4px;
            font-size: 14px;
            width: 100%;
            font-family: 'Pretendard', sans-serif;
            box-sizing: border-box;
        }
        input[type="text"]:focus { outline: 2px solid #5865F2; }

        /* Color Picker Custom */
        .color-wrapper {
            position: relative;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            overflow: hidden;
            border: 2px solid #444;
            cursor: pointer;
        }
        input[type="color"] {
            position: absolute;
            top: -50%; left: -50%;
            width: 200%; height: 200%;
            padding: 0; margin: 0;
            border: none;
            cursor: pointer;
        }

        /* Sliders */
        input[type="range"] {
            width: 100px;
            accent-color: #5865F2;
            height: 4px;
            background: #4e5058;
            border-radius: 2px;
            appearance: none;
        }
        input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 12px; height: 12px;
            background: white;
            border-radius: 50%;
            cursor: pointer;
        }

        /* Checkbox */
        input[type="checkbox"] {
            width: 16px; height: 16px;
            accent-color: #5865F2;
            cursor: pointer;
        }

        /* Select */
        select {
            background: #1e1f22;
            color: #dbdee1;
            border: 1px solid #1e1f22;
            padding: 6px;
            border-radius: 4px;
            font-size: 13px;
            width: 100%;
            cursor: pointer;
        }
        select:focus { outline: 1px solid #5865F2; }

        button {
            background-color: #5865F2;
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 4px;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.2s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            font-family: 'Pretendard', sans-serif;
            width: 100%;
            margin-top: 10px;
        }
        button:hover { background-color: #4752c4; }
        button:disabled { background-color: #3f4147; color: #72767d; cursor: not-allowed; }

        #loading-overlay {
            position: absolute;
            top: 0; left: 0; width: 100%; height: 100%;
            background: rgba(0,0,0,0.85);
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            z-index: 100;
        }
        
        .loader {
            border: 4px solid #f3f3f3;
            border-top: 4px solid #5865F2;
            border-radius: 50%;
            width: 40px; height: 40px;
            animation: spin 1s linear infinite;
            margin-bottom: 15px;
        }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

        .status-text {
            color: white; font-size: 15px; text-align: center; line-height: 1.6;
        }
        
        .progress-bar-container {
            width: 250px; height: 8px;
            background: #444;
            border-radius: 4px;
            margin-top: 15px;
            overflow: hidden;
            display: none;
        }
        .progress-bar { width: 0%; height: 100%; background: #5865F2; transition: width 0.2s; }
    </style>
</head>
<body>

    <div id="canvas-container"></div>

    <div id="ui-panel">
        <!-- 1. 텍스트 설정 -->
        <div class="control-section">
            <div class="section-title">Text & Color</div>
            <input type="text" id="textInput" value="안녕" placeholder="내용 입력">
            
            <div class="control-row">
                <label>그라데이션</label>
                <input type="checkbox" id="useGradient">
            </div>
            
            <div class="control-row" id="singleColorControls">
                <label>단색</label>
                <div class="color-wrapper"><input type="color" id="textColor" value="#5865F2"></div>
            </div>

            <div class="control-row" id="gradientControls" style="display:none;">
                <label>시작/끝</label>
                <div style="display:flex; gap:5px;">
                    <div class="color-wrapper"><input type="color" id="gradColor1" value="#00ffff"></div>
                    <div class="color-wrapper"><input type="color" id="gradColor2" value="#ff00ff"></div>
                </div>
            </div>
        </div>

        <!-- 2. 스타일 설정 (두께, 테두리) -->
        <div class="control-section">
            <div class="section-title">Style</div>
            
            <div class="control-row">
                <label>두께</label>
                <input type="range" id="depthSlider" min="0.1" max="3" step="0.1" value="0.5">
            </div>

            <div class="control-row">
                <label>테두리</label>
                <input type="checkbox" id="useOutline">
                <div class="color-wrapper" style="width:20px; height:20px;">
                    <input type="color" id="outlineColor" value="#000000">
                </div>
            </div>
        </div>

        <!-- 3. 애니메이션 및 환경 -->
        <div class="control-section">
            <div class="section-title">Animation & View</div>
            
            <select id="animType">
                <option value="spinY">회전 (기본)</option>
                <option value="tumble">텀블링 (입체 회전)</option>
                <option value="bounce">바운스 (위아래)</option>
                <option value="pulse">펄스 (크기 조절)</option>
            </select>

            <div class="control-row" style="margin-top:5px;">
                <label>정방형(1:1)</label>
                <input type="checkbox" id="squareMode" checked>
            </div>
            
            <div class="control-row">
                <label>배경 투명화</label>
                <input type="checkbox" id="transparentMode">
            </div>
            
            <div class="control-row" id="bgColorRow">
                <label>배경색</label>
                <div class="color-wrapper" style="width:20px; height:20px;">
                    <input type="color" id="bgColor" value="#313338">
                </div>
            </div>
        </div>

        <!-- 4. 액션 -->
        <div class="control-section" style="min-width: 140px; justify-content: center;">
            <button id="recordBtn">
                GIF 생성<br>(3초 녹화)
            </button>
        </div>
    </div>

    <div id="loading-overlay">
        <div class="loader"></div>
        <div class="status-text" id="statusText">초기 리소스 준비 중...</div>
        <div class="progress-bar-container" id="progressContainer">
            <div class="progress-bar" id="progressBar"></div>
        </div>
    </div>

    <script>
        const CONFIG = {
            duration: 3, 
            fps: 30,     
        };
        
        let scene, camera, renderer, textMesh, outlineMesh, textGroup, font;
        let isRecording = false;
        let capturer;
        let gifWorkerBlobURL = null; 
        
        // UI References
        const ui = {
            text: document.getElementById('textInput'),
            textColor: document.getElementById('textColor'),
            useGradient: document.getElementById('useGradient'),
            gradColor1: document.getElementById('gradColor1'),
            gradColor2: document.getElementById('gradColor2'),
            singleColorDiv: document.getElementById('singleColorControls'),
            gradientDiv: document.getElementById('gradientControls'),
            
            depth: document.getElementById('depthSlider'),
            useOutline: document.getElementById('useOutline'),
            outlineColor: document.getElementById('outlineColor'),
            
            animType: document.getElementById('animType'),
            squareMode: document.getElementById('squareMode'),
            transparentMode: document.getElementById('transparentMode'),
            bgColor: document.getElementById('bgColor'),
            bgColorRow: document.getElementById('bgColorRow'),
            
            recordBtn: document.getElementById('recordBtn')
        };
        
        // --- 1. GIF Worker Setup ---
        async function setupGifWorker() {
            const statusText = document.getElementById('statusText');
            statusText.innerText = "GIF 변환 모듈 준비 중...";

            try {
                const response = await fetch('https://unpkg.com/gif.js@0.2.0/dist/gif.worker.js');
                if (!response.ok) throw new Error('Failed to fetch worker script');
                const workerScriptText = await response.text();
                
                const blob = new Blob([workerScriptText], { type: 'application/javascript' });
                gifWorkerBlobURL = URL.createObjectURL(blob);
                
                const OriginalGIF = window.GIF;
                if (OriginalGIF) {
                    window.GIF = function(options) {
                        options.workerScript = gifWorkerBlobURL;
                        return new OriginalGIF(options);
                    }
                    window.GIF.prototype = OriginalGIF.prototype;
                }
                return true;
            } catch (error) {
                console.error('GIF Worker setup failed:', error);
                statusText.innerText = "GIF 모듈 로드 실패.\n새로고침 해주세요.";
                return false;
            }
        }

        // --- 2. Texture Generation for Gradient ---
        function createGradientTexture(color1, color2) {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const context = canvas.getContext('2d');
            
            // Linear Gradient (Top to Bottom)
            const gradient = context.createLinearGradient(0, 0, 0, 64);
            gradient.addColorStop(0, color1);
            gradient.addColorStop(1, color2);
            
            context.fillStyle = gradient;
            context.fillRect(0, 0, 64, 64);
            
            const texture = new THREE.CanvasTexture(canvas);
            return texture;
        }

        // --- 3. Three.js Setup ---
        async function init() {
            await setupGifWorker();

            const container = document.getElementById('canvas-container');
            const loadingOverlay = document.getElementById('loading-overlay');
            const statusText = document.getElementById('statusText');
            
            scene = new THREE.Scene();
            updateBackground();

            camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
            camera.position.set(0, 0, 15);

            renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            container.appendChild(renderer.domElement);
            
            onWindowResize();

            // Lighting
            const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
            scene.add(ambientLight);
            const pointLight = new THREE.PointLight(0xffffff, 0.8);
            pointLight.position.set(10, 10, 10);
            scene.add(pointLight);
            const pointLight2 = new THREE.PointLight(0xffffff, 0.5);
            pointLight2.position.set(-10, -10, 5);
            scene.add(pointLight2);

            // Group to hold text and outline
            textGroup = new THREE.Group();
            scene.add(textGroup);

            // Font Loading
            const loader = new THREE.FontLoader();
            const koreanFontUrl = 'https://cdn.jsdelivr.net/gh/cesiumlab/three-font@master/fonts/NanumGothic_Bold.json';
            const englishFontUrl = 'https://cdn.jsdelivr.net/npm/three@0.128.0/examples/fonts/helvetiker_bold.typeface.json';

            function loadEnglishFallback() {
                statusText.innerText = "나눔고딕 로딩 실패.\n기본 폰트로 실행합니다.";
                loader.load(englishFontUrl, 
                    function(loadedFont) {
                        font = loadedFont;
                        setTimeout(() => { loadingOverlay.style.display = 'none'; }, 1000);
                        refreshText();
                        animate();
                    }, 
                    undefined, 
                    function() { statusText.innerText = "폰트 로딩 실패."; }
                );
            }

            statusText.innerText = "나눔고딕 폰트 다운로드 중...";
            
            loader.load(koreanFontUrl, 
                function(loadedFont) {
                    font = loadedFont;
                    setTimeout(() => { loadingOverlay.style.display = 'none'; }, 500);
                    refreshText();
                    animate();
                }, 
                undefined, 
                function(err) { 
                    console.warn("Font load failed:", err);
                    loadEnglishFallback();
                }
            );

            // Event Listeners
            window.addEventListener('resize', onWindowResize, false);
            
            // UI Events
            ui.text.addEventListener('input', refreshText);
            ui.textColor.addEventListener('input', refreshText);
            ui.useGradient.addEventListener('change', () => {
                toggleGradientUI();
                refreshText();
            });
            ui.gradColor1.addEventListener('input', refreshText);
            ui.gradColor2.addEventListener('input', refreshText);
            
            ui.depth.addEventListener('input', refreshText);
            ui.useOutline.addEventListener('change', refreshText);
            ui.outlineColor.addEventListener('input', refreshText);
            
            ui.squareMode.addEventListener('change', onWindowResize);
            ui.transparentMode.addEventListener('change', updateBackground);
            ui.bgColor.addEventListener('input', updateBackground);
            
            // Animation Type change resets rotation
            ui.animType.addEventListener('change', () => {
                if(textGroup) {
                    textGroup.rotation.set(0,0,0);
                    textGroup.position.set(0,0,0);
                    textGroup.scale.set(1,1,1);
                }
            });
        }

        function toggleGradientUI() {
            if (ui.useGradient.checked) {
                ui.singleColorDiv.style.display = 'none';
                ui.gradientDiv.style.display = 'flex';
            } else {
                ui.singleColorDiv.style.display = 'flex';
                ui.gradientDiv.style.display = 'none';
            }
        }

        function updateBackground() {
            if (!scene) return;
            if (ui.transparentMode.checked) {
                scene.background = null;
                ui.bgColorRow.style.opacity = '0.5';
                ui.bgColor.disabled = true;
            } else {
                scene.background = new THREE.Color(ui.bgColor.value);
                ui.bgColorRow.style.opacity = '1';
                ui.bgColor.disabled = false;
            }
        }

        function refreshText() {
            if (!font) return;
            
            // Clear existing
            while(textGroup.children.length > 0){ 
                textGroup.remove(textGroup.children[0]); 
            }

            let text = ui.text.value;
            if (!text && text !== "") text = " "; 

            // Parameters
            const depthVal = parseFloat(ui.depth.value);
            
            // Geometry
            const geometry = new THREE.TextGeometry(text, {
                font: font,
                size: 3,
                height: depthVal, 
                curveSegments: 5, 
                bevelEnabled: true,
                bevelThickness: 0.05,
                bevelSize: 0.05,
                bevelOffset: 0,
                bevelSegments: 3
            });

            geometry.center();

            // Material
            let material;
            if (ui.useGradient.checked) {
                const tex = createGradientTexture(ui.gradColor1.value, ui.gradColor2.value);
                // Map texture to geometry bounding box
                geometry.computeBoundingBox();
                material = new THREE.MeshPhongMaterial({ map: tex });
            } else {
                material = new THREE.MeshPhongMaterial({ color: ui.textColor.value });
            }

            // Main Mesh
            textMesh = new THREE.Mesh(geometry, material);
            textGroup.add(textMesh);

            // Outline Mesh (EdgesGeometry)
            if (ui.useOutline.checked) {
                const edges = new THREE.EdgesGeometry(geometry);
                const lineMat = new THREE.LineBasicMaterial({ color: ui.outlineColor.value, linewidth: 2 });
                outlineMesh = new THREE.LineSegments(edges, lineMat);
                textGroup.add(outlineMesh);
            }
        }

        function onWindowResize() {
            if (!renderer || !camera) return;
            
            const container = document.getElementById('canvas-container');
            const isSquare = ui.squareMode.checked;
            
            let width, height;
            if (isSquare) {
                const size = Math.min(container.clientWidth, container.clientHeight);
                width = size;
                height = size;
            } else {
                width = container.clientWidth;
                height = container.clientHeight;
            }

            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            renderer.setSize(width, height);
            
            renderer.domElement.style.width = `${width}px`;
            renderer.domElement.style.height = `${height}px`;
        }

        function animate() {
            requestAnimationFrame(animate);
            
            if (!isRecording && textGroup) {
                // Preview Animation based on selection
                applyAnimationLogic(Date.now() / 1000);
            }
            
            renderer.render(scene, camera);
        }

        // Apply animation based on time t (seconds)
        function applyAnimationLogic(t) {
            if(!textGroup) return;
            
            // Reset transforms first
            // Note: We don't fully reset because we want continuous motion, 
            // but for some effects like pulse/bounce we need reference.
            // For simplicity in loop, we use incremental or sine based.
            
            const type = ui.animType.value;
            const speed = (Math.PI * 2) / CONFIG.duration; // 1 loop per duration

            if (isRecording) {
                // Exact calculation for recording (based on frame progress)
                // Handled in renderLoop
            } else {
                // Free running preview
                if (type === 'spinY') {
                    textGroup.rotation.y = t * speed;
                    textGroup.rotation.x = 0;
                    textGroup.position.y = 0;
                    textGroup.scale.set(1,1,1);
                } else if (type === 'tumble') {
                    textGroup.rotation.y = t * speed;
                    textGroup.rotation.x = t * speed * 0.5;
                    textGroup.position.y = 0;
                    textGroup.scale.set(1,1,1);
                } else if (type === 'bounce') {
                    textGroup.rotation.set(0,0,0);
                    // Bounce up and down
                    textGroup.position.y = Math.sin(t * speed) * 1.5; 
                    textGroup.scale.set(1,1,1);
                } else if (type === 'pulse') {
                    textGroup.rotation.set(0,0,0);
                    textGroup.position.y = 0;
                    // Scale between 0.8 and 1.2
                    const s = 1 + Math.sin(t * speed) * 0.2;
                    textGroup.scale.set(s, s, s);
                }
            }
        }

        // --- Recording Logic ---
        ui.recordBtn.addEventListener('click', startRecording);

        function startRecording() {
            if (isRecording) return;
            if (!gifWorkerBlobURL) {
                alert("GIF 변환기가 아직 준비되지 않았습니다.");
                return;
            }

            isRecording = true;
            document.getElementById('loading-overlay').style.display = 'flex';
            document.getElementById('statusText').innerText = "프레임 캡처 중... (잠시만 기다리세요)";
            document.getElementById('progressContainer').style.display = 'block';
            document.getElementById('progressBar').style.width = '0%';

            capturer = new CCapture({
                format: 'gif',
                framerate: CONFIG.fps,
                verbose: true,
                quality: 10,
                onProgress: function(p) {
                    const percent = Math.round(p * 100);
                    document.getElementById('statusText').innerText = `GIF 인코딩 중... ${percent}%`;
                    document.getElementById('progressBar').style.width = `${percent}%`;
                }
            });

            capturer.start();
            renderLoop();
        }

        let currentFrame = 0;
        const totalFrames = CONFIG.duration * CONFIG.fps;

        function renderLoop() {
            if (!isRecording) return;

            // Calculate exact time for this frame
            const progress = currentFrame / totalFrames; // 0 to 1
            const angle = progress * Math.PI * 2; 
            
            // Apply animation for this specific frame
            const type = ui.animType.value;
            
            if (textGroup) {
                if (type === 'spinY') {
                    textGroup.rotation.y = -angle;
                    textGroup.rotation.x = 0;
                    textGroup.position.y = 0;
                    textGroup.scale.set(1,1,1);
                } else if (type === 'tumble') {
                    textGroup.rotation.y = -angle;
                    textGroup.rotation.x = -angle * 0.5;
                    textGroup.position.y = 0;
                    textGroup.scale.set(1,1,1);
                } else if (type === 'bounce') {
                    textGroup.rotation.set(0,0,0);
                    // Use cosine for loop (starts at top/bottom) or sine 
                    // sin(0)=0, sin(2PI)=0 -> Perfect loop
                    textGroup.position.y = Math.sin(angle) * 1.5; 
                    textGroup.scale.set(1,1,1);
                } else if (type === 'pulse') {
                    textGroup.rotation.set(0,0,0);
                    textGroup.position.y = 0;
                    const s = 1 + Math.sin(angle) * 0.2;
                    textGroup.scale.set(s, s, s);
                }
            }

            renderer.render(scene, camera);
            capturer.capture(renderer.domElement);

            currentFrame++;
            
            if (currentFrame < totalFrames) {
                requestAnimationFrame(renderLoop);
            } else {
                finishRecording();
            }
        }

        function finishRecording() {
            document.getElementById('statusText').innerText = "GIF 변환 중... (최대 10초 소요)";
            capturer.stop();
            capturer.save(function(blob) {
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `discord_3d_text_${Date.now()}.gif`;
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                
                isRecording = false;
                currentFrame = 0;
                document.getElementById('loading-overlay').style.display = 'none';
            });
        }

        init();

    </script>
</body>
</html>
