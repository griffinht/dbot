import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        file: 'build/index.js',
        format: 'cjs',
    },
    plugins: [
        nodeResolve(),
        commonjs(), // convert commonjs to es6 modules for rollup/plugin-typescript
        typescript({
            // rollup/plugin-typescript only works with es6 modules
            module: "esnext"
        }),
        terser(),
    ]
};