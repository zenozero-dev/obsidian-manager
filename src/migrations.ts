import Manager from "main";
import { ensureBpmTagExists } from "src/repo-resolver";
import { normalizePath, parseYaml, stringifyYaml } from "obsidian";

type Migration = {
	version: string;
	run: (manager: Manager) => Promise<void> | void;
};

const compare = (a: string, b: string): number => {
	const pa = (a || "0").split(".").map(Number);
	const pb = (b || "0").split(".").map(Number);
	const len = Math.max(pa.length, pb.length);
	for (let i = 0; i < len; i++) {
		const ai = pa[i] || 0;
		const bi = pb[i] || 0;
		if (ai > bi) return 1;
		if (ai < bi) return -1;
	}
	return 0;
};

const migrations: Migration[] = [
	{
		version: "0.3.1",
		run: async (manager) => {
			let changed = false;
			// 语言初始化
			if (!manager.settings.LANGUAGE_INITIALIZED || !manager.settings.LANGUAGE) {
				manager.settings.LANGUAGE = manager.getAppLanguage();
				manager.settings.LANGUAGE_INITIALIZED = true;
				changed = true;
			}
			// 清理默认组/标签
			if (manager.settings.GROUPS?.some(g => g.id === "default")) {
				manager.settings.GROUPS = manager.settings.GROUPS.filter(g => g.id !== "default");
				changed = true;
			}
			if (manager.settings.TAGS?.some(t => t.id === "default")) {
				manager.settings.TAGS = manager.settings.TAGS.filter(t => t.id !== "default");
				changed = true;
			}
			// BPM 标签
			ensureBpmTagExists(manager);
			// 补全缺失 name
			if (manager.settings.Plugins && manager.settings.Plugins.length > 0) {
				manager.settings.Plugins.forEach(p => {
					if (!p.name) {
						p.name = p.id;
						changed = true;
					}
				});
			}
			if (changed) await manager.saveSettings();
		}
	},
	{
		version: "0.3.2",
		run: async (manager) => {
			// 从旧版导出笔记中移除 bpm_ro_updated，避免无意义的频繁写入
			const exportDir = manager.settings.EXPORT_DIR;
			if (!exportDir) return;

			const normalizedDir = normalizePath(exportDir);
			const mdFiles = manager.app.vault.getMarkdownFiles().filter((f) => {
				const p = normalizePath(f.path);
				return p === normalizedDir || p.startsWith(normalizedDir + "/");
			});

			const parseFrontmatter = (content: string): { frontmatter: any; body: string } => {
				if (!content.startsWith("---")) return { frontmatter: null, body: content };
				const end = content.indexOf("\n---", 3);
				if (end === -1) return { frontmatter: null, body: content };
				const raw = content.slice(3, end).trim();
				let fm: any = null;
				try {
					fm = parseYaml(raw);
				} catch {
					fm = null;
				}
				const body = content.slice(end + 4);
				return { frontmatter: fm, body };
			};

			let changed = false;
			for (const f of mdFiles) {
				try {
					const old = await manager.app.vault.read(f);
					const parsed = parseFrontmatter(old);
					const fm = parsed.frontmatter;
					if (!fm || !fm["bpm_ro_id"] || !("bpm_ro_updated" in fm)) continue;
					delete fm["bpm_ro_updated"];
					const yaml = stringifyYaml(fm).trimEnd();
					const next = `---\n${yaml}\n---${parsed.body.startsWith("\n") ? "" : "\n"}${parsed.body}`;
					if (next !== old) {
						await manager.app.vault.adapter.write(f.path, next);
						changed = true;
					}
				} catch {
					// ignore single file failures
				}
			}

			if (changed) {
				// 仅用于迁移期间记录，无需额外保存设置
				return;
			}
		},
	},
];

export const runMigrations = async (manager: Manager) => {
	const currentVersion = manager.manifest.version;
	const last = manager.settings.MIGRATION_VERSION || "";
	const pending = migrations
		.filter(m => compare(m.version, last) > 0)
		.sort((a, b) => compare(a.version, b.version));
	for (const m of pending) {
		await m.run(manager);
		manager.settings.MIGRATION_VERSION = m.version;
		await manager.saveSettings();
	}
	// 确保版本记录到位
	if (!manager.settings.MIGRATION_VERSION || compare(manager.settings.MIGRATION_VERSION, currentVersion) < 0) {
		manager.settings.MIGRATION_VERSION = currentVersion;
		await manager.saveSettings();
	}
};
