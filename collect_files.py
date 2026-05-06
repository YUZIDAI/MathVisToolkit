import os

# ===== 扫描整个项目，收集所有代码文件 =====
project_path = r"D:\learning\math\MathVisToolkit"

# 根据你的目录树，列出所有代码文件
target_files = [
    # 根目录
    'index.html',
    'lab.html',
    'package.json',
    'README.md',
    # CSS
    'style.css',
    # JS
    'common.js',
    'tangent.js',
    # Pages
    'tangent.html',
    'integral.html',
    'polar.html',
    'taylor.html',
    'multivar.html',
]

output_file = 'for_deepseek.txt'
# ========================

print("🔍 正在扫描文件...")
found_count = 0

with open(output_file, 'w', encoding='utf-8') as outfile:
    for filename in target_files:
        found = False
        for root, dirs, files in os.walk(project_path):
            if filename in files:
                filepath = os.path.join(root, filename)
                outfile.write(f"### 文件: {filename}\n")
                outfile.write(f"### 路径: {filepath}\n\n")
                try:
                    with open(filepath, 'r', encoding='utf-8') as infile:
                        content = infile.read()
                    outfile.write(content)
                    outfile.write("\n\n" + "=" * 50 + "\n\n")
                    found = True
                    found_count += 1
                except Exception as e:
                    outfile.write(f"[读取出错: {e}]\n\n")
                break
        if not found:
            print(f"  ⚠️ 未找到: {filename}")

print(f"\n✅ 完成！共收集 {found_count} 个文件")
print(f"📄 输出文件: {os.path.join(project_path, output_file)}")
print("👉 用记事本打开它，全选复制，粘贴给 DeepSeek 即可")