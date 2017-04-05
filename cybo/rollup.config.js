//import babel from 'rollup-plugin-babel';

export default {
    entry: './src/cybo.js',
    targets: [
		{
			format: 'iife',
			moduleName: 'Cybo',
			dest: './dist/cybo.js'
		}
		//}, {
		// 	format: 'es',
        //     moduleName: 'Cybo',
		// 	dest: 'dist/cybo.es.js'
		// }, {
		// 	format: 'amd',
		// 	moduleName: 'Cybo',
		// 	dest: 'dist/cybo.amd.js'
		// }, {
		// 	format: 'cjs',
		// 	moduleName: 'Cybo',
		// 	dest: 'dist/cybo.cjs.js'
		// }, {
		// 	format: 'umd',
		// 	moduleName: 'Cybo',
		// 	dest: 'dist/cybo.umd.js'
		// }
	],
    // plugins: [
    //     babel ({
    //         exclude: 'node_modules/**'
    //     })
    // ]
};
