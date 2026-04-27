// 全局变量
let board, f, point, tangentLine;
let currentFunc = 'x^3-3*x';

// 数学函数解析器
function parseFunction(expr) {
    // 预处理：替换常见数学符号
    expr = expr.replace(/\^/g, '**');  // x^3 → x**3
    
    // 支持的函数列表
    const math = {
        sin: Math.sin,
        cos: Math.cos,
        tan: Math.tan,
        exp: Math.exp,
        log: Math.log,
        sqrt: Math.sqrt,
        abs: Math.abs,
        PI: Math.PI,
        E: Math.E
    };
    
    try {
        // 创建函数（使用Function构造函数，注意安全性）
        return new Function('x', `
            const { sin, cos, tan, exp, log, sqrt, abs, PI, E } = Math;
            try {
                return ${expr};
            } catch(e) {
                return NaN;
            }
        `);
    } catch (e) {
        console.error('函数解析错误:', e);
        return null;
    }
}

// 数值导数计算
function derivative(fn, x, h = 0.0001) {
    return (fn(x + h) - fn(x - h)) / (2 * h);
}

// 初始化图形
function initBoard() {
    board = JXG.JSXGraph.initBoard('box', {
        boundingbox: [-5, 10, 5, -10],
        axis: true,
        showCopyright: false,
        showNavigation: true,
        zoom: {
            factorX: 1.2,
            factorY: 1.2,
            wheel: true,
            pinchHorizontal: true,
            pinchVertical: true
        },
        pan: {
            enabled: true,
            needTwoFingers: true
        }
    });
    
    // 添加网格
    board.create('grid', [], { 
        strokeColor: '#e0e0e0', 
        strokeWidth: 0.5,
        dash: 2 
    });
    
    updateFunction();
}

// 更新函数
function updateFunction() {
    let fn = parseFunction(currentFunc);
    if (!fn) {
        alert('函数表达式无效！\n支持：sin, cos, tan, exp, log, sqrt, abs\n运算符：+ - * / ^');
        return;
    }
    
    // 清除旧的对象
    if (f) board.removeObject(f);
    if (point) board.removeObject(point);
    if (tangentLine) board.removeObject(tangentLine);
    
    // 绘制函数曲线
    f = board.create('functiongraph', [fn, -5, 5], {
        strokeColor: '#2c3e50',
        strokeWidth: 2.5,
        name: 'f(x)'
    });
    
    // 创建可拖动的点（初始位置x=1.5）
    let initX = 1.5;
    if (currentFunc === 'log(x)') initX = 2;  // ln(x)需要x>0
    if (currentFunc === 'sqrt(x)') initX = 1;
    
    point = board.create('glider', [initX, fn(initX), f], {
        name: '',
        color: '#e74c3c',
        size: 5,
        fillColor: '#e74c3c',
        highlight: true,
        showInfobox: false
    });
    
    // 创建切线（初始）
    updateTangent(fn);
    
    // 绑定拖动事件
    point.on('drag', function() {
        updateTangent(fn);
    });
    
    // 更新显示
    updateInfo(fn);
}

// 更新切线
function updateTangent(fn) {
    let x0 = point.X();
    let y0 = fn(x0);
    let m = derivative(fn, x0);
    
    // 删除旧切线
    if (tangentLine) {
        board.removeObject(tangentLine);
    }
    
    // 画切线线段（从x0-1到x0+1）
    let x1 = x0 - 1.5;
    let y1 = y0 - m * 1.5;
    let x2 = x0 + 1.5;
    let y2 = y0 + m * 1.5;
    
    tangentLine = board.create('line', [[x1, y1], [x2, y2]], {
        strokeColor: '#e74c3c',
        strokeWidth: 2,
        dash: 2,
        name: ''
    });
    
    updateInfo(fn);
}

// 更新信息面板
function updateInfo(fn) {
    let x0 = point.X();
    let y0 = fn(x0);
    let m = derivative(fn, x0);
    
    document.getElementById('xCoord').textContent = x0.toFixed(4);
    document.getElementById('yCoord').textContent = y0.toFixed(4);
    document.getElementById('slope').textContent = m.toFixed(4);
    
    let b = y0 - m * x0;
    let eq = `y = ${m >= 0 ? '' : '-'}${Math.abs(m).toFixed(2)}x ${b >= 0 ? '+' : '-'} ${Math.abs(b).toFixed(2)}`;
    document.getElementById('tangentEq').textContent = eq;
}

// 切换函数
function changeFunction() {
    let select = document.getElementById('funcSelect');
    let customDiv = document.getElementById('customInput');
    
    if (select.value === 'custom') {
        customDiv.style.display = 'block';
        return;
    }
    
    customDiv.style.display = 'none';
    currentFunc = select.value;
    updateFunction();
}

// 重置点位置
function resetPoint() {
    let fn = parseFunction(currentFunc);
    if (!fn) return;
    
    let initX = 1.5;
    if (currentFunc === 'log(x)') initX = 1;
    if (currentFunc === 'sqrt(x)') initX = 1;
    
    point.setPosition(JXG.COORDS_BY_USER, [initX, fn(initX)]);
    updateTangent(fn);
}

// 页面加载完成后初始化
window.addEventListener('load', initBoard);