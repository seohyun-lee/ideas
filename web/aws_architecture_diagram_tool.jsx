import React, { useState, useRef, useCallback } from 'react';
import { 
  Server, 
  Database, 
  Cloud, 
  HardDrive, 
  Globe, 
  Shield, 
  Cpu, 
  Box, 
  Trash2, 
  MousePointer2, 
  Cable, 
  Download, 
  RotateCcw,
  Maximize2,
  Lock,
  Layout,
  Layers,
  Network
} from 'lucide-react';

// --- Constants & Types ---
const SNAP_GRID = 10;
const DEFAULT_ICON_SIZE = 64;

// Two categories: Containers (Areas) and Services (Icons)
const COMPONENT_TYPES = [
  // Containers
  { type: 'vpc', category: 'container', label: 'VPC', icon: Cloud, color: 'border-purple-300 bg-purple-50/50', defaultW: 400, defaultH: 300 },
  { type: 'az', category: 'container', label: 'Availability Zone', icon: Layers, color: 'border-blue-300 border-dashed bg-blue-50/30', defaultW: 350, defaultH: 250 },
  { type: 'subnet-pub', category: 'container', label: 'Public Subnet', icon: Layout, color: 'border-green-300 bg-green-50/50', defaultW: 300, defaultH: 150 },
  { type: 'subnet-pri', category: 'container', label: 'Private Subnet', icon: Lock, color: 'border-slate-300 bg-slate-100/50', defaultW: 300, defaultH: 150 },
  { type: 'security-group', category: 'container', label: 'Security Group', icon: Shield, color: 'border-red-300 border-2 bg-transparent', defaultW: 120, defaultH: 120 },
  
  // Services
  { type: 'ec2', category: 'service', label: 'EC2', icon: Server, color: 'text-orange-500 bg-orange-50', defaultW: 64, defaultH: 64 },
  { type: 'rds', category: 'service', label: 'RDS', icon: Database, color: 'text-blue-600 bg-blue-50', defaultW: 64, defaultH: 64 },
  { type: 's3', category: 'service', label: 'S3', icon: HardDrive, color: 'text-green-600 bg-green-50', defaultW: 64, defaultH: 64 },
  { type: 'lambda', category: 'service', label: 'Lambda', icon: Cpu, color: 'text-orange-600 bg-orange-100', defaultW: 64, defaultH: 64 },
  { type: 'elb', category: 'service', label: 'ELB', icon: Network, color: 'text-indigo-600 bg-indigo-50', defaultW: 64, defaultH: 64 },
  { type: 'cloudfront', category: 'service', label: 'CloudFront', icon: Globe, color: 'text-sky-500 bg-sky-50', defaultW: 64, defaultH: 64 },
];

// --- Helper Functions ---
const generateId = () => Math.random().toString(36).substr(2, 9);
const snapToGrid = (value) => Math.round(value / SNAP_GRID) * SNAP_GRID;

