import { configDefaults, defineConfig } from 'vitest/config';

// Arbeitskopien unter .claude/worktrees/ enthalten eigene Kopien der Tests —
// ohne diesen Ausschluss liefen sie lokal mit und meldeten fremde Stände.
export default defineConfig({
  test: {
    exclude: [...configDefaults.exclude, '.claude/**'],
  },
});
