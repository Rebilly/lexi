import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/index.js',
        format: 'cjs',
    },
    treeshake: true,
    plugins: [
        resolve({
            preferBuiltins: true,
            mainFields: ['main'],
        }),
        commonjs(),
    ],
};
