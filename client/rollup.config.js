import {nodeResolve} from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import {terser} from "rollup-plugin-terser";
import commonjs from '@rollup/plugin-commonjs';

export default {
    input: 'src/index.ts',
    output: {
        dir: 'build',
        format: 'cjs',
    },
    plugins: [
        commonjs(),
        nodeResolve(),
        terser(),
        typescript(),
    ]
};