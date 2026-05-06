#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""综合修复：主题统一、灵敏度、背景色、网格线、overlay适配"""

# ==================== P0-1: multivar.html --bg统一 ====================
mv_path = r'D:\learning\math\MathVisToolkit\pages\multivar.html'
with open(mv_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('--bg: #080818;', '--bg: #0b0b1a;')
with open(mv_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ P0-1: multivar --bg 已统一')

# ==================== P0-2: 降低旋转灵敏度 ====================
with open(mv_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace('angleZ = dragStartAZ - dx * 0.002;', 'angleZ = dragStartAZ - dx * 0.0012;')
content = content.replace('angleX = dragStartAX + dy * 0.002;', 'angleX = dragStartAX + dy * 0.0012;')
content = content.replace('velocityX *= 0.92;', 'velocityX *= 0.90;')
content = content.replace('velocityZ *= 0.92;', 'velocityZ *= 0.90;')
with open(mv_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ P0-2: 旋转灵敏度已降低')

# ==================== P0-3: integral.html 硬编码背景 ====================
int_path = r'D:\learning\math\MathVisToolkit\pages\integral.html'
with open(int_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    "ctx.fillStyle = '#0d1117';\n            ctx.fillRect(0, 0, W, graphH);",
    "var isLight = document.documentElement.getAttribute('data-theme') === 'light';\n            ctx.fillStyle = isLight ? '#ffffff' : '#0d1117';\n            ctx.fillRect(0, 0, W, graphH);"
)
content = content.replace(
    "ctx.fillStyle = '#0a0a18';\n            ctx.fillRect(0, 0, W, H);",
    "var isLight2 = document.documentElement.getAttribute('data-theme') === 'light';\n            ctx.fillStyle = isLight2 ? '#f0f0f0' : '#0a0a18';\n            ctx.fillRect(0, 0, W, H);"
)
# 修复 integral 第一次出现的 isLight 重复声明
content = content.replace('var isLight2 =', 'var isLight =')
# 修复网格颜色
content = content.replace(
    "ctx.strokeStyle = '#1a1a30';",
    "ctx.strokeStyle = isLight ? '#e0e0e0' : '#1a1a30';"
)
content = content.replace(
    "ctx.strokeStyle = '#888';\n            ctx.lineWidth = 1.5;\n            const axisY = toCanvasY(0, graphH);",
    "ctx.strokeStyle = isLight ? '#bbb' : '#888';\n            ctx.lineWidth = 1.5;\n            const axisY = toCanvasY(0, graphH);"
)
with open(int_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ P0-3: integral 硬编码背景已修复')

# ==================== P0-4: polar.html 硬编码背景 ====================
pol_path = r'D:\learning\math\MathVisToolkit\pages\polar.html'
with open(pol_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    "ctx.fillStyle = '#0d1117';\n        ctx.fillRect(0, 0, W, H);",
    "var isLight = document.documentElement.getAttribute('data-theme') === 'light';\n        ctx.fillStyle = isLight ? '#ffffff' : '#0d1117';\n        ctx.fillRect(0, 0, W, H);"
)
content = content.replace(
    "ctx.fillStyle = '#0a0a18';\n        ctx.fillRect(0, 0, W, H);",
    "var isLight2 = document.documentElement.getAttribute('data-theme') === 'light';\n        ctx.fillStyle = isLight2 ? '#f0f0f0' : '#0a0a18';\n        ctx.fillRect(0, 0, W, H);"
)
# polar 坐标轴颜色
content = content.replace(
    "ctx.strokeStyle = '#444';\n        ctx.lineWidth = 1;\n        const axisY = pad.top + ph / 2;",
    "ctx.strokeStyle = isLight2 ? '#ccc' : '#444';\n        ctx.lineWidth = 1;\n        const axisY = pad.top + ph / 2;"
)
content = content.replace(
    "ctx.fillStyle = '#888';\n        ctx.font = '9px",
    "ctx.fillStyle = isLight2 ? '#666' : '#888';\n        ctx.font = '9px"
)
with open(pol_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ P0-4: polar 硬编码背景已修复')

# ==================== P0-5: taylor.html 网格和背景 ====================
tay_path = r'D:\learning\math\MathVisToolkit\pages\taylor.html'
with open(tay_path, 'r', encoding='utf-8') as f:
    content = f.read()
content = content.replace(
    "ctx.fillStyle = '#0d1117';\n            ctx.fillRect(0, 0, W, graphH);",
    "var isLight = document.documentElement.getAttribute('data-theme') === 'light';\n            ctx.fillStyle = isLight ? '#ffffff' : '#0d1117';\n            ctx.fillRect(0, 0, W, graphH);"
)
content = content.replace(
    "ctx.strokeStyle = '#1a1a30';",
    "ctx.strokeStyle = isLight ? '#e0e0e0' : '#1a1a30';"
)
content = content.replace(
    "ctx.strokeStyle = '#888';\n            ctx.lineWidth = 1.5;\n            ctx.beginPath();\n            ctx.moveTo(0, axisY);",
    "ctx.strokeStyle = isLight ? '#bbb' : '#888';\n            ctx.lineWidth = 1.5;\n            ctx.beginPath();\n            ctx.moveTo(0, axisY);"
)
content = content.replace(
    "ctx.fillStyle = '#aaa';\n            ctx.font = '11px",
    "ctx.fillStyle = isLight ? '#666' : '#aaa';\n            ctx.font = '11px"
)
# 热力图面板背景
content = content.replace(
    '.heatmap-panel {\n            height: 70px;\n            background: #080818;',
    '.heatmap-panel {\n            height: 70px;\n            background: var(--display-bg);'
)
with open(tay_path, 'w', encoding='utf-8') as f:
    f.write(content)
print('✓ P0-5: taylor 网格和背景已修复')

# ==================== P1: 输入框文字颜色 ====================
for path, old, new in [
    (pol_path, '.input-row input { color: #fff;', '.input-row input { color: var(--text);'),
    (mv_path, '.input-row input { color: #fff;', '.input-row input { color: var(--text);'),
    (tay_path, '.param-row input { color: #fff;', '.param-row input { color: var(--text);'),
]:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    if old in c:
        c = c.replace(old, new)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(c)
        print(f'✓ P1: {path.split(chr(92))[-1]} 输入框颜色已修复')

# ==================== P2: 仪表盘数值颜色 ====================
for path in [pol_path, tay_path]:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('.dash-value { color: #fff;', '.dash-value { color: var(--text);')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'✓ P2: {path.split(chr(92))[-1]} 仪表盘颜色已修复')

# ==================== P2: hint-bar 颜色 ====================
for path in [pol_path, mv_path]:
    with open(path, 'r', encoding='utf-8') as f:
        c = f.read()
    c = c.replace('.hint-bar { color: #555;', '.hint-bar { color: var(--text-secondary);')
    c = c.replace('.hint-bar { color: #444;', '.hint-bar { color: var(--text-secondary);')
    with open(path, 'w', encoding='utf-8') as f:
        f.write(c)
    print(f'✓ P2: {path.split(chr(92))[-1]} hint-bar 已修复')

print('\n✅ 全部修复完成！请强制刷新浏览器 (Ctrl+Shift+R)')