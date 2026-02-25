import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        include: ['src/**/*.test.ts', 'src/**/*.spec.ts'],
        exclude: ['dist', 'node_modules'],
        coverage: {
            provider: 'istanbul',
            reporter: ['text', 'json', 'html', 'lcov'],
            thresholds: {
                lines: 100,
                functions: 100,
                branches: 100,
                statements: 100,
            },
        },
    },
});
