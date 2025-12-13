import Manager from "main";
import { ensureBpmTagExists } from "src/repo-resolver";

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
