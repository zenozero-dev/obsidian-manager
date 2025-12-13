# Better Plugins Manager

[简体中文](docs/README_CN.md)

![GitHub Downloads](https://img.shields.io/github/downloads/zenozero-dev/obsidian-manager/total)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/zenozero-dev/obsidian-manager)
![Last commit](https://img.shields.io/github/last-commit/zenozero-dev/obsidian-manager)
![Issues](https://img.shields.io/github/issues/zenozero-dev/obsidian-manager)
![Stars](https://img.shields.io/github/stars/zenozero-dev/obsidian-manager?style=social)

![Screenshot](img/index.png)

## What is BPM?

Better Plugins Manager goes beyond Obsidian’s built-in manager: delay-start plugins, batch enable/disable, organize with groups and tags, rename and annotate, install from GitHub with release picker, export data for Base workflows, and keep a mobile-friendly UI.

## Highlights

- **Fast control & batching**: toggle all plugins, enable/disable by group, and per-plugin quick switches.
- **Organize & document**: custom names/descriptions, groups, tags (auto “bpm-install” tag for BPM installs), searchable filters.
- **GitHub-aware install**: paste `user/repo` or full URL, pick releases like BRAT, cache repo mapping, and jump to repo from each card.
- **Delay & performance**: start plugins with per-profile delays.
- **Base-friendly export**: write plugin metadata to Markdown frontmatter and sync back (safe read-only/write tags).
- **Mobile ready**: collapsible action/search bars, long-press tooltips, responsive grid; desktop UI remains unchanged.
- **GitHub token support**: optional PAT to avoid rate limits when fetching releases.

## Installation

This plugin is now available on the Obsidian official marketplace.

## Usage

- Open from the ribbon “Manager” icon or command palette (`Manage plugins`).
- Cards let you rename, edit descriptions/notes, tag/group, set delay, open repo/folder, delete, and toggle enabled.
- Filters: by state, group, tag, delay, and keyword search.
- Actions: batch enable/disable all or by group, reload plugins, install from GitHub with release selection.

## Export to Obsidian Base

1) In settings, set **Plugin info export directory** (folder inside your vault).  
2) BPM exports one Markdown per plugin and watches the folder for edits.  
3) Read/Write rules: `bpm_rw_*` are editable; `bpm_ro_*` are read-only; `bpm_rwc_repo` is editable only when the plugin is not BPM-installed and has no official repo mapping.

Frontmatter schema (auto-generated):

```yaml
---
bpm_ro_id: some-plugin
bpm_rw_name: Custom name
bpm_rw_desc: Custom description
bpm_rw_note: Personal note
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

Body section: you can edit or replace this content.
```

## Settings you’ll care about

- **Delay profiles**: create presets and assign per plugin.  
- **Hide BPM tag**: keep the auto “bpm-install” tag but hide it in UI.  
- **GitHub API token**: raise rate limits for release fetching.  
- **Fade inactive plugins**: visually de-emphasize disabled items.  
- **Export notices**: configurable hint text for exported files.

## Commands

- Open manager panel.  
- (Optional) per-plugin toggle commands.  
- (Optional) enable/disable all plugins in a group.

## Compatibility

- Works on desktop and mobile (Android/iOS).  
- Uses platform detection to apply the compact mobile layout while keeping the desktop layout unchanged.

## Contributing

Issues and PRs are welcome. For bugs, share console logs and reproduction steps; for features, open a discussion/issue first.

## License

[MIT](LICENSE)
