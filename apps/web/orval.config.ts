import { defineConfig } from 'orval';

export default defineConfig({
  api: {
    input: {
      target: 'http://localhost:3001/api-docs-json',
    },
    output: {
      target: './src/generated/api.ts',
      client: 'fetch',
      baseUrl: 'http://localhost:3001',
    },
  },
});