export default function SimpleAwsArchitect() {
  // --- State ---
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  
  const [mode, setMode] = useState('select'); // 'select' | 'connect'
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [connectSourceId, setConnectSourceId] = useState(null);
  
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDraggingCanvas, setIsDraggingCanvas] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  
  // Dragging Node state
  const [draggedNodeId, setDraggedNodeId] = useState(null);
  
  // Resizing Node state
  const [resizingNodeId, setResizingNodeId] = useState(null);
  const [resizeStart, setResizeStart] = useState({ w: 0, h: 0, x: 0, y: 0 });

  const canvasRef = useRef(null);

  // --- Handlers ---

  // 1. Add Node (Drop)
  const handleDrop = (e) => {
    e.preventDefault();
    const type = e.dataTransfer.getData('nodeType');
    if (!type) return;

    const component = COMPONENT_TYPES.find(c => c.type === type);
    const canvasRect = canvasRef.current.getBoundingClientRect();
    
    // Calculate position
    const rawX = e.clientX - canvasRect.left - pan.x;
    const rawY = e.clientY - canvasRect.top - pan.y;
    
    // For containers, center drop point. For icons, center icon.
    const x = snapToGrid(rawX - (component.defaultW / 2));
    const y = snapToGrid(rawY - (component.defaultH / 2));

    const newNode = {
      id: generateId(),
      type: component.type,
      category: component.category,
      x,
      y,
      w: component.defaultW,
      h: component.defaultH,
      label: component.label,
    };

    setNodes((prev) => [...prev, newNode]);
  };

  const handleDragOver = (e) => e.preventDefault();

  // 2. Mouse Actions (Complex Logic for Drag/Resize/Pan)
  const handleMouseDown = (e, nodeId, action = 'drag') => {
    if (mode === 'connect' && nodeId) {
        e.stopPropagation();
        handleConnectClick(nodeId);
        return;
    }

    if (action === 'resize' && nodeId) {
        e.stopPropagation();
        const node = nodes.find(n => n.id === nodeId);
        setResizingNodeId(nodeId);
        setResizeStart({ w: node.w, h: node.h, x: e.clientX, y: e.clientY });
        return;
    }

    if (nodeId) {
        e.stopPropagation();
        setSelectedNodeId(nodeId);
        setDraggedNodeId(nodeId);
    } else {
        // Background click
        if (e.button === 0 || e.button === 1) {
            setIsDraggingCanvas(true);
            setDragStart({ x: e.clientX, y: e.clientY });
            setSelectedNodeId(null);
        }
    }
  };

  const handleMouseMove = useCallback((e) => {
    // 1. Resizing
    if (resizingNodeId) {
        const dx = e.clientX - resizeStart.x;
        const dy = e.clientY - resizeStart.y;
        
        setNodes(prev => prev.map(n => {
            if (n.id === resizingNodeId) {
                return {
                    ...n,
                    w: Math.max(64, snapToGrid(resizeStart.w + dx)),
                    h: Math.max(64, snapToGrid(resizeStart.h + dy))
                };
            }
            return n;
        }));
        return;
    }

    // 2. Dragging Node
    if (draggedNodeId && mode === 'select') {
      const movementX = e.movementX;
      const movementY = e.movementY;

      setNodes((prevNodes) => 
        prevNodes.map((node) => {
          if (node.id === draggedNodeId) {
            return {
              ...node,
              x: node.x + movementX,
              y: node.y + movementY
            };
          }
          return node;
        })
      );
    } 
    
    // 3. Panning Canvas
    else if (isDraggingCanvas) {
      setPan((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  }, [draggedNodeId, resizingNodeId, isDraggingCanvas, mode, resizeStart]);

  const handleMouseUp = () => {
    if (draggedNodeId) {
       // Snap to grid on release
       setNodes(prev => prev.map(node => 
         node.id === draggedNodeId ? { ...node, x: snapToGrid(node.x), y: snapToGrid(node.y) } : node
       ));
    }
    setDraggedNodeId(null);
    setResizingNodeId(null);
    setIsDraggingCanvas(false);
  };

  // 3. Connection Logic
  const handleConnectClick = (nodeId) => {
    if (connectSourceId === null) {
      setConnectSourceId(nodeId);
    } else {
      if (connectSourceId !== nodeId) {
        // Prevent duplicate edges
        const exists = edges.some(
          edge => (edge.source === connectSourceId && edge.target === nodeId) ||
                  (edge.source === nodeId && edge.target === connectSourceId)
        );
        
        if (!exists) {
          setEdges(prev => [...prev, { id: generateId(), source: connectSourceId, target: nodeId }]);
        }
      }
      setConnectSourceId(null);
    }
  };

  // 4. Utility
  const handleDeleteNode = () => {
    if (selectedNodeId) {
      setNodes(prev => prev.filter(n => n.id !== selectedNodeId));
      setEdges(prev => prev.filter(e => e.source !== selectedNodeId && e.target !== selectedNodeId));
      setSelectedNodeId(null);
    }
  };

  const handleClear = () => {
    if(window.confirm("모든 캔버스를 초기화하시겠습니까?")) {
        setNodes([]);
        setEdges([]);
        setPan({x: 0, y: 0});
    }
  };

  const handleUpdateLabel = (id, newLabel) => {
    setNodes(prev => prev.map(n => n.id === id ? { ...n, label: newLabel } : n));
  };

  // --- Render Helpers ---

  // Sort nodes so containers render behind services
  const sortedNodes = [...nodes].sort((a, b) => {
      const catA = a.category === 'container' ? 0 : 1;
      const catB = b.category === 'container' ? 0 : 1;
      return catA - catB;
  });

  const getComponentDef = (type) => COMPONENT_TYPES.find(c => c.type === type);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-800" onMouseUp={handleMouseUp} onMouseMove={handleMouseMove}>
      
      {/* Header */}
      <header className="h-14 bg-white border-b border-gray-200 flex items-center justify-between px-4 shadow-sm z-30">
        <div className="flex items-center gap-2">
          <div className="bg-indigo-600 p-1.5 rounded text-white">
            <Cloud size={18} fill="currentColor" />
          </div>
          <h1 className="font-bold text-base tracking-tight text-slate-700">AWS Architecture Pro</h1>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 p-1 rounded-lg border border-slate-200">
            <button 
              onClick={() => { setMode('select'); setConnectSourceId(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'select' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <MousePointer2 size={14} />
              이동/편집
            </button>
            <button 
              onClick={() => { setMode('connect'); setSelectedNodeId(null); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-bold transition-all ${mode === 'connect' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Cable size={14} />
              연결 (화살표)
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2">
            <button onClick={handleClear} className="p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors" title="Clear">
                <Trash2 size={16} />
            </button>
             <button 
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 text-white rounded-md text-xs font-medium hover:bg-slate-700 transition-colors shadow-sm"
            >
                <Download size={14} />
                저장
            </button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside className="w-60 bg-white border-r border-gray-200 flex flex-col z-20 overflow-y-auto">
          
          {/* Section: Containers */}
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Containers (Areas)</h2>
            <div className="grid grid-cols-1 gap-2">
              {COMPONENT_TYPES.filter(c => c.category === 'container').map((comp) => (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('nodeType', comp.type)}
                  className="flex items-center gap-3 p-2 rounded-lg border border-gray-100 cursor-grab hover:bg-indigo-50 hover:border-indigo-200 transition-all group"
                >
                  <comp.icon className={`w-5 h-5 text-gray-500 group-hover:text-indigo-600`} />
                  <span className="text-xs font-medium text-gray-600">{comp.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Section: Services */}
          <div className="p-4">
            <h2 className="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-3">Services</h2>
            <div className="grid grid-cols-3 gap-2">
              {COMPONENT_TYPES.filter(c => c.category === 'service').map((comp) => (
                <div
                  key={comp.type}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('nodeType', comp.type)}
                  className="flex flex-col items-center justify-center p-2 rounded-lg border border-gray-100 cursor-grab hover:bg-orange-50 hover:border-orange-200 transition-all aspect-square"
                >
                  <comp.icon className={`w-6 h-6 mb-1 ${comp.color.split(' ')[0]}`} />
                  <span className="text-[9px] text-gray-500 text-center leading-tight">{comp.label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-auto p-4 bg-slate-50 border-t border-gray-100">
              <p className="text-[10px] text-gray-400 leading-relaxed">
                  Tip: <strong>영역 박스</strong>를 먼저 배치하고 그 위에 서비스를 올리세요. 박스 우측 하단을 드래그하여 크기를 조절할 수 있습니다.
              </p>
          </div>
        </aside>

        {/* Canvas Area */}
        <main className="flex-1 relative bg-slate-100 overflow-hidden">
            
          {/* Grid Pattern */}
          <div 
            className="absolute inset-0 pointer-events-none opacity-[0.1]"
            style={{
                backgroundImage: `linear-gradient(#94a3b8 1px, transparent 1px), linear-gradient(90deg, #94a3b8 1px, transparent 1px)`,
                backgroundSize: `${SNAP_GRID * 2}px ${SNAP_GRID * 2}px`,
                transform: `translate(${pan.x}px, ${pan.y}px)`
            }}
          />

          <div 
            ref={canvasRef}
            className="w-full h-full relative"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onMouseDown={(e) => handleMouseDown(e, null)}
            style={{ 
                cursor: isDraggingCanvas ? 'grabbing' : mode === 'connect' ? 'crosshair' : 'default' 
            }}
          >
            <div style={{ transform: `translate(${pan.x}px, ${pan.y}px)`, width: '100%', height: '100%', position: 'absolute' }}>
                
                {/* Connections Layer (SVG) */}
                <svg className="absolute top-0 left-0 overflow-visible w-full h-full pointer-events-none z-0">
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="28" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
                    </marker>
                    {/* Ghost marker for connection preview */}
                    <marker id="arrowhead-ghost" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#f97316" />
                    </marker>
                  </defs>

                  {edges.map((edge) => {
                    const source = nodes.find(n => n.id === edge.source);
                    const target = nodes.find(n => n.id === edge.target);
                    if (!source || !target) return null;

                    const sx = source.x + source.w / 2;
                    const sy = source.y + source.h / 2;
                    const tx = target.x + target.w / 2;
                    const ty = target.y + target.h / 2;

                    return (
                      <g key={edge.id}>
                          <line 
                            x1={sx} y1={sy} x2={tx} y2={ty} 
                            stroke="#64748b" 
                            strokeWidth="2" 
                            markerEnd="url(#arrowhead)"
                          />
                      </g>
                    );
                  })}
                  
                  {/* Connection Preview Line */}
                  {mode === 'connect' && connectSourceId && (
                      // Note: Real-time mouse tracking for line preview requires more state, omitted for cleanliness in this version
                      // Just highlight source node visually
                      null
                  )}
                </svg>

                {/* Nodes Layer */}
                {sortedNodes.map((node) => {
                    const isSelected = selectedNodeId === node.id;
                    const isConnectSource = connectSourceId === node.id;
                    const comp = getComponentDef(node.type);
                    const isContainer = node.category === 'container';

                    return (
                        <div
                            key={node.id}
                            onMouseDown={(e) => handleMouseDown(e, node.id)}
                            style={{
                                transform: `translate(${node.x}px, ${node.y}px)`,
                                width: node.w,
                                height: node.h,
                                zIndex: isContainer ? 1 : 10 // Containers lower z-index
                            }}
                            className={`absolute group flex flex-col ${isContainer ? 'items-start justify-start' : 'items-center justify-center'}`}
                        >
                            {/* The Node Box itself */}
                            <div className={`
                                w-full h-full relative transition-shadow duration-200
                                ${isContainer ? `rounded-md border ${comp.color}` : `rounded-xl shadow-sm border border-gray-200 bg-white hover:shadow-md`}
                                ${isSelected ? 'ring-2 ring-indigo-500 border-transparent shadow-lg' : ''}
                                ${isConnectSource ? 'ring-2 ring-orange-500 border-orange-500 shadow-lg' : ''}
                            `}>
                                
                                {/* Container Label */}
                                {isContainer && (
                                    <div className="px-3 py-1.5 flex items-center gap-2">
                                        <comp.icon className="w-4 h-4 opacity-50" />
                                        <input
                                            type="text"
                                            value={node.label}
                                            onChange={(e) => handleUpdateLabel(node.id, e.target.value)}
                                            className="bg-transparent text-sm font-bold text-slate-600 outline-none w-full placeholder-gray-400"
                                            placeholder="Label"
                                        />
                                    </div>
                                )}

                                {/* Service Icon & Label */}
                                {!isContainer && (
                                    <div className="flex flex-col items-center justify-center w-full h-full p-2">
                                        <comp.icon className={`w-8 h-8 mb-1 ${comp.color.split(' ')[0]}`} />
                                        <input
                                            type="text"
                                            value={node.label}
                                            onChange={(e) => handleUpdateLabel(node.id, e.target.value)}
                                            className="text-[10px] font-medium text-center bg-transparent border-none focus:ring-0 w-full outline-none text-slate-600"
                                        />
                                    </div>
                                )}

                                {/* Resize Handle (Only for Containers) */}
                                {isContainer && isSelected && (
                                    <div
                                        onMouseDown={(e) => handleMouseDown(e, node.id, 'resize')}
                                        className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize flex items-center justify-center text-indigo-400 hover:text-indigo-600 z-50"
                                    >
                                        <Maximize2 size={12} className="transform rotate-90" />
                                    </div>
                                )}

                                {/* Delete Button (Only visible when selected) */}
                                {isSelected && (
                                    <button 
                                        onClick={(e) => { e.stopPropagation(); handleDeleteNode(); }}
                                        className="absolute -top-2 -right-2 bg-white text-red-500 border border-gray-200 rounded-full p-1.5 shadow-sm hover:bg-red-50 z-50"
                                        title="Delete"
                                    >
                                        <Trash2 size={10} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
          </div>
        </main>
      </div>
      
      {/* Footer Info */}
      <div className="fixed bottom-4 right-4 bg-white/90 backdrop-blur border border-gray-200 p-3 rounded-lg shadow-lg text-xs z-40 pointer-events-none">
          <div className="flex items-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
              <span className="font-semibold text-slate-700">모드: {mode === 'select' ? '선택 및 편집' : '연결 (화살표)'}</span>
          </div>
          <div className="text-slate-500">
              {mode === 'select' ? '영역 박스 크기 조절 가능' : '두 요소를 클릭하여 연결'}
          </div>
      </div>
    </div>
  );
}
