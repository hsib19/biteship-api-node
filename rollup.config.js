import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/biteship.cjs.js',
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: 'dist/biteship.esm.js',
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [resolve(), typescript({ tsconfig: './tsconfig.json' }), terser()],
    external: ['node-fetch'],
  },
];
