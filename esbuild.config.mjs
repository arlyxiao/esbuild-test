import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { sassPlugin, postcssModules } from 'esbuild-sass-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


export const buildOptions = {
  entryPoints: [
    './src/index.tsx',
  ],
  loader: {
    '.png': 'dataurl',
    '.jpg': 'dataurl',
    '.svg': 'dataurl',
  },
  bundle: true,
  sourcemap: true,
  target: 'es6',
  logLevel: 'info',
  outfile: resolve(__dirname, 'public', 'dist', 'bundle.js'),
  plugins: [sassPlugin({
    type: 'style',
    transform: postcssModules({})
  })],
};