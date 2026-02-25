import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';

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
