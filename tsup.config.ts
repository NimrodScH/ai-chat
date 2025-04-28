import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.tsx'],
  format: ['cjs', 'esm'],
  splitting: true,
  sourcemap: true,
  clean: true,
  dts: {
    resolve: true, // this is important!
  },
  external: ['*.css'], // <- ADD THIS!!
  target: 'es2022',
});
