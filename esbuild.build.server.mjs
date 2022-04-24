import { build } from 'esbuild';


export const buildOptions = {
  entryPoints: [
    './src/server.tsx',
  ],
  bundle: true,
  logLevel: 'info',
  outdir: './public/dist',
  platform: 'node',
  format: 'esm',
  banner: {
    js: [
        `import { createRequire as topLevelCreateRequire } from 'module'`,
        `const require = topLevelCreateRequire(import.meta.url)`
    ].join('\n')
}
};

build(Object.assign({}, buildOptions, {
  minify: false,
})).catch(() => process.exit(1))
