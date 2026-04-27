/**
 * MathVisLab — 公共工具函数库
 * 包含表达式编译、数值微分、坐标转换、颜色映射等
 * @version 1.0
 */
(function(window) {
    'use strict';

    // ==================== 数学表达式编译 ====================
    /**
     * 将用户输入的数学表达式编译为可执行函数
     * @param {string} expr - 如 "sin(x)" 或 "x^3-3*x"
     * @returns {Function|null} 可调用的 f(x) 函数，失败返回 null
     */
    function compileExpr(expr) {
        if (!expr || typeof expr !== 'string') return null;

        let processed = expr.trim()
            // 幂运算
            .replace(/\^/g, '**')
            // 常量
            .replace(/(?<![a-zA-Z])pi(?![a-zA-Z])/g, '(Math.PI)')
            .replace(/(?<![a-zA-Z])e(?![a-zA-Z+\-^*\/()])/g, '(Math.E)')
            // 通用函数
            .replace(/abs/g, 'Math.abs')
            .replace(/floor/g, 'Math.floor')
            .replace(/ceil/g, 'Math.ceil')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/cbrt/g, 'Math.cbrt')
            // 反三角函数（必须在三角函数之前替换）
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            // 双曲函数
            .replace(/sinh/g, 'Math.sinh')
            .replace(/cosh/g, 'Math.cosh')
            .replace(/tanh/g, 'Math.tanh')
            // 三角函数
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            // 指数对数
            .replace(/exp/g, 'Math.exp')
            .replace(/ln/g, 'Math.log')
            .replace(/log/g, 'Math.log10');

        // 处理 y, t, a 等变量（映射为 x）
        processed = processed
            .replace(/(?<![a-zA-Z])y(?![a-zA-Z])/g, 'x')
            .replace(/(?<![a-zA-Z])t(?![a-zA-Z])/g, 'x')
            .replace(/(?<![a-zA-Z])a(?![a-zA-Z])/g, 'x');

        try {
            return new Function('x', `try { return (${processed}); } catch(e) { return NaN; }`);
        } catch (e) {
            console.error('[common] 表达式编译失败:', expr, e.message);
            return null;
        }
    }

    /**
     * 编译极坐标表达式 r = f(θ)，支持额外的参数 k, A, φ
     * @param {string} expr - 如 "cos(k*theta)"
     * @returns {Function|null} 可调用的 r(theta, k, A, phi) 函数
     */
    function compilePolarExpr(expr) {
        if (!expr || typeof expr !== 'string') return null;

        let processed = expr.trim()
            .replace(/\^/g, '**')
            .replace(/theta/g, '(theta)')
            .replace(/(?<![a-zA-Z])pi(?![a-zA-Z])/g, '(Math.PI)')
            .replace(/(?<![a-zA-Z])e(?![a-zA-Z+\-^*\/()])/g, '(Math.E)')
            .replace(/abs/g, 'Math.abs')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/cbrt/g, 'Math.cbrt')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/ln/g, 'Math.log')
            .replace(/log/g, 'Math.log10');

        try {
            return new Function('theta', 'k', 'A', 'phi',
                `try { return A*(${processed}); } catch(e) { return NaN; }`);
        } catch (e) {
            console.error('[common] 极坐标表达式编译失败:', expr, e.message);
            return null;
        }
    }

    // ==================== 数值微分 ====================
    /**
     * 使用中心差分计算 f'(x)
     * @param {Function} fn - 原函数
     * @param {number} x - 求导点
     * @param {number} h - 步长（默认1e-7）
     * @returns {number} 导数值
     */
    function numericalDerivative(fn, x, h) {
        h = h || 1e-7;
        return (fn(x + h) - fn(x - h)) / (2 * h);
    }

    // ==================== Canvas 坐标转换工具 ====================
    /**
     * 创建坐标转换器
     * @param {number} xMin - 视口左边界
     * @param {number} xMax - 视口右边界
     * @param {number} yMin - 视口下边界
     * @param {number} yMax - 视口上边界
     * @param {number} canvasW - Canvas 宽度
     * @param {number} canvasH - Canvas 高度
     * @returns {Object} 包含 toCanvasX, toCanvasY, toMathX, toMathY 方法
     */
    function createCoordinateTransformer(xMin, xMax, yMin, yMax, canvasW, canvasH) {
        return {
            toCanvasX: function(mathX) {
                return ((mathX - xMin) / (xMax - xMin)) * canvasW;
            },
            toCanvasY: function(mathY) {
                return canvasH - ((mathY - yMin) / (yMax - yMin)) * canvasH;
            },
            toMathX: function(canvasX) {
                return xMin + (canvasX / canvasW) * (xMax - xMin);
            },
            toMathY: function(canvasY) {
                return yMax - (canvasY / canvasH) * (yMax - yMin);
            },
            updateRange: function(nxMin, nxMax, nyMin, nyMax) {
                xMin = nxMin;
                xMax = nxMax;
                yMin = nyMin;
                yMax = nyMax;
            },
            updateSize: function(w, h) {
                canvasW = w;
                canvasH = h;
            }
        };
    }

    // ==================== Canvas 高清适配 ====================
    function setupHiDPICanvas(canvas, ctx) {
        const dpr = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();
        const W = rect.width;
        const H = rect.height;

        if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }

        return { W, H, dpr };
    }

    // ==================== 颜色工具 ====================
    /**
     * 误差热力图颜色映射（对数尺度）
     * @param {number} t - 归一化值 [0, 1]
     * @returns {number[]} [r, g, b]
     */
    function heatmapColor(t) {
        t = Math.max(0, Math.min(1, t));
        if (t < 0.3) {
            const s = t / 0.3;
            return [Math.round(0 + 100 * s), Math.round(80 + 120 * s), 255];
        }
        if (t < 0.6) {
            const s = (t - 0.3) / 0.3;
            return [Math.round(100 + 155 * s), Math.round(200 + 55 * s), Math.round(255 - 255 * s)];
        }
        const s = (t - 0.6) / 0.4;
        return [255, Math.round(255 - 155 * s), 0];
    }

    /**
     * HSL 彩虹色（用于极坐标曲线）
     * @param {number} theta - 角度 [0, 2π]
     * @param {number} saturation - 饱和度 (默认90)
     * @param {number} lightness - 亮度 (默认60)
     * @returns {string} CSS 颜色字符串
     */
    function rainbowHSL(theta, saturation, lightness) {
        const hue = ((theta % (2 * Math.PI)) / (2 * Math.PI)) * 360;
        const s = saturation || 90;
        const l = lightness || 60;
        return `hsl(${hue}, ${s}%, ${l}%)`;
    }

    // ==================== 曲线长度与面积（数值积分） ====================
    /**
     * 计算参数曲线的近似长度
     * @param {Array<{x:number,y:number}>} points - 采样点数组
     * @returns {number}
     */
    function curveLength(points) {
        let len = 0;
        for (let i = 0; i < points.length - 1; i++) {
            const dx = points[i + 1].x - points[i].x;
            const dy = points[i + 1].y - points[i].y;
            len += Math.sqrt(dx * dx + dy * dy);
        }
        return len;
    }

    // ==================== 防抖函数 ====================
    function debounce(fn, delay) {
        let timer = null;
        return function(...args) {
            clearTimeout(timer);
            timer = setTimeout(() => fn.apply(this, args), delay);
        };
    }

    // ==================== URL 参数读取 ====================
    /**
     * 从 URL 读取传递的函数参数
     * @returns {string|null} 函数表达式
     */
    function getPassedFunction() {
        const params = new URLSearchParams(window.location.search);
        const func = params.get('func');
        return func ? decodeURIComponent(func) : null;
    }

    // ==================== 局部存储 ====================
    function saveToStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
    }

    function loadFromStorage(key, defaultValue) {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    }

    // ==================== 导出全局 ====================
    const Common = {
        compileExpr,
        compilePolarExpr,
        numericalDerivative,
        createCoordinateTransformer,
        setupHiDPICanvas,
        heatmapColor,
        rainbowHSL,
        curveLength,
        debounce,
        getPassedFunction,
        saveToStorage,
        loadFromStorage
    };

    window.Common = Common;

    console.log('[common.js] 公共工具库已加载');
})(window);