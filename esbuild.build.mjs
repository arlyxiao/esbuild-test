import { build } from 'esbuild';
import { buildOptions } from './esbuild.config.mjs'

build(Object.assign({}, buildOptions, {
  minify: true,
  banner: { js: ' (() => new EventSource("/esbuild").onmessage = () => location.reload())();' },
    watch: {
      onRebuild(error, result) {
        clients.forEach((res) => res.write('data: update\n\n'))
        clients.length = 0
        console.log(error ? error : '...')
      },
    },
})).catch(() => process.exit(1))