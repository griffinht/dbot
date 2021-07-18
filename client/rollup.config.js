import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';
import json from '@rollup/plugin-json';

export default {
    input: 'src/index.ts',
    output: {
        file: 'build/index.js',
        format: 'cjs',
    },
    plugins: [
        nodeResolve(),
        // convert commonjs to es6 modules for rollup/plugin-typescript
        commonjs(),
        typescript({
            // rollup/plugin-typescript only works with es6 modules
            module: "esnext"
        }),
        terser(),
        // needed for node module minecraft-data json
        json()
    ],
};