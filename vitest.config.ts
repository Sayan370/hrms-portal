import { defineConfig } from 'vitest/config'

export default defineConfig({
    test: {
        environment: 'jsdom',
        setupFiles: ['./src/tests/setup.ts'],
        // testMatch: ['./src/tests/**/*.test.tsx'],
        // testNamePattern: /^*.test.tsx$/,
        globals: true
    }
})