/**
 * MathVisLab — 公共工具函数库
 * @version 1.1 - 修复语法错误
 */
(function(window) {
    'use strict';

    // ==================== compileExpr ====================
    function compileExpr(expr) {
        if (!expr || typeof expr !== 'string') return null;
        var processed = expr.trim()
            .replace(/(?<![a-zA-Z])e(?![a-zA-Z0-9_])/g, '(Math.E)')
            .replace(/(?<![a-zA-Z])pi(?![a-zA-Z])/g, '(Math.PI)')
            .replace(/\^/g, '**')
            .replace(/abs/g, 'Math.abs')
            .replace(/floor/g, 'Math.floor')
            .replace(/ceil/g, 'Math.ceil')
            .replace(/cbrt/g, 'Math.cbrt')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            .replace(/sinh/g, 'Math.sinh')
            .replace(/cosh/g, 'Math.cosh')
            .replace(/tanh/g, 'Math.tanh')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/ln/g, 'Math.log')
            .replace(/(?<!Math\.)log(?![10])/g, 'Math.log10');
        processed = processed
            .replace(/(?<![a-zA-Z])y(?![a-zA-Z])/g, 'x')
            .replace(/(?<![a-zA-Z])t(?![a-zA-Z])/g, 'x')
            .replace(/(?<![a-zA-Z])a(?![a-zA-Z])/g, 'x');
        try {
            return new Function('x', 'try { return (' + processed + '); } catch(e) { return NaN; }');
        } catch (e) {
            console.error('[common] 编译失败:', expr, e.message);
            return null;
        }
    }

    // ==================== compilePolarExpr ====================
    function compilePolarExpr(expr) {
        if (!expr || typeof expr !== 'string') return null;
        var processed = expr.trim()
            .replace(/(?<![a-zA-Z])e(?![a-zA-Z0-9_])/g, '(Math.E)')
            .replace(/(?<![a-zA-Z])pi(?![a-zA-Z])/g, '(Math.PI)')
            .replace(/\^/g, '**')
            .replace(/abs/g, 'Math.abs')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/cbrt/g, 'Math.cbrt')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            .replace(/sinh/g, 'Math.sinh')
            .replace(/cosh/g, 'Math.cosh')
            .replace(/tanh/g, 'Math.tanh')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/ln/g, 'Math.log')
            .replace(/(?<!Math\.)log(?![10])/g, 'Math.log10')
            .replace(/theta/g, '(theta)');
        console.log('[compilePolarExpr] 处理后:', processed);
        try {
            var fn = new Function('theta', 'k', 'A', 'phi',
                'try { return A*(' + processed + '); } catch(e) { return NaN; }');
            var testResult = fn(0, 2, 1, 0);
            console.log('[compilePolarExpr] 测试 f(0,2,1,0)=', testResult);
            return fn;
        } catch (e) {
            console.error('[common] 极坐标编译失败:', expr, e.message);
            return null;
        }
    }

    // ==================== compileBinaryExpr ====================
    function compileBinaryExpr(expr) {
        if (!expr || typeof expr !== 'string') return null;
        var processed = expr.trim()
            .replace(/(?<![a-zA-Z])e(?![a-zA-Z0-9_])/g, '(Math.E)')
            .replace(/(?<![a-zA-Z])pi(?![a-zA-Z])/g, '(Math.PI)')
            .replace(/\^/g, '**')
            .replace(/abs/g, 'Math.abs')
            .replace(/floor/g, 'Math.floor')
            .replace(/ceil/g, 'Math.ceil')
            .replace(/cbrt/g, 'Math.cbrt')
            .replace(/sqrt/g, 'Math.sqrt')
            .replace(/asin/g, 'Math.asin')
            .replace(/acos/g, 'Math.acos')
            .replace(/atan/g, 'Math.atan')
            .replace(/sinh/g, 'Math.sinh')
            .replace(/cosh/g, 'Math.cosh')
            .replace(/tanh/g, 'Math.tanh')
            .replace(/sin/g, 'Math.sin')
            .replace(/cos/g, 'Math.cos')
            .replace(/tan/g, 'Math.tan')
            .replace(/exp/g, 'Math.exp')
            .replace(/ln/g, 'Math.log')
            .replace(/(?<!Math\.)log(?![10])/g, 'Math.log10');
        try {
            return new Function('x', 'y', 'try { return (' + processed + '); } catch(e) { return NaN; }');
        } catch (e) {
            console.error('[common] 二元编译失败:', expr, e.message);
            return null;
        }
    }

    // ==================== bidirectionalColor ====================
    function bidirectionalColor(normalizedValue) {
        var v = Math.max(-1, Math.min(1, normalizedValue));
        if (v >= 0) {
            return [255, Math.round(255 - 205 * v), Math.round(255 - 255 * v)];
        } else {
            var a = Math.abs(v);
            return [Math.round(255 - 255 * a), Math.round(255 - 205 * a), 255];
        }
    }

    // ==================== numericalDerivative ====================
    function numericalDerivative(fn, x, h) {
        h = h || 1e-7;
        return (fn(x + h) - fn(x - h)) / (2 * h);
    }

    // ==================== createCoordinateTransformer ====================
    function createCoordinateTransformer(xMin, xMax, yMin, yMax, cW, cH) {
        return {
            toCanvasX: function(mx) { return ((mx - xMin) / (xMax - xMin)) * cW; },
            toCanvasY: function(my) { return cH - ((my - yMin) / (yMax - yMin)) * cH; },
            toMathX: function(cx) { return xMin + (cx / cW) * (xMax - xMin); },
            toMathY: function(cy) { return yMax - (cy / cH) * (yMax - yMin); },
            updateRange: function(a,b,c,d) { xMin=a; xMax=b; yMin=c; yMax=d; },
            updateSize: function(w,h) { cW=w; cH=h; }
        };
    }

    // ==================== setupHiDPICanvas ====================
    function setupHiDPICanvas(canvas, ctx) {
        var dpr = window.devicePixelRatio || 1;
        var rect = canvas.getBoundingClientRect();
        var W = rect.width, H = rect.height;
        if (canvas.width !== W * dpr || canvas.height !== H * dpr) {
            canvas.width = W * dpr;
            canvas.height = H * dpr;
            canvas.style.width = W + 'px';
            canvas.style.height = H + 'px';
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(dpr, dpr);
        }
        return { W: W, H: H, dpr: dpr };
    }

    // ==================== heatmapColor ====================
    function heatmapColor(t) {
        t = Math.max(0, Math.min(1, t));
        if (t < 0.3) { var s = t / 0.3; return [Math.round(0+100*s), Math.round(80+120*s), 255]; }
        if (t < 0.6) { var s = (t-0.3)/0.3; return [Math.round(100+155*s), Math.round(200+55*s), Math.round(255-255*s)]; }
        var s = (t-0.6)/0.4; return [255, Math.round(255-155*s), 0];
    }

    // ==================== rainbowHSL ====================
    function rainbowHSL(theta, s, l) {
        var hue = ((theta % (2 * Math.PI)) / (2 * Math.PI)) * 360;
        s = s || 90; l = l || 60;
        return 'hsl(' + hue + ', ' + s + '%, ' + l + '%)';
    }

    // ==================== curveLength ====================
    function curveLength(points) {
        var len = 0;
        for (var i = 0; i < points.length - 1; i++) {
            var dx = points[i+1].x - points[i].x;
            var dy = points[i+1].y - points[i].y;
            len += Math.sqrt(dx*dx + dy*dy);
        }
        return len;
    }

    // ==================== debounce ====================
    function debounce(fn, delay) {
        var timer = null;
        return function() {
            var self = this, args = arguments;
            clearTimeout(timer);
            timer = setTimeout(function() { fn.apply(self, args); }, delay);
        };
    }

    // ==================== getPassedFunction ====================
    function getPassedFunction() {
        var params = new URLSearchParams(window.location.search);
        var func = params.get('func');
        return func ? decodeURIComponent(func) : null;
    }

    // ==================== Storage ====================
    function saveToStorage(key, value) {
        try { localStorage.setItem(key, JSON.stringify(value)); } catch(e) {}
    }
    function loadFromStorage(key, defaultValue) {
        try { var raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : defaultValue; } catch(e) { return defaultValue; }
    }

    // ==================== 导出 ====================
    window.Common = {
        compileExpr: compileExpr,
        compilePolarExpr: compilePolarExpr,
        compileBinaryExpr: compileBinaryExpr,
        numericalDerivative: numericalDerivative,
        createCoordinateTransformer: createCoordinateTransformer,
        setupHiDPICanvas: setupHiDPICanvas,
        heatmapColor: heatmapColor,
        bidirectionalColor: bidirectionalColor,
        rainbowHSL: rainbowHSL,
        curveLength: curveLength,
        debounce: debounce,
        getPassedFunction: getPassedFunction,
        saveToStorage: saveToStorage,
        loadFromStorage: loadFromStorage
    };

    console.log('[common.js] 公共工具库已加载');
})(window);