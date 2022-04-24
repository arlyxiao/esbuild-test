
import * as http from 'http';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { serve } from 'esbuild';
import { buildOptions } from './config.mjs'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Start esbuild's server on a random local port
serve({
  servedir: resolve(__dirname, 'public'),
  host: '127.0.0.1',
}, buildOptions).then(result => {
  const serverPort = 3333;
  console.log('Starting a server on http://localhost:' + serverPort);

  // The result tells us where esbuild's local server is
  const { host, port } = result;

  http.createServer((req, res) => {
    const options = {
      hostname: host,
      port: port,
      path: req.url,
      method: req.method,
      headers: req.headers,
    }

    // Forward each incoming request to esbuild
    const proxyReq = http.request(options, proxyRes => {
      // If esbuild returns "not found", send a custom 404 page
      if (proxyRes.statusCode === 404) {
        res.writeHead(404, { 'Content-Type': 'text/html' });
        res.end('<h1>A custom 404 page</h1>');
        return;
      }

      // Otherwise, forward the response from esbuild to the client
      res.writeHead(proxyRes.statusCode, proxyRes.headers);
      proxyRes.pipe(res, { end: true });
    });

    // Forward the body of the request to esbuild
    req.pipe(proxyReq, { end: true });
  }).listen(serverPort);
});