# 🌐 MathVisLab — 微积分几何可视化平台

> 工科数学分析课程教学团队 · 2026

## 📖 项目简介

MathVisLab 是一个面向微积分教学的**交互式几何可视化平台**，将抽象的数学概念转化为可拖拽、可探索的动态图形。

### 四大核心工具

| 工具 | 入口 | 功能 |
|:---|:---|:---|
| 📐 **切线斜率探索器** | `pages/tangent.html` | 拖拽红点沿曲线移动，实时观察切线与导数值 |
| ∫ **定积分可视化工具** | `pages/integral.html` | 调节矩形数量（1～100），切换采样模式，观察黎曼和如何收敛 |
| ∞ **泰勒逼近演示器** | `pages/taylor.html` | 可调阶数（0～15），多项式逐阶逼近原函数，并显示误差热力图 |
| ◎ **极坐标函数绘制器** | `pages/polar.html` | 彩虹曲线绘制玫瑰线、心形线、螺线，编织动画展示生长过程 |

---

## 🚀 快速开始

### 方式一：直接打开（最简单）

```bash
# 用浏览器直接打开
lab.html
```

方式二：使用 Live Server（推荐）

```bash
# 安装 Live Server（如已安装 VS Code 插件可跳过）
npm install -g live-server

# 在项目根目录运行
live-server
```

方式三：VS Code Live Server 插件
安装 VS Code 插件 Live Server（作者：Ritwick Dey）

右键 lab.html → Open with Live Server

🧮 支持的函数语法

| 类别 | 语法（示例） |
|---:|:---|
| 基本运算 | + - * / ^ ( )（例如：x^3 - 3*x） |
| 三角函数 | sin(x), cos(x), tan(x) |
| 反三角函数 | asin(x), acos(x), atan(x) |
| 指数与对数 | exp(x), ln(x), log(x) |
| 幂与根 | sqrt(x), cbrt(x) |
| 其他函数 | abs(x), floor(x), ceil(x) |
| 常量 | pi, e |
| 分式 | (分子)/(分母)（例如：(x+1)/(x-1)）

📁 项目结构

MathVisToolkit/
├── index.html                 # 自动重定向到 lab.html
├── lab.html                   # 🏠 统一导航主页（含可折叠函数构建器）
├── README.md                  # 本文件
├── assets/                    # 资源文件（截图、图标等）
├── css/
│   └── style.css              # 全局样式
├── js/
│   ├── tangent.js             # 切线工具核心逻辑
│   ├── integral.js            # 积分工具核心逻辑
│   ├── taylor.js              # 泰勒工具核心逻辑
│   └── polar.js               # 极坐标工具核心逻辑
└── pages/
    ├── tangent.html           # 📐 切线斜率探索器
    ├── integral.html          # ∫ 定积分可视化工具
    ├── taylor.html            # ∞ 泰勒逼近演示器
    └── polar.html             # ◎ 极坐标函数绘制器

🎯 使用流程
打开 lab.html 进入导航主页

在输入框中输入函数表达式（或展开🧮构建器点击按钮构建）

点击「应用」保存函数

点击任意工具卡片，跳转到对应可视化页面

在工具页面中拖拽、缩放、调节参数进行探索

🛠 技术栈
技术	用途
HTML5 Canvas	图形绘制引擎
JSXGraph	交互式数学图形库
Math.js	数学表达式解析与求值
原生 JavaScript	应用逻辑，无框架依赖
CSS3	界面样式，支持深色/浅色主题
📸 截图
（请将截图放入 assets/ 文件夹后更新此处的图片链接）

https://assets/screenshot-tangent.png
https://assets/screenshot-integral.png

📄 许可证
本项目仅用于教学目的。

👨‍🏫 致谢
工科数学分析类课程教学团队
