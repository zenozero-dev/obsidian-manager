# Better Plugins Manager

[English](../README.md)

![GitHub Downloads](https://img.shields.io/github/downloads/zenozero-dev/obsidian-manager/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/zenozero-dev/obsidian-manager)
![Last commit](https://img.shields.io/github/last-commit/zenozero-dev/obsidian-manager)
![Issues](https://img.shields.io/github/issues/zenozero-dev/obsidian-manager)
![Stars](https://img.shields.io/github/stars/zenozero-dev/obsidian-manager?style=social)

![截图](../img/index.png)

## BPM 是什么？

Better Plugins Manager 提供比原生插件管理更强的体验：延迟启动、批量开关、分组/标签、重命名和描述、像 BRAT 一样从 GitHub 选择发行版安装、导出到 Base、以及更友好的移动端界面。

## 亮点

- **快速批量控制**：一键全开/全关，分组启用/禁用，单插件快速开关。  
- **整理与注释**：自定义名称/描述/备注，分组、标签（BPM 安装自动打 `bpm-install` 标签），可搜索过滤。  
- **GitHub 感知安装**：支持 `user/repo` 或完整 URL，发行版列表选择，缓存仓库映射，卡片可跳转仓库。  
- **性能与延迟**：按预设延迟启动插件，缩短启动卡顿。  
- **Base 同步**：插件信息写入 Markdown frontmatter，并支持反向同步（分只读/可写字段）。  
- **移动端适配**：可折叠操作/搜索区域、长按提示、响应式网格；桌面端布局不受影响。  
- **GitHub Token**：可选 PAT，获取发行版更稳定。

## 安装

1) **手动**  
到 Releases 下载 `main.js`、`manifest.json`、`styles.css`，放到 `<库>/.obsidian/plugins/better-plugins-manager/`。

2) **BRAT**  
BRAT → “Add Beta plugin” → `zenozero-dev/obsidian-manager` → 安装。

## 使用

- 从侧边栏 “Manager” 图标或命令面板（`Manage plugins`）打开。  
- 卡片支持重命名、描述/备注编辑、标签/分组、延迟、跳转仓库/文件夹、删除、启用/禁用。  
- 筛选：按状态、分组、标签、延迟、关键字搜索。  
- 操作：批量开关、分组开关、重载插件、从 GitHub 选发行版安装。

## 导出到 Obsidian Base

1) 在设置中填写 **插件信息导出目录**（库内文件夹）。  
2) BPM 会为每个插件生成一篇 Markdown 并监听改动。  
3) 规则：`bpm_rw_*` 可编辑；`bpm_ro_*` 只读；`bpm_rwc_repo` 仅在非 BPM 安装且无官方映射时可写。

Frontmatter 示例如下：

```yaml
---
bpm_ro_id: some-plugin
bpm_rw_name: 自定义名
bpm_rw_desc: 自定义描述
bpm_rw_note: 备注
bpm_rw_enabled: true
bpm_rwc_repo: user/repo
bpm_ro_group: group-id
bpm_ro_tags:
  - tag-a
  - bpm-install
bpm_ro_delay: delay-id
bpm_ro_installed_via_bpm: true
bpm_ro_updated: 2024-12-12T10:00:00Z
---

正文区：这里的内容可自行编辑或替换。
```

## 常用设置

- **延迟预设**：创建延迟配置并分配给插件。  
- **隐藏 BPM 标签**：保留自动标签但在界面中隐藏。  
- **GitHub API Token**：提升发行版拉取的速率上限。  
- **淡化未启用插件**：未启用的卡片视觉弱化。  
- **导出提示文案**：可自定义导出文件的正文提示。

## 命令

- 打开管理面板。  
- （可选）单插件开关命令。  
- （可选）按分组一键启用/禁用。

## 兼容性

- 支持桌面和移动端（Android/iOS），自动按平台切换移动布局，桌面不受影响。

## 参与贡献

欢迎提交 Issue/PR。反馈问题请附日志与复现步骤；需求建议可先开讨论/Issue。

## 许可

[MIT](../LICENSE)
